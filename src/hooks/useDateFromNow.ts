import dayjs from 'dayjs'

export function useDateFromNow(time: number | string) {
  const diff = dayjs().diff(dayjs(time), 'seconds')
  if (diff < 60) return '几秒前'
  console.log(dayjs().diff(dayjs(time), 'minute'))

  if (dayjs().diff(dayjs(time), 'minute') < 60)
    return dayjs().diff(dayjs(time), 'minute') + '分钟'

  if (dayjs().diff(dayjs(time), 'hour') < 60)
    return dayjs().diff(dayjs(time), 'hour') + '小时前'

  if (dayjs().diff(dayjs(time), 'day') < 24)
    return dayjs().diff(dayjs(time), 'day') + '天前'

  if (dayjs().diff(dayjs(time), 'month') < 30)
    return dayjs().diff(dayjs(time), 'month') + '个月前'

  return dayjs(time).format('YYYY-MM-DD HH:mm')
}
