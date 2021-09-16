import { randomBytes } from 'crypto';
import nats from 'node-nats-streaming';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    });

    new TicketCreatedListener(stan).listen();

    // run process manual
    // const options = stan
    //     .subscriptionOptions()
    //     .setManualAckMode(true)
    //     .setDeliverAllAvailable() // send all service events in the past
    //     .setDurableName('accounting-service'); // marked all events that has been processed so that when services restart that events do not get emited again

    // create subscription
    // const subscription = stan.subscribe('ticket:created', 'queue-group-name', options);

    // subscription.on('message', (msg: Message) => {
    //     // console.log('Message received');

    //     const data = msg.getData();

    //     if(typeof data === 'string'){
    //         console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    //     }

    //     // acknowledge to tell the node nats streaming that we have received the message
    //     msg.ack();
    // });
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
