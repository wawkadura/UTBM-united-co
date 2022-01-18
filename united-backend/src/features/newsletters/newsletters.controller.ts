import { Controller, Body, Post,HttpStatus ,Get} from '@nestjs/common';
import { NewslettersDTO } from './dto/Newsletters.dto';
import { NewslettersService } from './newsletters.service';

@Controller('newsletters') //route name 
export class NewslettersController {
    constructor(private readonly newslettersService: NewslettersService){}

    @Post()
    async createUsers(@Body() data: NewslettersDTO) {
      const em =  await this.newslettersService.read(data.email); // check if the email value don't exit
      if (!em){
        const newsL = await this.newslettersService.create(data); //save the new email  if it doesn"t exist
        return {
          statusCode: HttpStatus.OK,
          message: 'Email enregistré avec succès.',
          newsL
        };
      }
      else {   //if email exist i send a mesasge towards front
        return {
          statusCode: 201,
          message: 'L\'email existe déja.',
          data,
        };
      }
    }
}
