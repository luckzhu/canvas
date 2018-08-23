var newCanvas = document.getElementById('myCanvas')
var context = newCanvas.getContext('2d')

//获取用户窗口大小，调整画板大小
function reSizeCanvas(newCanvas) {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    newCanvas.width = pageWidth
    newCanvas.height = pageHeight
}

//初始化画板大小和屏幕相同
reSizeCanvas(newCanvas)

//当屏幕尺寸改变时，自动调整屏幕
window.onresize = function () {
    reSizeCanvas(newCanvas)
}

//画笔是否开启控制
var using = false

//橡皮擦控制
var usingEraser = false




//当橡皮擦按钮被点击时，橡皮擦取反
var buttonEraser = document.getElementById('eraser')
var buttonBrush = document.getElementById('brush')
var actions = document.getElementById('actions')
buttonEraser.onclick = function () {
    usingEraser = !usingEraser
    actions.className = "actions x"
}

buttonBrush.onclick = function () {
    usingEraser = !usingEraser
    actions.className = "actions"
}


//定义初始点
lastPoint = {
    "x": undefined,
    "y": undefined
}

//当鼠标按下时，开启画笔，记录当前画笔坐标，并画点
newCanvas.onmousedown = function (moveBrush) {
    using = true
    var x = moveBrush.clientX
    var y = moveBrush.clientY
    if (usingEraser) {
        context.clearRect(x - 3, y - 3, 12, 12)
    } else {
        lastPoint = {
            "x": x,
            "y": y
        }
        context.fillRect(x - 3, y - 3, 6, 6)
    }
}


//画线函数
function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strockStyle = 'black'
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
    context.lineWidth = 6
}

//当鼠标移动时，记录新点位置，并和上一点画线
newCanvas.onmousemove = function (moveBrush) {
    if (using) {
        var x = moveBrush.clientX
        var y = moveBrush.clientY
        if (usingEraser) {
            context.clearRect(x - 3, y - 3, 12, 12)
        } else {

            var newPoint = { "x": x, "y": y }
            context.fillRect(x - 3, y - 3, 6, 6)
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint //画完后，新点赋值给上一点
        }
    }
}



//当鼠标送开时，画笔关闭
newCanvas.onmouseup = function (moveBrush) {
    using = false
}








