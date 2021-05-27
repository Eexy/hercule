interface Todo {
  completed: boolean;
  desc: string;
  project: string;
  id: string;
}

interface TodosResponse {
  data: {
    ok: boolean;
    todos: Todo[];
    err?: string;
  };
}

interface TodoResponse {
  data: {
    ok: boolean;
    todo: Todo;
    err?: string;
  };
}
