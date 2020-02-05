const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function playVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
      video.srcObject = localMediaStream
      video.play()
    })
    .catch(err => {
      console.error('啟動失敗', err);
    })
}

function paintToCanvas() {
  const width = video.videoWidth
  const height = video.videoHeight
  canvas.width = width
  canvas.height = height

  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)
    // get image data (pixels)
    pixels = ctx.getImageData(0, 0, width, height)
    // change image data
    pixels = redEffect(pixels)
    // put it back
    ctx.putImageData(pixels, 0, 0)
  }, 16);
}

function takePhoto() {
  snap.currentTime = 0
  snap.play()

  const data = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')

  link.href = data
  link.setAttribute('download', 'myself')
  link.innerHTML = `<img src="${data}" alt="myself">`
  strip.insertBefore(link, strip.firstChild)
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] += 50
    pixels.data[i + 1] -= 100
    pixels.data[i + 2] -= 20
  }
  return pixels
}

video.addEventListener('canplay', paintToCanvas)


playVideo()