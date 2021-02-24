import validator from 'validator';

interface registerObject {
  email: string;
  password: string;
  username: string;
}

interface loginObject {
  email: string;
  password: string;
}

interface Ierrors {
  email?: string;
  password?: string;
  username?: string;
}

export const validateUserRegister = (newUser: registerObject): Ierrors => {
  let errors: Ierrors = {};
  if (!validator.isEmail(newUser.email)) {
    errors.email = 'invalid email';
  }

  if (!validator.isAlphanumeric(newUser.username)) {
    errors.username = 'username can only contain letters and numbers';
  }

  if (newUser.password.length < 8) {
    errors.password = 'password must be at least 8 characters long';
  }

  if (validator.isEmpty(newUser.username)) {
    errors.username = 'username is required';
  }

  if (validator.isEmpty(newUser.email)) {
    errors.email = 'email is required';
  }

  if (validator.isEmpty(newUser.password)) {
    errors.password = 'password is required';
  }

  return errors;
};

export const validateLogin = (loginUser: loginObject) => {
  let errors: Ierrors = {};

  if (!validator.isEmail(loginUser.email)) {
    errors.email = 'invalid email'
  }

  if (validator.isEmpty(loginUser.password)) {
    errors.password = 'password is required'
  }

  if (validator.isEmpty(loginUser.email)) {
    errors.email = 'email is required'
  }

  return errors;
}
