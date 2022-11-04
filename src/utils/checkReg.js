/**
 * Created by json on 21/11/15.
 */

/**
 * @param {string} path  判断字符串是否是https?:|mailto:|tal: 开头的
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str  判断都是小写字母
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str  判断都是大写字母
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str  判断是否是字母
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str 判断是否字符串
 * @returns {Boolean}
 */
export function isString(str) {
  return typeof str === 'string' || str instanceof String
}

/**
 * @param {Array} arg  判断是否是数组
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @param rule
 * @param {string} value
 * @param callback
 * @returns {Boolean}
 * 校验邮箱
 */
export function validateEMail(rule, value, callback) {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
  if (!value) {
    callback(new Error('邮箱不能为空'))
  } else {
    console.log(value)
    if (!reg.test(value)) {
      callback(new Error('请输入正确的邮箱'))
    } else {
      console.log('@@@@@@@')
      callback()
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * 手机号
 */
export function validatePhone(rule, value, callback) {
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
  if (!value) {
    callback(new Error('手机号不能为空'))
  } else {
    if (!reg.test(value)) {
      callback(new Error('请输入正确的手机号'))
    } else {
      callback()
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * 固定电话
 */
export function validateTelPhone(rule, value, callback) {
  const reg = /0\d{2,3}-\d{7,8}/
  if (!value) {
    callback(new Error('固定电话不能为空'))
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的固定电话）'))
    } else {
      callback()
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * 身份证
 */
export function validateIdNo(rule, value, callback) {
  const reg =
    /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正确的身份证号码'))
    } else {
      callback()
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * 正整数
 */
export function validateInteger(rule, value, callback) {
  const reg = /^\+?[1-9]\d*$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入正整数'))
    } else {
      callback()
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * 小写字母
 */
export function validateLowerCase(rule, value, callback) {
  const reg = /^[a-z]+$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入小写字母'))
    } else {
      callback()
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * 大写字母
 */
export function validateUpperCase(rule, value, callback) {
  const reg = /^[A-Z]+$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入小写字母'))
    } else {
      callback()
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * 数字字母下划线
 */
export function validateBaseData(rule, value, callback) {
  const reg = /^[a-zA-Z0-9_]{4,16}$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入数字字母下划线'))
    } else {
      callback()
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * url
 */
export function validateUrl(rule, value, callback) {
  const reg = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-\(\)]*[\w@?^=%&/~+#-\(\)])?$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入合法地址'))
    } else {
      callback()
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * 密码  （最少六位，包含一个大写字母，一个小写字母，一个数字，一个字符1）
 */
export function validatePass(rule, value, callback) {
  const reg = /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
  if (value === '' || value === undefined || value == null) {
    callback(new Error('请输入密码'))
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入8-16个数字、字母的组合'))
    } else {
      callback()
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * 只能输入中文
 */
export function validateHan(rule, value, callback) {
  const reg = /^[\u4e00-\u9fa5·]{2,16}$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入中文'))
    } else {
      callback()
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * IPv4
 */
export function validateIPv4(rule, value, callback) {
  const reg =
    /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('不合法IPV4'))
    } else {
      callback()
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * IPv6
 */
export function validateIPv6(rule, value, callback) {
  const reg =
    /^(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))|\[(?:(?:[0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b)\.){3}(\b((25[0-5])|(1\d{2})|(2[0-4]\d)|(\d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))](?::(?:[0-9]|[1-9][0-9]{1,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5]))?$/i
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('不合法IPV6'))
    } else {
      callback()
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * MAC
 */
export function validateMAC(rule, value, callback) {
  const reg = /[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}:[A-Fa-f0-9]{2}/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('不合法MAC'))
    } else {
      callback()
    }
  }
}

/**
 * @param {string} value
 * @returns {Boolean}
 * 数字
 */
export function validDateNum(rule, value, callback) {
  const reg = /^-?\d*\.?\d+$/
  if (value === '' || value === undefined || value == null) {
    callback()
  } else {
    if ((!reg.test(value)) && value !== '') {
      callback(new Error('请输入数字'))
    } else {
      callback()
    }
  }
}
