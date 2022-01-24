import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { DatabaseModule } from './database/database.module';
import { NewslettersModule } from './features/newsletters/newsletters.module';
import { TicketModule } from './features/ticket/ticket.module';

@Module({
  imports: [UserModule, DatabaseModule, NewslettersModule, TicketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
