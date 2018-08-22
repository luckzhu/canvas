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

var using = false
lastPoint = {
    "x":undefined,
    "y":undefined
}

newCanvas.onmousedown = function (moveBrush) {
    using = true
    var x = moveBrush.clientX
    var y = moveBrush.clientY

    lastPoint = {
        "x":x,
        "y":y
    }
    context.fillRect(x-3,y-3,6,6)
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strockStyle = 'black'
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
    context.lineWidth = 6
}


newCanvas.onmousemove = function (moveBrush) {
    if (using){
        var x = moveBrush.clientX
        var y = moveBrush.clientY
        var newPoint = {"x":x, "y":y}
        context.fillRect(x-3,y-3,6,6)
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
        console.log(lastPoint, newPoint)
    }
}

newCanvas.onmouseup = function (moveBrush) {
    using = false
}








