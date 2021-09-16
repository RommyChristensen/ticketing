import Queue from 'bull';
import { ExpirationCompletePublisher } from '../events/publishers/expiration-complete-publisher';
import { natsWrapper } from '../nats-wrapper';

interface Payload {
    orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
    redis: {
        host: process.env.REDIS_HOST
    }
});

// function yang dijalankan ketika job diproses
expirationQueue.process(async (job) => {
    // console.log('I want to publish an expiration:completed event for orderId', job.data.orderId);
    new ExpirationCompletePublisher(natsWrapper.client).publish({
        orderId: job.data.orderId
    });
});

export { expirationQueue };