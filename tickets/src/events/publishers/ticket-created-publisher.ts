import { Publisher, Subjects, TicketCreatedEvent } from '@rcticket/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}