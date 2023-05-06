import React, { useEffect } from 'react';
import { useLoaderData, useLocation } from 'react-router-dom';
import BlogsList from './BlogsList';
import { Header } from './Header'
import { EmptyPage } from './ErrorPage';

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

function navigatePage(page) {
    let route = window.location.hash.split('/')
    route[route.length - 1] = page
    window.location.hash = route.join('/')
}

export function Homepage() {
    const { data, hasNext, hasPrev, page } = useLoaderData()
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
        mouseAction()
    }, [pathname]);
    return <div>
        <Header />
        {data.length
            ? <div className='container'>
                <div className="row">
                    <BlogsList data={data} />
                </div>
                {(hasNext || hasPrev) && <nav aria-label="Page navigation example">
                        <ul className="pagination pagination-lg justify-content-center">
                            <li className={`page-item ${!hasPrev && 'disabled'}`}>
                                <div className="page-link" onClick={() => navigatePage(page - 1)}>&laquo;</div>
                            </li>
                            <li className={`page-item ${!hasNext && 'disabled'}`}>
                                <div className="page-link" onClick={() => navigatePage(page + 1)}>&raquo;</div>
                            </li>
                        </ul>
                    </nav>}
            </div>
            : <EmptyPage />
        }
    </div>
}