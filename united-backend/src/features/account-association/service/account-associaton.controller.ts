import { Controller, Body, Post,HttpStatus ,Get, Put, Param, Delete} from '@nestjs/common';
import { serviceDTO } from '../dto/association.dto';
import { AccountAssociatonService } from './account-associaton.service';

@Controller('account-association')
export class AccountAssociatonController {

    constructor(private readonly service: AccountAssociatonService){}

    @Get(':id')
    async showAllService(@Param('id') id: number) {
        const services =  await this.service.GetAll(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Services fetched successfully',
            services
        };
    }

    @Post()
    async createService(@Body() data: serviceDTO) {
        const serviceCreated = await this.service.createService(data);
        return {
            statusCode: HttpStatus.OK,
            message: 'Service crée avec succès',
            serviceCreated
        };
    }

    @Put(':id')
    async updateService(@Param('id') id: number, @Body() data: Partial<serviceDTO>) {
        await this.service.updateService(id, data);
        return {
            statusCode: HttpStatus.OK,
            message: 'Service modifier avec succès',
        };
    }

    @Delete(':id')
    async deleteService(@Param('id') id: number) {
        await this.service.destroy(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Service suprimé avec succès',
        };
    }
}
