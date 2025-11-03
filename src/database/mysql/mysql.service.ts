import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';


@Injectable()
export class MysqlService {
    private pool: mysql.Pool;

    constructor () {
        this.pool = mysql.createPool({
            host: process.env.MYSQLHOST,
            user: process.env.MYSQLUSER,
            password: process.env.MYSQLPASSWORD,
            database: process.env.MYSQLDATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 4,
            idleTimeout: 60000,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        })
    }

    async findAll(sqlText: string, parms: (string|number)[]): Promise<mysql.QueryResult> {
        const [results] = await this.pool.query(sqlText, parms);        
        return results;
    }

    async findOneById(sqlText: string, id: number): Promise<mysql.QueryResult> {
        const [ result ] = await this.pool.query(sqlText, [ id ]);
        return result;
    }

    async insertOne(sqlText: string, parms: (string|number)[]): Promise<mysql.QueryResult> {
        console.log(`sqlText: ${sqlText}`);
        console.log(`params: ${parms}`);  
        const [results] = await this.pool.query(sqlText, parms); 
        return results;
    }

    async updateOne(sqlText: string, parms: (string|number)[]): Promise<mysql.QueryResult> {
        const [results] = await this.pool.query(sqlText, parms);     
        return results;
    }

    async deleteOne(sqlText: string, parms: (string|number)[]): Promise<mysql.QueryResult> {
        const [results] = await this.pool.query(sqlText, parms);     
        return results;
    }
}