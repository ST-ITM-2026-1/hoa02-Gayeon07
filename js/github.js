window.addEventListener("DOMContentLoaded", init);

async function init() {
    fetchGithubProfile();
    fetchGithubRepos();
}

async function fetchGithubProfile() {
    try{
        const response = await fetch("https://api.github.com/users/Gayeon07");
        const data = await response.json();
        console.log(data);
    }catch(error){
        console.log(error);
    }
}

async function fetchGithubRepos() {
    try{
        const response = await fetch("https://api.github.com/users/Gayeon07/repos");
        const data = await response.json();
        console.log(data);
    }catch(error){
        console.log(error);
    }
}