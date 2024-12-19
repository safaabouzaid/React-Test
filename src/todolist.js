import "./App.css";
import ActionAreaCard from "./Card";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useTodos, useTodosDispatch } from "./contexts/todosContext";
import { useState, useEffect, useMemo, useReducer } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useToast } from "./contexts/ToastContext";
function Todolist() {
  ///////////reducer////////////
  //const {todos,dispatch} = useContext(TodosContext);
  const { todos } = useTodos();
  const { dispatch } = useTodosDispatch();
  console.log("the context is ");
  //////////////////////
  ///  const toast=useContext(ToastContext)

  ///Todoscontext استخرجلي الاشياء الموجود بال
  // const value = useContext(TodosContext);
  ////او ممكن نعمل ديسكتركتشرز
  const { showHideToast } = useToast();

  const [alignment, setAlignment] = useState("all");
  const [open, setOpen] = useState(false);
  const [dialogeTodo, setdialogeTodo] = useState("");
  ///////////////////////////////////////////////////////////////

  const handleClose = () => {
    setOpen(false);
  };

  function showDeleteDialoge(todo) {
    setdialogeTodo(todo);
    setOpen(true);
  }

  function handelDeleteClick() {
    dispatch({ type: "deleted", payload: dialogeTodo });

    setOpen(false); // إغلاق

    showHideToast("تم الحذف بنجاح ");
  }

  ///////////////////////////////////////////////////////////////
  const [openedit, setOpenedit] = useState(false);

  function showEditDialoge(todo) {
    setdialogeTodo(todo);
    setOpenedit(true);
  }

  const handleCloseedit = () => {
    setOpenedit(false);
  };
  function handleEdit() {
    dispatch({ type: "updated", payload: dialogeTodo });
    setOpenedit(false);
    showHideToast("تم التحديث بنجاح ");
  }
  //////=============================filteration arrays=================//////////////////

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const completedToes = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling completed todos");
      return t.isCompleted;
    });
  }, [todos]); ////الtodoمارح يتم تغييره الا في حال تغيير

  const notcompletedToes = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling notcompleted todos");

      return !t.isCompleted;
    });
  }, [todos]);

  //////=============================filteration arrays=================//////////////////

  const [todoInputValue, settodoInputValue] = useState("");
  //// هاد الجزء عم يتعمل مع sideeffect لهيك اخدتو وحطيتو ب useeffect
  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  function handelAddClick() {
    dispatch({ type: "added", payload: { newtitle: todoInputValue } });

    settodoInputValue(""); // ;كرمال يحذفلي النص بعض اضافتو للقائمة
    showHideToast("تمت الإضافة بنجاح ");
  }

  let todosTobeRender = todos;
  if (alignment === "notcompleted") {
    todosTobeRender = notcompletedToes;
  } else if (alignment === "completed") {
    todosTobeRender = completedToes;
  }
  const todoList = todosTobeRender.map((todo) => {
    return (
      <ActionAreaCard
        key={todo.id}
        todo={todo}
        showDeleteDialog={showDeleteDialoge}
        showEditDialoge={showEditDialoge}
      />
    );
  });
  return (
    <div style={{ direction: "rtl" }}>
      <Dialog
        color="secondary"
        open={openedit}
        onClose={handleCloseedit}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleCloseedit();
          },
        }}
      >
        <DialogTitle style={{ direction: "rtl" }}>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            value={dialogeTodo.todoTitle}
            onChange={(e) => {
              setdialogeTodo({ ...dialogeTodo, todoTitle: e.target.value });
            }}
            color="secondary"
            autoFocus
            required
            margin="dense"
            label={"العنوان"}
            type="text"
            fullWidth
            variant="standard"
            style={{ direction: "rtl" }}
          />
          <TextField
            value={dialogeTodo.todoBody}
            onChange={(e) => {
              setdialogeTodo({ ...dialogeTodo, todoBody: e.target.value });
            }}
            color="secondary"
            autoFocus
            required
            margin="dense"
            label="التفاصيل"
            type="text"
            fullWidth
            variant="standard"
            style={{ direction: "rtl" }}
          />
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "flex-start",
            marginTop: "10px", // إضافة مسافة علوية
          }}
        >
          <Button type="submit" color="secondary" onClick={handleEdit}>
            تعديل
          </Button>
          <Button onClick={handleCloseedit} color="secondary">
            إلغاء
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        color="secondary"
        style={{ direction: "rtl" }}
        onClose={handleClose}
        open={open}
        aria-labelledby="alert-dialoge-title"
        aria-describedby="alert-dialoge-description"
      >
        <DialogTitle id="alert-dialoge-title">
          هل انت متأكد من رغبتك في حذف المهمة ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            لا يمككنك التراجع عن الحذف بعد اتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            إغلاق
          </Button>
          <Button color="secondary" outfocus="true" onClick={handelDeleteClick}>
            نعم قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      <Container
        style={{ maxHeight: "80vh", overflow: "scroll" }}
        sx={{
          maxWidth: "500px",
          margin: "auto",
          width: "600px",
          marginTop: "50px",
          direction: "column",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          <h1
            variant="h1"
            style={{
              borderBottom: "1px solid lightgray",
              width: "400px",
              textAlign: "center",
            }}
          >
            مهامي
          </h1>
        </Stack>
        <Stack>
          <ToggleButtonGroup
            style={{
              direction: "ltr",
              paddingTop: "20px",
              alignContent: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            color="secondary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="notcompleted">غير منجز </ToggleButton>
            <ToggleButton value="completed">منجز </ToggleButton>

            <ToggleButton value="all">الكل </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        {todoList}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ marginTop: "20px", textAlign: "right" }}
        >
          <TextField
            value={todoInputValue}
            onChange={(event) => {
              settodoInputValue(event.target.value);
            }}
            style={{ width: "360px", height: "50px" }}
            id="outlined-basic"
            label="عنوان المهمة "
            variant="outlined"
            color="secondary"
          />
          <Button
            disabled={todoInputValue.length === 0}
            onClick={() => {
              handelAddClick();
            }}
            variant="contained"
            style={{
              width: "150px ",
              height: "55px",
              background: "#9A0036",
              color: "white",
            }}
          >
            إضافة
          </Button>
        </Stack>
      </Container>
    </div>
  );
}

export default Todolist;
