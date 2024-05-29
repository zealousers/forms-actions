import { z } from "zod";

export const PASSWORD_MIN_LENGTH = 10;
export const USERNAME_MIN_LENGTH = 5;
export const PASSWORD_REGEX = new RegExp(/^(?=.*?[0-9]).{10,}$/);
// export const PASSWORD_REGEX = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/);
export const PASSWORD_REGEX_ERROR =
  "Password should contain at least one number (01234567890).";

export const EMAIL_ERROR = "Only @zod.com email is allowed";
export const EMAIL_REQUIRED_ERROR = "Email is required";
export const EMAIL_UNIQUE_ERROR = "Email already exists!";
export const EMAIL_NOT_FOUND_ERROR = "An account with this email does not exist!";
export const USERNAME_REQUIRED_ERROR = "Username is required";
export const USERNAME_UNIQUE_ERROR = "Username already exists!";
export const PASSWORD_REQUIRED_ERROR = "Password is required";
export const PASSWORD_MIN_ERROR = `Password should be at least ${PASSWORD_MIN_LENGTH} characters long`;
export const PASSWORD_CONFORM_ERROR = `Both passwords should be the same!`;

export const USERNAME_MIN_ERROR = `Username should be at least ${USERNAME_MIN_LENGTH} characters long`;