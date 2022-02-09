export type IRequest = {
  body: { [key: string]: unknown };
  params: { [key: string]: unknown } | undefined;
  headers: { [key: string]: string | string[] | undefined };
  query: { [key: string]: unknown };
};

export type IResponse<T = { [key: string]: unknown } | unknown[]> = {
  body: T | { message: string };
  status: number;
};
