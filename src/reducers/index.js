import { combineReducers } from "redux";
import { reducerMyProfile } from "./users";
import { reducerBooks } from "./books";
import { reducerBook } from "./book";
import { reducerSearchedBooks } from "./searched_books";
import { reducerNotification } from "./notification";
import { reducerToken } from "./token";

export const rootReducer = combineReducers({
  user: reducerMyProfile,
  books: reducerBooks,
  searched_books: reducerSearchedBooks,
  book: reducerBook,
  notification: reducerNotification,
  token: reducerToken,
});
