import request from 'supertest';
import { app } from '../../app';
import { signup } from '../../test/auth-helper';
import mongoose from 'mongoose';
import { Order } from '../../models/order';
import { OrderStatus } from '@rcticket/common';

it('returns a 404 when purchasing an order that does not exists', async () => {
    await request(app)
        .post('/api/payments')
        .set('Cookie', await signup())
        .send({
            token: 'abcdef',
            orderId: mongoose.Types.ObjectId().toHexString()
        })
        .expect(404);
});

it('returns a 401 when purchasing an order that doesnt belong to the user', async () => {
    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        userId: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        price: 20,
        status: OrderStatus.Created
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', await signup())
        .send({
            token: 'abcdef',
            orderId: order.id
        })
        .expect(401);
});

it('returns a 400 when purchasing a cancelled order', async () => {
    const userId = mongoose.Types.ObjectId().toHexString();

    const order = Order.build({
        id: mongoose.Types.ObjectId().toHexString(),
        userId: userId,
        version: 0,
        price: 20,
        status: OrderStatus.Cancelled
    });
    await order.save();

    await request(app)
        .post('/api/payments')
        .set('Cookie', await signup(userId))
        .send({
            orderId: order.id,
            token: 'abcde',
        })
        .expect(400);
});