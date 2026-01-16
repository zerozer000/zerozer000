const username = 'zero000zer'; // Replace with your username
const repoListElement = document.getElementById('repo-list');

async function fetchAllRepos() {
    // The API returns a max of 100 repos per page; use pagination for more
    const url = `https://api.github.com/{username}/repos?per_page=100`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const repos = await response.json();
        displayRepos(repos);

    } catch (error) {
        console.error("Could not fetch repositories:", error);
        repoListElement.innerHTML = `<p>Error loading repositories: ${error.message}</p>`;
    }
}

function displayRepos(repos) {
    repoListElement.innerHTML = ''; // Clear the "Loading" message

    if (repos.length === 0) {
        repoListElement.innerHTML = '<p>No repositories found.</p>';
        return;
    }

    const list = document.createElement('ul');

    repos.forEach(repo => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = repo.html_url; // Link to the repo's GitHub page
        link.textContent = repo.name;
        listItem.appendChild(link);

        if (repo.description) {
            const description = document.createElement('p');
            description.textContent = repo.description;
            listItem.appendChild(description);
        }

        list.appendChild(listItem);
    });

    repoListElement.appendChild(list);
}

// Call the function to fetch and display repos when the page loads
fetchAllRepos();
