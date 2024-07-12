import Layout from "Layout";
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

const File = lazy(() => import("pages/File"));
const Home = lazy(() => import("pages/Home"));
const News = lazy(() => import("pages/News"));
const Error = lazy(() => import("pages/Error"));
const Login = lazy(() => import("pages/Login"));
const Users = lazy(() => import("pages/Users"));
const Motto = lazy(() => import("pages/Motto"));
const Message = lazy(() => import("pages/Message"));
const Contact = lazy(() => import("pages/Contact"));
const Category = lazy(() => import("pages/Category"));
const EditUser = lazy(() => import("pages/EditUser"));
const EditMotto = lazy(() => import("pages/EditMotto"));
const CreateUser = lazy(() => import("pages/CreateUser"));
const FaqQuestion = lazy(() => import("pages/FaqQuestion"));
const EditMessage = lazy(() => import("pages/EditMessage"));
const MottoCreate = lazy(() => import("pages/MottoCreate"));
const EditCategory = lazy(() => import("pages/EditCategory"));
const ContactCreate = lazy(() => import("pages/ContactCreate"));
const CreateMessage = lazy(() => import("pages/CreateMessage"));
const ServicePercent = lazy(() => import("pages/ServicePercent"));
const CreateCategory = lazy(() => import("pages/CreateCategory"));
const FaqQuestionEdit = lazy(() => import("pages/FaqQuestionEdit"));
const CreateFaqQuestion = lazy(() => import("pages/CreateFaqQuestion"));
const ServicePercentEdit = lazy(() => import("pages/ServicePercentEdit"));
const CreateServicePercent = lazy(() => import("pages/CreateServicePercent"));

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
        element: <EditMessage />,
        path: "/pages/message/edit/:id",
      },
      {
        element: <Contact />,
        path: "/pages/contact",
      },
      {
        element: <Users />,
        path: "/pages/users",
      },
      {
        element: <ContactCreate />,
        path: "/pages/contact/create",
      },
      {
        element: <Category />,
        path: "/pages/category",
      },
      {
        element: <CreateMessage />,
        path: "/pages/message/create",
      },
      {
        element: <Message />,
        path: "/pages/message",
      },
      {
        element: <EditMotto />,
        path: "/pages/motto/edit/:id",
      },
      {
        element: <EditUser />,
        path: "/pages/users/edit/:id",
      },
      {
        element: <ServicePercent />,
        path: "/pages/services-percent",
      },
      {
        element: <ServicePercentEdit />,
        path: "/pages/services-percent/edit/:id",
      },
      {
        element: <EditCategory />,
        path: "/pages/category/edit/:id",
      },
      {
        element: <FaqQuestion />,
        path: "/pages/faq-question",
      },
      {
        element: <CreateUser />,
        path: "/pages/user/create",
      },
      {
        element: <CreateServicePercent />,
        path: "/pages/services-percent/create",
      },
      {
        element: <News />,
        path: "/pages/news",
      },
      {
        element: <CreateCategory />,
        path: "/pages/category/create-category",
      },
      {
        element: <Motto />,
        path: "/pages/motto",
      },
      {
        element: <MottoCreate />,
        path: "/pages/motto/create",
      },
      {
        element: <File />,
        path: "/pages/file",
      },
      {
        element: <CreateFaqQuestion />,
        path: "/pages/faq-question/create",
      },
      {
        element: <FaqQuestionEdit />,
        path: "/pages/faq-question/edit/:id",
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
