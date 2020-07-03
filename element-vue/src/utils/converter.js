export function arr2shortString(arr) {
    if (arr.length === 1) return arr[0]
    arr = [...new Set(arr)]                                 //去重
    arr = arr.sort(function (a, b) {
        return a - b
    })
    var min = arr[0]
    var max
    var newArr = []
    for (let i = 0; i < arr.length - 1; i++) {
        max = arr[i] === arr[i + 1] - 1 ? arr[i + 1] : arr[i]
        if (max === arr[i] || max === arr[arr.length - 1]) {
            newArr.push(min === max ? max : min + '-' + max)
            min = arr[i + 1]
            if (min === arr[arr.length - 1] && min - 1 !== arr[i]) {
                newArr.push(min)
            }
        }
    }
    return newArr.toString()
}

//分割，arr为数组，range为分割范围，要求：arr为已排序数组,range为正整数
export function seg(arr, range) {
    arr = [...new Set(arr)]                                 //去重
    var min = arr[0]
    var max
    var newArr = []
    for (let i = 0; i < arr.length - 1; i++) {
        max = arr[i] === arr[i + 1] - 1 ? arr[i + 1] : arr[i]
        if (arr[i] - min === range - 1) {                                     //在constrict的基础上加if
            newArr.push(min + '-' + arr[i])
            min = arr[i + 1]
        } else if (max === arr[i] || max === arr[arr.length - 1]) {
            newArr.push(min === max ? max : min + '-' + max)
            min = arr[i + 1]
            if (min === arr[arr.length - 1] && min - 1 !== arr[i]) {
                newArr.push(min)
            }
        }
    }
    return newArr.toString()
}


// 课表items.item转可显示html
export function item2html(items) {
    if (!items.length) return ''
    let spanHeader = '<span>'
    let spanFooter = '</span>'
    let br = '<br>'
    let html = ''
    for (let item in items) {
        html += spanHeader + items[item].course_name + ' ' + items[item].nickname + spanFooter + br
        html += spanHeader + items[item].classes + ' ' + items[item].population + spanFooter + br
        html += spanHeader + '第' + arr2shortString(items[item].weeks) + '周' + spanFooter + br
        html += spanHeader + items[item].software + spanFooter + br
    }
    return html
}
