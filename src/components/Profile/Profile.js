import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
} from "@material-ui/core";

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
    // textAlign: "left",
  },
  text_right: {
    margin: "5px",
    // textAlign: "right",
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
});

function Profile(props) {
  const { user } = props;
  console.log(props);

  const classes = useStyles();

  return (
    <div>
      <h1>Мой профиль</h1>
      <form>
        <div>
          <label>Email: {`${user.email}`}</label>
        </div>
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
                            {book.title}
                          </Typography>
                          {/* <div className={classes.underscore}></div> */}
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
                      Сумма заказа
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
                    <Button size="small">Learn More</Button>
                  </CardActions> */}
                </Card>
              );
            })}
          </div>
        ) : (
          <div>Нет совершенных покупок</div>
        )}
      </form>
    </div>
  );
}

export default Profile;
