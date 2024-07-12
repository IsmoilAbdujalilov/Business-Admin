import { get } from "lodash";
import { useEffect } from "react";
import { storage } from "services";
import { Header } from "components";
import { makeStyles } from "@material-ui/core/styles";
import { Outlet, useNavigate } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";

const Home = () => {
  const navigate = useNavigate();

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      paddingTop: "75px",
      padding: theme.spacing(5),
      backgroundColor: theme.palette.background.default,
    },
  }));

  const classes = useStyles();

  const token = get(JSON.parse(storage.get("data") as string), "token") || "";

  useEffect(() => {
    if (token) return;
    else {
      navigate("/pages/login");
    }
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
