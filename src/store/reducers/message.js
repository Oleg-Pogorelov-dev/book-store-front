import { SET_MESSAGE } from "../actions/actions";

export function reducerMessage(message = "", action) {
  switch (action.type) {
    case SET_MESSAGE:
      return (message = action.data);
    default:
      return message;
  }
}
