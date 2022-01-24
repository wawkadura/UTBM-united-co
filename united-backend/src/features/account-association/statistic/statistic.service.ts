import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { association } from 'src/entity/association.entity';
import { service } from 'src/entity/service.entity';
import { subscription } from 'src/entity/subscription.entity';
import { Repository } from 'typeorm';
import {getConnection} from "typeorm";
import {getManager} from "typeorm";

@Injectable()
export class StatisticService {

    async getDataBydate(id:number){
        const allDate: any = getManager().createQueryBuilder()
        .select("sub.date", "sub")
        .from(subscription, "sub")
        .leftJoin(service, "se", "sub.id = se.id")
        .leftJoin(association, "ass", "se.id = ass.id")
        .where("ass.id = :id", {
            id: id
        })

        return allDate
    }
   

}
