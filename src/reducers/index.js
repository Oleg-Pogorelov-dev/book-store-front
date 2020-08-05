import { combineReducers } from "redux";
import { reducerMyProfile } from "./users";
import { reducerBooks } from "./books";
import { reducerBook } from "./book";

export const rootReducer = combineReducers({
  user: reducerMyProfile,
  books: reducerBooks,
  book: reducerBook,
});
