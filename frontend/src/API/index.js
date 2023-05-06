import { data } from "../BlogData";

export function getBlog({ params }) {
    const blogData = data.filter(blog => blog.id === params.id)
    return blogData.length ? blogData[0] : undefined;
}

export function getBlogs({ params }) {
    const { page = 1 } = params;
    const pageNum = parseInt(page);
    const blogsInPage = data.slice((pageNum - 1) * 5, pageNum * 5)
    const blogData = getBlogData(blogsInPage.sortByKey("id"))
    return blogData.length ? generateResp(pageNum, blogData) : undefined
}

export function getInitBlogs() {
    let initialBlogs = [...getRecentBlogs().data.slice(0, 3), ...getPopularBlogs().data.slice(0, 2)]
    return generateResp(1, initialBlogs.shuffle(), initialBlogs);
}

//check
export function getBlogsFromTag({ params }) {
    const { tagName, page = 1 } = params;
    const tagNames = tagName.toLowerCase().split(",");
    const pageNum = parseInt(page); 
    let blogDataByTag = [];
    tagNames.map(tagName => blogDataByTag = Object.assign([], data.filter(({ blogTag = [], relatedTags = [] }) => {
        return !!tagName ? blogTag.hasSome(tagName) || relatedTags.hasSome(tagName) : false;
    })));
    const blogsInPage = blogDataByTag.slice((pageNum - 1) * 5, pageNum * 5)
    return blogsInPage.length ? generateResp(pageNum, getBlogData(blogsInPage.sortByKey("createdTime", true)), blogDataByTag) : undefined;
}

export function getRecentBlogs(payload = {}) {
    const { page = 1 } = (payload || {}).params || {};
    const pageNum = parseInt(page);
    let blogData = getBlogData(data.sortByKey("createdTime", true))
    const blogsInPage = blogData.slice((pageNum - 1) * 5, pageNum * 5)
    return blogData.length ? generateResp(pageNum, blogsInPage) : undefined;
}

export function getPopularBlogs(payload = {}) {
    const { page = 1 } = (payload || {}).params || {};
    const pageNum = parseInt(page);
    let likeCountlist = data.map((blog) => {
        const { likes = {} } = blog;
        return Object.assign({}, blog, { totlikes: (likes.claps || 0) + (likes.hearts || 0) })
    });
    const blogData = getBlogData(likeCountlist.sortByKey("totlikes", true))
    const blogsInPage = blogData.slice((pageNum - 1) * 5, pageNum * 5)
    return blogData.length ? generateResp(pageNum, blogsInPage) : undefined;
}

export function searchBlogs({params}) {
    const { searchStr, page = 1 } = params;
    const str = searchStr.trim().toLowerCase();
    const pageNum = parseInt(page);
    const blogDataByTag = Object.assign([], data.filter(({ blogTag = [], relatedTags = [], heading = {}, subHeading = {}, content = {} }) => {
        return !!str ? (blogTag.hasSome(str)
            || relatedTags.hasSome(str) || content.toLowerCase().includes(str.toLowerCase())
            || (heading?.props?.children?.toLowerCase() || "").includes(str.toLowerCase()))
            || (subHeading?.props?.children?.toLowerCase() || "").includes(str.toLowerCase())
            : false;
    }));
    const blogsInPage = blogDataByTag.slice((pageNum - 1) * 5, pageNum * 5)
    return blogsInPage.length ? generateResp(pageNum, getBlogData(blogsInPage.sortByKey("createdTime", true)), blogDataByTag) : undefined;
}

function getBlogData(list) {
    return list.map(blog => ({
        id: blog.id || 0,
        heading: blog.heading || null,
        subHeading: blog.subHeading || null,
        partialContent: blog.partialContent || null,
        likes: blog.likes || {},
        coverImage: blog.coverImage || null,
        createdTime: blog.createdTime || null
    }))
}

function generateResp(pageNum, blogData, allData) {
    allData = allData ? allData : data
    return ({
        data: blogData,
        hasNext: allData.length > ((pageNum) * 5),
        hasPrev: pageNum > 1,
        page: pageNum,
        totalPage: allData.length
    })
}