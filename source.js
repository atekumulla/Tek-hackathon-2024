let responses = {
    building1: { floor1: [5, 7, 6], floor2: [4, 5, 5], floor3: [6, 6, 7], floor4: [3, 4, 5] },
    building2: { floor1: [6, 7, 7], floor2: [5, 6, 6], floor3: [7, 8, 8], floor4: [4, 5, 6] },
    building3: { floor1: [4, 5, 5], floor2: [3, 4, 4], floor3: [5, 6, 6], floor4: [2, 3, 4] },
    building4: { floor1: [7, 8, 8], floor2: [6, 7, 7], floor3: [8, 9, 9], floor4: [5, 6, 6] },
    building5: { floor1: [7, 8, 8], floor2: [6, 7, 7], floor3: [8, 9, 9], floor4: [5, 6, 6] },
    building6: { floor1: [7, 8, 8], floor2: [6, 7, 7], floor3: [8, 9, 9], floor4: [5, 6, 6] }
  };

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

  function recordResponse(building, floor, activityLevel) {
      responses[building][floor].push(activityLevel);
      updateAverage(building);
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
