import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import {
  createHashRouter,
  RouterProvider
} from "react-router-dom";
import Blog from './components/Blog';
import { getBlog, getBlogs, getBlogsFromTag, getInitBlogs, getPopularBlogs, getRecentBlogs, searchBlogs } from './API';
import { Homepage } from './components/Homepage';
import { Header } from './components/Header';
import { ErrorPage } from './components/ErrorPage';

const router = createHashRouter([{
  path: "/",
  element: <Homepage />,
  loader: getInitBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/home/:page",
  element: <Homepage />,
  loader: getBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/tag/:tagName/:page",
  element: <Homepage />,
  loader: getBlogsFromTag,
  errorElement: <ErrorPage />
}, {
  path: "/recent/:page",
  element: <Homepage />,
  loader: getRecentBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/popular/:page",
  element: <Homepage />,
  loader: getPopularBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/search/:searchStr/:page",
  element: <Homepage />,
  loader: searchBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/:id",
  element: <Blog />,
  loader: getBlog,
  errorElement: <ErrorPage />
}]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Header />
      <div className='m-2 p-2'>
        <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
      </div>
  </React.StrictMode>
);
