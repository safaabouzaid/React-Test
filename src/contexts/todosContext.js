import { createContext, useReducer, useContext } from "react";
import todosReducer from "../reducers/todosReducer";
///كلوapp  على مستوى  الdispatch and todos الهدف انو وفر ال
export const TodosContext = createContext([]);
export const DispatchContext = createContext(null);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  return (
    <TodosContext.Provider value={{ todos }}>
      <DispatchContext.Provider value={{ dispatch }}>
        {children}
      </DispatchContext.Provider>
    </TodosContext.Provider>
  );
};
export default TodosProvider;
export const useTodos = () => {
  return useContext(TodosContext);
};
export const useTodosDispatch = () => {
    return useContext(DispatchContext);
  };
//export const TodosContext=createContext([])
