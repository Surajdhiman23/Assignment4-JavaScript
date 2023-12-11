// Function to add student information to the page
function addStudentInfo() {
    var studentID = '20052030';
    var studentName = 'Suraj Kumar Dhiman';
    // Display student information on the page

    document.getElementById('studentId').textContent = 'Student ID: ' + studentID;
    document.getElementById('studentName').textContent = 'Name: ' + studentName;
}
// Function to search car information
function searchCar() {
    // Get the car make entered by the user
    var carMake = document.getElementById('carNameInput').value;
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Loading...</p>'; // Display a loading message

    // Make a fetch request to the car information API
    fetch(`https://api.api-ninjas.com/v1/cars?make=${carMake}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'oVUTEAo/QEahqgwqn3/JBw==ZTSFgxPApWXHmpKB'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok'); // Check if the response is OK; otherwise, throw an error
            }
            return response.json();
        })
        .then(data => {
            displayResults(data);
        })
        .catch(error => {
            resultsDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        });
}

// Function to display car search results
function displayResults(data) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results or loading message
    if (data.length === 0) {
        resultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    data.forEach(car => {
        var carDiv = document.createElement('div');
        carDiv.className = 'car-info';
        carDiv.innerHTML = `
            <p><strong>Make:</strong> ${car.make}</p>
            <p><strong>Model:</strong> ${car.model}</p>
            <p><strong>Year:</strong> ${car.year}</p>
            <p><strong>Fuel Type:</strong> ${car.fuel_type || 'N/A'}</p>
            <p><strong>Drive:</strong> ${car.drive || 'N/A'}</p>
            <p><strong>Cylinders:</strong> ${car.cylinders || 'N/A'}</p>
            <p><strong>Transmission:</strong> ${car.transmission || 'N/A'}</p>
            <p><strong>City MPG:</strong> ${car.city_mpg || 'N/A'}</p>
            <p><strong>Highway MPG:</strong> ${car.highway_mpg || 'N/A'}</p>
            <p><strong>Combined MPG:</strong> ${car.combined_mpg || 'N/A'}</p>`;
        resultsDiv.appendChild(carDiv);
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    addStudentInfo();
});
// Event listener for when the user presses Enter in the carNameInput field
document.getElementById('carNameInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchCar();
    }
});
// Event listener for when the user clicks the searchButton
document.getElementById('searchButton').addEventListener('click', searchCar);
