import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getBooks } from "../../actions/actionCreators";
import classes from "./MainPage.module.css";
import { Link, withRouter } from "react-router-dom";
import { Modal, Button } from "@material-ui/core";
import AddBookModal from "../AddBookModal/AddBookModal";

function MainPage(props) {
  const [offset, setOffset] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(
    +props.match.params.page
  );
  const [booksPerPage] = React.useState(3);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = props.books.books.slice(
    indexOfFirstBook,
    indexOfLastBook
  );

  const pageNumbers = [];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (localStorage.token && !props.books.books.length) {
      setOffset((currentPage - 1) * 3);
      props.getBooks(offset);
    }
  }, []);

  for (
    let i = 1;
    i <= Math.ceil(props.books.books.length / booksPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const addActiveClass = (number) => (event) => {
    setOffset((number - 1) * 3);
    const active = document.querySelector(`.${classes.active_item}`);
    active.classList.remove(classes.active_item);
    event.currentTarget.classList.add(classes.active_item);
    setCurrentPage(number);
  };

  console.log(props);
  return (
    <div className={classes.mainPage}>
      <div className={classes.book_list}>
        {currentBooks.map((book, index) => {
          return (
            <div key={index} className={classes.book}>
              <img className={classes.book_cover} src={book.img} alt="Oops!" />
              <br />
              {book.title}
            </div>
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
          {pageNumbers.map((number) => (
            <div key={number}>
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
