import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Box from "@mui/material/Box";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import "./App.css";
import {  useTodosDispatch} from "./contexts/todosContext";
import { useToast } from "./contexts/ToastContext";

export default function ActionAreaCard({
  todo,
  handelDelete,
  showDeleteDialog,
  showEditDialoge,
}) {
  const { showHideToast } = useToast();
    const {dispatch} = useTodosDispatch();
  function HandelCheckClick() {
    dispatch({ type: "togglecompleted", payload: todo });
    showHideToast("تم التعديل بنجاح ");
  }

  function handleClickOpenDelete() {
    showDeleteDialog(todo);
  }
  function handleClickOpenEdit() {
    showEditDialoge(todo);
  }

  return (
    <>
      <CardActionArea
        component="div"
        className="todocard"
        sx={{
          color: "white",
          maxWidth: "700px",
          margin: "20px auto",
          backgroundColor: "#2c387e",
          borderRadius: "10px",
          padding: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          textAlign: "right",
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
          >
            {todo.todoTitle}
          </Typography>
          <Typography variant="h6">{todo.todoBody}</Typography>
          <Box
            sx={{
              position: "absolute",
              top: "50%", // لضمان التوسيط العمودي
              left: "10px", // لإزاحتها عن الحافة اليسرى
              transform: "translateY(-50%)", // لتوسيطها عموديًا
              display: "flex",
              flexDirection: "row",
              gap: "8px", // المسافة بين الأيقونات
              direction: "ltr",
            }}
          >
            {/*  onClick={() => {
              handelDeleteClick(todo.id);
            }}*/}
            {/*==================================================DELETE SECTION=========================================*/}

            <IconButton
              className="iconButton"
              color="error"
              onClick={handleClickOpenDelete}
              style={{
                background: "white",
                border: "1px solid #C62828",
              }}
            >
              <DeleteOutlineOutlinedIcon />
            </IconButton>

            {/*==================================================DELETE SECTION=========================================*/}

            {/*==================================================EDIT SECTION=========================================*/}

            <IconButton
              onClick={handleClickOpenEdit}
              className="iconButton"
              color="primary"
              style={{
                background: "white",
                border: "1px solid #2196F3",
              }}
            >
              <EditOutlinedIcon />
            </IconButton>

            {/*==================================================EDIT SECTION=========================================*/}

            <IconButton
              className="iconButton"
              onClick={() => {
                HandelCheckClick();
              }}
              style={{
                color: todo.isCompleted ? "white" : "#8bc34a",
                background: todo.isCompleted ? "#8bc34a" : "white",
                border: "1px solid #8bc34a",
              }}
            >
              <CheckOutlinedIcon />
            </IconButton>
          </Box>
        </CardContent>
      </CardActionArea>
    </>
  );
}
