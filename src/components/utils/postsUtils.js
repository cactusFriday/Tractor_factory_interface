
export function getPostsToDisplayFromAccident(accident) {
    /* Принимает инцидент и возвращает строку постов для вывода (12Л, 13П) */
    let posts = getPostsFromAccident(accident);
    let toDisplay = '';
    for (let i = 0; i < posts.length; i++) {
        toDisplay += convertPost(posts[i].post_number) + ' ';
    }
    return toDisplay;
}

export function getPostsFromAccident(accident) {
    /* Принимает инцидент и возвращает массив объектов [{'post_number': 2},] постов 
    для данного инцидента в соответствии с конфигурацией */
    let config = JSON.parse(localStorage.getItem('posts-config'));
    typeof config == 'undefined' ? console.log('Config: ', config) : console.log('Config: ', config);
    let posts = config.find(block => block.buttons_block_number === String(accident.posts_block)).posts;
    // console.log(posts);
    return posts;
}

export function getPostsBlockFromPost(post) {
    /* Принимает номер поста и возвращает номер блока постов в соответствии с конфигурацией */
    let config = JSON.parse(localStorage.getItem('posts-config'));
    // let posts_block = Array.prototype.find(block => block.posts.find(obj => obj.post_number === post), config).buttons_block_number;
    let posts_block = config.find(block => block.posts.find(obj => obj.post_number == post)).buttons_block_number;
    return posts_block;
}

function convertPost(post) {
    if (post < 14) {
        return String(post) + 'Л'
    } 
    else {
        return String(post - 13) + 'П'
    }
}