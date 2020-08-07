import {
  REQUESTED_SEARCH_BOOKS,
  REQUESTED_SEARCH_BOOKS_SUCCEEDED,
} from "../actions/actions";

const initialState = {
  searched_books: [],
  loading: false,
};

export function reducerSearchedBooks(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_SEARCH_BOOKS:
      return {
        searched_books: [],
        loading: true,
      };
    case REQUESTED_SEARCH_BOOKS_SUCCEEDED:
      return {
        searched_books: action.data.books,
        loading: false,
      };
    default:
      return state;
  }
}
