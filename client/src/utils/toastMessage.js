import { toast } from "react-toastify";

export default class ToastMessage {
  static success(message) {
    toast.success(message, {
      className: "toast-container",
    });
  }
  static error(message) {
    toast.error(message);
  }
}
