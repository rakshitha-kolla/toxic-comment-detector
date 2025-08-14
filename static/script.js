// Get DOM elements
const textInput = document.getElementById('textInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const error = document.getElementById('error');
const charCount = document.getElementById('charCount');

// Character counter
textInput.addEventListener('input', function() {
    const count = this.value.length;
    charCount.textContent = count;
    
    // Change color when approaching limit
    if (count > 900) {
        charCount.style.color = '#e17055';
    } else {
        charCount.style.color = '#666';
    }
});

// Analyze button click handler
analyzeBtn.addEventListener('click', async function() {
    const text = textInput.value.trim();
    
    // Validation
    if (!text) {
        showError('Please enter some text to analyze.');
        return;
    }
    
    // Hide previous results and show loading
    hideResults();
    showLoading();
    
    try {
        // Send request to Flask backend
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: text })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            displayResults(data);
        } else {
            showError(data.error || 'An error occurred while analyzing the text.');
        }
    } catch (err) {
        showError('Network error. Please check your connection and try again.');
    } finally {
        hideLoading();
    }
});

// Enter key handler (Ctrl+Enter to analyze)
textInput.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        analyzeBtn.click();
    }
});

// Show loading state
function showLoading() {
    loading.style.display = 'block';
    analyzeBtn.disabled = true;
}

// Hide loading state
function hideLoading() {
    loading.style.display = 'none';
    analyzeBtn.disabled = false;
}

// Display analysis results
function displayResults(data) {
    if (data.error) {
        showError(data.error);
        return;
    }

    const resultIcon = document.getElementById('resultIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultDetails = document.getElementById('resultDetails');
    
    // Set result type and styling
    if (data.is_toxic) {
        results.className = 'results toxic';
        resultIcon.textContent = '⚠️';
        resultTitle.textContent = `Toxic Content Detected (${data.toxicity_level || 'High'} Risk)`;
    } else {
        results.className = 'results safe';
        resultIcon.textContent = '✅';
        resultTitle.textContent = 'Content Appears Safe';
    }
    
    // Build details HTML
    let detailsHTML = `
        <div class="detail-item">
            <span>Toxicity Score:</span>
            <span><strong>${data.toxicity_score || 0}/1.0</strong></span>
        </div>
        <div class="detail-item">
            <span>Sentiment Score:</span>
            <span><strong>${data.sentiment_score || 0}</strong></span>
        </div>
    `;
    
    // Add additional details if available
    if (data.sentiment_magnitude !== undefined) {
        detailsHTML += `
            <div class="detail-item">
                <span>Sentiment Magnitude:</span>
                <span><strong>${data.sentiment_magnitude}</strong></span>
            </div>
        `;
    }
    
    if (data.matched_keywords && data.matched_keywords.length > 0) {
        detailsHTML += `
            <div class="detail-item">
                <span>Flagged Keywords:</span>
                <span><strong>${data.matched_keywords.join(', ')}</strong></span>
            </div>
        `;
    }
    
    resultDetails.innerHTML = detailsHTML;
    results.style.display = 'block';
    hideError();
}

// Show error message
function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
    hideResults();
}

// Hide error message
function hideError() {
    error.style.display = 'none';
}

// Hide results
function hideResults() {
    results.style.display = 'none';
}