window.playing = false
var media_id = 0;

var w = 0;
var h = 0;

btnStart.onclick = function () {
  getStream().then(getDevices).then(gotDevices)
  btnStart.setAttribute("hidden", "hidden");
  btnStop.removeAttribute("hidden");
};

btnStop.onclick = function () {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  window.playing = false; window.started = false;
  btnStop.setAttribute("hidden", "hidden");
  btnStart.removeAttribute("hidden");
};

videoIn.addEventListener('playing', function () {
  w = videoIn.videoWidth;
  h = videoIn.videoHeight;
  videoIn.height = h;
  videoIn.width = w;
  canvas.height = h;
  canvas.width = w;
  
  if (typeof canvas_in !== 'undefined') {
    canvas_in.height = h;
    canvas_in.width = w;
  }
  if (typeof div_out !== 'undefined') {
    div_out.style.width = w +'px';
    div_out.style.height = h + 'px';
  }
  if (typeof div_in !== 'undefined') {
    div_in.style.width = w + 'px';
    div_in.style.height = h + 'px';
  }

  window.playing = true
});

videoSelect.onchange = getStream;

function getContentWidth(element) {
  var styles = getComputedStyle(element)

  return element.clientWidth
    - parseFloat(styles.paddingLeft)
    - parseFloat(styles.paddingRight)
}

function getDevices() {
  // AFAICT in Safari this only gets default devices until gUM is called :/
  return navigator.mediaDevices.enumerateDevices();
}

function gotDevices(deviceInfos) {
  window.deviceInfos = deviceInfos; // make available to console
  for (const deviceInfo of deviceInfos) {
    const option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    }
  }
  videoSelect.selectedIndex = [...videoSelect.options].
    findIndex(option => option.text === stream.getVideoTracks()[0].label);
}

function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const videoSource = videoSelect.value;
  const width = getContentWidth(contIn);
  const constraints = {
    video: {
      deviceId: videoSource ? { exact: videoSource } : undefined,
      facingMode: "environment",
      width: { max: width }
    }
  };
  return navigator.mediaDevices.getUserMedia(constraints).then(gotStream).catch(handleError);
}

function gotStream(stream) {
  window.stream = stream; // make stream available to console
  videoIn.srcObject = stream;
}


function handleError(error) {
  console.error('Error: ', error);
}