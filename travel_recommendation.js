let travelData = {};
const timeZones = {
    "USA": "America/New_York",
    "Japan": "Asia/Tokyo",
    "India": "Asia/Kolkata",
    "France": "Europe/Paris",
    "Brazil": "America/Sao_Paulo"
};


// Fetch data from JSON
fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log(travelData);
    })
    .catch(error => console.error('Error:', error));

function getCountryTime(countryName) {
        const timeZone = timeZones[countryName];
    
        if (!timeZone) {
            return "Time not available";
        }
    
        const options = {
            timeZone: timeZone,
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };
    
        return new Date().toLocaleTimeString('en-US', options);
}

// Search function
function searchRecommendations() {
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    let results = [];

    if (keyword === 'beach') {
        results = travelData.beaches;
    } else if (keyword === 'temple') {
        results = travelData.temples;
    } else if (keyword === 'country') {
        results = travelData.countries;
    } else {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    // Display at least 2 recommendations
    results.slice(0, 2).forEach(item => {
        const card = document.createElement('div');
        card.className = 'result-card';

        card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><strong>Local Time:</strong> ${getCountryTime(item.name)}</p>
        `;

        //console.log("Current time in Japan:", getCountryTime("Japan"));

        resultsDiv.appendChild(card);
    });
}



