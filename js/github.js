window.addEventListener("DOMContentLoaded", init);

async function init() {
    fetchGithubProfile();
    fetchGithubRepos();
}

async function fetchGithubProfile() {
    try {
        const response = await fetch("https://api.github.com/users/Gayeon07");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        
        const profileContainer = document.getElementById("github-profile");
        profileContainer.innerHTML = `
            <div class="profile-wrapper">
                <img src="${data.avatar_url}" class="profile-avatar">
                <div class="profile-info">
                    <h2>${data.name}</h2>
                    <p class="profile-bio">${data.bio || 'No bio available.'}</p>
                    <p class="profile-meta">
                        <strong>Public Repos:</strong> ${data.public_repos} &nbsp;&nbsp; 
                        <strong>Followers:</strong> ${data.followers} &nbsp;&nbsp;
                        <strong>Following:</strong> ${data.following}
                    </p>
                </div>
            </div>
        `;
    } catch(error) {
        console.error(error);
        const profileContainer = document.getElementById("github-profile");
        if(profileContainer) profileContainer.innerHTML = `<p>Error loading profile data.</p>`;
    }
}

async function fetchGithubRepos() {
    try {
        const response = await fetch("https://api.github.com/users/Gayeon07/repos?sort=updated");
        if (!response.ok) throw new Error("Network Error");
        const repos = await response.json();
        
        const reposContainer = document.getElementById("github-repos");
        reposContainer.innerHTML = '';
        
        repos.forEach(repo => {
            const repoCard = document.createElement("article");
            repoCard.className = "card project-card";

            repoCard.innerHTML = `
                <div class="card-content">
                    <h3 class="repo-title">
                        <a href="${repo.html_url}" target="_blank">
                            ${repo.name}
                        </a>
                    </h3>
                    <p class="repo-desc">
                        ${repo.description || "No description provided."}
                    </p>
                    <div class="tech-stack" style="margin-bottom: 10px;">
                        <span>${repo.language || "N/A"}</span>
                    </div>
                    <div class="repo-meta">
                        ⭐ ${repo.stargazers_count} &nbsp;&nbsp; 🍴 ${repo.forks_count}
                    </div>
                </div>
            `;
            reposContainer.appendChild(repoCard);
        });
    } catch(error) {
        console.error(error);
    }
}