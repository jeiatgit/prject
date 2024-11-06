document.getElementById('analyzeButton').addEventListener('click', function() {
    const imageUpload = document.getElementById('imageUpload');
    
    if (imageUpload.files.length === 0) {
        alert('Please upload an image.');
        return;
    }

    // Simulate analysis result
    const resultsDiv = document.getElementById('results');
    const diseaseName = document.getElementById('diseaseName');
    const confidenceScore = document.getElementById('confidenceScore');

    // Simulated results (you would replace this with actual analysis)
    diseaseName.textContent = 'Detected Disease: Coconut Leaf Wilt';
    confidenceScore.textContent = 'Confidence Score: 85%';

    // Show results
    resultsDiv.style.display = 'block';
});