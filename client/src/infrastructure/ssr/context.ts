import { GetServerSidePropsContext } from "next";
import { IRequest } from "shared/interfaces/controllers/types";

export function convertGetServerSidePropsContextToRequest({
  params,
  req,
  query,
}: GetServerSidePropsContext): IRequest {
  return {
    body: {},
    headers: req.headers,
    params,
    query,
  };
}
