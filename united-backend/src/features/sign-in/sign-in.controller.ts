import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { users } from 'src/entity/user.entity';
import { PayloadToken } from './dto/payloadToken';
import { SignIn } from './dto/sign-in.dto';
import { SingInService } from './sign-in.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('account')
export class SingInController {

    constructor(private signInService: SingInService){}
    
    @Post('sign-in')
    async SignIn(@Body() data: SignIn){
        const user = await this.signInService.isPassOk(data.email, data.password);
        
        if (user){
            const payload:PayloadToken={userId: user.id}
            const token = await this.signInService.Login(payload);
            return {
                statusCode: HttpStatus.OK,
                message: 'signIn ok',
                token,
                payload
            };
        }
        else{
            return{
                statusCode: HttpStatus.NOT_FOUND,
                message: 'email ou mot de passe incorect',
            };
        }
    }

    @Post('forgot-pass')
    @UseGuards(JwtAuthGuard)
    async ForgotPassword(@Body() data: users){
        const user = await this.signInService.isEmailExist(data.email);
        if (user){
            const result = await this.signInService.updatePass(user, data.password);
            const payload: PayloadToken = {userId: result.id}

            if(result){
                return{
                    codeStatus: HttpStatus.OK,
                    message : 'Mot de passe modifier avec succés',
                    payload
                }
            }
            else{
                return{
                    codeStatus: HttpStatus.NOT_MODIFIED,
                    message : 'Echec de la modification du mot de passe',
                }
            }
        }
        else{
            return{
                codeStatus: HttpStatus.NOT_FOUND,
                message : 'L\'email fourni n\'existe pas',
            }
        }
    }
}
