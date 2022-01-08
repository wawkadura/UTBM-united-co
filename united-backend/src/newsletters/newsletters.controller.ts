import { Controller, Body, Post,HttpStatus} from '@nestjs/common';
import { CreateNewslettersDTO } from './dto/CreateNewsletters.dto';
import { NewslettersDTO } from './dto/Newsletters.dto';
import { NewslettersService } from './newsletters.service';

@Controller('newsletters')
export class NewslettersController {
    constructor(private readonly newslettersService: NewslettersService){}

    // @Post()
    // public async createOne(@Body() createNewletter: CreateNewslettersDTO){
    //     const resp =await this.newslettersService.createOne(createNewletter)
    //     return resp;
    // }

    @Post()
    async createUsers(@Body() data: NewslettersDTO) {
       const newsl = await this.newslettersService.create(data);
      return {
        statusCode: HttpStatus.OK,
        message: 'User created successfully',
        newsl
      };
    }
}
