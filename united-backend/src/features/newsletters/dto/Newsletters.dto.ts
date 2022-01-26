import { newsletterStatus } from "src/entity/newsletter.entity";

export class NewslettersDTO {
    id:number;
    email:string;
    status : newsletterStatus;
}
