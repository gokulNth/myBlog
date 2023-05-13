import { Fragment } from "react";

export function createHeading(heading) {
    return (
        <Fragment>
            <h3 className="card-title decorate d-none d-lg-block" style={{ color: "darkred" }}>
                {heading}
            </h3>
            <h3 className="card-title decorate d-block d-lg-none fs-5" style={{ color: "darkred" }}>
                {heading}
            </h3>
        </Fragment>
    )
}

export function navigatePage(page) {
    let route = window.location.hash.split('/')
    route[route.length - 1] = page
    window.location.hash = route.join('/')
}