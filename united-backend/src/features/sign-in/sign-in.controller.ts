import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { users } from 'src/entity/user.entity';
import { PayloadToken } from './dto/payloadToken';
import { SignIn } from './dto/sign-in.dto';
import { SingInService } from './sign-in.service';

@Controller('account')
export class SingInController {

    constructor(private signInService: SingInService){}
    
    // check if user exist
    @Post('sign-in')
    async SignIn(@Body() data: SignIn){
        const user = await this.signInService.isPassOk(data.email, data.password);
        console.log("wesh")
        //if user exist
        if (user){
            const payload:PayloadToken={userId: user.id}
            //generate token
            const token = await this.signInService.Login(payload);
            return {
                statusCode: HttpStatus.OK,
                message: 'signIn ok',
                token, //return token
                payload //return userId in payload
            };
        }
        else{
            return{
                statusCode: HttpStatus.NOT_FOUND,
                message: 'email ou mot de passe incorect',
            };
        }
    }

    // update user's password
    @Post('forgot-pass')
    async ForgotPassword(@Body() data: users){
        const user = await this.signInService.isEmailExist(data.email);
        //if user exist
        if (user){
            //update
            const result = await this.signInService.updatePass(user, data.password);

            //if update OK
            if(result){
                return{
                    statusCode: HttpStatus.OK,
                    message : 'Mot de passe modifier avec succés',
                }
            }
            else{
                return{
                    statusCode: HttpStatus.NOT_MODIFIED,
                    message : 'Echec de la modification du mot de passe',
                }
            }
        }
        else{
            return{
                statusCode: HttpStatus.NOT_FOUND,
                message : 'L\'email fourni n\'existe pas',
            }
        }
    }
}
