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
import Loading from "../Loading/Loading";

function MainPage(props) {
  console.log("PROPS", props);
  const { books, getBooks } = props;

  const [currentBooks, setCurrentBooks] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const [openBookModal, setOpenBookModal] = React.useState(false);
  const [openAuthorModal, setOpenAuthorModal] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchValue, setSearchValue] = React.useState(null);
  // const [img, setImg] = React.useState(books.books.img[0]);

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
  useMemo(() => setOffset((currentPage - 1) * 9), [currentPage]);

  for (let i = 1; i <= Math.ceil(countBooks / 9); i++) {
    pageNumbers.push(i);
  }

  const addActiveClass = (number) => (event) => {
    setOffset((number - 1) * 9);
    setCurrentPage(number);
  };

  const onMoveImg = (e) => {
    // const = e.target.width
    // console.dir(e.target.name);
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
          return (
            <Link className={classes.link} key={index} to={`/book_${book.id}`}>
              <div className={classes.img_blocks}>
                {book.img.map((img, index) => {
                  return <div key={index} className={classes.img_block}></div>;
                })}
              </div>
              <div className={classes.book}>
                <img
                  onMouseMove={onMoveImg}
                  className={classes.book_cover}
                  src={`http://localhost:3000/${book.img[0]}`}
                  alt="Oops!"
                />
                <br />
                {book.title}
                <br />
                Жанр: {book.genre}
                <br />
                Цена: {book.price} руб.
              </div>
            </Link>
          );
        })}
      </div>
      {!books.books.length && !books.loading ? (
        <div>К сожалению нечего не найдено.</div>
      ) : (
        <div className={classes.pagination_and_button}>
          <Button
            className={classesMUI.add_button}
            variant="contained"
            color="primary"
            onClick={handleOpenAddBook}
          >
            Add book
          </Button>
          <Button
            className={classesMUI.add_button}
            variant="contained"
            color="primary"
            onClick={handleOpenAddAuthor}
          >
            Add Author
          </Button>
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
          <AddBookModal />
        </div>
      </Modal>
      <Modal
        open={openAuthorModal}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <AddAuthorModal />
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
