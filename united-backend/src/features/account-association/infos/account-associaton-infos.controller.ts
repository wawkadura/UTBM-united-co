import { Body, Controller, Get, HttpStatus, Param, Put } from '@nestjs/common';
import { InfosDTO } from '../dto/association.dto';
import { AccountAssociatonInfosService } from './account-associaton-infos.service';

@Controller('account-association-infos')
export class AccountAssociatonInfosController {

    constructor(private readonly Infos: AccountAssociatonInfosService){}

    @Put(':id')
    async updateService(@Param('id') id: number, @Body() data: Partial<InfosDTO>) {
        await this.Infos.updateService(id, data);
        return {
            statusCode: HttpStatus.OK,
            message: 'Infomation modifier avec succès',
        };
    }
    
    @Get(':id')
    async showAllService(@Param('id') id: number) {
        const value =  await this.Infos.GetAll(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'association information fetched successfully',
            value
        };
    }
}
