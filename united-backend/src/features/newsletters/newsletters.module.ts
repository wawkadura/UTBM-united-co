import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { newsletter } from 'src/entity/newsletter.entity';
import { NewslettersController } from './newsletters.controller';
import { NewslettersService } from './newsletters.service';

@Module({
  controllers: [NewslettersController],
  providers: [NewslettersService],
  imports: [TypeOrmModule.forFeature([newsletter])]  
})
export class NewslettersModule {}
