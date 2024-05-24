import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 10;
export const USERNAME_MIN_LENGTH = 5;
export const PASSWORD_REGEX = new RegExp(/^(?=.*?[0-9]).{10,}$/);
export const PASSWORD_REGEX_ERROR =
  "Password should contain at least one number (01234567890).";

export const EMAIL_ERROR = "Only @zod.com email is allowed";
export const EMAIL_REQUIRED_ERROR = "Email is required";
export const USERNAME_REQUIRED_ERROR = "Username is required";
export const PASSWORD_REQUIRED_ERROR = "Password is required";
export const PASSWORD_MIN_ERROR = `Password should be at least ${PASSWORD_MIN_LENGTH} characters long`;

export const USERNAME_MIN_ERROR = `Username should be at least ${USERNAME_MIN_LENGTH} characters long`;