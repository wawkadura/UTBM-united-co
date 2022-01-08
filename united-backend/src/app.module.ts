import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { DatabaseModule } from './database/database.module';
import { NewslettersModule } from './newsletters/newsletters.module';

@Module({
  imports: [UserModule, DatabaseModule, NewslettersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
