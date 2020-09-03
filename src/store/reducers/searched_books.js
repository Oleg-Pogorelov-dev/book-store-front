import {
  REQUESTED_SEARCH_BOOKS,
  REQUESTED_SEARCH_BOOKS_SUCCEEDED,
  REQUESTED_SEARCH_BOOKS_ERROR,
} from "../actions/actions";

const initialState = {
  searched_books: [],
  loading: false,
  error: "",
};

export function reducerSearchedBooks(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_SEARCH_BOOKS:
      return {
        searched_books: [],
        loading: true,
        error: "",
      };
    case REQUESTED_SEARCH_BOOKS_SUCCEEDED:
      return {
        searched_books: action.data.books,
        loading: false,
        error: "",
      };
    case REQUESTED_SEARCH_BOOKS_ERROR:
      return {
        searched_books: action.data.books,
        loading: false,
        error: action.data.message,
      };
    default:
      return state;
  }
}
