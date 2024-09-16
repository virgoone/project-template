import dayjs from 'dayjs'

export function formatDate(
  date?: string | number | Date | dayjs.Dayjs | null | undefined,
  format = 'YYYY-MM-DD HH:mm'
) {
  return dayjs(date).format(format)
}

export function formatTick(tickItem: string | number) {
  // 如果 tickItem 是数字，就将其除以 1000 并添加 'k' 后缀
  if (typeof tickItem === 'number') {
    return `${(tickItem / 100 / 1000).toFixed(1)}k`
  }
  // 如果 tickItem 不是数字（例如，自定义刻度），则直接返回
  return tickItem
}
export function formatSize(size: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let i = 0
  while (size >= 1024) {
    size /= 1024
    i++
  }
  return `${size.toFixed(2)} ${units[i]}`
}

export function formateType(name: string | undefined) {
  const nameList = name?.split('.')
  if (nameList?.length && nameList.length === 2) {
    return nameList[1]
  } else {
    return 'file'
  }
}

export function formatCapacity(capacity: string) {
  const num = capacity.split('Gi')[0]
  return Number.parseInt(num, 10)
}

// value : Second
export function addDateByValue(date: Date, value: number) {
  const newNum = date.setTime(date.getTime() + value * 1000)
  return new Date(newNum)
}

export function isExitInList(
  targetKey: string,
  targetValue: any,
  list: any[] | undefined
) {
  const indexList: number[] = []
  ;(list || []).forEach((item: any, index: number) => {
    if (item[targetKey] === targetValue) {
      indexList.push(index)
    }
  })
  return indexList
}
export function formatLimitTraffic(traffic: number) {
  return traffic / 1024
}

export function uniformCPU(cpu: number) {
  return cpu
}

export function uniformMemory(memory: number) {
  return memory / 1024 / 1024
}

export function uniformCapacity(capacity: number) {
  return capacity / 1024 / 1024
}

export function uniformStorage(Storage: number) {
  return Storage / 1024 / 1024
}

export function formatPort(port: number | undefined) {
  return port === 80 || port === 443 ? '' : `:${port}`
}

export function formatPrice(price?: number) {
  return price ? `¥${(price / 100).toFixed(2)}` : '¥0.00'
}

export function formatOriginalPrice(price?: number, fixedNumber?: number) {
  return price ? `¥${price.toFixed(fixedNumber || 2)}` : '¥0.00'
}

export function convertMoney(money: number) {
  return money * 100
}

export function hidePhoneNumber(phone: string) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

export function changeURL(param: string) {
  const currentURL = window.location.pathname
  const lastIndex = currentURL.lastIndexOf('/')
  return currentURL.substring(0, lastIndex) + param
}
