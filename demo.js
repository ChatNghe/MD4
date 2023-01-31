let arr = [1,8,3,9,15]
let flag = false
let x;
for (let i = 0; i < [arr.length-1]; i++) {
    if (arr[i] ===3) {
        flag = true
        x = i
        break;
    }
}
if (flag === true) console.log(x)