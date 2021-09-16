import request from 'supertest';
import { getJSDocReturnType } from 'typescript';
import { app } from '../../app';
import { signup } from '../../test/auth-helper';

const createTicket = async () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', await signup())
        .send({
            title: 'new title',
            price: 20
        });
}

it('can fetch a list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app)
        .get('/api/tickets')
        .send()
        .expect(200);

    expect(response.body.length).toEqual(3);
});