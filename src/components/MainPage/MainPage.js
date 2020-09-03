import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  Modal,
  Button,
  Backdrop,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getBooks,
  postSearchValue,
  setMessage,
} from "../../store/actions/actionCreators";
import classes from "./MainPage.module.css";
import AddBookModal from "../Modals/AddBookModal/AddBookModal";
import AddAuthorModal from "../Modals/AddAuthorModal/AddAuthorModal";
import DropdownPanel from "../DropdownPanel/DropdownPanel";

function MainPage(props) {
  console.log(props);
  const { books, getBooks, user, search_value, message, setMessage } = props;

  const [currentBooks, setCurrentBooks] = useState([]);
  const [offset, setOffset] = useState(0);
  const [openBookModal, setOpenBookModal] = useState(false);
  const [openAuthorModal, setOpenAuthorModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [numImg, setNumImg] = useState(0);
  const [currentBookClass, setCurrentBookClass] = useState("");
  const [genresSelected, setGenresSelected] = useState("");
  const [sort, setSort] = useState({
    order_item: "id",
    order_type: "DESC",
  });
  const [booksLimit, setBooksLimit] = useState(12);

  const countBooks = books.count;

  const useStyles = makeStyles((theme) => ({
    add_button: {
      margin: "10px",
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));

  const pageNumbers = [];

  const handleOpenAddBook = () => {
    setOpenBookModal(true);
  };

  const handleOpenAddAuthor = () => {
    setOpenAuthorModal(true);
  };

  const handleClose = () => {
    setOpenBookModal(false);
    setOpenAuthorModal(false);
  };

  useMemo(() => setCurrentBooks(books.books), [books.books]);
  useMemo(() => setOffset((currentPage - 1) * booksLimit), [currentPage]);

  for (let i = 1; i <= Math.ceil(countBooks / booksLimit); i++) {
    pageNumbers.push(i);
  }

  const addActiveClass = (number) => (event) => {
    setOffset((number - 1) * booksLimit);
    setCurrentPage(number);
  };

  const onMoveImg = (index) => (e) => {
    setNumImg(index);
  };

  const onMouseOverBook = (book_class) => (e) => {
    setCurrentBookClass(book_class);
  };

  const onLimitChange = (e) => {
    e.preventDefault();
    setOffset(0);
    setCurrentPage(1);
    const input = document.querySelector(`.${classes.count_books_for_page}`);
    setBooksLimit(input.value);
  };

  const notify = () => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setMessage("");
  };
  console.log("MESSAGE", message);

  useEffect(() => {
    getBooks({
      booksLimit: booksLimit,
      offset: offset,
      genre: genresSelected,
      title: search_value,
      order_item: sort.order_item,
      order_type: sort.order_type,
    });
  }, [offset, search_value, genresSelected, sort, booksLimit]);

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
      {message && books.count ? notify() : ""}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <DropdownPanel
        setGenresSelected={setGenresSelected}
        sort={sort}
        setSort={setSort}
        setCurrentPage={setCurrentPage}
        setOffset={setOffset}
      />
      <div className={classes.book_list}>
        {currentBooks.map((book, index) => {
          const book_class = `book_${book.id}`;
          return (
            <Link
              onMouseOver={onMouseOverBook(book_class)}
              className={`${classes.link} ${book_class}`}
              key={index}
              to={`/book_${book.id}`}
            >
              <div className={classes.img_blocks}>
                {book.img.map((img, index) => {
                  return (
                    <div
                      key={index}
                      onMouseMove={onMoveImg(index)}
                      className={classes.img_block}
                    ></div>
                  );
                })}
              </div>
              <div className={classes.book}>
                <img
                  className={classes.book_cover}
                  src={
                    books.books.length && currentBookClass === `book_${book.id}`
                      ? `${process.env.REACT_APP_BASE_URL}${books.books[index].img[numImg]}`
                      : books.books.length
                      ? `${process.env.REACT_APP_BASE_URL}${books.books[index].img[0]}`
                      : ""
                  }
                  alt="Oops!"
                />
                <div className={classes.num_img}>
                  {book.img.map((img, pointIndex) => {
                    return (
                      <div
                        key={pointIndex}
                        className={
                          pointIndex === numImg &&
                          currentBookClass === `book_${book.id}`
                            ? `${classes.point} ${classes.current_point}`
                            : `${classes.point}`
                        }
                      ></div>
                    );
                  })}
                </div>
                <br />
                <div className={classes.info}>
                  <strong>{book.title}</strong>
                  <br />
                  <div>Жанр: {book.genre}</div>
                  <div>Цена: {book.price} руб.</div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {!books.books.length && !books.loading ? (
        <div className={classes.empty}>К сожалению нечего не найдено.</div>
      ) : (
        <div className={classes.pagination_and_button}>
          {user === "admin" ? (
            <Button
              className={classesMUI.add_button}
              variant="contained"
              color="primary"
              onClick={handleOpenAddBook}
            >
              Add book
            </Button>
          ) : (
            ""
          )}
          {user === "admin" ? (
            <Button
              className={classesMUI.add_button}
              variant="contained"
              color="primary"
              onClick={handleOpenAddAuthor}
            >
              Add Author
            </Button>
          ) : (
            ""
          )}
          <div></div>
          <div className={classes.pagination}>
            <div
              className={classes.pagination_item}
              onClick={() => setCurrentPage(1)}
            >
              В начало
            </div>
            {pageNumbers.map((number, index) => {
              if (
                number === currentPage ||
                number === currentPage + 1 ||
                number === currentPage - 1
              ) {
                return (
                  <div
                    key={index}
                    onClick={addActiveClass(number)}
                    className={
                      number === currentPage
                        ? `${classes.pagination_item} ${classes.active_item}`
                        : classes.pagination_item
                    }
                  >
                    {number}
                  </div>
                );
              }
              return "";
            })}
            <div hidden={pageNumbers.length <= currentPage}>
              <div
                className={classes.customLink}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Дальше
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        Количество книг на странице:
        <form>
          <input
            className={classes.count_books_for_page}
            type="number"
            defaultValue={booksLimit}
          />
          <button
            className={classes.button_count_books}
            onClick={onLimitChange}
          >
            &bull;
          </button>
        </form>
      </div>
      <Modal
        open={openBookModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <AddBookModal setOpenBookModal={setOpenBookModal} />
        </div>
      </Modal>
      <Modal
        open={openAuthorModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <AddAuthorModal setOpenAuthorModal={setOpenAuthorModal} />
        </div>
      </Modal>
    </div>
  );
}

const mapStateToProps = (store) => ({
  books: store.books,
  search_value: store.search_value,
  message: store.message,
});

const mapDispatchToProps = {
  getBooks,
  postSearchValue,
  setMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainPage));
