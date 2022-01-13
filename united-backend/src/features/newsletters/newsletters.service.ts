import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { newsletter, newsletterStatus } from 'src/entity/newsletter.entity';
import { Repository } from 'typeorm';
import { NewslettersDTO } from './dto/Newsletters.dto';


@Injectable()
export class NewslettersService {
    constructor(@InjectRepository(newsletter) private newsletterRepository: Repository<newsletter>){}

    //methode for add news email in database
    async create(data: NewslettersDTO) {
        const newsl = this.newsletterRepository.create(data);
        await this.newsletterRepository.save(data);
        return newsl;
    }
    //methode for read an email 
    async read(email:string) {
        const em = await this.newsletterRepository.findOne({ where: { email: email } });
        return em
      }

}
