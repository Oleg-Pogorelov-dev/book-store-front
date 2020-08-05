import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { getBooks } from "../../actions/actionCreators";
import classes from "./MainPage.module.css";
import { Link, withRouter } from "react-router-dom";
import { Modal, Button } from "@material-ui/core";
import AddBookModal from "../AddBookModal/AddBookModal";
import SideBar from "../SideBar/SideBar";

function MainPage(props) {
  console.log("Books", props);
  const [currentBooks, setCurrentBooks] = React.useState([]);
  const [offset, setOffset] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(
    +props.match.params.page
  );
  const [booksPerPage] = React.useState(3);
  console.log("offset", offset);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const countBooks = props.books.count;

  const pageNumbers = [];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (localStorage.token && !props.books.books.length) {
      props.getBooks({ offset: offset });
    }
  }, []);

  useMemo(() => setCurrentBooks(props.books.books), [props.books.books]);
  useMemo(() => setOffset((currentPage - 1) * 2), [currentPage]);
  useMemo(() => props.getBooks({ offset: offset }), [currentPage]);

  for (let i = 1; i <= Math.ceil(countBooks / 2); i++) {
    pageNumbers.push(i);
  }

  const addActiveClass = (number) => (event) => {
    setOffset((number - 1) * 2);
    const active = document.querySelector(`.${classes.active_item}`);
    active.classList.remove(classes.active_item);
    event.currentTarget.classList.add(classes.active_item);
    setCurrentPage(number);
  };

  console.log(props);
  return (
    <div className={classes.mainPage}>
      <SideBar offset={offset} getBooks={props.getBooks} />
      <div className={classes.book_list}>
        {currentBooks.map((book, index) => {
          return (
            <Link key={index} to={`/book_${book.id}`}>
              <div className={classes.book}>
                <img
                  className={classes.book_cover}
                  src={book.img}
                  alt="Oops!"
                />
                <br />
                {book.title}
              </div>
            </Link>
          );
        })}
      </div>
      <div className={classes.pagination_and_button}>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add book
        </Button>
        <div className={classes.pagination}>
          <Link
            className={classes.customLink}
            onClick={() => setCurrentPage(1)}
            to="/books/1"
          >
            В начало
          </Link>
          {pageNumbers.map((number, index) => (
            <div key={index}>
              <Link
                onClick={addActiveClass(number)}
                className={`${classes.pagination_item} ${
                  +props.match.params.page === number ? classes.active_item : ""
                } `}
                to={`/books/${number}`}
              >
                {number}
              </Link>
            </div>
          ))}
          <div hidden={pageNumbers.length <= currentPage}>
            <Link
              className={classes.customLink}
              onClick={() => setCurrentPage(currentPage + 1)}
              to={`/books/${currentPage + 1}`}
              hidden={true}
            >
              Дальше
            </Link>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <AddBookModal />
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
