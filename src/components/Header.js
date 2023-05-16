import React, { Fragment, useState } from 'react';
import logo from '../logo.png';
import { Link } from 'react-router-dom';

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
        window.location.hash = `/search/${searchTag}/1`
    }

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg sticky-top navbar-light d-none d-lg-block" style={{ background: '#feae00'}}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} height={100} alt='Menu' />
                    </Link>
                    <Fragment>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to='/about' className="nav-link btn">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/blogs/1' className="nav-link btn">Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/quotes/1' className="nav-link btn">Quote</Link>
                            </li>
                        </ul>
                    </Fragment>
                    {/* <div className="d-flex">
                        <input onChange={onTagChange} onKeyDown={onSearchTagChange} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button onClick={handleSearch} className="btn btn-outline-success">Search</button>
                    </div> */}
                </div>
            </nav>
            <nav className="navbar sticky-top navbar-expand-lg navbar-light d-block d-lg-none" style={{ background: '#feae00' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} height={70} alt='Menu' />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to='/about' className="nav-link btn">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/blogs/1' className="nav-link btn">Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/quotes/1' className="nav-link btn">Quote</Link>
                            </li>
                            {/* <li className='nav-item'>
                                <div className="d-flex">
                                    <input onChange={onTagChange} onKeyDown={onSearchTagChange} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button onClick={handleSearch} className="btn btn-outline-success">Search</button>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </Fragment>
    )
}