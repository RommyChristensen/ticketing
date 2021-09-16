import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const signup = (id?: string) => {
    // const email = 'test@test.com';
    // const password = 'password';

    // const response = await request(app)
    //     .post('/api/users/signup')
    //     .send({
    //         email, password
    //     })
    //     .expect(201);
    // const cookie = response.get('Set-Cookie');
    // return cookie;
    
    // Build a JWT payload. { id, email }
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    };

    // Create the JWT!
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build session Object. { jwt : MY_JWT }
    const session = { jwt: token };

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats the cookie with the encoded data
    return [`express:sess=${base64}`];
} 

export { signup }