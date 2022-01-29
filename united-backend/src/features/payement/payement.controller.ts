import { Body, Controller, Get, HttpStatus, Param, Post, Query, UseGuards } from '@nestjs/common';
import { payment } from 'src/entity/payment.entity';
import { JwtAuthGuard } from '../sign-in/jwt-auth.guard';
import { PayementService } from './payement.service';

@Controller('payement')
export class PayementController {
    constructor(private paymentService: PayementService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async GetPaymentById(@Query('id') id: number){
        const payments = await this.paymentService.FindAllById(id);

        if (payments.length !== 0){
            return{
                codeStatus: HttpStatus.OK,
                message: "Info de payement récupéré",
                payments
            }
        }
        else{
            return{
                codeStatus: HttpStatus.NOT_FOUND,
                message: "Aucune info de payement disponible",
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async AddNewPayement(@Body() payement: payment){
        const newPayement = await this.paymentService.Add(payement);
        if(newPayement){
            return{
                codeStatus: HttpStatus.OK,
                message: "Moyen de paiement ajouté",
                newPayement
            }
        }
        else{
            return{
                codeStatus: HttpStatus.NOT_ACCEPTABLE,
                message: "Le moyen de paiement existe déjà",
            }
        }
    }
}
