import { toast, Zoom } from "react-toastify";

export const toastSuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
  });
};

export const toastError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
  });
};

export const toastWarning = (message: string) => {
  toast.warning(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
  });
};
