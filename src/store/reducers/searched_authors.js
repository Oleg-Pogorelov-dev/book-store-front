import {
  REQUESTED_SEARCH_AUTHORS,
  REQUESTED_SEARCH_AUTHORS_SUCCEEDED,
  REQUESTED_SEARCH_AUTHORS_ERROR,
} from "../actions/actions";

const initialState = {
  searched_authors: [],
  loading: false,
  error: "",
};

export function reducerSearchedAuthors(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_SEARCH_AUTHORS:
      return {
        searched_authors: [],
        loading: true,
        error: "",
      };
    case REQUESTED_SEARCH_AUTHORS_SUCCEEDED:
      return {
        searched_authors: action.data.authors,
        loading: false,
        error: "",
      };
    case REQUESTED_SEARCH_AUTHORS_ERROR:
      return {
        searched_authors: [],
        loading: false,
        error: action.data.message,
      };
    default:
      return state;
  }
}
