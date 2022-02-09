import IndexPresenter from "client/src/components/pages/index/IndexPresenter";
import { useIndexPresenter } from "client/src/components/pages/index/useIndexPresenter";
import React, { VFC } from "react";
import { Todo } from "shared/domain/Todo";

interface IndexTemplateProps {
  todos: Todo[];
}

// get initial props and pass that to container
const IndexTemplate: VFC<IndexTemplateProps> = ({ todos }) => {
  const indexPresenterProps = useIndexPresenter({ todos });
  return <IndexPresenter {...indexPresenterProps} />;
};

export default IndexTemplate;
