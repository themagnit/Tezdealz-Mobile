
import { messages } from '../../constants/formConstant';
import {
  isEmailValid,
  isNameValid,
  isPasswordValid,
  isPhoneValid
} from '../regex';

export const validateEmail = (fieldValue: string) => {
  return fieldValue.trim() === ''
    ? messages.isRequired
    : isEmailValid(fieldValue)
    ? ''
    : messages.notValid;
};

export const validatePhone = (fieldValue: string) => {
  return fieldValue.trim() === ''
    ? messages.isRequired
    : isPhoneValid(fieldValue)
    ? ''
    : messages.notValid;
};
export const validateName = (fieldValue: string) => {
  return fieldValue.trim() === ''
    ? messages.isRequired
    : isNameValid(fieldValue)
    ? ''
    : messages.notValid;
};

export const userNameValidator = (userName: string) => {
  if (!userName || userName.length <= 4)  return "Username must be 5 characters long.";
  return "";
};

export const validatePassword = (fieldValue: string) => {
  return fieldValue.trim() === ''
    ? messages.isRequired
    : isPasswordValid(fieldValue)
    ? ''
    : messages.password;
};

export const validateConfirmPassword = (
  fieldValue: string,
  password: string
) => {
  return fieldValue.trim() === ''
    ? messages.isRequired
    : fieldValue === password
    ? ''
    : messages.notMatch;
};

export const validateData = (fieldValue: string) => {
  if (fieldValue.trim() === '') {
    return messages.isRequired;
  } else {
    return '';
  }
};


