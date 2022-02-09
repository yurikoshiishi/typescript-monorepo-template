interface ITodo {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
}

export class Todo implements ITodo {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;

  constructor(todo: ITodo) {
    this.id = todo.id;
    this.createdAt = todo.createdAt;
    this.updatedAt = todo.updatedAt;
    this.content = todo.content;
  }

  formatCreatedAt(): string {
    return this.createdAt.toISOString();
  }
}
