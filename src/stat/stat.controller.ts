import { Controller, Get, Param } from '@nestjs/common';
import { StatService } from './stat.service';

@Controller('stat')
export class StatController {
    constructor(private readonly overwatchService: StatService) {}

    @Get(':platform/:region/:tag')
    async getOverwatchStats(
      @Param('platform') platform: string,
      @Param('region') region: string,
      @Param('tag') tag: string,
    ): Promise<any> {
      const html = await this.overwatchService.getHTML(platform, region, tag);
      const parsedData = this.overwatchService.parseHTML(html);
      return parsedData;
    }
}
