from flask import Flask, send_from_directory, jsonify
import os

app = Flask(__name__, static_folder='PUBLIC')

MUSIC_FOLDER = os.path.join(os.getcwd(), 'music')

@app.route('/music')
def list_music():
    files = [f for f in os.listdir(MUSIC_FOLDER) if f.endswith('.mp3')]
    return jsonify(files)

@app.route('/music/<filename>')
def get_music(filename):
    return send_from_directory(MUSIC_FOLDER, filename)

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    app.run(debug=True)
