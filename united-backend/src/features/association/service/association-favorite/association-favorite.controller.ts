import { Controller, Body, Post,HttpStatus ,Get, Put, Param, Delete} from '@nestjs/common';
import { AssociationFavoriteService } from './association-favorite.service';

@Controller('association/favorite')
export class AssociationFavoriteController {

    constructor(private readonly service: AssociationFavoriteService){}

    @Post()
    async setFavorites(@Body() body:any) {
        const serviceCreated = await this.service.setFavorite(body);
        return {
            statusCode: HttpStatus.OK,
            message: 'Association created successfully',
            serviceCreated
        };
    }

}
