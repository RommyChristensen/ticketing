import { Subjects } from "./subjects";

export interface TicketCreatedEvent {
    subject: Subjects.TicketCreated; // set subject to be TicketCreated
    data: {
        id: string,
        title: string,
        price: number
    }; 
}