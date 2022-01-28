import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('account-association-statistic')
export class StatisticController {
    constructor(private readonly statistic: StatisticService){}

    @Get("pieseries/id=:id&date=:date")
    async showAllbydate(@Param('id') id: number, @Param('date') date:string) {
        const allDate =  await this.statistic.getDataBydate(id,date);
        return {
            statusCode: HttpStatus.OK,
            message: 'data pieSeries fetched successfully',
            allDate
        };
    }

    @Get("barseries/id=:id&date=:date")
    async showAllBymonth(@Param('id') id: number, @Param('date') date:string) {
        const allMonth =  await this.statistic.getDataByMonth(id, date);
        return {
            statusCode: HttpStatus.OK,
            message: 'data barSeries fetched successfully',
            allMonth
        };
    }

    @Get("dates/:id")
    async showDates(@Param('id') id: number) {
        const date =  await this.statistic.getDate(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'date fetched successfully',
            date
        };
    }

}
