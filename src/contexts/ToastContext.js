import { createContext } from "react";
import { useState, useContext } from "react";
import MySnackbar from "../MySnackBar";

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState();

  function showHideToast(message) {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
    setmessage(message);
  }

  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <MySnackbar open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
}; /// يلي برجعلي ياه خلي اليوزتوست يرجعلي ياه
