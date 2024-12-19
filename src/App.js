import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue } from "@mui/material/colors";
import Todolist from "./todolist";
import { TodosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { ToastProvider } from "./contexts/ToastContext";

import TodosProvider from "./contexts/todosContext";
const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: "#9A0036",
    },
  },
  typography: {
    fontFamily: ["Alexandria"],
  },
});

function App() {
  const initialtodos = [
    {
      id: uuidv4(),
      todoTitle: "المهمة1",
      todoBody: "انهاء كورس رياكت ",
      isCompleted: false,
    },

    {
      id: uuidv4(),
      todoTitle: "المهمة2",
      todoBody: "مساعدة ماما",
      isCompleted: false,
    },

    {
      id: uuidv4(),
      todoTitle: "المهمة 3",
      todoBody: "قراءة قرآن ",
      isCompleted: false,
    },
  ];

  const [todos, settodos] = useState(initialtodos); //لانو مانها ثابتة المصفوفة

  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <ToastProvider>
          <div className="App" style={{ direction: "rtl" }}></div>
          <Todolist />
        </ToastProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
