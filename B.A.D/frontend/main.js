
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
          // Display player statistics in the statisticsDisplay element
          const formattedStatistics = `
              Average 3 Darts: ${statistics.statistics.average_3_darts}
              Checkout Percentage: ${statistics.statistics.checkout_percentage}%
              Checkouts: ${statistics.statistics.checkouts}
              Checkouts (100s+): ${statistics.statistics.checkouts_100s_plus}
              Highest Checkout: ${statistics.statistics.highest_checkout}
              Scores (100s+): ${statistics.statistics.scores_100s_plus}
              Scores (140s+): ${statistics.statistics.scores_140s_plus}
              Scores (180s): ${statistics.statistics.scores_180s}
          `;
          console.log(formattedStatistics);
          statisticsDisplay.textContent = formattedStatistics;
      })
      .catch(error => {
          console.error('Error fetching player statistics:', error);
      });
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


