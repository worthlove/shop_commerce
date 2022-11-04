// 数字加千分位分隔符
export const getThousandNum = (str) => {
  let str1 = ''
  String(str).splice('').reverse().forEach((v, i) => {
    if ((i + 1) % 3) {
      str1 = v + str1
    } else {
      if (i + 1 === String(str).length) {
        str1 = v + str1
      } else {
        str1 = ',' + v + str1
      }
    }
  })
  return str1
}

// 使用说明：
/*
*   1、使用 import {} @/utils/getThousandNum
*   2、使用 getThousandNum(数值)
*  */
