import { Fragment, useEffect } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { EmptyPage } from "./ErrorPage";
import { navigatePage } from "./util";
import { CLIENT_BASE_URL } from "../API";

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
    const { quote, quoteImage, color, quoteBy, id } = data
    const { pathname } = useLocation();
    useEffect(() => {
        mouseAction()
    }, [pathname]);
    const bgColor = "#fff3dd"
    const borderColor = 'border-warning'
    return (
        <div className="col hiddEle1 mb-3 text-center">
            {quoteImage ?
                <figure class="figure">
                    <img src={require(`../BlogData/Images/Quote/${quoteImage}`)} className="img-fluid rounded mx-auto d-block" alt="quoteImage" />
                    {quote && quote}
                    <figcaption class="figure-caption text-end">
                        {quoteBy && <div className="card-text d-none d-lg-block text-center"><small className="text-muted">- {quoteBy}</small></div>}
                        {quoteBy && <div className="card-text d-block d-lg-none text-center"><small className="text-muted"> - {quoteBy}</small></div>}
                    </figcaption>
                </figure>
                : <div className={
                `h-100 w-auto otro-blockquote position-relative border-5 border-start ${borderColor}`} style={{ background: bgColor, borderRadius: 15 }}>
                {<div className="card-body text-center">
                    <div className="card-text fs-4 d-none d-lg-block">{quote}</div>
                    {quoteBy && <div className="card-text fs-5 d-none d-lg-block text-center"><small className="text-muted">- {quoteBy}</small></div>}
                    <div className="card-text d-block d-lg-none">{quote}</div>
                    {quoteBy && <div className="card-text d-block d-lg-none text-center"><small className="text-muted"> - {quoteBy}</small></div>}
                </div>}
                <span onClick={() => navigator.clipboard.writeText(`${CLIENT_BASE_URL}/#/quote/${id}`)} style={{ left: '96%', top: '0%', cursor: 'pointer', background: bgColor }} className="d-none d-lg-block position-absolute badge rounded-circle">
                    <img width="36" height="36" src="https://img.icons8.com/pulsar-line/96/share.png" alt="share"/>
                </span>
                <span onClick={() => navigator.clipboard.writeText(`${CLIENT_BASE_URL}/#/quote/${id}`)} style={{ left: '90%', top: '2%', cursor: 'pointer', background: bgColor }} className="d-block d-lg-none position-absolute badge rounded-circle">
                    <img width="36" height="36" src="https://img.icons8.com/pulsar-line/96/share.png" alt="share"/>
                </span>
            </div>}
        </div>
    )
}

function SingleQuote() {
    const { quote, quoteImage, color, quoteBy, id } = useLoaderData();
    return <Fragment>
        <Header />
        <div className="mt-4">
            <div className="container">
                <Quote data={{ quote, quoteImage, color, quoteBy, id }} />
            </div>
        </div>
    </Fragment>
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

export { Quote, QuotesList, SingleQuote };