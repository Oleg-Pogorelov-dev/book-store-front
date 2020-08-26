import React from "react";
import { Button } from "@material-ui/core";
import classes from "./DeleteBookModal.module.css";
import { deleteBook } from "../../actions/actionCreators";
import { connect } from "react-redux";

function DeleteBookModal(props) {
  const { bookId, setConfirmModal, setRedirect, deleteBook } = props;

  const onBtnClick = (e) => {
    deleteBook(bookId);
    setRedirect(true);
  };

  const onBtnCancel = (e) => {
    e.preventDefault();
    setConfirmModal(false);
  };

  return (
    <div className={classes.main}>
      <h1>Удалить книгу?</h1>

      <div className={classes.buttons}>
        <div className={classes.button}>
          <Button onClick={onBtnClick} variant="contained" color="primary">
            Подтвердить
          </Button>
        </div>
        <div className={classes.button}>
          <Button onClick={onBtnCancel} variant="contained" color="primary">
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  deleteBook,
};

export default connect(null, mapDispatchToProps)(DeleteBookModal);
