import IndexTemplate from "client/src/components/pages/index/IndexTemplate";
import { convertGetServerSidePropsContextToRequest } from "client/src/infrastructure/ssr/context";
import { buildErrorProps } from "client/src/infrastructure/ssr/errorProps";
import { RootController } from "client/src/interfaces/controllers/RootController";
import { guardRootIndexResponseBody } from "client/src/interfaces/controllers/RootController/response";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { prisma } from "shared/infrastructure/db/prisma";
import { todoSerializer } from "shared/interfaces/serializers/TodoSerializer";

export default function IndexPage({
  todos,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <IndexTemplate todos={todoSerializer.deserializeMany(todos)} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const controller = new RootController(prisma);

  // make sure this does not throw error in the controller implementation
  const res = await controller.index(
    convertGetServerSidePropsContextToRequest(ctx)
  );

  // check response, and return error props if failed
  if (!guardRootIndexResponseBody(res.body)) {
    return { props: buildErrorProps(res) };
  }

  return {
    props: {
      todos: res.body.todos,
    },
  };
};
