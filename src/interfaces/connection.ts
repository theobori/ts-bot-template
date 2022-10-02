import {
  Collection,
  Db,
  Document,
  MongoClient
} from 'mongodb';

export default interface IConnection {
  client: MongoClient,
  db: Db,
  collections: Record<string, Collection<Document>>
}
