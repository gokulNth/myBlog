import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';
import BlogsList from './BlogsList';

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
    const { data = [], hasNext, hasPrev, page } = useLoaderData()
    useEffect(() => {
        mouseAction()
    }, [])
    return data.length ? <div className='container'>
        <div className="row">
            <BlogsList data={data} />
        </div>
        {(hasNext || hasPrev) && <nav aria-label="Page navigation example">
            <ul className="pagination pagination-lg justify-content-center">
                <li className={`page-item ${!hasPrev && 'disabled'}`}>
                    <a className="page-link" href={`${page-1}`}>&laquo;</a>
                </li>
                <li className={`page-item ${!hasNext && 'disabled'}`}>
                    <a className="page-link" href={`${page+1}`}>&raquo;</a>
                </li>
            </ul>
        </nav>}
    </div> : <div>
        Oops We cannot find blog(s) with requested tag(s)
    </div>
}