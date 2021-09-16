import { Publisher, Subjects, TicketUpdatedEvent } from '@rcticket/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}