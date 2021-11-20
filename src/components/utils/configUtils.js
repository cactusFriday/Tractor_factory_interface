import axios from "axios";

const getConfigAPIUrl = "https://tractor-factory-interface.herokuapp.com/api/conveyor-state/buttons-posts/";


export function getConfig() {
    axios.get(getConfigAPIUrl)
        .then(res => {
            saveToLocalStorage(res.data.results);
        })
        .catch((error) => {
            console.log("FAILED FETCHING CONFIG");
        })
}

function saveToLocalStorage(config) {
    let localStorageConfig = localStorage.getItem('posts-config');
    if (localStorageConfig !==  null) {
        localStorage.removeItem('posts-config');
    }
    localStorage.setItem('posts-config', JSON.stringify(config));
}