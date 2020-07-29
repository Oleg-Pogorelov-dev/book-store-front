import { REQUESTED_BOOKS, REQUESTED_BOOKS_SUCCEEDED } from "../actions/actions";

const initialState = {
    books: [],
    loading: false
}

export function reducerBooks(state = initialState, action) {
    switch (action.type) {
      case REQUESTED_BOOKS:
        return {
            books: [],
            loading: true
        }
      case REQUESTED_BOOKS_SUCCEEDED:
        return {
            books: action.data.books,
            loading: false
        }
      default:
        return state;
    }
};
