// Add image preview functionality
const dropZone = document.getElementById('dropZone');
const imagePreview = document.getElementById('imagePreview');
const placeholder = document.querySelector('.placeholder-text');

// Drag and drop handlers
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, unhighlight, false);
});

function highlight(e) {
    dropZone.classList.add('highlight');
}

function unhighlight(e) {
    dropZone.classList.remove('highlight');
}

dropZone.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

function handleFiles(files) {
    if (files.length > 0) {
        const file = files[0];
        displayImage(file);
    }
}

// Update existing image upload handler
document.getElementById('imageUpload').addEventListener('change', function(event) {
    if (event.target.files.length > 0) {
        displayImage(event.target.files[0]);
    }
});

function displayImage(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const selectedImage = document.getElementById('selectedImage');
        selectedImage.src = e.target.result;
        imagePreview.style.display = 'block';
        placeholder.style.display = 'none';
        document.getElementById('analyzeButton').style.display = 'inline-block';
    };
    reader.readAsDataURL(file);
}

document.getElementById('analyzeButton').addEventListener('click', function() {
    const imageUpload = document.getElementById('imageUpload');
    
    if (imageUpload.files.length === 0) {
        alert('Please upload an image.');
        return;
    }

    // Simulated results (you would replace this with actual analysis)
    const diseaseNameText = 'Detected Disease: Coconut Leaf Wilt';
    const confidenceScoreText = 'Confidence Score: 85%';

    // Create a new results section
    const resultsContainer = document.getElementById('resultsContainer');

    const resultsSection = document.createElement('div');
    resultsSection.classList.add('results-section');

    // Left Panel
    const leftPanel = document.createElement('div');
    leftPanel.classList.add('left-panel');

    const resultsTitle = document.createElement('h2');
    resultsTitle.textContent = 'Analysis Results';

    const segmentedImageDiv = document.createElement('div');
    segmentedImageDiv.classList.add('segmented-image');

    const segmentedImage = document.createElement('img');
    segmentedImage.src = 'assets/mask_placeholder.png';
    segmentedImage.alt = 'Segmented Analysis';

    segmentedImageDiv.appendChild(segmentedImage);
    leftPanel.appendChild(resultsTitle);
    leftPanel.appendChild(segmentedImageDiv);

    // Right Panel
    const rightPanel = document.createElement('div');
    rightPanel.classList.add('right-panel');

    const resultItem1 = document.createElement('div');
    resultItem1.classList.add('result-item');

    const diseaseTitle = document.createElement('h3');
    diseaseTitle.textContent = 'Detected Disease';

    const diseaseName = document.createElement('p');
    diseaseName.classList.add('result-value');
    diseaseName.textContent = diseaseNameText;

    resultItem1.appendChild(diseaseTitle);
    resultItem1.appendChild(diseaseName);

    const resultItem2 = document.createElement('div');
    resultItem2.classList.add('result-item');

    const confidenceTitle = document.createElement('h3');
    confidenceTitle.textContent = 'Confidence Score';

    const confidenceScore = document.createElement('p');
    confidenceScore.classList.add('result-value');
    confidenceScore.textContent = confidenceScoreText;

    resultItem2.appendChild(confidenceTitle);
    resultItem2.appendChild(confidenceScore);

    const treatmentInfoDiv = document.createElement('div');
    treatmentInfoDiv.classList.add('treatment-info');

    const treatmentTitle = document.createElement('h3');
    treatmentTitle.textContent = 'Recommended Treatment';

    const treatmentInfo = document.createElement('p');
    treatmentInfo.textContent = 'Loading treatment information...';

    treatmentInfoDiv.appendChild(treatmentTitle);
    treatmentInfoDiv.appendChild(treatmentInfo);

    rightPanel.appendChild(resultItem1);
    rightPanel.appendChild(resultItem2);
    rightPanel.appendChild(treatmentInfoDiv);

    // Assemble the results section
    resultsSection.appendChild(leftPanel);
    resultsSection.appendChild(rightPanel);

    // Append the results section to the container
    resultsContainer.appendChild(resultsSection);

    // Get the first result section and scroll to it
    const firstResult = resultsContainer.querySelector('.results-section');
    if (firstResult) {
        firstResult.scrollIntoView({ behavior: 'smooth' });
    }
});