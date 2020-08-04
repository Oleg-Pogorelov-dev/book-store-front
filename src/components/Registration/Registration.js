import React from "react";
import { Redirect } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import classes from "./Registration.module.css";
import { postAuth } from "../../actions/actionCreators";
import { connect } from "react-redux";

function Registration(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwrod_confirmation, setPasswrodConfirmation] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  const onInputChange = (e) => {
    const { name } = e.currentTarget;
    name === "email"
      ? setEmail(e.currentTarget.value)
      : name === "password"
      ? setPassword(e.currentTarget.value)
      : setPasswrodConfirmation(e.currentTarget.value);
  };

  const onBtnClick = (e) => {
    if (password !== passwrod_confirmation) {
      setMessage("Подтверждение пароля и пароль не совпадают.");
    } else if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setMessage("Неверный email.");
    } else {
      e.preventDefault();
      props.postAuth({
        url: "http://localhost:3000/registration",
        email,
        password,
        setMessage,
      });
      setRedirect(true);
    }
  };

  return (
    <div>
      <h1>Registration</h1>
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
      <TextField
        name="passwrod_confirmation"
        className={classes.input}
        id="standard-password-input"
        label="Password confirmation"
        type="password"
        autoComplete="current-password"
        onChange={onInputChange}
      />
      <br />
      <Button onClick={onBtnClick} variant="contained" color="primary">
        Sign up
      </Button>
    </div>
  );
}

const mapDispatchToProps = {
  postAuth,
};

export default connect(null, mapDispatchToProps)(Registration);
