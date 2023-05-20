import React, { Fragment, useEffect } from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { createHeading, navigatePage } from "./util";
import { EmptyPage, LoadingPage } from "./ErrorPage";
import { Header } from "./Header";

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


export function BlogsList() {
    let { data = [], hasNext, hasPrev, page } = useLoaderData()
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
        mouseAction()
    }, [pathname]);
    return (
        <Fragment>
            <Header />
            <div className='container'>
                {/* <nav class="navbar navbar-light bg-light mt-3">
                    <div class="container row">
                        <div class="navbar-brand col-3">
                            <button type="button" class="btn btn-warning text-dark btn-sm">New</button>
                            <button type="button" class="btn btn-warning text-dark btn-sm">Liked</button>
                        </div>
                        <div class="input-group w-auto col-8">
                            <input type="text" class="form-control" placeholder="Search" aria-describedby="button-addon2" />
                            <button class="btn btn-outline-dark" type="button" id="button-addon2">
                                <img width="25" height="25" src="https://img.icons8.com/pulsar-line/48/search.png" alt="search" />
                            </button>
                        </div>
                    </div>
                </nav> */}
                <div className="row row-cols-1 row-cols-md-1 g-4">
                    {data.length ?
                        (data || []).map((blog, index) => {
                            return <SingleBlog blog={blog} key={index} />
                        }) : <EmptyPage />}
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
            </div>
        </Fragment>
    )
}

export function SingleBlog(props) {
    const { blog = {} } = props;
    const { id, heading, subHeading = null, partialContent, coverImage, createdTime, duration } = blog || {};
    return (
        <div className="p-2 hiddEle">
            <div className="col bloglistbg">
                <div className="card transparentbg h-100" style={{ border: 0 }}>
                    <div className="row g-2">
                        {coverImage && <div className="col-md-4 h-100">
                            <Link to={`/blog/${id}`} style={{ textDecoration: 'none', color: '#875000', boxShadow: '15px 15px 10px grey' }} className="d-none d-lg-block">
                                <img src={require(`../BlogData/Images/Blog/${coverImage}`)} style={{ height: '100%', objectFit: 'cover' }} className="card-img-top" alt={id} loading="lazy"></img>
                            </Link>
                            <Link to={`/blog/${id}`} style={{ textDecoration: 'none', color: '#875000', boxShadow: 'grey 0px 20px 16px 0px' }} className="d-block d-lg-none">
                                <img src={require(`../BlogData/Images/Blog/${coverImage}`)} style={{ objectFit: 'cover' }} className="card-img-top" alt={id} loading="lazy"></img>
                            </Link>
                        </div>}
                        <div className={`${coverImage ? 'col-md-8' : ''} card-body`}>
                            <Link to={`/blog/${id}`} style={{ textDecoration: 'none', color: '#875000' }}>
                                <div className={`${!coverImage ? 'text-center' : ''}`}>{createHeading(heading)}</div>
                                {subHeading && <h6 className="card-subtitle mb-2" dangerouslySetInnerHTML={{ __html: subHeading }} />}
                                <footer className={`${subHeading && 'blockquote-footer'}`}>
                                    <p className="card-text">{partialContent}...</p>
                                </footer>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-end">
                    <nobr className='text-muted unselect' style={{ fontSize: 13 }}>Blogged @ {new Date(parseInt(createdTime)).toLocaleString(navigator.languages[0], {
                        year: 'numeric', month: 'short', day: 'numeric', hour: "2-digit", minute: "2-digit"
                    })} </nobr> | <nobr className="bg-danger rounded-pill text-light"><span className="m-2">{duration ? `${duration} minute read` : `Few seconds read`}</span></nobr>
                </div>
            </div>
        </div>
    )
}

export function Blog() {
    const { id, relatedTags = [], coverImage, subHeading, heading, blogTag = [], views, duration, content } = (useLoaderData() || {});
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <React.Fragment>
            <Header />
            <div className="container my-2">
                {heading && <div className="text-center">{createHeading(heading)}</div>}
                {coverImage && <img src={require(`../BlogData/Images/Blog/${coverImage}`)} className="rounded mx-auto d-none d-lg-block" style={{ width: '70vw', height: '35em', marginBottom: '2em' }} alt={`cover_${id}`} loading="lazy" />}
                {coverImage && <img src={require(`../BlogData/Images/Blog/${coverImage}`)} className="rounded mx-auto d-block d-lg-none" style={{ width: '80vw', height: '15em', marginBottom: '2em' }} alt={`cover_${id}`} loading="lazy" />}
                <div>
                    <div style={{ fontSize: '1.2rem' }}>
                        <div className="text-muted">{
                            ([...(blogTag || []), ...(relatedTags || [])]).map((tag, index) => {
                                return <Fragment key={index}><Link to={`/tag/${tag.toLowerCase()}/1`} style={{ fontSize: 10, textDecoration: 'none' }} className="badge bg-success">{tag}</Link>&nbsp;</Fragment>
                            })
                        }</div>

                        {subHeading ? <Fragment><br /><div className="text-break"><u><b><h3>{subHeading}</h3></b></u></div></Fragment> : null}
                        <div className="unselect text-dark m-2 text-end" style={{ fontSize: 14 }}>
                            <span className="m-2">View count: {views || 0}</span> | <span className="text-light bg-danger rounded"><span className="m-2">{`${duration || 0} minute read`}</span></span>
                        </div>
                        <div className="border border-secondary border-4 rounded" style={{ background: "#ffdb8d78" }}>
                            {content === "" ? <LoadingPage /> : <div className="px-2 m-2" dangerouslySetInnerHTML={{ __html: content }} />}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}