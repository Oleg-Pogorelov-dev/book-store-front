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
      <label className={classes.error} hidden={!message}>
        {message}
      </label>
      <br />
      <TextField
        name="email"
        className={classes.input}
        required
        id="standard-required"
        label="Email"
        onChange={onInputChange}
      />
      <br />
      <TextField
        name="password"
        className={classes.input}
        id="standard-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        onChange={onInputChange}
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
