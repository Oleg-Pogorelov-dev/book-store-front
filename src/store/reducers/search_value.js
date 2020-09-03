import { POST_SEARCH_VALUE } from "../actions/actions";

export function reducerSearchValue(search_value = "", action) {
  switch (action.type) {
    case POST_SEARCH_VALUE:
      return (search_value = action.data);

    default:
      return search_value;
  }
}
