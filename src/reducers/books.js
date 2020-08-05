import { REQUESTED_BOOKS, REQUESTED_BOOKS_SUCCEEDED } from "../actions/actions";

const initialState = {
  books: [],
  count: 0,
  loading: false,
};

export function reducerBooks(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_BOOKS:
      return {
        books: [],
        count: 0,
        loading: true,
      };
    case REQUESTED_BOOKS_SUCCEEDED:
      return {
        books: action.data.books.rows,
        count: action.data.books.count,
        loading: false,
      };
    default:
      return state;
  }
}
