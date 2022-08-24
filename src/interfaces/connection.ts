import {
  Collection,
  Db,
  Document,
  MongoClient
} from 'mongodb';

interface IConnection {
  client: MongoClient,
  db: Db,
  collections: Record<string, Collection<Document>>
}

export { IConnection };
