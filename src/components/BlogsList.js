import React from "react";
import { Link } from "react-router-dom";
import { createHeading } from "./util";

export default function BlogsList(props) {
    const { data } = props;
    return (
        (data || []).map((blog, index) => {
            const { id, heading, subHeading = null, likes, partialContent, coverImage, createdTime } = blog || {};
            const { claps = 0, hearts = 0 } = likes || {};
            return (
                <div className="p-2 hiddEle" style={{ maxHeight: '50rem' }} key={index}>
                    <div className="card">
                        {heading && <div className="card-header">
                            <Link to={`/${id}`} style={{ textDecoration: 'none', color: '#875000' }}>
                                {createHeading(heading)}
                            </Link>
                        </div>}
                        {coverImage && <Link to={`/${id}`} style={{ textDecoration: 'none', color: '#875000' }} className="d-none d-lg-block">
                            <img src={require(`../BlogData/Images/${coverImage}`)} style={{ height: '30rem', objectFit: 'cover' }} className="card-img-top" alt={id} loading="lazy"></img>
                        </Link>}
                        {coverImage && <Link to={`/${id}`} style={{ textDecoration: 'none', color: '#875000' }} className="d-block d-lg-none">
                            <img src={require(`../BlogData/Images/${coverImage}`)} style={{ objectFit: 'cover' }} className="card-img-top" alt={id} loading="lazy"></img>
                        </Link>}
                        <div className="card-body">
                            <Link to={`/${id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                {subHeading && <h6 className="card-subtitle mb-2" dangerouslySetInnerHTML={{ __html: subHeading }} />}
                                <footer className={`${subHeading && 'blockquote-footer'}`}>
                                    <p className="card-text">{partialContent}...</p>
                                </footer>
                            </Link>
                            {/* <div className='py-2'>
                                <span className="m-1 text-success unselect"> <img src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/72/null/external-clapping-virus-icongeek26-linear-colour-icongeek26.png" alt='clapIcon' width={30} /> {claps}</span>
                                <span className="m-1 text-success unselect"> <img src="https://img.icons8.com/color/72/null/filled-like.png" alt='heartIcon' width={30} /> {hearts}</span>
                            </div> */}
                            <div className='text-muted' style={{ fontSize: 13 }}>Blogged at: {new Date(parseInt(createdTime)).toLocaleString(navigator.languages[0], {
                                year: 'numeric', month: 'long', day: 'numeric', hour: "2-digit", minute: "2-digit", hour12: true
                            })}</div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}