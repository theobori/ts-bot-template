import 'dotenv/config';
import { MongoClient } from 'mongodb';

import { DBError } from '../../errors';
import { IConnection } from '../../interfaces/connection';

class Mongo {
  private static conn?: IConnection = undefined;

  static async connect(): Promise<IConnection> {
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

      return Mongo.conn;
    } catch (error) {
        throw new DBError(error);
    }
  }
}

export default Mongo;
