import validateUserRegister from '../../src/validation/register';

describe('Register user request body validation', () => {
  it('Should return empty object if everything valid', () => {
    const expectedErrors = {};

    const mockUser = {
      email: 'test@test.com',
      username: 'test',
      password: 'abcdefghht',
    };
    const errors = validateUserRegister(mockUser);
    expect(errors).toEqual(expectedErrors);
  });

  it('Should return error if email is invalid', () => {
    const expectedErrors = {
      email: 'invalid email',
    };

    const mockUser = {
      email: 'test',
      username: 'test',
      password: 'abcdefghht',
    };
    const errors = validateUserRegister(mockUser);
    expect(errors).toEqual(expectedErrors);
  });

  it('Should return error if username is not alphanumeric', () => {
    const expectedErrors = {
      username: 'username can only contain letters and numbers',
    };

    const mockUser = {
      email: 'test@test.com',
      username: 'test@',
      password: 'abcdefghht',
    };
    const errors = validateUserRegister(mockUser);
    expect(errors).toEqual(expectedErrors);
  });

  it('Should return error if password less than seven character', () => {
    const expectedErrors = {
      password: 'password must be at least 8 characters long',
    };

    const mockUser = {
      email: 'test@test.com',
      username: 'test',
      password: 'abc',
    };
    const errors = validateUserRegister(mockUser);
    expect(errors).toEqual(expectedErrors);
  });

  it('Should return error if email, password or username is empty', () => {
    const expectedErrors = {
      password: 'password is required',
      username: 'username is required',
      email: 'email is required',
    };

    const mockUser = {
      email: '',
      username: '',
      password: '',
    };
    const errors = validateUserRegister(mockUser);
    expect(errors).toEqual(expectedErrors);
  });
});
