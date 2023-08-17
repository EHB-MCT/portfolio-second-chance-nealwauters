const seasonDropdown = document.getElementById('seasonDropdown');
const playerDropdown = document.getElementById('playerDropdown');
const playerDropdown2 = document.getElementById('playerDropdown2');

const averageDataDisplay = document.getElementById('averageDataDisplay');
const statisticsDisplay = document.getElementById('statistics');

// Fetch seasons and populate the season dropdown
fetchSeasons();

// Event listener for season dropdown change
seasonDropdown.addEventListener('change', handleSeasonSelection);

// Event listener for player dropdown change
playerDropdown.addEventListener('change', handlePlayerSelection);
playerDropdown2.addEventListener('change', handlePlayerSelection); 

// Function to handle player selection
function handlePlayerSelection() {
    const selectedPlayerId = playerDropdown.value;
    const selectedPlayerId2 = playerDropdown2.value;
    const selectedSeasonId = seasonDropdown.value;

    if (selectedPlayerId && selectedPlayerId2 && selectedSeasonId) {
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
            clearPlayerDropdown2();
            players.forEach(player => {
                const option = document.createElement('option');
                option.value = player.id;
                option.textContent = player.name;
                playerDropdown.appendChild(option);
                playerDropdown2.appendChild(option.cloneNode(true));
            });
        })
        .catch(error => {
            console.error('Error fetching players for season:', error);
        });
}


// Function to fetch statistics for the selected player
function fetchPlayerStatistics(seasonId, playerId) {
    const targetDiv = playerId === playerDropdown.value ? 'statisticsPlayer1' : 'statisticsPlayer2';

    fetch(`/api/seasons/${seasonId}/players/${playerId}/statistics`)
        .then(response => response.json())
        .then(statistics => {
            console.log('Received statistics:', statistics);
            // Display player statistics separately in the statisticsDisplay element
            const formattedStatistics = `
                <p><span class="stat-label" onclick="toggleStat(this)">Average 3 Darts:</span> <span class="stat-value">${statistics.statistics.average_3_darts}</span></p>
                <p><span class="stat-label" onclick="toggleStat(this)">Checkout Percentage:</span> <span class="stat-value">${statistics.statistics.checkout_percentage}%</span></p>
                <p><span class="stat-label" onclick="toggleStat(this)">Checkouts:</span> <span class="stat-value">${statistics.statistics.checkouts}</span></p>
                <p><span class="stat-label" onclick="toggleStat(this)">Checkouts (100s+):</span> <span class="stat-value">${statistics.statistics.checkouts_100s_plus}</span></p>
                <p><span class="stat-label" onclick="toggleStat(this)">Highest Checkout:</span> <span class="stat-value">${statistics.statistics.highest_checkout}</span></p>
                <p><span class="stat-label" onclick="toggleStat(this)">Scores (100s+):</span> <span class="stat-value">${statistics.statistics.scores_100s_plus}</span></p>
                <p><span class="stat-label" onclick="toggleStat(this)">Scores (140s+):</span> <span class="stat-value">${statistics.statistics.scores_140s_plus}</span></p>
                <p><span class="stat-label" onclick="toggleStat(this)">Scores (180s):</span> <span class="stat-value">${statistics.statistics.scores_180s}</span></p>
            `;
            const targetSectionId = playerId === playerDropdown.value ? 'stats-section-player1' : 'stats-section-player2';
            const targetDiv = document.getElementById(targetSectionId);
            targetDiv.innerHTML = formattedStatistics;
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


// Function to clear player dropdown
function clearPlayerDropdown() {
    playerDropdown.innerHTML = '<option value="">Select a player...</option>';
}
// Function to clear the second player dropdown
function clearPlayerDropdown2() {
    playerDropdown2.innerHTML = '<option value="">Select another player...</option>';
}

// Function to clear average data display
function clearAverageData() {
    averageDataDisplay.textContent = '';
}

// Function to clear statistics display
function clearStatistics() {
    document.getElementById('statisticsPlayer1').innerHTML = '';
    document.getElementById('statisticsPlayer2').innerHTML = '';
}

playerDropdown.addEventListener('change', function() {
    const selectedPlayerId = playerDropdown.value;
    if (selectedPlayerId && seasonDropdown.value) {
        fetchPlayerStatistics(seasonDropdown.value, selectedPlayerId);
    } else {
        clearStatistics();
    }
});

playerDropdown2.addEventListener('change', function() {
    const selectedPlayerId2 = playerDropdown2.value;
    if (selectedPlayerId2 && seasonDropdown.value) {
        fetchPlayerStatistics(seasonDropdown.value, selectedPlayerId2);
    } else {
        clearStatistics();
    }
});

