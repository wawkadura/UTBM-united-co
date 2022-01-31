import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../sign-in/jwt-auth.guard';
import { SubDto } from './dto/sub.dto';
import { SubscriptionService } from './subscription.service';

@Controller('subscription')
export class SubscriptionController {
    constructor(private subService: SubscriptionService){}

    @UseGuards(JwtAuthGuard)
    @Post()
    async setSub(@Body()subDto : SubDto){
        const isAdd = await this.subService.addSub(subDto);

        if(isAdd){
            return{
                statusCode: HttpStatus.OK,
                message: "souscription enregistée",
                isAdd
            }
        }
        else{
            return{
                statusCode: HttpStatus.BAD_REQUEST,
                message: "souscription déjà active",
            }
        }
    }

}
