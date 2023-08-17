
const seasonDropdown = document.getElementById('seasonDropdown');
const playerDropdown = document.getElementById('playerDropdown');
const averageDataDisplay = document.getElementById('averageDataDisplay');
const statisticsDisplay = document.getElementById('statistics');

// Fetch seasons and populate the season dropdown
fetchSeasons();

// Event listener for season dropdown change
seasonDropdown.addEventListener('change', handleSeasonSelection);

// Event listener for player dropdown change
playerDropdown.addEventListener('change', handlePlayerSelection);

// Function to handle player selection
function handlePlayerSelection() {
    const selectedPlayerId = playerDropdown.value;
    const selectedSeasonId = seasonDropdown.value;

    if (selectedPlayerId && selectedSeasonId) {
        fetchPlayerStatistics(selectedSeasonId, selectedPlayerId);
    } else {
        clearStatistics();
    }
}


// Function to fetch seasons from the server and populate the season dropdown
function fetchSeasons() {
    fetch('/api/seasons')
        .then(response => response.json())
        .then(data => {
            data.forEach(season => {
                const option = document.createElement('option');
                option.value = season.id;
                option.textContent = season.name;
                seasonDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching seasons:', error);
        });
}

// Function to handle season selection
function handleSeasonSelection() {
    const selectedSeasonId = seasonDropdown.value;
    if (selectedSeasonId) {
        fetchPlayers(selectedSeasonId);
    } else {
        clearPlayerDropdown();
        clearAverageData();
        clearStatistics();
    }
}

// Function to fetch players for the selected season
function fetchPlayers(seasonId) {
    fetch(`/api/seasons/${seasonId}/players`)
        .then(response => response.json())
        .then(players => {
            clearPlayerDropdown();
            players.forEach(player => {
                const option = document.createElement('option');
                option.value = player.id;
                option.textContent = player.name;
                playerDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching players for season:', error);
        });
}


// Function to fetch statistics for the selected player
function fetchPlayerStatistics(seasonId, playerId) {
    fetch(`/api/seasons/${seasonId}/players/${playerId}/statistics`)
        .then(response => response.json())
        .then(statistics => {
            // Display player statistics separately in the statisticsDisplay element
            const formattedStatistics = `
                <p><button class="stat-label" onclick="toggleStat(this)"><span class="stat-name">Average 3 Darts:</span></button> <span class="stat-value hidden">${statistics.statistics.average_3_darts}</span></p>
                <p><button class="stat-label" onclick="toggleStat(this)"><span class="stat-name">Checkout Percentage:</span></button> <span class="stat-value hidden">${statistics.statistics.checkout_percentage}%</span></p>
                <p><button class="stat-label" onclick="toggleStat(this)"><span class="stat-name">Checkouts:</span></button> <span class="stat-value hidden">${statistics.statistics.checkouts}</span></p>
                <p><button class="stat-label" onclick="toggleStat(this)"><span class="stat-name">Checkouts (100s+):</span></button> <span class="stat-value hidden">${statistics.statistics.checkouts_100s_plus}</span></p>
                <p><button class="stat-label" onclick="toggleStat(this)"><span class="stat-name">Highest Checkout:</span></button> <span class="stat-value hidden">${statistics.statistics.highest_checkout}</span></p>
                <p><button class="stat-label" onclick="toggleStat(this)"><span class="stat-name">Scores (100s+):</span></button> <span class="stat-value hidden">${statistics.statistics.scores_100s_plus}</span></p>
                <p><button class="stat-label" onclick="toggleStat(this)"><span class="stat-name">Scores (140s+):</span></button> <span class="stat-value hidden">${statistics.statistics.scores_140s_plus}</span></p>
                <p><button class="stat-label" onclick="toggleStat(this)"><span class="stat-name">Scores (180s):</span></button> <span class="stat-value hidden">${statistics.statistics.scores_180s}</span></p>
            `;
            statisticsDisplay.innerHTML = formattedStatistics;
        })
        .catch(error => {
            console.error('Error fetching player statistics:', error);
        });
}


// Function to toggle the visibility of the stat value
function toggleStat(statLabel) {
    const statValue = statLabel.nextElementSibling;
    statValue.classList.toggle('hidden');
}

let activeStatButton = null; // To keep track of the active stat button

// Function to toggle stat visibility
function toggleStat(button) {
    if (activeStatButton === button) {
        // If the clicked button is already active, deactivate it
        deactivateStatButton();
    } else {
        // Deactivate the previously active button (if any)
        deactivateStatButton();
        // Activate the clicked button and show its value
        activeStatButton = button;
        button.classList.add('active');
        showStatValue(button);
    }
}

// Function to deactivate the active stat button and hide its value
function deactivateStatButton() {
    if (activeStatButton) {
        activeStatButton.classList.remove('active');
        hideStatValue(activeStatButton);
        activeStatButton = null;
    }
}

// Function to show the value of the clicked stat button
function showStatValue(button) {
    const statValue = button.nextElementSibling;
    statValue.classList.remove('hidden');
}

// Function to hide the value of the stat button
function hideStatValue(button) {
    const statValue = button.nextElementSibling;
    statValue.classList.add('hidden');
}





// Function to clear player dropdown
function clearPlayerDropdown() {
    playerDropdown.innerHTML = '<option value="">Select a player...</option>';
}

// Function to clear average data display
function clearAverageData() {
    averageDataDisplay.textContent = '';
}

// Function to clear statistics display
function clearStatistics() {
    statisticsDisplay.textContent = '';
}

document.addEventListener('DOMContentLoaded', () => {
    // Hide all stat values when the page loads
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(statValue => {
        statValue.classList.add('hidden');
    });
});


