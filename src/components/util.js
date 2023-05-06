export function createHeading(heading) {
    return (
        <h3 className="card-title" dangerouslySetInnerHTML={{ __html: heading }} />
    )
}