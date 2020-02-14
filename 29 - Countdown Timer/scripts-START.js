let timer
const display = document.querySelector('.display__time-left')
const display2 = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')
const form = document.querySelector('#custom')

// 開始倒數
function countDown(seconds) {
  // 清除已存在的計時器
  window.clearInterval(timer)

  // 取得現在時間 & 要結束倒數的時間
  const now = Date.now()
  const then = now + seconds * 1000

  // 播放第一秒，否則會從少一秒的地方開始倒數（例如：120 秒會從 1:59 開始倒數）
  displayTimeLeft(seconds)
  displayEndTime(then)

  // 要結束倒數的時間 - 現在時間（每秒更新） = 目前剩餘時間
  timer = window.setInterval(() => {
    const now = Date.now()
    let secondsLeft = Math.round((then - now) / 1000)
    if (secondsLeft < 0) {
      window.clearInterval(timer)
      return
    }
    displayTimeLeft(secondsLeft)
  }, 1000)  
}

// 顯示時間
function displayTimeLeft(secondsLeft) {
  const minute = Math.floor(secondsLeft / 60)
  secondsLeft = secondsLeft % 60
  const time = `${minute}:${secondsLeft <= 9 ? '0' : ''}${secondsLeft}`
  display.textContent = time
  document.title = time
}

function displayEndTime(milliseconds) {
  const endTime = new Date(milliseconds)
  const hour = endTime.getHours()
  const minute = endTime.getMinutes()
  display2.textContent = `結束於 ${hour}:${minute <= 9 ? '0' : ''}${minute}`
}

function handleClick() {
  countDown(this.dataset.time)
}

function handleSubmit(e) {
  e.preventDefault()
  const minutes = document.querySelector('[name="minutes"]').value
  const seconds = minutes * 60
  countDown(seconds)
}

buttons.forEach((button) => {
  button.addEventListener('click', handleClick)
})

form.addEventListener('submit', handleSubmit)