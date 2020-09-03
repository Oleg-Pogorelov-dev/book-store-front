import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";

import classes from "./Registration.module.css";
import { postAuth } from "../../../store/actions/actionCreators";

function Registration(props) {
  const { postAuth } = props;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwrod_confirmation, setPasswrodConfirmation] = React.useState("");
  const [message, setMessage] = React.useState("");

  const onInputChange = (e) => {
    const { name } = e.currentTarget;
    name === "email"
      ? setEmail(e.currentTarget.value)
      : name === "password"
      ? setPassword(e.currentTarget.value)
      : setPasswrodConfirmation(e.currentTarget.value);
  };

  const onBtnClick = (e) => {
    if (!password || !email || !passwrod_confirmation) {
      return setMessage("Пожалуйста, заполните данное поле");
    }

    if (password !== passwrod_confirmation) {
      return setMessage("Подтверждение пароля и пароль не совпадают.");
    }

    if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      return setMessage("Неверный email.");
    }

    e.preventDefault();
    postAuth({
      url: "registration",
      email,
      password,
      setMessage,
    });
  };

  return (
    <div className={classes.main}>
      <h1>Регистрация</h1>
      <p
        hidden={!message || message === "Пожалуйста, заполните данное поле"}
        className={classes.error}
      >
        {message}
      </p>
      <br />
      <TextField
        name="email"
        className={classes.input}
        required
        label="Email"
        onChange={onInputChange}
        helperText={!email ? message : ""}
        error={!!message && !email}
      />
      <br />
      <TextField
        name="password"
        className={classes.input}
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={onInputChange}
        helperText={!password ? message : ""}
        error={!!message && !password}
      />
      <br />
      <TextField
        name="passwrod_confirmation"
        className={classes.input}
        label="Password confirmation"
        type="password"
        autoComplete="current-password"
        onChange={onInputChange}
        helperText={!passwrod_confirmation ? message : ""}
        error={!!message && !passwrod_confirmation}
      />
      <br />
      <div className={classes.button}>
        <Button onClick={onBtnClick} variant="contained" color="primary">
          Зарегистрироваться
        </Button>
      </div>
      <br />
      <div>
        Есть учетная запись? <Link to="/login">Войти</Link>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  postAuth,
};

export default connect(null, mapDispatchToProps)(Registration);
