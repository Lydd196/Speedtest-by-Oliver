document.getElementById('startTest').addEventListener('click', () => {
  document.getElementById('downloadSpeed').innerText = 'Testing...';
  document.getElementById('uploadSpeed').innerText = 'Testing...';

  runDownloadTest();
  runUploadTest();
});

//Function to run download test by fetching 100mb file from the server
async function runDownloadTest() {
  const start = performance.now();
  const response = await fetch('http://127.0.0.1:5000/download');
  const blob = await response.blob();
  const end = performance.now();

  const durationSeconds = (end - start) / 1000;
  const bytes = blob.size;
  const bits = bytes * 8;
  var mbps = bits / (durationSeconds * 1024 * 1024);
  mbps = mbps.toFixed(2);

  document.getElementById('downloadSpeed').innerText = mbps;
}

//Function to run upload test by sending 100mb of data to the server
async function runUploadTest() {
  const dataSizeBytes = 100 * 1024 * 1024; 
  const data = new Uint8Array(dataSizeBytes); //Fills data with just 0's
  
  const start = performance.now();
  const response = await fetch('http://127.0.0.1:5000/upload', {
    method: 'POST',
    body: data
  });
  const end = performance.now();

  if (!response.ok) {
    console.error('Upload failed');
    return;
  }

  const durationSeconds = (end - start) / 1000;
  const bits = dataSizeBytes * 8;
  var mbps = bits / (durationSeconds * 1024 * 1024);
  mbps = mbps.toFixed(2);

  document.getElementById('uploadSpeed').innerText = mbps;
}