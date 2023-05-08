import { ConfigService } from "@nestjs/config";
import { Injectable } from '@nestjs/common';
import { createClient, ClickHouseClient } from '@clickhouse/client'
import type { ResponseJSON } from '@clickhouse/client'

@Injectable()
export class ClickhouseService {
    private config: ConfigService
    private client: ClickHouseClient
    constructor() {
        this.config = new ConfigService()
        this.client = createClient({
            host: this.config.get('CLICKHOUSE_HOST'),
            password: this.config.get('CLICKHOUSE_PASSWORD'),
          })
    }
    async onModuleInit() {
        await this.client.exec({
            query: `DROP TABLE IF EXISTS user`,
        })
        await this.client.exec({
            query: `
            CREATE TABLE user
            (id UInt64, name String)
            ENGINE MergeTree()
            ORDER BY (id)
          `,
            clickhouse_settings: {
              wait_end_of_query: 1,
            },
        })
        await this.client.insert({
            table: 'user',
            // structure should match the desired format, JSONEachRow in this example
            values: [
              { id: 42, name: 'foo' },
              { id: 42, name: 'bar' },
            ],
            format: 'JSONEachRow',
        })
    }
    async getAll() {
        const rows = await this.client.query({
            query: `SELECT * FROM user`,
            format: 'JSONEachRow',
        })
        return await rows.json<ResponseJSON<{ id: number, number: string }>>()
    }
}
