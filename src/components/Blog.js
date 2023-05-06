import React, { Fragment, useEffect, useState } from "react";
import { useLoaderData, Link, useLocation } from 'react-router-dom';
import { createHeading } from "./util";
import { Header } from './Header';

function Blog() {
    const { content, id, relatedTags = [], coverImage, subHeading, heading, blogTag = [], likes } = (useLoaderData() || {});
    const [likeCount, setLikeCount] = useState(likes || {})
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    const handleLike = (e) => {
        const [mode, id] = e.target.id.split("_");
        if (mode === "claps") {
            setLikeCount(Object.assign({}, likeCount, { claps: likeCount.claps ? likeCount.claps + 1 : 1 }))
        } else if (mode === "hearts") {
            setLikeCount(Object.assign({}, likeCount, { hearts: likeCount.hearts ? likeCount.hearts + 1 : 1 }))
        }
    }
    return (
        <React.Fragment>
            <Header />
            <div className="container my-2">
                <div className="row">
                    {heading && <div className="text-center">{createHeading(heading)}</div>}
                    {coverImage && <img src={require(`../BlogData/Images/${coverImage}`)} className="rounded mx-auto d-block" style={{ width: '70em', height: '35em', marginBottom: '2em' }} alt={`cover_${id}`} loading="lazy" />}
                    <div className="col-md-10">
                        <div style={{ fontSize: '1.2rem' }}>
                            <div className="text-muted">{
                                (blogTag || []).map((tag, index) => {
                                    return <Fragment key={index}><Link to={`/tag/${tag.toLowerCase()}/1`} style={{ fontSize: 10, textDecoration: 'none' }} className="badge bg-success">{tag}</Link>&nbsp;</Fragment>
                                })
                            }</div>
                            <br />
                            {/* <nav className="navbar bg-light">
                                <div className="container-fluid">
                                    <span id={`claps_${id}`} onClick={handleLike} style={{ cursor: 'pointer' }} className="m-1 text-success unselect"> <img src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/72/null/external-clapping-virus-icongeek26-linear-colour-icongeek26.png" alt='clapIcon' width={30} id={`claps_${id}`} /> {(likeCount || {}).claps || 0}</span>
                                    <span id={`hearts_${id}`} onClick={handleLike} style={{ cursor: 'pointer' }} className="m-1 text-success unselect"> <img src="https://img.icons8.com/color/72/null/filled-like.png" alt='heartIcon' width={30} id={`hearts_${id}`} /> {(likeCount || {}).hearts || 0}</span>
                                </div>
                            </nav> */}
                            {subHeading ? <u><b><h3><div dangerouslySetInnerHTML={{ __html: subHeading }}></div></h3></b></u> : null}
                            <div className="border border-secondary border-4 rounded" style={{ background: "#ffdb8d78"}}>
                                <div className="px-2 mx-2" dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="text-center" style={{ margin: '15px' }}>
                            {relatedTags.length ? <div>Related Tags: <br/><em>
                                {(relatedTags || []).map((tag, index) => {
                                    return <><Link key={index} to={`/tag/${tag.toLowerCase()}/1`} className="badge bg-secondary">{tag}</Link>&nbsp;</>
                                })}
                            </em></div>
                            : null}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Blog;