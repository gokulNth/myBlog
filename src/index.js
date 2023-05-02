import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Blog from './components/Blog';
import { getBlog, getBlogs, getBlogsFromTag, getInitBlogs, getPopularBlogs, getRecentBlogs, searchBlogs } from './API';
import { Homepage } from './components/Homepage';
import { Header } from './components/Header';
import { ErrorPage } from './components/ErrorPage';

const router = createBrowserRouter([{
  path: "/myBlog",
  element: <Homepage />,
  loader: getInitBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/myBlog/home",
  element: <Homepage />,
  loader: getBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/myBlog/home/:page",
  element: <Homepage />,
  loader: getBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/myBlog/tag/:tagName",
  element: <Homepage />,
  loader: getBlogsFromTag,
  errorElement: <ErrorPage />
}, {
  path: "/myBlog/tag/:tagName/:page",
  element: <Homepage />,
  loader: getBlogsFromTag,
  errorElement: <ErrorPage />
}, {
  path: "/myBlog/recent",
  element: <Homepage />,
  loader: getRecentBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/myBlog/recent/:page",
  element: <Homepage />,
  loader: getRecentBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/myBlog/popular",
  element: <Homepage />,
  loader: getPopularBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/myBlog/popular/:page",
  element: <Homepage />,
  loader: getPopularBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/myBlog/search/:searchStr/",
  element: <Homepage />,
  loader: searchBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/myBlog/search/:searchStr/:page",
  element: <Homepage />,
  loader: searchBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/myBlog/:id",
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
