import { notification } from "antd";

export const notify = (type, title, msg, duration) => {
  notification[type]({ message: title, description: msg, duration: duration });
}
