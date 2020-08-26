import {
  REQUESTED_BOOK,
  REQUESTED_BOOK_SUCCEEDED,
  REQUESTED_BOOK_ERROR,
} from "../actions/actions";

const initialState = {
  id: 0,
  title: "",
  img: "",
  author: "",
  author_id: null,
  price: "",
  description: "",
  loading: false,
  error: "",
};

export function reducerBook(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_BOOK:
      return {
        id: 0,
        title: "",
        img: "",
        author: "",
        author_id: null,
        price: "",
        description: "",
        loading: true,
        error: "",
      };
    case REQUESTED_BOOK_SUCCEEDED:
      return {
        id: action.data.book.id,
        title: action.data.book.title,
        img: action.data.book.img,
        author: action.data.author,
        author_id: action.data.book.AuthorId,
        price: action.data.book.price,
        description: action.data.book.description,
        loading: false,
        error: "",
      };
    case REQUESTED_BOOK_ERROR:
      return {
        id: 0,
        title: "",
        img: "",
        author: "",
        author_id: null,
        price: "",
        description: "",
        loading: false,
        error: action.data.message,
      };
    default:
      return state;
  }
}
