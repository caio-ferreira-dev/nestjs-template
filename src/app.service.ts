import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly dbService: DatabaseService) {}

  async createDbEntry(): Promise<string> {
    const dbData = await this.dbService.user.create({
      data: {
        username: 'testUser',
      },
    });

    return dbData.username;
  }
}
