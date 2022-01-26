//https://dev.to/yoshi_yoshi/typeorm-query-builder-with-subquery-490c
import { Injectable } from '@nestjs/common';
import { association } from 'src/entity/association.entity';
import { service } from 'src/entity/service.entity';
import { subscription } from 'src/entity/subscription.entity';
import {getManager} from "typeorm";

@Injectable()
export class StatisticService {

    //SELECT sev.title, year(sub.date), count(*) FROM subscription as sub INNER JOIN service as sev ON sev.id = sub.id INNER JOIN association as ass ON ass.id = sev.id where ass.id=1 GROUP by sev.title,year(sub.date) 
    async getDataBydate(id:number){
        const allDateQuery = getManager().createQueryBuilder()
        .select("DATE_FORMAT(sub.date, '%Y')", "date")
        .addSelect("sev.title", "title")
        .addSelect("COUNT(*)", "total")
        .from(subscription, "sub")
        .innerJoin(service, "sev", "sev.id = sub.id")
        .innerJoin(association, "ass", "sev.id = ass.id")
        .where("ass.id = :id", {
            id: id
        })
        .groupBy("sev.title")
        .addGroupBy("DATE_FORMAT(sub.date, '%Y')")

        // Execute the generated query
        const data = await allDateQuery.getRawMany();
        return data;
    }
    // want to get the number of user subcribe in each month
    async getDataByMonth(id:number){
        const allDateQuery = getManager().createQueryBuilder()
        .select("DATE_FORMAT(sub.date, '%y')", "year")
        .addSelect("DATE_FORMAT(sub.date, '%m')", "month")
        .addSelect("COUNT(*)", "total")
        .from(subscription, "sub")
        .innerJoin(association, "ass", "sub.id = ass.id")
        .where("ass.id = :id", {
            id: id
        })
        .groupBy("DATE_FORMAT(sub.date, '%m')")

        // Execute the generated query
        const data = await allDateQuery.getRawMany();
        return data;
    } 
    
}
