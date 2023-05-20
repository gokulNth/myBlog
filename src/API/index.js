const BASE_URL = (process.env.NODE_ENV === 'production') ? 'https://kikisapi.onrender.com' : "http://localhost:3001";
export const CLIENT_BASE_URL = (process.env.NODE_ENV === 'production') ? 'https://kikisthoughts.onrender.com' : "http://localhost:3000";

export async function getBlog({ params }) {
    const i = await fetch(`${BASE_URL}/blog/${params.id}`);
    const i_1 = await i.json();
    increaseCount(params.id)
    const content = await getBlogContent({ params })
    const res = await content.text()
    return { ...i_1.data, content: res };
}

export async function getQuote({ params }) {
    const i = await fetch(`${BASE_URL}/quote/${params.id}`);
    const i_1 = await i.json();
    return i_1.data;
}

export async function getBlogContent({ params }) {
    const i = await fetch(`${BASE_URL}/${params.id}/content`);
    return i;
}

export async function getBlogs({ params }) {
    const { page = 1 } = params;
    const sortBy = window.localStorage.getItem("blogFilter") || "createdTime"
    const i = await fetch(`${BASE_URL}/blogs?_page=${page}&_sortBy=${sortBy}`);
    const i_1 = await i.json();
    return i_1.data;
}

export async function getQuotes({ params }) {
    const { page = 1 } = params;
    const i = await fetch(`${BASE_URL}/quotes?_page=${page}`);
    const i_1 = await i.json();
    return i_1.data;
}

// export async function getRecentBlogs({ params }) {
//     const { page = 1 } = params;
//     const i = await fetch(`${BASE_URL}/recent?_page=${page}`);
//     const i_1 = await i.json();
//     return i_1.data;
// }

// export async function getPopularBlogs({ params }) {
//     const { page = 1 } = params;
//     const i = await fetch(`${BASE_URL}/popular?_page=${page}`);
//     const i_1 = await i.json();
//     return i_1.data;
// }

export async function getInitBlogs() {
    const i = await fetch(`${BASE_URL}`);
    const i_1 = await i.json();
    return i_1;
}

export async function getBlogsFromTag({ params }) {
    const { page = 1, tagName } = params;
    const i = await fetch(`${BASE_URL}/tags/${tagName}?_page=${page}`);
    const i_1 = await i.json();
    return i_1.data;
}

export async function searchBlogs({params}) {
    const { page = 1, searchStr } = params;
    const i = await fetch(`${BASE_URL}/search/${searchStr}?_page=${page}`);
    const i_1 = await i.json();
    return i_1.data;
}

function increaseCount(id) {
    try {
        if (sessionStorage.getItem("visited") !== null) {
            const visitedList = sessionStorage.getItem("visited").split(",")
            if (!visitedList.includes(String(id))) {
                fetch(`${BASE_URL}/blog/${id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({ action: "views" }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }).then(() => {
                    visitedList.push(id)
                    sessionStorage.setItem("visited", visitedList)
                });
            }
        } else {
            sessionStorage.setItem("visited", [id])
        }
    } catch (e) { }
}