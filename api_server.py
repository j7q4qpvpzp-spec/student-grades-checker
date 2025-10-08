from flask import Flask, jsonify, request
from flask_cors import CORS
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
SPREADSHEET_ID = '1-a2VZR2U1V6kfLQYbX9yYM7P2wX-dK9Le5_bYFGTJGE'
CREDENTIALS_FILE = 'credentials.json'

# Global variable to cache the worksheet
worksheet = None

def get_worksheet():
    """Get or create worksheet connection"""
    global worksheet
    if worksheet is None:
        scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
        creds = ServiceAccountCredentials.from_json_keyfile_name(CREDENTIALS_FILE, scope)
        client = gspread.authorize(creds)
        spreadsheet = client.open_by_key(SPREADSHEET_ID)
        worksheet = spreadsheet.sheet1
    return worksheet

@app.route('/api/student/<student_id>', methods=['GET'])
def get_student_grades(student_id):
    """Get student grades by student ID"""
    try:
        ws = get_worksheet()
        
        # Get all values from the worksheet
        all_values = ws.get_all_values()
        
        # First row contains headers
        headers = all_values[0]
        
        # Search for the student by ID
        student_row = None
        for row in all_values[1:]:  # Skip header row
            if row[0] == student_id:  # First column is student ID
                student_row = row
                break
        
        if student_row is None:
            return jsonify({'error': 'لم يتم العثور على الطالب'}), 404
        
        # Build the response
        student_data = {
            'id': student_row[0],
            'name': student_row[1],
            'grades': {}
        }
        
        # Add all grades (skip ID and name columns)
        for i in range(2, len(headers)):
            if i < len(student_row):
                student_data['grades'][headers[i]] = student_row[i]
        
        return jsonify(student_data), 200
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'حدث خطأ في الخادم'}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    # Run on port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
