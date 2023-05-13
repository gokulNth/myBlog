import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import {
  createHashRouter,
  RouterProvider
} from "react-router-dom";
import { Blog, BlogsList } from './components/Blog';
import { getBlog, getBlogs, getBlogsFromTag, getInitBlogs, getQuotes } from './API';
import { ErrorPage, LoadingPage } from './components/ErrorPage';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { HomePage } from './components/HomePage';
import { QuotesList } from './components/Quote';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

const router = createHashRouter([{
  path: "/",
  element: <HomePage />,
  loader: getInitBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/blog/:id",
  element: <Blog />,
  loader: getBlog,
  errorElement: <ErrorPage />
}, {
  path: "/blogs/:page",
  element: <BlogsList />,
  loader: getBlogs,
  errorElement: <ErrorPage />
}, {
  path: "/quotes/:page",
  element: <QuotesList />,
  loader: getQuotes,
  errorElement: <ErrorPage />
}, {
  path: "/tag/:tagName/:page",
  element: <BlogsList />,
  loader: getBlogsFromTag,
  errorElement: <ErrorPage />
}, {
  path: "/search/:searchStr/:page",
  element: <HomePage />,
  loader: getInitBlogs,
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
