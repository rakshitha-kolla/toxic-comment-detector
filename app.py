from flask import Flask, render_template, request, jsonify
from google.cloud import language_v1
import os
import json

app = Flask(__name__)

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'credentials.json'

# Initialize the Google Cloud Natural Language client

client = language_v1.LanguageServiceClient()

def analyze_toxicity(text):
    """
    Analyze text for toxicity using Google Cloud Natural Language API
    """
    try:
        # Create a document object
        document = language_v1.Document(
            content=text,
            type_=language_v1.Document.Type.PLAIN_TEXT,
        )
        
        # Analyze sentiment
        sentiment_response = client.analyze_sentiment(
            request={"document": document}
        )
        
        # Analyze entities
        entities_response = client.analyze_entities(
            request={"document": document}
        )
        
        # Get sentiment score and magnitude
        sentiment = sentiment_response.document_sentiment
        
        # Simple toxicity detection based on sentiment
        # You can enhance this with more sophisticated logic
        toxicity_score = 0
        
        # Negative sentiment with high magnitude often indicates toxicity
        if sentiment.score < -0.3 and sentiment.magnitude > 0.6:
            toxicity_score = min(abs(sentiment.score) * sentiment.magnitude, 1.0)
        
        # Check for potentially offensive entities or patterns
        offensive_keywords = [
            'hate', 'stupid', 'idiot', 'dumb', 'kill', 'die', 'ugly', 
            'pathetic', 'loser', 'worthless', 'disgusting'
        ]
        
        text_lower = text.lower()
        keyword_matches = [word for word in offensive_keywords if word in text_lower]
        
        if keyword_matches:
            toxicity_score = max(toxicity_score, 0.7)
        
        # Determine toxicity level
        if toxicity_score > 0.6:
            toxicity_level = "High"
            is_toxic = True
        elif toxicity_score > 0.3:
            toxicity_level = "Medium"
            is_toxic = True
        else:
            toxicity_level = "Low"
            is_toxic = False
        
        return {
            'is_toxic': is_toxic,
            'toxicity_score': round(toxicity_score, 2),
            'toxicity_level': toxicity_level,
            'sentiment_score': round(sentiment.score, 2),
            'sentiment_magnitude': round(sentiment.magnitude, 2),
            'matched_keywords': keyword_matches
        }
        
    except Exception as e:
        print(f"Error analyzing text: {str(e)}")
        return {
            'error': 'Failed to analyze text',
            'message': str(e)
        }

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        if len(text) > 1000:
            return jsonify({'error': 'Text too long (max 1000 characters)'}), 400
        
        result = analyze_toxicity(text)
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health')
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    # Check if Google Cloud credentials are set
    if not os.getenv('GOOGLE_APPLICATION_CREDENTIALS'):
        print("Warning: GOOGLE_APPLICATION_CREDENTIALS environment variable not set")
        print("Please set up your Google Cloud credentials")
    
    app.run(debug=True, host='0.0.0.0', port=5000)