// Elements
const player = document.querySelector('.player')
const video = document.querySelector('.viewer')
const progress = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')
const playButton = document.querySelector('.toggle')
const skipButtons = document.querySelectorAll('[data-skip]')
const ranges = document.querySelectorAll('.player__slider')


// Functions
function togglePlay() {
  if (video.paused) video.play()
  else video.pause()
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚'
  playButton.textContent = icon
}

function skip() {
  video.currentTime += +this.dataset.skip
}

function updateRange() {
  video[this.name] = this.value
}

function updateProgress(e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration
}

function updateProgressBar() {
  const percentage = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percentage}%`
}


// Event listeners
let isMouseDown = false
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', updateProgressBar)
progress.addEventListener('click', updateProgress)
progress.addEventListener('mousedown', () => isMouseDown = true)
progress.addEventListener('mouseup', () => isMouseDown = false)
progress.addEventListener('mousemove', (e) => isMouseDown && updateProgress(e))
playButton.addEventListener('click', togglePlay)
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', updateRange))