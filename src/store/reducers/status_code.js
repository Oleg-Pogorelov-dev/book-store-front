import { GET_STATUS_CODE } from "../actions/actions";

export function reducerStatusCode(status_code = null, action) {
  switch (action.type) {
    case GET_STATUS_CODE:
      return (status_code = action.data);

    default:
      return status_code;
  }
}
