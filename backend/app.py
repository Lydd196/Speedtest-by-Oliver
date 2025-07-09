from flask import Flask, send_file, request, jsonify
import time

app = Flask(__name__)

#Download test, with 100mb file
def download():
    return send_file('testfile.dat', as_attachment=True)
app.add_url_rule('/download', 'download', download)

#Upload test
def upload():
    startTime = time.time()
    data = request.data  
    byteSize = len(data)
    duration = time.time() - startTime if time.time() - startTime > 0 else 0.001

    speedMbps = (byteSize * 8) / (duration * 1024 * 1024)

    return jsonify({
        "uploadedBytes": byteSize,
        "durationSeconds": duration,
        "uploadSpeedMbps": round(speedMbps, 2)
    }), 200
app.add_url_rule('/upload', 'upload', upload, methods=['POST'])

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")