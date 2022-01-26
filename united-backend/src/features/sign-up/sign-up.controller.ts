import { Controller, Body, Post, HttpStatus } from '@nestjs/common';
import { SignUpDTO } from './dto/sign-up.dto';
import { SignUpService } from './sign-up.service';
import * as bcrypt from 'bcrypt';

@Controller('sign-up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) { }

  @Post()
  async createUsers(@Body() data: SignUpDTO) {
    data.role = "DONOR";
    const existingUser = await this.signUpService.read(data.email);
    if (existingUser == null) { 
      // hash the password
      data.password = await bcrypt.hash(data.password, 10)

      // insert the new user into database
      const user = await this.signUpService.create(data); 

      return {
        statusCode: HttpStatus.OK,
        message: 'The user has been successfully saved',
        user
      };
    } else {   // if email already exists
      
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The email already exists',
        data,
      };
    }
  }
}
