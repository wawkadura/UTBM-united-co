import { Body, Controller, Get, HttpStatus } from '@nestjs/common';
import { PayementService } from './payement.service';

@Controller('payement')
export class PayementController {
    constructor(private paymentService: PayementService){}

    @Get()
    async GetPaymentById(@Body() id: number){
        console.log(id);
        const payments = await this.paymentService.FindAllById(id);
        console.log(payments);

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
}
