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
    const existingUser = await this.signUpService.read(data.email); // check if the email value don't exit

    if (existingUser == null) { 
      data.password = bcrypt.hash(data.password, 10)
      console.log(data)
      const user = await this.signUpService.create(data); //save the new email  if it doesn"t exist

      return {
        statusCode: HttpStatus.OK,
        message: 'The user has been successfully saved',
        user
      };
    } else {   //if email exist i send a mesasge towards front
      
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'The email already exists',
        data,
      };
    }
  }
}
