import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown, defaultErrorMessage: string) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.response?.data?.error_message || defaultErrorMessage;
  }

  if (error instanceof Error) {
    return error.message || defaultErrorMessage;
  }

  return defaultErrorMessage;
};
