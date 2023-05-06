const BASE_URL = 'https://kikisapi.onrender.com';

export async function getBlog({ params }) {
    const i = await fetch(`${BASE_URL}/${params.id}`);
    const i_1 = await i.json();
    return i_1.data;
}

export async function getBlogs({ params }) {
    const { page = 1 } = params;
    const i = await fetch(`${BASE_URL}/home?_page=${page}`);
    const i_1 = await i.json();
    return i_1.data;
}

export async function getRecentBlogs({ params }) {
    const { page = 1 } = params;
    const i = await fetch(`${BASE_URL}/recent?_page=${page}`);
    const i_1 = await i.json();
    return i_1.data;
}

export async function getPopularBlogs({ params }) {
    const { page = 1 } = params;
    const i = await fetch(`${BASE_URL}/popular?_page=${page}`);
    const i_1 = await i.json();
    return i_1.data;
}

export async function getInitBlogs() {
    const i = await fetch(`${BASE_URL}`);
    const i_1 = await i.json();
    return i_1.data;
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