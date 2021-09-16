import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

// declare global {
//     namespace NodeJS {
//         interface Global {
//             signin(): Promise<string[]>;
//         }
//     }
// }

jest.mock('../nats-wrapper');

let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'asdfasdf';

    mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }); 
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});