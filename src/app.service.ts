import { Injectable, Inject } from '@nestjs/common';
import { ClickhouseService } from './clickhouse/clickhouse.service';

@Injectable()
export class AppService {
  constructor(private readonly clickhouseService: ClickhouseService) {}
  async query(): Promise<any> {
    return await this.clickhouseService.getAll()
  }
}
