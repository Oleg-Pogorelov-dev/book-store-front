import React from "react";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import classes from "./DeleteBookModal.module.css";
import { deleteBook } from "../../../store/actions/actionCreators";

function DeleteBookModal(props) {
  const { bookId, setConfirmModal, deleteBook } = props;

  const history = useHistory();

  const onBtnClick = (e) => {
    deleteBook(bookId);
    history.push("/");
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
