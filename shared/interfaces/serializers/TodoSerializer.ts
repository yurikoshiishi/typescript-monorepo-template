import { ISerializer } from "shared/application/serializers/ISerializer";
import { Todo } from "shared/domain/Todo";
import { deserialize, serialize } from "shared/lib/serializer";

export type SerializedTodo = Omit<Todo, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

type DeserializedTodo = Omit<SerializedTodo, "createdAt" | "updatedAt"> & {
  createdAt: Date;
  updatedAt: Date;
};

export class TodoSerializer implements ISerializer<SerializedTodo, Todo> {
  serializeOne(data: any) {
    if (!data) {
      throw new Error("data is not defined");
    }

    return serializeTodo(data);
  }

  serializeMany(data: any[]) {
    if (!Array.isArray(data)) {
      throw new Error("data is not Array");
    }

    return data.map(this.serializeOne);
  }

  deserializeOne(data: any) {
    if (!data) {
      throw new Error("data is not defined");
    }
    return deserializeTodo(data);
  }

  deserializeMany(data: any) {
    if (!Array.isArray(data)) {
      throw new Error("data is not Array");
    }

    return data.map(this.deserializeOne);
  }
}

export const todoSerializer = new TodoSerializer();

function serializeTodo(data: any): SerializedTodo {
  return serialize({
    content: data.content,
    createdAt: data.createdAt,
    id: data.id,
    updatedAt: data.updatedAt,
  });
}

function deserializeTodo(data: SerializedTodo): Todo {
  const deserialized = deserialize<DeserializedTodo>(data);
  return new Todo(deserialized);
}
