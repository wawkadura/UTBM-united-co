import { Controller, Body, Post, HttpStatus, UseGuards} from '@nestjs/common';
import { AssociationFavoriteService } from './association-favorite.service';
import { JwtAuthGuard } from 'src/features/sign-in/jwt-auth.guard';

@Controller('association/favorite')
export class AssociationFavoriteController {

    constructor(private readonly service: AssociationFavoriteService){}

    @UseGuards(JwtAuthGuard)
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
