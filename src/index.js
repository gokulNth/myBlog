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
import { ErrorPage, LoadingPage } from './components/ErrorPage';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

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
      <div className='m-1'>
      <RouterProvider router={router} fallbackElement={<LoadingPage />} />
      </div>
  </React.StrictMode>
);
