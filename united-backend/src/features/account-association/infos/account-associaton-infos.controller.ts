import { Body, Controller, Get, HttpStatus, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/features/sign-in/jwt-auth.guard';
import { InfosDTO } from '../dto/association.dto';
import { AccountAssociatonInfosService } from './account-associaton-infos.service';

@Controller('account-association-infos')
export class AccountAssociatonInfosController {

    constructor(private readonly Infos: AccountAssociatonInfosService){}

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateService(@Param('id') id: number, @Body() data: Partial<InfosDTO>) {
        await this.Infos.updateService(id, data);
        return {
            statusCode: HttpStatus.OK,
            message: 'Infomation modifier avec succès',
        };
    };
    
    @UseGuards(JwtAuthGuard)
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
