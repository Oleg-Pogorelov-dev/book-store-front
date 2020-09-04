import React, { useState } from "react";
import classes from "./MainPage.module.css";
import { Button, makeStyles, Modal } from "@material-ui/core";
import AddBookModal from "../Modals/AddBookModal/AddBookModal";
import AddAuthorModal from "../Modals/AddAuthorModal/AddAuthorModal";

const useStyles = makeStyles((theme) => ({
  add_button: {
    margin: "10px",
  },
}));

function PaginationAndButtons(props) {
  const {
    booksLimit,
    books,
    setOffset,
    setCurrentPage,
    user,
    setBooksLimit,
    currentPage,
  } = props;

  const [openBookModal, setOpenBookModal] = useState(false);
  const [openAuthorModal, setOpenAuthorModal] = useState(false);

  const countBooks = books.count;

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(countBooks / booksLimit); i++) {
    pageNumbers.push(i);
  }

  const addActiveClass = (number) => (event) => {
    setOffset((number - 1) * booksLimit);
    setCurrentPage(number);
  };

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

  const onLimitChange = (e) => {
    e.preventDefault();
    setOffset(0);
    setCurrentPage(1);
    const input = document.querySelector(`.${classes.count_books_for_page}`);
    setBooksLimit(input.value);
  };

  const classesMUI = useStyles();

  return (
    <div className={classes.pagination_and_button}>
      <div>
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

export default PaginationAndButtons;
