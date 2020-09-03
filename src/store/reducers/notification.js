import {
  REQUESTED_NOTIFICATION_TRUE,
  REQUESTED_NOTIFICATION_FALSE,
} from "../actions/actions";

const initialState = {
  notification: false,
};

export function reducerNotification(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_NOTIFICATION_TRUE:
      return {
        notification: true,
      };
    case REQUESTED_NOTIFICATION_FALSE:
      return {
        notification: false,
      };
    default:
      return state;
  }
}
