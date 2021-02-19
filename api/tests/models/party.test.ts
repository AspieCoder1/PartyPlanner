import { Party, IParty } from '../../src/models/party';
import '../../src/db/mongoose';
import { ObjectId } from 'mongodb';

afterEach(async () => {
  await Party.remove({});
});

describe('Party model tests', () => {
  it('Should correctly add a party to the db', async () => {
    const newParty = {
      _id: new ObjectId(),
      organiser: 'test user',
      description: 'This is a test party',
      location: 'This is a test location',
      date: '2021-04-04',
      ageRate: false,
    };

    const party: IParty = new Party(newParty);
    const savedParty = await party.save();
    expect(party).toEqual(savedParty);
    const foundParty = await Party.findById(newParty._id);
    expect(foundParty).toBeTruthy();
  });

  it('Should throw error if organiser is not provided', async () => {
    const newParty = {
      description: 'This is a test party',
      location: 'This is a test location',
      date: '2021-04-04',
      ageRate: false,
    };
    let error;

    try {
      const party: IParty = new Party(newParty);
      await party.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    expect(error.errors.description.properties.message).toBe('description is required');
  });

  it('Should throw error if location is not provided', async () => {
    const newParty = {
      organiser: 'test user',
      description: 'This is a test party',
      date: '2021-04-04',
      ageRate: false,
    };
    let error;

    try {
      const party: IParty = new Party(newParty);
      await party.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    expect(error.errors.location.properties.message).toBe(
      'location is required'
    );
  });

  it('Should throw error if date is not provided', async () => {
    const newParty = {
      organiser: 'test user',
      description: 'This is a test party',
      location: 'This is a test location',
      ageRate: false,
    };
    let error;

    try {
      const party: IParty = new Party(newParty);
      await party.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    expect(error.errors.date.properties.message).toBe(
      'date is required'
    );
  });

  it('Should throw error if date is invalid provided', async () => {
    const newParty = {
      organiser: 'test user',
      description: 'This is a test party',
      location: 'This is a test location',
      date: 'next week',
      ageRate: false,
    };
    let error;

    try {
      const party: IParty = new Party(newParty);
      await party.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    expect(error.errors.date.properties.message).toBe('date is invalid');
  });

  it('should throw error if description is empty string', async () => {
    const newParty = {
      organiser: 'test user',
      description: '',
      location: 'This is a test location',
      date: '2021-04-04',
      ageRate: false,
    };
    let error;

    try {
      const party: IParty = new Party(newParty);
      await party.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    expect(error.errors.description.properties.message).toBe('description is required');
  });

  it('should raise error if description is less than 7 characters', async () => {
    const newParty = {
      organiser: 'test user',
      description: 'party',
      location: 'This is a test location',
      date: '2021-04-04',
      ageRate: false,
    };

    let error;

    try {
      const party: IParty = new Party(newParty);
      await party.validate();
    } catch (e) {
      error = e;
    }

    expect(error.errors.description.message).toEqual(
      'description must have length of at least 7'
    );
  });

  it('Should save user for DB if attendees Ids are set', async () => {
    const newParty = {
      _id: new ObjectId(),
      organiser: 'test user',
      description: 'This is a test party',
      location: 'This is a test location',
      date: '2021-04-04',
      ageRate: false,
      attendeesID: [new ObjectId(), new ObjectId(), new ObjectId(),],
    };

    const party: IParty = new Party(newParty);
    const savedParty = await party.save();
    expect(party).toEqual(savedParty);

    const foundParty = await Party.findById(newParty._id).lean();
    expect(foundParty).toBeTruthy();
    expect(foundParty.attendeesID).toBe(newParty.attendeesID);
  });

  it('Should save user for DB if todo list is set', async () => {
    const newParty = {
      _id: new ObjectId(),
      organiser: 'test user',
      description: 'This is a test party',
      location: 'This is a test location',
      date: '2021-04-04',
      ageRate: false,
      todoID: 'todo1',
    };

    const party: IParty = new Party(newParty);
    const savedParty = await party.save();
    expect(party).toEqual(savedParty);

    const foundParty = await Party.findById(newParty._id);
    expect(foundParty).toBeTruthy();
    expect(foundParty.todoID).toBe(
      newParty.todoID
    );
  });

});
