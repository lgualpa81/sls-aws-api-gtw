import { ValidationError } from "yup";

export const customException = (e: any) => {
  let statusCode = 500;
  let message: string | string[] = (e as Error).message;
  if (e instanceof ValidationError) {
    const error = e as ValidationError;
    message = error.errors;
    statusCode = 422;
  }
  return {
    statusCode,
    body: JSON.stringify({
      error: message,
    }),
  };
};
