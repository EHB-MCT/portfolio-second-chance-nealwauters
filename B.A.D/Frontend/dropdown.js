document.addEventListener('DOMContentLoaded', async () => {

    window.selectedStatValue = null;

    const playerDropdown = document.getElementById('playerDropdown');
    const statDropdown = document.getElementById('statsDropdown');
    const selectedStatValueElement = document.getElementById('selectedStatValue'); // Define it here


    let playerStats = {}; // Declare playerStats at a higher scope

    async function populatePlayerDropdown() {
        try {
            const response = await fetch('/players');
            const players = await response.json();

            players.forEach(player => {
                const option = document.createElement('option');
                const fullName = player.name;
                const nameParts = fullName.split(',').map(part => part.trim());
                const rearrangedName = `${nameParts[1]} ${nameParts[0]}`;
                option.value = player.id;
                option.textContent = rearrangedName;
                playerDropdown.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching player names:', error);
        }
    }
    populatePlayerDropdown();
    // Populate statistics dropdown based on selected player
    playerDropdown.addEventListener('change', async () => {
        const selectedPlayerId = playerDropdown.value;

        if (selectedPlayerId !== 'default') {
            try {
                const response = await fetch(`/players/stats/${selectedPlayerId}`);
                const playerStats = await response.json();

                // Populate statistics dropdown with options based on player's stats
                statDropdown.innerHTML = ''; // Clear existing options
                for (const key in playerStats) {
                    if (key !== 'id' && key !== 'name') {
                        const option = document.createElement('option');
                        option.value = key;
                        option.textContent = formatPropertyName(key);
                        statDropdown.appendChild(option);
                    }
                }

                // Display the value of the selected statistic by default
                const firstStatistic = Object.keys(playerStats)[2]; // Skip 'id' and 'name'
                updateSelectedStat(firstStatistic, playerStats[firstStatistic]);
            } catch (error) {
                console.error('Error fetching player stats:', error);
            }
        } else {
            // Clear the statistics dropdown and value when no player is selected
            statDropdown.innerHTML = '<option value="default">Select a stat</option>';
            statisticValue.textContent = '';
        }
    });

    statDropdown.addEventListener('change', async () => {
        const selectedStatistic = statDropdown.value;

        if (selectedStatistic !== 'default') {
            const selectedPlayerId = playerDropdown.value;

            if (selectedPlayerId !== 'default') {
                try {
                    const response = await fetch(`/players/stats/${selectedPlayerId}`);
                    playerStats = await response.json();

                    const selectedValue = playerStats[selectedStatistic];
                    console.log(selectedValue);
                    updateSelectedStat(selectedStatistic, selectedValue);

                } catch (error) {
                    console.error('Error fetching player stats:', error);
                }
            }
        } else {
            selectedStatValueElement.innerHTML = '';
        }
    });

    function updateSelectedStat(statistic, value) {
        const formattedStatistic = formatPropertyName(statistic);
        selectedStatValueElement.textContent = value ? ` ${value}` : '';
        selectedStatValueElement.style.display = value ? 'block' : 'none'; // Show or hide the element
        selectedStatValueElement.style.bottom = value ? '20px' : '-100px'; // Adjust the bottom position
    }
    // Helper function to format property name (e.g., "total_points" to "Total Points")
    function formatPropertyName(name) {
        return name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
});
