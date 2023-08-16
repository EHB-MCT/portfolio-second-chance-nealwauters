const playerList = document.getElementById("playerList");

console.log("Fetching data from backend..."); // Added console log

fetch("http://localhost:3000/api/players") // Replace with your backend's address
    .then(response => {
        console.log("Response status:", response.status); // Added console log
        return response.json();
    })
    .then(data => {
        console.log("Data fetched successfully:", data); // Added console log
        data.forEach(player => {
            const listItem = document.createElement("li");
            listItem.textContent = `${player.name} - ${player.country}`;
            playerList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        const errorMessage = document.createElement("li");
        errorMessage.textContent = "An error occurred while fetching data.";
        playerList.appendChild(errorMessage);
    });
