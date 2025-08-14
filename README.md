# 🛡️ Toxic Comment Detector

A Flask web application that detects toxic comments using Google Cloud Natural Language API. Built with modern web technologies and AI-powered sentiment analysis.

![Python](https://img.shields.io/badge/python-v3.7+-blue.svg)
![Flask](https://img.shields.io/badge/flask-v2.3+-green.svg)
![Google Cloud](https://img.shields.io/badge/Google%20Cloud-Natural%20Language%20API-yellow.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Features

- **Real-time Text Analysis**: Analyze text for toxicity using Google Cloud ML
- **Sentiment Analysis**: Get detailed sentiment scores and emotional magnitude
- **Risk Assessment**: Categorized toxicity levels (Low, Medium, High)
- **Keyword Detection**: Identifies potentially offensive keywords
- **Responsive Design**: Modern, mobile-friendly interface
- **Character Limit**: Handles up to 1000 characters per analysis
- **Interactive UI**: Real-time character counting and loading states

## 🚀 Demo

![App Screenshot](https://raw.githubusercontent.com/rakshitha-kolla/toxic-comment-detector/main/docs/toxic-comment-detection.png
)

*Replace this with an actual screenshot of your app*

## 🛠️ Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **AI/ML**: Google Cloud Natural Language API
- **Styling**: Modern CSS with gradients and animations
- **Architecture**: RESTful API with JSON responses

## 📦 Installation

### Prerequisites

- Python 3.7 or higher
- Google Cloud Platform account
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/rakshitha-kolla/toxic-comment-detector.git
cd toxic-comment-detector
```

### Step 2: Set Up Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 4: Google Cloud Setup

1. **Create a Google Cloud Project**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Natural Language API**:
   ```bash
   gcloud services enable language.googleapis.com
   ```

3. **Create Service Account**:
   ```bash
   gcloud iam service-accounts create toxic-detector \
       --description="Service account for toxic comment detection" \
       --display-name="Toxic Detector"
   ```

4. **Grant Permissions**:
   ```bash
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
       --member="serviceAccount:toxic-detector@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
       --role="roles/language.client"
   ```

5. **Download Credentials**:
   ```bash
   gcloud iam service-accounts keys create credentials.json \
       --iam-account=toxic-detector@YOUR_PROJECT_ID.iam.gserviceaccount.com
   ```

### Step 5: Set Environment Variables

```bash
# On Windows:
set GOOGLE_APPLICATION_CREDENTIALS=credentials.json

# On macOS/Linux:
export GOOGLE_APPLICATION_CREDENTIALS="$(pwd)/credentials.json"
```

### Step 6: Run the Application

```bash
python app.py
```

Visit `http://localhost:5000` in your browser!

## 🎯 Usage

1. **Enter Text**: Type or paste text in the textarea (max 1000 characters)
2. **Analyze**: Click the "🔍 Analyze Text" button or use `Ctrl+Enter`
3. **View Results**: See toxicity score, sentiment analysis, and risk level
4. **Interpret Results**:
   - **Green**: Content appears safe
   - **Red**: Toxic content detected
   - **Score**: 0.0 (safe) to 1.0 (highly toxic)

## 📁 Project Structure

```
toxic-comment-detector/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── .gitignore            # Git ignore file
├── README.md             # Project documentation
├── templates/
│   └── index.html        # Frontend HTML template
└── static/
    ├── style.css         # CSS styling
    └── script.js         # JavaScript functionality
```

### Customizing Toxicity Detection

Modify the `analyze_toxicity()` function in `app.py`:

```python
# Adjust sensitivity
if sentiment.score < -0.3 and sentiment.magnitude > 0.6:  # Default
if sentiment.score < -0.5 and sentiment.magnitude > 0.8:  # More strict
if sentiment.score < -0.1 and sentiment.magnitude > 0.4:  # More sensitive
```

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Serve main application page |
| `/analyze` | POST | Analyze text for toxicity |
| `/health` | GET | Health check endpoint |

### API Request/Response Examples

**Request** (`POST /analyze`):
```json
{
    "text": "I hate you"
}
```

**Response** (Success):
```json
{
    "is_toxic": true,
    "toxicity_score": 0.7,
    "toxicity_level": "High",
    "sentiment_score": -0.8,
    "sentiment_magnitude": 1.2,
    "matched_keywords": ["hate"]
}
```

**Response** (Error):
```json
{
    "error": "Text too long (max 1000 characters)"
}
```


<!--## 🧪 Testing

```bash
# Test the health endpoint
curl http://localhost:5000/health

# Test the analyze endpoint
curl -X POST http://localhost:5000/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a test message"}'
```-->
## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<!--## 🙏 Acknowledgments

- Google Cloud Natural Language API for sentiment analysis
- Flask community for the excellent web framework
- Font Awesome for icons (if used)
- Internship opportunity at Pragyashal Cloud Solutions-->

## 📞 Contact

KOLLA RAKSHITHA - [krakshitha0987@gmail.com](krakshitha0987@gmail.com)

Project Link: [https://github.com/rakshitha-kolla/toxic-comment-detector](https://github.com/rakshitha-kolla/toxic-comment-detector)

---

⭐ **Star this repository if you found it helpful!**
