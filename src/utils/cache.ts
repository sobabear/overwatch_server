import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from 'nestjs-redis';
import { config } from './config'; // Assuming you have a ConfigService

@Injectable()
export class CacheService {
  constructor(
    @InjectRedis() private readonly client: Redis,
    private readonly configService: ConfigService, // Replace with your actual ConfigService
  ) {
    this.client.on('error', (err) => {
      console.error(err);
    });
  }

  async getOrSet<T>(
    cacheKey: string,
    timeout: number,
    fn: () => Promise<T>,
  ): Promise<T> {
    const cachedData = await this.client.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const data = await fn();
    await this.client.set(
      cacheKey,
      JSON.stringify(data),
      'EX',
      timeout,
    );

    return data;
  }
}
