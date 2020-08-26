import { combineReducers } from "redux";
import { reducerMyProfile } from "./user";
import { reducerBooks } from "./books";
import { reducerBook } from "./book";
import { reducerAuthor } from "./author";
import { reducerSearchedBooks } from "./searched_books";
import { reducerNotification } from "./notification";
import { reducerSearchedAuthors } from "./searched_authors";

export const rootReducer = combineReducers({
  user: reducerMyProfile,
  books: reducerBooks,
  searched_books: reducerSearchedBooks,
  searched_authors: reducerSearchedAuthors,
  book: reducerBook,
  author: reducerAuthor,
  notification: reducerNotification,
});
