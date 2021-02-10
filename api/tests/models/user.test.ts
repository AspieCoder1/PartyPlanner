import { User, IUser } from '../../src/models/user';
import '../../src/db/mongoose';

afterEach(async () => {
  await User.remove({});
});

describe('User model tests', () => {
  it('Should correctly add a user to the db', async () => {
    const newUser = {
      email: 'test@example.com',
      password: '24355365644faf',
      username: 'test',
    };

    const user: IUser = new User(newUser);
    const savedUser = await user.save();
    expect(user).toEqual(savedUser);
  });

  it('Should throw error if email not provided', async () => {
    const newUser = {
      password: '24355365644faf',
      username: 'test',
    };
    let error;

    try {
      const user: IUser = new User(newUser);
      await user.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    expect(error.errors.email.properties.message).toBe('e-mail is required');
  });

  it('Should throw error if password not provided', async () => {
    const newUser = {
      email: 'test@example.com',
      username: 'test',
    };
    let error;

    try {
      const user: IUser = new User(newUser);
      await user.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    expect(error.errors.password.properties.message).toBe(
      'password is required'
    );
  });

  it('Should throw error if username not provided', async () => {
    const newUser = {
      email: 'test@example.com',
      password: '24355365644faf',
    };
    let error;

    try {
      const user: IUser = new User(newUser);
      await user.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    expect(error.errors.username.properties.message).toBe(
      'username is required'
    );
  });

  it('Should throw error if email is invalid provided', async () => {
    const newUser = {
      email: 'test',
      password: '24355365644faf',
      username: 'test',
    };
    let error;

    try {
      const user: IUser = new User(newUser);
      await user.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    expect(error.errors.email.properties.message).toBe('email is invalid');
  });

  it('should throw error if email is empty string', async () => {
    const newUser = {
      email: '',
      password: '24355365644faf',
      username: 'test',
    };
    let error;

    try {
      const user: IUser = new User(newUser);
      await user.validate();
    } catch (e) {
      error = e;
    }
    expect(error).not.toBeNull();
    expect(error.errors.email.properties.message).toBe('e-mail is required');
  });

  it('should raise error if password less than 7 characters', async () => {
    const newUser = {
      email: 'test@example.com',
      password: '243a',
      username: 'test',
    };

    let error;

    try {
      const user: IUser = new User(newUser);
      await user.validate();
    } catch (e) {
      error = e;
    }

    expect(error.errors.password.message).toEqual(
      'password must have length of 7'
    );
  });
});
