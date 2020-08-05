import { REQUESTED_BOOK, REQUESTED_BOOK_SUCCEEDED } from "../actions/actions";

const initialState = {
  id: 0,
  title: "",
  img: "",
  loading: false,
};

export function reducerBook(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_BOOK:
      return {
        id: 0,
        title: "",
        img: "",
        loading: true,
      };
    case REQUESTED_BOOK_SUCCEEDED:
      return {
        id: action.data.book.id,
        title: action.data.book.title,
        img: action.data.book.img,
        loading: false,
      };
    default:
      return state;
  }
}
