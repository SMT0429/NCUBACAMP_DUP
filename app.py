from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

@app.route('/signup')
def signup():
    return render_template('signup.html')  # 或是您的報名表單頁面

if __name__ == "__main__":
    app.run(debug=True, port=5001)