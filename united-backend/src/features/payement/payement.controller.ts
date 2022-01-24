import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { payment } from 'src/entity/payment.entity';
import { Payement } from './dto/payement.dto';
import { PayementService } from './payement.service';

@Controller('payement')
export class PayementController {
    constructor(private paymentService: PayementService){}

    @Get()
    async GetPaymentById(@Body() id: number){
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
