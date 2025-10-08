import gspread
from oauth2client.service_account import ServiceAccountCredentials
import json

# Sheet ID from the user's URL
SPREADSHEET_ID = '1-a2VZR2U1V6kfLQYbX9yYM7P2wX-dK9Le5_bYFGTJGE'
CREDENTIALS_FILE = 'credentials.json'

def check_sheet_access():
    try:
        # Use credentials to create a client to interact with the Google Drive API
        scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
        creds = ServiceAccountCredentials.from_json_keyfile_name(CREDENTIALS_FILE, scope)
        client = gspread.authorize(creds)

        # Open the spreadsheet
        spreadsheet = client.open_by_key(SPREADSHEET_ID)
        
        # Select the first worksheet
        worksheet = spreadsheet.sheet1
        
        # Get all values from the first row (headers)
        headers = worksheet.row_values(1)
        
        # Get the first 5 rows of data (including header)
        data = worksheet.get_all_values()
        
        print("Connection successful.")
        print(f"Spreadsheet Title: {spreadsheet.title}")
        print(f"Worksheet Title: {worksheet.title}")
        print("\n--- Headers (First Row) ---")
        print(headers)
        print("\n--- First 5 Rows of Data ---")
        for row in data[:5]:
            print(row)
            
        # Save the headers to a file for later use
        with open('sheet_headers.json', 'w', encoding='utf-8') as f:
            json.dump(headers, f, ensure_ascii=False, indent=4)
            
    except Exception as e:
        print(f"An error occurred: {e}")
        print("\n--- Troubleshooting ---")
        print("1. Ensure the service account email is shared with the Google Sheet.")
        print("2. Ensure the Sheet ID is correct.")

if __name__ == '__main__':
    check_sheet_access()
