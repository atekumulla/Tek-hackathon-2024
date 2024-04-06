let responses;

// Function to load responses from Local Storage
function loadResponses() {
  const savedResponses = localStorage.getItem('studySpaceResponses');
  if (savedResponses) {
    responses = JSON.parse(savedResponses);
  } else {
    // Initialize responses if not found in Local Storage
    responses = {
      ugli: { basement: [], floor1: [], floor2: [], floor3: [], floor4: [] },
      union: { basement: [], floor1: [], quietStudyLounge: [], atrium: [], ideaHub: [] },
      ross: { winterGarden: [], studyRooms: [], classrooms: [] },
      kines: { atrium: [], studyRooms: [], classrooms: [] }
    };
  }
}

// Function to save responses to Local Storage
function saveResponses() {
  localStorage.setItem('studySpaceResponses', JSON.stringify(responses));
}

// Load responses on page load
loadResponses();

// Update the averages initially
Object.keys(responses).forEach(building => {
  updateAverage(building);
});

  // Update the averages initially
  Object.keys(responses).forEach(building => {
    updateAverage(building);
  });

  function recordResponse(building, floor) {
    const input = document.getElementById(`${building}-${floor}`);
    const inputValue = parseInt(input.value);
    if (!isNaN(inputValue)) {
      responses[building][floor].push(inputValue);
      updateAverage(building);
      input.value = '';
    } else {
      alert('Please enter a valid number for activity level.');
    }
    saveResponses()
  }

  function updateAverage(building) {
    const overallAverage = document.getElementById(`${building}Average`);
    const floorAverages = {
      floor1: document.getElementById(`${building}Floor1Average`),
      floor2: document.getElementById(`${building}Floor2Average`),
      floor3: document.getElementById(`${building}Floor3Average`),
      floor4: document.getElementById(`${building}Floor4Average`)
    };

    let totalOverallResponses = 0;
    let totalOverallSum = 0;

    Object.keys(responses[building]).forEach(floor => {
      const totalResponses = responses[building][floor].length;
      if (totalResponses > 0) {
        const totalSum = responses[building][floor].reduce((acc, val) => acc + val, 0);
        const average = totalSum / totalResponses;
        floorAverages[floor].textContent = Math.round(average);
        totalOverallResponses += totalResponses;
        totalOverallSum += totalSum;
      } else {
        floorAverages[floor].textContent = '-';
      }
    });

    if (totalOverallResponses > 0) {
      const overallAverageValue = totalOverallSum / totalOverallResponses;
      overallAverage.textContent = `Overall Activity Level: ${Math.round(overallAverageValue)}`;
      setBuildingColor(building, overallAverageValue);
    } else {
      overallAverage.textContent = '';
    }
  }

  function toggleDetails(building) {
    const buildingDetails = document.getElementById(`${building}Details`);
    buildingDetails.classList.toggle('show');
  }

  document.getElementById("ratingForm").addEventListener("submit", function(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      const building = formData.get("building");
      const floor = formData.get("floor");
      const activityLevel = parseInt(formData.get("Activity-Level"));

      if (!isNaN(activityLevel)) {
          if (activityLevel >= 1 && activityLevel <= 10) {
              recordResponse(building, floor, activityLevel);
          } else {
              alert("Activity level rating must be between 1 and 10.");
          }
      } else {
          alert("Please enter a valid number for activity level.");
      }
  });

  // Record and update response function
function recordResponse(building, area, activityLevel) {
    responses[building][area].push(activityLevel);
    updateAverage(building);
    saveResponses(); // Save responses to local storage after updating
  }

  function setBuildingColor(building, activityLevel) {
      const buildingElement = document.getElementById(building);
      if (activityLevel <= 3) {
          buildingElement.style.backgroundColor = "#DAF7A6 "; // Pale pastel green
      } else if (activityLevel <= 7) {
          buildingElement.style.backgroundColor = "#FFFDCE"; // Pale pastel yellow
      } else {
          buildingElement.style.backgroundColor = "#FFCCCB"; // Pale pastel red
      }
  }