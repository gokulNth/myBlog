import { Fragment, useEffect } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { EmptyPage } from "./ErrorPage";
import { navigatePage } from "./util";

const observer = new IntersectionObserver(enteries => {
    enteries.forEach(entry =>
        entry.isIntersecting
            ? entry.target.classList.add('showEle')
            : entry.target.classList.remove('showEle')
    )
});

function mouseAction() {
    const hiddenEle = document.querySelectorAll('.hiddEle1')
    hiddenEle.forEach(el => observer.observe(el));
}

function Quote(props) {
    const { data } = props;
    const { quote, quoteImage, color, quoteBy } = data
    const { pathname } = useLocation();
    useEffect(() => {
        mouseAction()
    }, [pathname]);
    return (
        <div className="col hiddEle1">
            <div className={
                `h-100 w-auto otro-blockquote border-5 border-start ${color === 'green'
                    ? 'border-success'
                    : color === 'blue'
                        ? 'border-primary'
                        : 'border-warning'
                }`} style={{ background: color === 'green' ? '#f2fff1' : color === 'blue' ? '#f1efff' : '#fffaec', borderRadius: 15 }}>
                <div className="card h-100 w-auto transparentbg border-0">
                    {quoteImage && <img src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg" style={{ maxWidth: '35rem' }} className="card-img-top rounded mx-auto d-block" alt="quoteImage" />}
                    {(quote)
                        ? <div className="card-body text-center">
                            <div className="card-text fs-4 d-none d-lg-block">{quote}</div>
                            {quoteBy && <div className="card-text fs-5 d-none d-lg-block text-end"><small className="text-muted">- {quoteBy}</small></div>}
                            <div className="card-text d-block d-lg-none">{quote}</div>
                            {quoteBy && <div className="card-text d-block d-lg-none text-end"><small className="text-muted"> - {quoteBy}</small></div>}
                        </div>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

function QuotesList() {
    const { data = [], hasNext, hasPrev, page } = useLoaderData();
    return <Fragment>
        <Header />
        <div className='container mb-2 mt-2'>
            {data.length
                ? <div className="row row-cols-1 row-cols-md-1 g-4">
                    {data.map((singleQuote, index) =>
                        <Quote data={singleQuote} key={index} />
                    )}
                </div>
                : <EmptyPage />
            }
        </div>
        {(hasNext || hasPrev) && <nav aria-label="Page navigation example">
            <ul className="pagination pagination-lg justify-content-center" style={{ cursor: 'pointer' }}>
                <li className={`page-item ${!hasPrev && 'disabled'}`}>
                    <div className="page-link" onClick={() => navigatePage(page - 1)}>&laquo;</div>
                </li>
                <li className={`page-item ${!hasNext && 'disabled'}`}>
                    <div className="page-link" onClick={() => navigatePage(page + 1)}>&raquo;</div>
                </li>
            </ul>
        </nav>}
    </Fragment>
}

export { Quote, QuotesList };