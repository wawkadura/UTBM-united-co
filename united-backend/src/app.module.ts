import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { DatabaseModule } from './database/database.module';
import { NewslettersModule } from './features/newsletters/newsletters.module';
import { PayementModule } from './features/payement/payement.module';
import { SingInModule } from './features/sign-in/sign-in.module';
import { TicketModule } from './features/ticket/ticket.module';
import { AssociationModule } from './features/association/service/association.module';
import { SignUpModule } from './features/sign-up/sign-up.module';
import { SubscriptionModule } from './features/subscription/subscription.module';
import { AdminModule } from './features/admin/admin.module';


@Module({
  imports: [
    UserModule, 
    DatabaseModule,
    NewslettersModule,
    SingInModule,
    AssociationModule,
    TicketModule,
    SignUpModule,
    PayementModule,
    SubscriptionModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
