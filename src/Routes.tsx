import Layout from "Layout";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const File = lazy(() => import("pages/File"));
const Home = lazy(() => import("pages/Home"));
const Error = lazy(() => import("pages/Error"));
const Login = lazy(() => import("pages/Login"));
const Users = lazy(() => import("pages/Users"));
const Message = lazy(() => import("pages/Message"));
const EditFile = lazy(() => import("pages/EditFile"));
const EditUser = lazy(() => import("pages/EditUser"));
const CreateUser = lazy(() => import("pages/CreateUser"));
const CreateFile = lazy(() => import("pages/CreateFile"));
const EditMessage = lazy(() => import("pages/EditMessage"));
const FaqQuestion = lazy(() => import("pages/FaqQuestion"));
const CreateMessage = lazy(() => import("pages/CreateMessage"));
const FaqQuestionEdit = lazy(() => import("pages/FaqQuestionEdit"));
const CreateFaqQuestion = lazy(() => import("pages/CreateFaqQuestion"));
const AboutBusinessModel = lazy(() => import("pages/AboutBusinessModel"));
const AboutBusinessModelCreate = lazy(
  () => import("pages/AboutBusinessModelCreate")
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        element: <File />,
        path: "/pages/file",
      },
      {
        element: <CreateFile />,
        path: "/pages/file/create",
      },
      {
        element: <EditFile />,
        path: "/pages/file/edit/:id",
      },
      {
        element: <Users />,
        path: "/pages/users",
      },
      {
        element: <CreateUser />,
        path: "/pages/user/create",
      },
      {
        element: <EditUser />,
        path: "/pages/users/edit/:id",
      },
      {
        element: <FaqQuestion />,
        path: "/pages/faq-question",
      },

      {
        element: <CreateFaqQuestion />,
        path: "/pages/faq-question/create",
      },
      {
        element: <FaqQuestionEdit />,
        path: "/pages/faq-question/edit/:id",
      },
      {
        element: <Message />,
        path: "/pages/message",
      },
      {
        element: <CreateMessage />,
        path: "/pages/message/create",
      },
      {
        element: <EditMessage />,
        path: "/pages/message/edit/:id",
      },
      {
        element: <AboutBusinessModel />,
        path: "/pages/business-about-model",
      },
      {
        element: <AboutBusinessModelCreate />,
        path: "/pages/business-about-model/create",
      },
    ],
  },
  {
    element: <Login />,
    path: "/pages/login",
  },

  {
    path: "*",
    element: <Error />,
  },
]);

export default routes;
