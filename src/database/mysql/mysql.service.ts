import { Injectable, Logger } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { getMethodName } from '../../common/utils/utils';
import { DbModifyResult } from '../dto/dbRowModify.dto';

@Injectable()
export class MysqlService {
  private pool: mysql.Pool;

  constructor(private logger: Logger) {
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
    });
  }

  async findAll(
    sqlText: string,
    parms: (string | number)[],
  ): Promise<mysql.QueryResult> {
    const context = getMethodName(new Error('fake'));
    try {
      this.logger.debug(
        `Executing sql ${sqlText} with parms ${parms.toString()}`,
        context,
      );
      const [results] = await this.pool.query(sqlText, parms);
      return results;
    } catch (e) {
      this.logger.error(
        `Sql Error executing ${sqlText} with parms ${parms.toString()}`,
        e instanceof Error ? e.stack : e,
        context,
      );
      throw new Error('Sql findAll error');
    }
  }

  async findOneById(sqlText: string, id: number): Promise<mysql.QueryResult> {
    const context = getMethodName(new Error('fake'));
    try {
      this.logger.debug(`Executing sql ${sqlText} with id ${id}`, context);
      const [result] = await this.pool.query(sqlText, [id]);
      return result;
    } catch (e) {
      this.logger.error(
        `Sql error executing ${sqlText} with id ${id}`,
        e instanceof Error ? e.stack : e,
        context,
      );
      throw new Error('Sql findOne error');
    }
  }

  async insertOne(
    sqlText: string,
    parms: (string | number)[],
  ): Promise<mysql.QueryResult> {
    const context = getMethodName(new Error('fake'));
    try {
      this.logger.debug(
        `Executing sql ${sqlText} with params ${parms.toString()}`,
        context,
      );
      const [results] = await this.pool.query(sqlText, parms);
      return results;
    } catch (e) {
      this.logger.error(
        `Sql error executing ${sqlText} with params ${parms.toString()}`,
        e instanceof Error ? e.stack : e,
        context,
      );
      throw new Error('Sql insertOne error');
    }
  }

  async insertOneAndReturn(
    insertSqlText: string,
    selectSqlText: string,
    parms: (string | number)[],
  ): Promise<mysql.QueryResult> {
    const context = getMethodName(new Error('fake'));
    try {
      this.logger.debug(
        `Executing sql ${insertSqlText} with params ${parms.toString()}`,
        context,
      );
      let [results] = await this.pool.query(insertSqlText, parms);
      const insertedId = (<DbModifyResult>results).insertId;

      this.logger.debug(`Executing sql ${selectSqlText} with id ${insertedId}`);
      results = await this.findOneById(selectSqlText, insertedId);

      return results;
    } catch (e) {
      this.logger.error(
        `Sql error executing ${insertSqlText} with params ${parms.toString()}`,
        e instanceof Error ? e.stack : e,
        context,
      );
      throw new Error('Sql insertOneAndReturn error');
    }
  }

  async updateOne(
    sqlText: string,
    parms: (string | number)[],
  ): Promise<boolean> {
    const context = getMethodName(new Error('fake'));
    try {
      this.logger.debug(
        `Executing sql ${sqlText} with parms ${parms.toString()}`,
        context,
      );
      const results = <DbModifyResult>(
        (<unknown>await this.pool.query(sqlText, parms))
      );
      return results.affectedRows > 0;
    } catch (e) {
      this.logger.error(
        `Sql error executing ${sqlText} with parms ${parms.toString()}`,
        e instanceof Error ? e.stack : e,
        context,
      );
      throw new Error('Sql updateOne Error');
    }
  }

  async deleteOne(
    sqlText: string,
    parms: (string | number)[],
  ): Promise<boolean> {
    const context = getMethodName(new Error('fake'));
    try {
      this.logger.debug(
        `Executing sql ${sqlText} with parms ${parms.toString()}`,
      );
      const results = <DbModifyResult>(
        (<unknown>await this.pool.query(sqlText, parms))
      );
      return results.affectedRows > 1;
    } catch (e) {
      this.logger.error(
        `Sql error executing ${sqlText} with parms ${parms.toString()}`,
        e instanceof Error ? e.stack : e,
        context,
      );
      throw new Error('Sql deleteOne Error');
    }
  }
}
