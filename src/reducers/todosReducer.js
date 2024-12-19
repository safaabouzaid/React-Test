import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const updatedTodos = [
        ...currentTodos,
        {
          id: uuidv4(),
          todoTitle: action.payload.title,
          todoBody: action.payload.todoBody,
          isCompleted: false,
        },
      ];

      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      //الجديد  input لانو نفسا القديمة بدي اعمل منا نسخة بس  بدي غير
      return updatedTodos;
    }
    case "deleted": {
      localStorage.setItem(
        "todos",
        JSON.stringify(
          currentTodos.filter((t) => {
            return t.id !== action.payload.id;
          })
        )
      );
      return currentTodos.filter((t) => {
        return t.id !== action.payload.id;
      });
    }
    case "updated": {
      const updatedtodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            todoTitle: action.payload.todoTitle,
            todoBody: action.payload.todoBody,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedtodos));

      return updatedtodos;
    }
    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }
    case "togglecompleted": {
      const updatedtodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          const updatedtodo = { ...t, isCompleted: !t.isCompleted };
          //  t.isCompleted = !t.isCompleted;//mutation
          return updatedtodo;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedtodos));

      return updatedtodos;
    }

    default: {
      throw Error("UnKnow Action " + action.type);
    }
  }

  return [];
}
