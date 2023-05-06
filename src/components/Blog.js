import React, { Fragment, useEffect } from "react";
import { useLoaderData, Link, useLocation } from 'react-router-dom';
import { createHeading } from "./util";
import { Header } from './Header';

function Blog() {
    const { content, id, relatedTags = [], coverImage, subHeading, heading, blogTag = [] } = (useLoaderData() || {});
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <React.Fragment>
            <Header />
            <div className="container my-2">
                <div className="row">
                    {heading && <div className="text-center">{createHeading(heading)}</div>}
                    {coverImage && <img src={coverImage} className="rounded mx-auto d-block" style={{ width: '70em', height: '35em', marginBottom: '2em' }} alt={`cover_${id}`} />}
                    <div className="col-md-10">
                        <div style={{ fontSize: '1.2rem' }}>
                            <div className="text-muted">{
                                (blogTag || []).map((tag, index) => {
                                    return <Fragment key={index}><Link to={`/tag/${tag.toLowerCase()}/1`} style={{ fontSize: 10, textDecoration: 'none' }} className="badge bg-success">{tag}</Link>&nbsp;</Fragment>
                                })
                            }</div>
                            <br />
                            {subHeading ? <u><b><h3>{subHeading}</h3></b></u> : null}
                            <div className="border border-secondary border-4 rounded">
                                <div className="px-2 mx-2" dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="text-center" style={{ margin: '15px' }}>
                            {relatedTags.length ? <div>Related Tags: <em>
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