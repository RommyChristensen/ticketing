import { Subjects, Publisher, ExpirationCompleteEvent } from '@rcticket/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}