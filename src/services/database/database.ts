import 'dotenv/config';
import { MongoClient, Collection, Document } from 'mongodb';

import { DBError } from '../../errors';
import { IConnection } from '../../interfaces/connection';

import { Logs } from "../../services/logs";

class Mongo {
  private static conn?: IConnection = undefined;

  static createConnection(): IConnection {
    if (Mongo.conn) {
      return Mongo.conn;
    }

    try {
      const client = new MongoClient(process.env.MONGO);
      const db = client.db(process.env.DATABASE);
      const collections = {
        'invite': db.collection('invite')
      };

      Mongo.conn = { client, db, collections };

      Logs.info("[+] Connection to the database created");

      return Mongo.conn;
    } catch (error) {
        throw new DBError(error);
    }
  }

  static closeConnection() {
    this.conn.client.close();
  }

  static get collections(): Record<string, Collection<Document>> {
    return this.conn.collections;
  }
}

export default Mongo;
