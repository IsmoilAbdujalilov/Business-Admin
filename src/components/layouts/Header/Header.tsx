import { useState } from "react";
import { Box } from "@mui/material";
import { Menu as MenuComponent } from "./components";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Menu,
  Quiz,
  HomeOutlined,
  RoomService,
  InfoOutlined,
  PersonOutline,
  MessageOutlined,
  FileUploadOutlined,
  OutlinedFlagRounded,
  AccessibilityNewOutlined,
} from "@mui/icons-material";
import {
  List,
  Drawer,
  AppBar,
  Toolbar,
  Divider,
  ListItem,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const drawerWidth = 225;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    top: 0,
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    paddingTop: "75px",
    padding: theme.spacing(5),
    backgroundColor: theme.palette.background.default,
  },
}));

type sidebarMenuDataTypes = {
  id: number;
  path: string;
  name: string;
  icon: JSX.Element;
};

const sidebarMenuData: sidebarMenuDataTypes[] = [
  {
    id: 1,
    path: "/",
    name: "Home",
    icon: <HomeOutlined />,
  },
  {
    id: 2,
    icon: <Quiz />,
    name: "Faq Question",
    path: "/pages/faq-question",
  },
  {
    id: 3,
    name: "Our Services",
    icon: <RoomService />,
    path: "/pages/ourservices",
  },
  {
    id: 3,
    name: "Users",
    path: "/pages/users",
    icon: <PersonOutline />,
  },
  {
    id: 4,
    name: "Message",
    path: "/pages/message",
    icon: <MessageOutlined />,
  },
  {
    id: 5,
    name: "File",
    path: "/pages/file",
    icon: <FileUploadOutlined />,
  },
  {
    id: 6,
    name: "Our Values",
    path: "/pages/ourvalues",
    icon: <OutlinedFlagRounded />,
  },
  {
    id: 7,
    name: "Team",
    path: "/pages/team-member",
    icon: <AccessibilityNewOutlined />,
  },
];

const Header = () => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const [open, setOpen] = useState<boolean>(false);

  const toggleDrawer = (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  const navigateItem = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" noWrap>
              BISNES ANALYTIC
            </Typography>
            <MenuComponent />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        anchor="left"
        onClose={toggleDrawer}
        className={classes.drawer}
        variant={isMdUp ? "permanent" : "temporary"}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {sidebarMenuData.length > 0 &&
            sidebarMenuData.map((el: sidebarMenuDataTypes) => {
              return (
                <ListItem
                  button
                  key={el.id}
                  onClick={() => navigateItem(el.path)}
                  selected={el.path === location.pathname}
                >
                  <ListItemIcon>{el.icon}</ListItemIcon>
                  <ListItemText primary={el.name} />
                </ListItem>
              );
            })}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
