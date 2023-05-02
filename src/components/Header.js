import React, { Fragment, useState } from 'react';
import logo from '../logo.png';

export function Header() {
    const [searchTag, setSearchTag] = useState("");
    function onTagChange(event) {
        const { value = "" } = ((event || {}).currentTarget || {});
        setSearchTag(value)
    }
    function onSearchTagChange(event) {
        const { key = "" } = (event || {});
        if (key === "Enter") {
            handleSearch();
        }
    }
    function handleSearch() {
        window.location.pathname = `/search/${searchTag}`
    }

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light d-none d-lg-block sticky-top" style={{ background: '#ffbd7c'}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logo} height={100} alt='Menu' />
                    </a>
                    <Fragment>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href='/myBlog/home/1' className="nav-link btn">Home</a>
                            </li>
                            <li className="nav-item">
                                <a href='/myBlog/recent/1' className="nav-link btn">Recent</a>
                            </li>
                            <li className="nav-item">
                                <a href='/myBlog/popular/1' className="nav-link btn">Popular</a>
                            </li>
                        </ul>
                    </Fragment>
                    <div className="d-flex">
                        <input onChange={onTagChange} onKeyDown={onSearchTagChange} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button onClick={handleSearch} className="btn btn-outline-success">Search</button>
                    </div>
                </div>
            </nav>
            <nav className="navbar navbar-expand-lg navbar-light d-block d-lg-none" style={{ background: '#ffbd7c' }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logo} height={150} alt='Menu' />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a href='/myBlog/home/1' className="nav-link btn">Home</a>
                            </li>
                            <li className="nav-item">
                                <a href='/myBlog/recent/1' className="nav-link btn">Recent</a>
                            </li>
                            <li className="nav-item">
                                <a href='/myBlog/popular/1' className="nav-link btn">Popular</a>
                            </li>
                            <li className='nav-item'>
                                <div className="d-flex">
                                    <input onChange={onTagChange} onKeyDown={onSearchTagChange} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button onClick={handleSearch} className="btn btn-outline-success">Search</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}