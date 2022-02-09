import { IResponse } from "shared/interfaces/controllers/types";

export class InvalidInputError extends Error {}

export class NotFoundError extends Error {}

export type ErrorResponse = IResponse<{ message: string }>;

export class ErrorHandler {
  buildError(error: unknown): ErrorResponse {
    if (error instanceof InvalidInputError) {
      return errorResponse(error, 400);
    } else if (error instanceof NotFoundError) {
      return errorResponse(error, 404);
    } else {
      return errorResponse(new Error("An unexpected error occurred"), 500);
    }
  }
}

export const errorHandler = new ErrorHandler();

export function isErrorResponse(
  response: IResponse
): response is ErrorResponse {
  return response.status !== 200 || "message" in response.body;
}

function errorResponse(error: Error, status: number): ErrorResponse {
  return {
    body: { message: error.message },
    status,
  };
}
