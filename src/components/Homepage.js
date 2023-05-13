import React, { Fragment, useEffect } from 'react'
import { useLoaderData, useLocation } from 'react-router-dom'
import { SingleBlog } from './Blog';
import { Header } from './Header';
import { Quote } from './Quote';

const observer = new IntersectionObserver(enteries => {
    enteries.forEach(entry =>
        entry.isIntersecting
            ? entry.target.classList.add('showEle')
            : entry.target.classList.remove('showEle')
    )
});

function mouseAction() {
    const hiddenEle = document.querySelectorAll('.hiddEle')
    hiddenEle.forEach(el => observer.observe(el));
}

export function Homepage() {
    const { blog, quote } = useLoaderData();
    const { data = [] } = blog;
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
        mouseAction()
    }, [pathname]);
    return (
        <Fragment>
            <Header />
            <div className='container mt-2 mb-2'>
                <div className='container'>
                    <h1 style={{fontFamily: 'cursive', fontWeight: 'bolder'}}>Blog Topics</h1>
                    {data.length
                        ? <div className="row row-cols-1 row-cols-md-1 g-4">
                            {data.map((singleBlog, index) =>
                                <SingleBlog blog={singleBlog} key={index} />
                            )}
                        </div>
                        : null
                    }
                </div>
                <br />
                <br /><br /><br /><br />
                <div className='container mb-2'>
                    <h1 style={{ fontFamily: 'cursive', fontWeight: 'bolder' }}>Quotes</h1>
                    {quote.length
                        ? <div className="row row-cols-1 row-cols-md-1 g-4">
                            {quote.map((singleQuote, index) =>
                                <Quote data={singleQuote} key={index} />
                            )}
                        </div>
                        : null
                    }
                </div>
                <br />
            </div>
        </Fragment>
    )
}