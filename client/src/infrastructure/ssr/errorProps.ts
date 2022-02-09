import { isErrorResponse } from "shared/interfaces/controllers/ErrorHandler";
import { IResponse } from "shared/interfaces/controllers/types";

export interface ErrorProps {
  error: {
    message: string;
    status: number;
  };
}

export function buildErrorProps(res: IResponse): ErrorProps {
  if (isErrorResponse(res)) {
    return {
      error: {
        message: res.body.message,
        status: res.status === 200 ? 500 : res.status,
      },
    };
  }

  return {
    error: {
      message: "An unexpected error occurred",
      status: 500,
    },
  };
}

export function isErrorProps(props: any): props is ErrorProps {
  return (
    typeof props?.error?.message === "string" &&
    typeof props?.error?.status === "number"
  );
}
