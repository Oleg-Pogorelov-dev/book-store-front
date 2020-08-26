import React, { useMemo } from "react";
import { connect } from "react-redux";
import { getBooks } from "../../actions/actionCreators";
import classes from "./MainPage.module.css";
import { Link, withRouter } from "react-router-dom";
import { Modal, Button } from "@material-ui/core";
import AddBookModal from "../AddBookModal/AddBookModal";
import SideBar from "../SideBar/SideBar";
import AddAuthorModal from "../AddAuthorModal/AddAuthorModal";
import { makeStyles } from "@material-ui/styles";

function MainPage(props) {
  const { books, getBooks, user } = props;

  const [currentBooks, setCurrentBooks] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const [openBookModal, setOpenBookModal] = React.useState(false);
  const [openAuthorModal, setOpenAuthorModal] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState(null);
  const [numImg, setNumImg] = React.useState(0);
  const [currentBookClass, setCurrentBookClass] = React.useState("");

  const countBooks = books.count;

  const useStyles = makeStyles(() => ({
    add_button: {
      margin: "10px",
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
  useMemo(() => setOffset((currentPage - 1) * 12), [currentPage]);

  for (let i = 1; i <= Math.ceil(countBooks / 12); i++) {
    pageNumbers.push(i);
  }

  const addActiveClass = (number) => (event) => {
    setOffset((number - 1) * 12);
    setCurrentPage(number);
  };

  const onMoveImg = (index) => (e) => {
    setNumImg(index);
  };

  const onMouseOverBook = (book_class) => (e) => {
    setCurrentBookClass(book_class);
  };

  const classesMUI = useStyles();
  return (
    <div className={classes.mainPage}>
      {/* {books.loading ? <Loading /> : ""} */}
      <SideBar
        offset={offset}
        searchValue={searchValue}
        setOffset={setOffset}
        setCurrentPage={setCurrentPage}
        setSearchValue={setSearchValue}
        getBooks={getBooks}
        books={books.books}
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
          <div className={classes.pagination}>
            <div
              className={classes.pagination_item}
              onClick={() => setCurrentPage(1)}
            >
              В начало
            </div>
            {pageNumbers.map((number, index) => (
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
            ))}
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

const mapStateToProps = (store) => {
  return { books: store.books };
};

const mapDispatchToProps = {
  getBooks,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainPage));
