// script.js
const repoList = document.getElementById('repo-list');
const activityList = document.getElementById('activity-list');

const username = 'kotlinmodder';

// Function to fetch repositories
async function fetchRepositories() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&direction=desc`);
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

// Function to fetch contribution activity
async function fetchContributionActivity() {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&direction=desc`);
        const data = await response.json();
        const contributions = await Promise.all(data.map(async repo => {
            const repoResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/contributors`);
            const repoData = await repoResponse.json();
            const contributor = repoData.find(contributor => contributor.login === username);
            return {
                repo: repo.name,
                contributions: contributor ? contributor.contributions : 0
            };
        }));
        renderContributionActivity(contributions);
    } catch (error) {
        console.error('Error fetching contribution activity:', error);
    }
}

// Function to render contribution activity
function renderContributionActivity(contributions) {
    const activityHtml = contributions.map(contribution => {
        return `
            <div class="activity">
                <p>Contributed ${contribution.contributions} times to <a href="https://github.com/${username}/${contribution.repo}">${contribution.repo}</a></p>
            </div>
        `;
    }).join('');
    activityList.innerHTML = activityHtml;
}

// Call functions to fetch data
fetchRepositories();
fetchContributionActivity();
