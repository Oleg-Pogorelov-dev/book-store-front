import React from "react";
import { connect } from "react-redux";

import classes from "./Page404.module.css";
import { requestStatusCode } from "../../store/actions/actionCreators";

function Page404(props) {
  return (
    <div className={classes.mainPage}>Ошибка 404. Страница не найдена :(</div>
  );
}

const mapDispatchToProps = {
  requestStatusCode,
};

export default connect(null, mapDispatchToProps)(Page404);
