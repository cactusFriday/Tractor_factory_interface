

export function convertPost(post) {
    if (post < 14) {
        return String(post) + 'Л'
    } 
    else {
        return String(post - 13) + 'П'
    }
}

export function getPostsFromAccident(accident) {
    let config = JSON.parse(localStorage.getItem('posts-config'));
    let posts = config.find(block => block.buttons_block_number === parseInt(accident.posts_block)).posts;
    // console.log(posts);
    return posts;
}

export function getPostsBlockFromPost(post) {
    let config = JSON.parse(localStorage.getItem('posts-config'));
    // let posts_block = Array.prototype.find(block => block.posts.find(obj => obj.post_number === post), config).buttons_block_number;
    let posts_block = config.find(block => block.posts.find(obj => obj.post_number == post)).buttons_block_number;
    return posts_block;
}

// export default (convertPost, getPostsFromAccident);
// export default getPostsFromAccident;
// export default getPostsBlockFromAccident;