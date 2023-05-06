import React, { useEffect } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import BlogsList from './BlogsList';
import { Header } from './Header'

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
                            <Link className="page-link" to={`/${page - 1}`}>&laquo;</Link>
                        </li>
                        <li className={`page-item ${!hasNext && 'disabled'}`}>
                            <Link className="page-link" to={`/${page + 1}`}>&raquo;</Link>
                        </li>
                    </ul>
                </nav>}
            </div>
            : <div>
                Oops We cannot find blog(s) with requested tag(s)
            </div>
        }
    </div>
}