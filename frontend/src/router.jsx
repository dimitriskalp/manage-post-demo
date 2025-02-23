import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/Users.jsx";
import NotFound from "./views/NotFound.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Posts from "./views/Posts.jsx";
import PostCreateForm from "./views/PostCreateForm.jsx";
import PostsLiked from "./views/PostsLiked.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/posts" />
      },
      {
        path: '/dashboard',
        element: < Dashboard />
      },
      {
        path: '/liked-posts',
        element: < PostsLiked />
      },
      {
        path: '/posts',
        element: < Posts />
      },
      {
        path: '/post/create',
        element: < PostCreateForm key="postCreate"/>
      }
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: < Login />
      },
      {
        path: '/signup',
        element: < Signup />
      },
    ]
  },
  {
    path: '*',
    element: < NotFound />
  }
])

export default router;
