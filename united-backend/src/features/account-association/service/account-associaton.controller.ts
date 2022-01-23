import { Controller, Body, Post,HttpStatus ,Get, Put, Param, Delete} from '@nestjs/common';
import { serviceDTO } from '../dto/association.dto';
import { AccountAssociatonService } from './account-associaton.service';

@Controller('account-association')
export class AccountAssociatonController {

    constructor(private readonly service: AccountAssociatonService){}

    @Get()
    async showAllService() {
        const services =  await this.service.GetAll();
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
            message: 'Service created successfully',
            serviceCreated
        };
    }

    @Put(':id')
    async updateService(@Param('id') id: number, @Body() data: Partial<serviceDTO>) {
        await this.service.updateService(id, data);
        return {
            statusCode: HttpStatus.OK,
            message: 'Service updated successfully',
        };
    }

    @Delete(':id')
    async deleteService(@Param('id') id: number) {
        await this.service.destroy(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Service deleted successfully',
        };
    }
}
