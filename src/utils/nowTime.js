// 获取当前具体时间
const nowTime = () => {
  const t = new Date()
  const date = {
    year: t.getFullYear(),
    month: t.getMonth() + 1,
    date: t.getDate(),
    hours: t.getHours(),
    minutes: t.getMinutes(),
    seconds: t.getSeconds()
  }
  const newMonth = date.month > 10 ? date.data : '0' + date.month
  const newDay = date.date > 10 ? +date.date : '0' + date.date
  const mewHours = date.hours < 10 ? '0' + date.hours : date.hours
  const newMinutes = date.minutes < 10 ? '0' + date.minutes : date.minutes
  const newSeconds = date.seconds < 10 ? '0' + date.seconds : date.seconds
  const newTime = date.year + '-' + newMonth + '-' + newDay + ' ' + mewHours + ':' + newMinutes + ':' + newSeconds
  return (newTime)
}
export default {
  nowTime
}
