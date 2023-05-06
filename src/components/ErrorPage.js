import React from 'react'
import errorPage from '../BlogData/Images/errorPage.webp'
import { Header } from './Header'

export function ErrorPage() {
    return (
        <React.Fragment>
            <Header/>
        <div className='text-center'>
            <img className='img-fluid rounded' style={{ objectFit: 'cover' }} src={errorPage} alt="ErrorPage" />
            <h1 style={{
                color: '#d9cfff',
                textShadow: '1px 1px 1px #6b57bb,1px 2px 1px #6b57bb,1px 5px 1px #6b57bb,1px 4px 1px #6b57bb,1px 5px 1px #6b57bb,1px 6px 1px #6b57bb,1px 7px 1px #6b57bb,1px 8px 1px #6b57bb,1px 9px 1px #6b57bb,1px 10px 1px #6b57bb'
            }}>Page Not Found</h1>
            </div>
        </React.Fragment>
    )
}