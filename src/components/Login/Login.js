import React from "react";
import { TextField, Button } from "@material-ui/core";
import classes from "./Login.module.css";
import { connect } from "react-redux";
import { postAuth } from "../../actions/actionCreators";

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
      url: "http://localhost:3000/login",
      email,
      password,
      setMessage,
    });
  };

  return (
    <div>
      <h1>Login</h1>
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
      <Button onClick={onBtnClick} variant="contained" color="primary">
        Sign in
      </Button>
    </div>
  );
}

const mapDispatchToProps = {
  postAuth,
};

export default connect(null, mapDispatchToProps)(Login);
