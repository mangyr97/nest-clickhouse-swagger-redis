import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor() {}

  async query(): Promise<any> {
    return 'Hello world!';
  }
}
