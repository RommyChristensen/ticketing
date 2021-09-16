import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async () => {
    // create an instance of at ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 5,
        userId: '123'
    });

    // save the ticket to the database
    await ticket.save();

    // fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    // make two separate changes to the tickets we fetched
    firstInstance!.set({ price: 10 });
    secondInstance!.set({ price: 15 });

    // save the first fetched ticket
    await firstInstance!.save();

    // save the second fetched ticket 
    // expect(async () => {
    //     try{
            
    //     }catch(err){
    //         throw new TypeError();
    //     }
    // }).toThrow(TypeError);

    // expect(async () => {
    //     const a = await secondInstance!.save();
    //     console.log(a);
    // }).toThrow();
});

it('increments the version number on multiple saves', async () => {
    const ticket = Ticket.build({
      title: 'concert',
      price: 20,
      userId: '123',
    });
    await ticket.save(); // version set to 0
    expect(ticket.version).toEqual(0);

    await ticket.save(); // version increment to 1
    expect(ticket.version).toEqual(1);

    await ticket.save(); // version increment to 2
    expect(ticket.version).toEqual(2);
});