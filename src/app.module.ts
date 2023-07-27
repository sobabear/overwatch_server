import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatModule } from './stat/stat.module';

@Module({
  imports: [StatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
