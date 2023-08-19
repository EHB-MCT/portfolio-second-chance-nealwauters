import { createNewScene} from './statsScene.js';



const seasonDropdown = document.getElementById('seasonDropdown');
const playerDropdown = document.getElementById('playerDropdown');
const playerDropdown2 = document.getElementById('playerDropdown2');

const averageDataDisplay = document.getElementById('averageDataDisplay');
const statisticsDisplay = document.getElementById('statistics');

//_____FUNCTIONS_____//
let dartboardScene;

// Function to fetch seasons from the server and populate the season dropdown
function fetchSeasons() {
    fetch('/api/seasons')
        .then(response => response.json())
        .then(data => {
            data.forEach(season => {
                const option = document.createElement('option');
                option.value = season.id;
                option.textContent = season.name;

            });

            // Fetch players for the first season immediately
            const firstSeasonId = data[0].id; // Get the ID of the first season
            fetchPlayers(firstSeasonId);
        })
        .catch(error => {
            console.error('Error fetching seasons:', error);
        });
}
// Function to format a name from "Last, First" to "First Last"
function formatName(name) {
    const nameParts = name.split(',');
    if (nameParts.length === 2) {
        return nameParts[1].trim() + ' ' + nameParts[0].trim();
    } else {
        return name; // Return the original name if formatting fails
    }
}
// Function to fetch players for the selected season
function fetchPlayers(seasonId) {
    if (seasonId) {
        fetch(`/api/seasons/${seasonId}/players`)
            .then(response => response.json())
            .then(players => {
                clearPlayerDropdown();
                clearPlayerDropdown2();
                players.forEach(player => {
                    const option = document.createElement('option');
                    option.value = player.id;
                    option.textContent = formatName(player.name);
                    playerDropdown.appendChild(option);
                    playerDropdown2.appendChild(option.cloneNode(true));
                });
            })
            .catch(error => {
                console.error('Error fetching players for season:', error);
            });
    }
}

// Function to clear player dropdown
function clearPlayerDropdown() {
    playerDropdown.innerHTML = '<option value="">Select a player...</option>';
}

// Function to clear the second player dropdown
function clearPlayerDropdown2() {
    playerDropdown2.innerHTML = '<option value="">Select another player...</option>';
}

// Function to clear statistics display
function clearStatistics() {
    document.getElementById('statisticsPlayer1').innerHTML = '';
    document.getElementById('statisticsPlayer2').innerHTML = '';
}

// Function for fetching all head-to-heads data and populating events list
function fetchHeadToHeadData() {
    const competitorId1 = playerDropdown.value;
    const competitorId2 = playerDropdown2.value;

    if (competitorId1 && competitorId2) {
        fetchAndPopulateEvents(competitorId1, competitorId2);
    }
}

let selectedEvent;


// Function to fetch specific head2head and its data
function fetchAndPopulateEvents(competitorId1, competitorId2) {
    const eventsDropdown = document.getElementById('eventsDropdown');

    fetch(`/api/head-to-head?competitorId1=${competitorId1}&competitorId2=${competitorId2}`)
        .then(response => response.json())
        .then(data => {
            const lastMeetings = data.last_meetings;
            console.log(lastMeetings);

            // Clear existing events
            eventsDropdown.innerHTML = '';

            lastMeetings.forEach((event, index) => {
                // Check if the event data and required fields are available
                if (
                    event.sport_event &&
                    event.sport_event.sport_event_context &&
                    event.sport_event.sport_event_context.competition &&
                    event.sport_event.sport_event_context.competition.name &&
                    event.statistics &&
                    event.statistics.totals &&
                    event.statistics.totals.competitors &&
                    event.statistics.totals.competitors.length >= 2 &&
                    event.statistics.totals.competitors[0] &&
                    event.statistics.totals.competitors[0].statistics &&
                    event.statistics.totals.competitors[0].statistics.average_3_darts &&
                    event.statistics.totals.competitors[1] &&
                    event.statistics.totals.competitors[1].statistics &&
                    event.statistics.totals.competitors[1].statistics.average_3_darts &&
                    event.sport_event.start_time
                ) {
                    const eventOption = document.createElement('option');
                    eventOption.value = index;
                    const eventDate = new Date(event.sport_event.start_time);
                    const formattedDate = eventDate.toISOString().split('T')[0]; // Extract the date part
                    const battles = event.sport_event.sport_event_context.competition.name + ' ' + formattedDate;
                    eventOption.textContent = battles;
                    eventOption.classList.add('clickable-event');
                    eventsDropdown.appendChild(eventOption);
                } else {
                    console.log("no stats for other matchups");
                }
            });

            eventsDropdown.addEventListener('change', () => {
                const selectedEventIndex = eventsDropdown.value;
                if (selectedEventIndex !== '') {
                    selectedEvent = lastMeetings[selectedEventIndex];
                    // Check if selectedEvent has the necessary data before accessing its properties
                    if (
                        selectedEvent.sport_event &&
                        selectedEvent.sport_event.competitors &&
                        selectedEvent.sport_event.competitors[0] &&
                        selectedEvent.sport_event.competitors[1]
                    ) {
                        const player1FormattedName = formatName(selectedEvent.sport_event.competitors[0].name);
                        const player2FormattedName = formatName(selectedEvent.sport_event.competitors[1].name);

                        const player1Stats = `
                      
                       
                             <button class="dartAverageBtn"> 3 Dart Average </button> 
                             <button class="checkoutPercBtn"> Checkout Percentage </button>
                             <button class="tonPlusCheckoutBtn"> 100+ Checkouts </button>
                             <button class="highestCheckoutBtn">Highest Checkout </button>
                             <button class="plus100Scores"> +100 Scores </button>
                             <button class="plus140Scores"> +140 Scores </button> 
                             <button class="maxScore">180's</button> 

                        </ul>
                        `;

                        const player2Stats = `
                        <h3>${player2FormattedName} </h3>
                        
                        `;

                        console.log(player1Stats);
                        console.log(player2Stats);

                        displayEventData(player1Stats, player2Stats);
                    } else {
                        console.log('Invalid event data:', selectedEvent);
                    }
                }
            });
            document.addEventListener('click', function(event) {
                if (event.target.matches('.dartAverageBtn')) {
                    // Create the new scene and start animation
                    createNewScene();
                }
                // ... Handle other button clicks
            });
            


        })
        .catch(error => {
            console.error('Error fetching event data:', error);
        });
}
//Function to display right data
function displayEventData(player1Stats, player2Stats) {
    const player1StatsDisplay = document.getElementById('player1StatsDisplay');
    //const player2StatsDisplay = document.getElementById('player2StatsDisplay');

    if (player1Stats && player2Stats) {
        player1StatsDisplay.innerHTML = player1Stats;
        //player2StatsDisplay.innerHTML = player2Stats;
    }
}

let statsScene;

// Create a variable to track if the stats scene animation is active
let statsSceneAnimating = false;




// Add event listeners to the competitor dropdowns
document.getElementById('playerDropdown').addEventListener('change', fetchHeadToHeadData);
document.getElementById('playerDropdown2').addEventListener('change', fetchHeadToHeadData);


// Fetch seasons And Players
fetchSeasons();
fetchPlayers(); // 


