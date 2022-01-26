import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import config from '../ormconfig'
import { Connection } from 'typeorm';


@Module({ imports: [TypeOrmModule.forRoot(config)] })
export class DatabaseModule { 
    constructor(connection: Connection) {
        if (connection.isConnected) console.log('DB Connected Successfully!');
      }
}