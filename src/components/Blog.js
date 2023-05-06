import React, { Fragment } from "react";
import { useLoaderData, Link } from 'react-router-dom';
import { createHeading } from "./util";

function Blog() {
    const { content, id, relatedTags, coverImage, subHeading, heading, blogTag } = (useLoaderData() || {});
    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    {heading && <div className="text-center">{createHeading(heading)}</div>}
                    {coverImage && <img src={coverImage} className="rounded mx-auto d-block" style={{ width: '70em', height: '35em', marginBottom: '2em' }} alt={`cover_${id}`} />}
                    <div className="col-10 border border-secondary border-4 rounded">
                        <div style={{ fontSize: '1.2rem' }}>
                            <h4 className="text-muted">{subHeading} {
                                blogTag.map((tag, index) => {
                                    return <Fragment key={index}><Link to={`/tag/${tag.toLowerCase()}/1`} style={{ fontSize: 10, textDecoration: 'none' }} className="badge bg-success">{tag}</Link>&nbsp;</Fragment>
                                })
                            } </h4>
                            <br />
                            <div>
                                <div className="px-2 mx-2" dangerouslySetInnerHTML={{ __html: content }} />
                            </div>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="text-center" style={{ margin: '15px' }}>
                            Related Tags: <em>
                                {relatedTags.map((tag, index) => {
                                    return <div key={index}><Link to={`/tag/${tag.toLowerCase()}/1`} className="badge bg-secondary">{tag}</Link></div>
                                })}
                            </em>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Blog;