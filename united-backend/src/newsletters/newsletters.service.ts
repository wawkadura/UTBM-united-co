import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { newsletter, newsletterStatus } from 'src/entity/newsletter.entity';
import { Repository } from 'typeorm';
import { NewslettersDTO } from './dto/Newsletters.dto';
import { CreateNewslettersDTO } from './dto/CreateNewsletters.dto';

@Injectable()
export class NewslettersService {
    constructor(@InjectRepository(newsletter) private newsletterRepository: Repository<newsletter>){}

    // public async createOne(createRequest: CreateNewslettersDTO){
    //     const data: newsletter = new newsletter();
    //     data.email = data.email;
    //     data.status= newsletterStatus.Created;
    //     await this.newsletterRepository.save(data);

    //     const newsletterDto = new NewslettersDTO();
    //     newsletterDto.id = data.id;
    //     newsletterDto.email= data.email;
    //     newsletterDto.status =data.status;
    //     return newsletterDto
    // }

    async create(data: NewslettersDTO) {
        const newsl = this.newsletterRepository.create(data);
        await this.newsletterRepository.save(data);
        return newsl;
    }

}
