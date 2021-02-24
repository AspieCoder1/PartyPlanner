import validator from 'validator';

interface registerObject {
  email: string;
  password: string;
  username: string;
}

interface Ierrors {
  email?: string;
  password?: string;
  username?: string;
}

const validateUserRegister = (newUser: registerObject): Ierrors => {
  let errors: Ierrors = {};
  if (!validator.isEmail(newUser.email)) {
    errors.email = 'invalid e-mail';
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

export default validateUserRegister;
