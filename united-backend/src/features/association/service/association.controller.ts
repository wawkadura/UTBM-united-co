import { Controller, Body, Post,HttpStatus ,Get, Put, Param, Delete} from '@nestjs/common';
import { associationDTO } from '../dto/association.dto';
import { AssociationService } from './association.service';

@Controller('association')
export class AssociationController {

    constructor(private readonly service: AssociationService){}

    @Get('userId=:userId')
    async getAssociations(@Param('userId') userId: number) {
        const data =  await this.service.getAssociations(userId);
            return {
                statusCode: HttpStatus.OK,
                message: 'Associations fetched successfully',
                data
            };
    }

    @Post()
    async createAssociation(@Body() data: associationDTO) {
        const serviceCreated = await this.service.createAssociation(data);
        return {
            statusCode: HttpStatus.OK,
            message: 'Association created successfully',
            serviceCreated
        };
    }

    @Put(':id')
    async updateAssociation(@Param('id') id: number, @Body() data: Partial<associationDTO>) {
        await this.service.updateAssociationById(id, data);
        return {
            statusCode: HttpStatus.OK,
            message: 'Association updated successfully',
        };
    }

    @Delete(':id')
    async deleteAssociation(@Param('id') id: number) {
        await this.service.deleteAssociationById(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Association deleted successfully',
        };
    }

    @Get('/services/:associationId')
    async getServices(@Param('associationId') associationId: number) {
        const data =  await this.service.getServicesByAssociationId(associationId);
            return {
                statusCode: HttpStatus.OK,
                message: 'Association services fetched successfully',
                data
            };
    }

    @Get('/types')
    async getAssociationTypes() {
        const data =  await this.service.getAssociationTypes();
        return {
            statusCode: HttpStatus.OK,
            message: 'Association types fetched successfully',
            data
        };
    }

    @Get('/date-filter-values')
    async getDateFilterMinMaxValues() {
        const data =  await this.service.getDateFilterMinMaxValues();
        return {
            statusCode: HttpStatus.OK,
            message: 'Date filter Min Max values fetched successfully',
            data
        };
    }
}
