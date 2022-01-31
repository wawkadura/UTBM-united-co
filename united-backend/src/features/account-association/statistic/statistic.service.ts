//https://dev.to/yoshi_yoshi/typeorm-query-builder-with-subquery-490c
import { Injectable } from '@nestjs/common';
import { association } from 'src/entity/association.entity';
import { service } from 'src/entity/service.entity';
import { subscription } from 'src/entity/subscription.entity';
import { users } from 'src/entity/user.entity';
import {getManager} from "typeorm";

@Injectable()
export class StatisticService {

    async getDate(id:number){
        const date = getManager().createQueryBuilder()
        .select("DATE_FORMAT(sub.date, '%Y')", "date")
        .from(subscription, "sub")
        .innerJoin(service, "sev", "sev.id = sub.service_id")
        .innerJoin(association, "ass", "sev.association_id = ass.id")
        .innerJoin(users, "u", "u.id = ass.user_id")
        .where("ass.user_id = :id", {
            id: id
        })
        .groupBy("DATE_FORMAT(sub.date, '%Y')")
        // Execute the generated query
        const data = await date.getRawMany();
        return data;
    }

    //SELECT sev.title, year(sub.date), count(*) FROM subscription as sub INNER JOIN service as sev ON sev.id = sub.service_id INNER JOIN association as ass ON ass.id = sev.association_id where ass.id=1 GROUP by sev.title,year(sub.date) 
    async getDataBydate(id:number, date:string){
        const allDateQuery = getManager().createQueryBuilder()
        .select("DATE_FORMAT(sub.date, '%Y')", "date")
        .addSelect("sev.title", "title")
        .addSelect("COUNT(*)", "total")
        .from(subscription, "sub")
        .innerJoin(service, "sev", "sev.id = sub.service_id")
        .innerJoin(association, "ass", "sev.association_id = ass.id")
        .innerJoin(users, "u", "u.id = ass.user_id")
        .where("ass.user_id = :id", {
            id: id
        })
        .andWhere("DATE_FORMAT(sub.date, '%Y') = :date", {
            date: date
        })
        .groupBy("sev.title")
        .addGroupBy("DATE_FORMAT(sub.date, '%Y')")
        // Execute the generated query
        const data = await allDateQuery.getRawMany();
        return data; 
    }

    // want to get the number of user subcribe in each month
    async getDataByMonth(id:number, date:string){
        const allDateQuery = getManager().createQueryBuilder()
        .select("DATE_FORMAT(sub.date, '%Y')", "year")
        .addSelect("DATE_FORMAT(sub.date, '%b')", "month")
        .addSelect("COUNT(*)", "total")
        .from(subscription, "sub")
        .innerJoin(service, "sev", "sev.id = sub.service_id")
        .innerJoin(association, "ass", "sev.association_id = ass.id")
        .innerJoin(users, "u", "u.id = ass.user_id")
        .where("ass.user_id = :id", {
            id: id
        })
        .andWhere("DATE_FORMAT(sub.date, '%Y') = :date", {
            date: date
        })
        .groupBy("DATE_FORMAT(sub.date, '%b')")
        // Execute the generated query
        const data = await allDateQuery.getRawMany();
        return data;
    } 

    //SELECT * FROM subscription as sub INNER JOIN service as sev ON sev.id = sub.serviceidid INNER JOIN association as ass ON ass.id = sev.associationidid INNER JOIN users as u on u.id=ass.user_id    
}
