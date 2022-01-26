import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { StatisticService } from './statistic.service';

@Controller('account-association-statistic')
export class StatisticController {
    constructor(private readonly statistic: StatisticService){}

    @Get("pieseries/:id")
    async showAllbydate(@Param('id') id: number) {
        const allDate =  await this.statistic.getDataBydate(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'date pieSeries fetched successfully',
            allDate
        };
    }

    @Get("barseries/:id")
    async showAllBymonth(@Param('id') id: number) {
        const allMonth =  await this.statistic.getDataByMonth(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'date barSeries fetched successfully',
            allMonth
        };
    }


}
