import React from "react";
import { TextField, Button } from "@material-ui/core";
import classes from "./UserUpdate.module.css";
import { connect } from "react-redux";
import { updateInfo } from "../../actions/actionCreators";

function UserUpdate(props) {
  const { user, updateInfo, setModalOpen } = props;

  const [first_name, setFirstName] = React.useState("");
  const [last_name, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState(null);

  const onInputChange = (e) => {
    e.currentTarget.name === "first_name"
      ? setFirstName(e.currentTarget.value)
      : e.currentTarget.name === "last_name"
      ? setLastName(e.currentTarget.value)
      : setPhone(e.currentTarget.value);
  };

  const onBtnClick = (e) => {
    e.preventDefault();
    const formData = {
      email: user.email,
      first_name,
      last_name,
      phone,
    };
    updateInfo(formData);
    setModalOpen(false);
  };

  const onBtnCancel = (e) => {
    e.preventDefault();
    setModalOpen(false);
  };

  return (
    <div className={classes.main}>
      <h1>Добавить Доп. информацию о пользователе:</h1>
      <br />
      <TextField
        defaultValue={user.first_name || ""}
        name="first_name"
        className={classes.input}
        id="standard-required"
        label="Имя"
        onChange={onInputChange}
      />
      <TextField
        defaultValue={user.last_name || ""}
        name="last_name"
        className={classes.input}
        id="standard-required"
        label="Фамилия"
        onChange={onInputChange}
      />
      <TextField
        defaultValue={user.phone || ""}
        name="phone"
        type="number"
        className={classes.input}
        id="standard-required"
        label="Телефон"
        onChange={onInputChange}
      />
      <div className={classes.buttons}>
        <div className={classes.button}>
          <Button onClick={onBtnClick} variant="contained" color="primary">
            Изменить информацию
          </Button>
        </div>
        <div className={classes.button}>
          <Button onClick={onBtnCancel} variant="contained" color="primary">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (store) => {
  return { user: store.user };
};

const mapDispatchToProps = {
  updateInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate);
