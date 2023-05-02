import errorPage from '../BlogData/Images/errorPage.webp'

export function ErrorPage() {
    return (
        <div className='text-center'>
            <img className='img-fluid rounded' style={{ objectFit: 'cover' }} src={errorPage} alt="ErrorPage" />
            <h1 style={{
                color: '#d9cfff',
                textShadow: '1px 1px 1px #6b57bb,1px 2px 1px #6b57bb,1px 5px 1px #6b57bb,1px 4px 1px #6b57bb,1px 5px 1px #6b57bb,1px 6px 1px #6b57bb,1px 7px 1px #6b57bb,1px 8px 1px #6b57bb,1px 9px 1px #6b57bb,1px 10px 1px #6b57bb'
            }}>Page Not Found</h1>
        </div>
    )
}