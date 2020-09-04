import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Backdrop, CircularProgress, makeStyles } from "@material-ui/core";

import { getBooks, postSearchValue } from "../../store/actions/actionCreators";
import classes from "./MainPage.module.css";
import DropdownPanel from "../DropdownPanel/DropdownPanel";
import PaginationAndButtons from "./PaginationAndButtons";
import BooksList from "./BooksList";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function MainPage(props) {
  const { books, getBooks, user, search_value, message } = props;
  console.log(message);

  const [currentBooks, setCurrentBooks] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [genresSelected, setGenresSelected] = useState("");
  const [sort, setSort] = useState({
    order_item: "id",
    order_type: "DESC",
  });
  const [booksLimit, setBooksLimit] = useState(12);

  useEffect(() => {
    setOffset((currentPage - 1) * booksLimit);

    getBooks({
      booksLimit: booksLimit,
      offset: offset,
      genre: genresSelected,
      title: search_value,
      order_item: sort.order_item,
      order_type: sort.order_type,
    });
  }, [offset, search_value, genresSelected, sort, booksLimit, currentPage]);

  useEffect(() => {
    setCurrentBooks(books.books);
  }, [books.books]);

  const classesMUI = useStyles();

  if (books.loading) {
    return (
      <Backdrop className={classesMUI.backdrop} open={books.loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <div className={classes.mainPage}>
      <DropdownPanel
        setGenresSelected={setGenresSelected}
        sort={sort}
        setSort={setSort}
        setCurrentPage={setCurrentPage}
        setOffset={setOffset}
      />
      <BooksList currentBooks={currentBooks} books={books} />
      {!books.books.length && !books.loading ? (
        <div className={classes.empty}>К сожалению нечего не найдено.</div>
      ) : (
        <PaginationAndButtons
          books={books}
          user={user}
          currentPage={currentPage}
          setOffset={setOffset}
          setCurrentPage={setCurrentPage}
          setBooksLimit={setBooksLimit}
          booksLimit={booksLimit}
        />
      )}
    </div>
  );
}

const mapStateToProps = (store) => ({
  books: store.books,
  search_value: store.search_value,
});

const mapDispatchToProps = {
  getBooks,
  postSearchValue,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainPage));
