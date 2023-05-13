import React from 'react'
import errorPage from '../BlogData/Images/errorPage.webp'
import noData from '../BlogData/Images/noData.png'
import loading from '../BlogData/Images/loading.gif'
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

export function EmptyPage() {
    return <React.Fragment>
        <div className='text-center'>
            <img className='img-fluid rounded' style={{ objectFit: 'cover' }} src={noData} alt="NoData" />
            <h1 style={{
                color: '#8fc6ff',
                textShadow: '1px 1px 1px #024a9f,1px 2px 1px #024a9f,1px 5px 1px #024a9f,1px 4px 1px #024a9f,1px 5px 1px #024a9f,1px 6px 1px #024a9f,1px 7px 1px #024a9f,1px 8px 1px #024a9f,1px 9px 1px #024a9f,1px 10px 1px #024a9f'
            }}>No Data Found</h1>
        </div>
    </React.Fragment>
}

export function LoadingPage() {
    return (
        <React.Fragment>
            <div className='text-center' style={{ margin: '15vh' }}>
                <img src={loading} alt="Loading..." />
            </div>
        </React.Fragment>
    )
}