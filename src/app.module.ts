import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationGateWay } from './notification.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, NotificationGateWay],
})
export class AppModule {}
