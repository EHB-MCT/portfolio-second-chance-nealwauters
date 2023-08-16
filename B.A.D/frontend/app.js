const teamList = document.getElementById("teamList");

console.log("Fetching data from backend..."); // Added console log

fetch("http://localhost:3000/api/teams") // Replace with your backend's address
    .then(response => {
        console.log("Response status:", response.status); // Added console log
        return response.json();
    })
    .then(data => {
        console.log("Data fetched successfully:", data); // Added console log
        data.forEach(team => {
            const listItem = document.createElement("li");
            listItem.textContent = `${team.name} - ${team.city}`;
            teamList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        const errorMessage = document.createElement("li");
        errorMessage.textContent = "An error occurred while fetching data.";
        teamList.appendChild(errorMessage);
    });
