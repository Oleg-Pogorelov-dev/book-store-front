import React from "react";
import classes from "./Loading.module.css";

function Loading(props) {
  console.log(props);

  return (
    <div className={classes.loading}>
      <div>
        <div className={classes.lds_ring}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
