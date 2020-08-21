import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button,
  Modal,
} from "@material-ui/core";
import UserUpdate from "../UserUpdate/UserUpdate";
import { updateAvatar } from "../../actions/actionCreators";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  card_order: {
    margin: "20px auto",
    color: "rgba(48, 48, 48, 0.7)",
    backgroundColor: "#ecffe6",
    maxWidth: "40%",
  },
  card_content: {
    display: "flex",
    justifyContent: "space-between",
  },
  text_left: {
    margin: "5px",
  },
  text_right: {
    margin: "5px",
  },
  underscore: {
    height: "22px",
    borderBottom: "1px solid grey",
    flexBasis: "100%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paper: {
    margin: "0 auto",
    padding: "20px",
    marginTop: "20vh",
    maxWidth: "40vw",
    backgroundColor: "white",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    margin: "10px auto",
    fontSize: "20px",
    fontWeight: "bold",
    backgroundColor: "rgba(128, 128, 128, 0.1)",
    maxWidth: "30%",
  },
  avatar: {
    height: "200px",
    width: "200px",
    borderRadius: "50%",
  },
  link: {
    textDecoration: "none",
  },
  labels: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  values: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
});

function Profile(props) {
  const { user, updateAvatar } = props;

  const [modalOpen, setModalOpen] = useState(false);

  const onBtnClick = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const onFileChange = (e) => {
    const input = document.getElementById("upload-photo");
    const formData = new FormData();
    formData.append("avatar", input.files[0]);
    formData.append("email", user.email);
    updateAvatar(formData);
  };

  const classes = useStyles();

  return (
    <div>
      <h1>Мой профиль</h1>
      <label htmlFor="upload-photo">
        <img
          className={classes.avatar}
          src={`http://localhost:3000/${user.avatar}`}
          alt="Oops!"
        />
      </label>
      <input
        hidden
        onChange={onFileChange}
        type="file"
        name="photo"
        id="upload-photo"
      />
      <div className={classes.info}>
        <div className={classes.labels}>
          <div>Email: </div>
          <div>Имя: </div>
          <div>Фамилия: </div>
          <div>Телефон: </div>
        </div>
        <div className={classes.values}>
          <div>{`${user.email}`}</div>
          <div>{user.first_name ? `${user.first_name}` : "Пусто"}</div>
          <div>{user.last_name ? `${user.last_name}` : "Пусто"}</div>
          <div>{user.phone ? `${user.phone}` : "Пусто"}</div>
        </div>
      </div>
      <Button onClick={onBtnClick} variant="contained" color="primary">
        Изменить информацию
      </Button>
      {user.orders.length ? (
        <div>
          <h3>История заказов</h3>
          {user.orders.map((order, index) => {
            return (
              <Card key={index} className={classes.card_order}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Заказ № {order.id}
                  </Typography>
                  <Typography
                    className={classes.text_left}
                    variant="h5"
                    component="h2"
                  >
                    Товары:
                  </Typography>
                  {order.books.map((book, index) => {
                    return (
                      <div className={classes.card_content} key={index}>
                        <Typography
                          className={classes.text_left}
                          color="textSecondary"
                        >
                          <Link
                            className={classes.link}
                            to={`/book_${book.id}`}
                          >
                            {book.title}
                          </Link>
                        </Typography>
                        <Typography
                          className={classes.text_right}
                          color="textSecondary"
                        >
                          {book.price} руб.
                        </Typography>
                      </div>
                    );
                  })}
                  <Typography
                    className={classes.text_left}
                    variant="h5"
                    component="h2"
                  >
                    Сумма заказа{" "}
                    {order.books.reduce((sum, book) => sum + book.price, 0)}{" "}
                    руб.
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div>Нет совершенных покупок</div>
      )}
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.paper}>
          <UserUpdate />
        </div>
      </Modal>
    </div>
  );
}

const mapDispatchToProps = {
  updateAvatar,
};

export default connect(null, mapDispatchToProps)(Profile);
