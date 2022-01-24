import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { SignIn } from './dto/sign-in.dto';
import { SingInService } from './sign-in.service';

@Controller('account')
export class SingInController {

    constructor(private signInService: SingInService){}
    
    @Post('sign-in')
    async SignIn(@Body() data: SignIn){
        console.log(data);
        const isOk = await this.signInService.isPassOk(data.email, data.password);
        if (isOk){
            return {
                statusCode: HttpStatus.OK,
                message: 'signIn ok',
                isOk
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
    async ForgotPassword(@Body() data: SignIn){
        const user = await this.signInService.isEmailExist(data.email);
        if (user){
            const result = await this.signInService.updatePass(user, data.password);

            if(result){
                return{
                    codeStatus: HttpStatus.OK,
                    message : 'Mot de passe modifier avec succés',
                    result
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
