import {
  REQUESTED_BOOKS,
  REQUESTED_BOOKS_SUCCEEDED,
  REQUESTED_BOOKS_ERROR,
} from "../actions/actions";

const initialState = {
  books: [],
  count: 0,
  loading: false,
  error: "",
};

export function reducerBooks(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_BOOKS:
      return {
        books: [],
        count: 0,
        loading: true,
        error: "",
      };
    case REQUESTED_BOOKS_SUCCEEDED:
      return {
        books: action.data.books.rows,
        count: action.data.books.count,
        loading: false,
      };
    case REQUESTED_BOOKS_ERROR:
      return {
        books: [],
        count: 0,
        loading: false,
        error: action.data.message,
      };
    default:
      return state;
  }
}
