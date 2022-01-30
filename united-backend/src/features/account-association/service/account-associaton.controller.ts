import { Controller, Body, Post,HttpStatus ,Get, Put, Param, Delete, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from 'src/features/sign-in/jwt-auth.guard';
import { serviceDTO } from '../dto/association.dto';
import { AccountAssociatonService } from './account-associaton.service';

@Controller('account-association')
export class AccountAssociatonController {

    constructor(private readonly service: AccountAssociatonService){}

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async showAllService(@Param('id') id: number) {
        const services =  await this.service.GetAll(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Services fetched successfully',
            services
        };
    };

    @UseGuards(JwtAuthGuard)
    @Post()
    async createService(@Body() data: serviceDTO) {
        const serviceCreated = await this.service.createService(data);
        return {
            statusCode: HttpStatus.OK,
            message: 'Service crée avec succès',
            serviceCreated
        };
    };

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateService(@Param('id') id: number, @Body() data: Partial<serviceDTO>) {
        await this.service.updateService(id, data);
        return {
            statusCode: HttpStatus.OK,
            message: 'Service modifier avec succès',
        };
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteService(@Param('id') id: number) {
        await this.service.destroy(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Service suprimé avec succès',
        };
    };
}
