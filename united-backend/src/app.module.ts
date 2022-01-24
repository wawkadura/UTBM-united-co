import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { DatabaseModule } from './database/database.module';
import { NewslettersModule } from './features/newsletters/newsletters.module';
import { AccountAssociationModule } from './features/account-association/service/account-association.module';
import { StatisticModule } from './features/account-association/statistic/statistic.module';

@Module({
  imports: [
    UserModule, 
    DatabaseModule, 
    NewslettersModule, 
    AccountAssociationModule,
    StatisticModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
