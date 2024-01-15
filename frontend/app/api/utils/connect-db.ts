import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const mongoURI = process.env.NEXT_PUBLIC_MONGO_URI || ''; 
const client = new MongoClient(mongoURI);

async function database(req, res, next) {
    req.dbClient = client;
    req.db = client.db('MCT');
    return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;