import { Injectable } from '@nestjs/common';
import cheerio from 'cheerio';
import { retryRequest } from 'src/utils/utils';

const MAX_RETRIES = 3;

@Injectable()
export class StatService {
  async getHTML(platform: string, region: string, tag: string): Promise<string> {
    const url = `https://overwatch.blizzard.com/en-us/career/${tag}/`;
    const ua =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:112.0) Gecko/20100101 Firefox/112.0';

    const options = {
      uri: encodeURI(url),
      headers: {
        'User-Agent': ua,
      },
      encoding: 'utf8',
    };

    return retryRequest(options, MAX_RETRIES);
  }

  parseHTML(html: string): any {
    const $ = cheerio.load(html);

    const isFound = $('.heading').text() !== 'Page Not Found';
    if (!isFound) {
      throw new Error('Profile not found');
    }

    // Your parsing logic goes here...

    return { stats, parsed };
  }
}
