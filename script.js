// script.js
const repoList = document.getElementById('repo-list');
const activityList = document.getElementById('activity-list');

const username = 'KotlinModder';

// Function to fetch repositories
async function fetchRepositories() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();
        renderRepositories(data);
    } catch (error) {
        console.error('Error fetching repositories:', error);
    }
}

// Function to render repositories
function renderRepositories(repos) {
    const repoHtml = repos.map(repo => {
        return `
            <div class="repo">
                <h3><a href="${repo.html_url}">${repo.name}</a></h3>
                <p>${repo.description || 'No description'}</p>
            </div>
        `;
    }).join('');
    repoList.innerHTML = repoHtml;
}

// Function to fetch github activity
async function fetchGithubActivity() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/events`);
        const data = await response.json();
        renderGithubActivity(data);
    } catch (error) {
        console.error('Error fetching github activity:', error);
    }
}

// Function to render github activity
function renderGithubActivity(events) {
    const activityHtml = events.map(event => {
        return `
            <div class="activity">
                <p>${event.type} on <a href="${event.repo.url}">${event.repo.name}</a></p>
            </div>
        `;
    }).join('');
    activityList.innerHTML = activityHtml;
}

// Call functions to fetch data
fetchRepositories();
fetchGithubActivity();
