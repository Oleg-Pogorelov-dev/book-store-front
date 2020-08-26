import React from "react";
import { TextField, Button } from "@material-ui/core";
import classes from "./Login.module.css";
import { connect } from "react-redux";
import { postAuth } from "../../actions/actionCreators";
import { Link } from "react-router-dom";

function Login(props) {
  const { postAuth } = props;

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [message, setMessage] = React.useState("");

  const onInputChange = (e) => {
    const { name } = e.currentTarget;
    name === "email"
      ? setEmail(e.currentTarget.value)
      : setPassword(e.currentTarget.value);
  };

  const onBtnClick = (e) => {
    e.preventDefault();

    if (!password || !email) {
      return setMessage("Пожалуйста, заполните данное поле");
    }

    postAuth({
      url: "login",
      email,
      password,
      setMessage,
    });
  };

  return (
    <div>
      <h1>Вход</h1>
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
      <div className={classes.button}>
        <Button onClick={onBtnClick} variant="contained" color="primary">
          Войти
        </Button>
      </div>
      <br />
      <div>
        Нет учетной записи? Тогда пройдите{" "}
        <Link to="/registration">регистрацию</Link>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  postAuth,
};

export default connect(null, mapDispatchToProps)(Login);
