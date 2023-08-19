const playerList = document.getElementById("playerList");
const seasonList = document.getElementById("seasonList"); // Add this line

console.log("Fetching data from backend...");

// Fetch players data
fetch("http://localhost:3000/api/players")
    .then(response => {
        console.log("Response status:", response.status);
        return response.json();
    })
    .then(data => {
        console.log("Players data fetched successfully:", data);
        data.forEach(player => {
            const listItem = document.createElement("li");
            listItem.textContent = `${player.name}`;
            playerList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error("Error fetching players data:", error);
        const errorMessage = document.createElement("li");
        errorMessage.textContent = "An error occurred while fetching players data.";
        playerList.appendChild(errorMessage);
    });

// Fetch seasons data
fetch("http://localhost:3000/api/seasons")
    .then(response => {
        console.log("Response status:", response.status);
        return response.json();
    })
    .then(data => {
        console.log("Seasons data fetched successfully:", data);
        data.forEach(season => {
            const listItem = document.createElement("li");
            listItem.textContent = `${season.name} - ${season.id}`;
            seasonList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error("Error fetching seasons data:", error);
        const errorMessage = document.createElement("li");
        errorMessage.textContent = "An error occurred while fetching seasons data.";
        seasonList.appendChild(errorMessage);
    });
