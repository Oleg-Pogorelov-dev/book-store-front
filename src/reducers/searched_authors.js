import {
  REQUESTED_SEARCH_AUTHORS,
  REQUESTED_SEARCH_AUTHORS_SUCCEEDED,
} from "../actions/actions";

const initialState = {
  searched_authors: [],
  loading: false,
};

export function reducerSearchedAuthors(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_SEARCH_AUTHORS:
      return {
        searched_authors: [],
        loading: true,
      };
    case REQUESTED_SEARCH_AUTHORS_SUCCEEDED:
      return {
        searched_authors: action.data.authors,
        loading: false,
      };
    default:
      return state;
  }
}
