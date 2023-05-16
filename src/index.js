import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import {
  createHashRouter,
  RouterProvider
} from "react-router-dom";
import { Blog, BlogsList } from './components/Blog';
import { getBlog, getBlogs, getBlogsFromTag, getInitBlogs, getQuote, getQuotes } from './API';
import { ErrorPage, LoadingPage } from './components/ErrorPage';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { Homepage } from './components/Homepage';
import { QuotesList, SingleQuote } from './components/Quote';

if (process.env.NODE_ENV === 'production') disableReactDevTools();

const router = createHashRouter([{
  path: "/",
  element: <Homepage />,
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
  path: '/quote/:id',
  element: <SingleQuote />,
  loader: getQuote,
  errorElement: <ErrorPage />
  }, {
  path: "/tag/:tagName/:page",
  element: <BlogsList />,
  loader: getBlogsFromTag,
  errorElement: <ErrorPage />
}, {
  path: "/search/:searchStr/:page",
  element: <Homepage />,
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
