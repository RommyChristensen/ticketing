import { Publisher, OrderCreatedEvent, Subjects } from "@rcticket/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}