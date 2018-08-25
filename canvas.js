var newCanvas = document.getElementById('myCanvas')
var context = newCanvas.getContext('2d')


function reSizeCanvas(newCanvas) {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    newCanvas.width = pageWidth
    newCanvas.height = pageHeight
    context.fillStyle = "#fff";
    context.fillRect(0, 0, newCanvas.width, newCanvas.height);
}

//判定是否支持手机屏幕的事件，如果不是未定义，则代表是手机屏幕，else电脑代码
if (document.ontouchstart !== undefined) {

    reSizeCanvas(newCanvas)

    //画笔是否开启控制
    var using = false

    //橡皮擦控制
    var usingEraser = false

    // //当橡皮擦按钮被点击时，橡皮擦取反
    // var buttonEraser = document.getElementById('eraser')
    // var buttonBrush = document.getElementById('brush')
    // var actions = document.getElementById('actions')
    // buttonEraser.onclick = function () {
    //     usingEraser = !usingEraser
    //     actions.className = "actions x"
    // }

    // buttonBrush.onclick = function () {
    //     usingEraser = !usingEraser
    //     actions.className = "actions"
    // }

    //控制功能栏按钮

    var brush = document.getElementById('brush')
    var eraser = document.getElementById('eraser')
    var clear = document.getElementById('clear')
    var save = document.getElementById('save')

    brush.onclick = function () {
        usingEraser = false
        brush.classList.add('highlighted')
        eraser.classList.remove('highlighted')
        clear.classList.remove('highlighted')
        save.classList.remove('highlighted')
    }

    eraser.onclick = function () {
        usingEraser = true
        eraser.classList.add('highlighted')
        brush.classList.remove('highlighted')
        clear.classList.remove('highlighted')
        save.classList.remove('highlighted')
    }

    clear.onclick = function () {
        clearScreen()
        clear.classList.add('highlighted')
        brush.classList.remove('highlighted')
        eraser.classList.remove('highlighted')
        save.classList.remove('highlighted')
    }

    save.onclick = function () {
        save.classList.add('highlighted')
        clear.classList.remove('highlighted')
        brush.classList.remove('highlighted')
        eraser.classList.remove('highlighted')

        var url = newCanvas.toDataURL("image/png")
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = 'my picture'
        a.target = "_blank"
        a.click()
    }


    //清屏函数，把全屏覆盖背景色
    function clearScreen() {
        context.fillStyle = "#fff"
        context.fillRect(0, 0, newCanvas.width, newCanvas.height)
    }



    //颜色控制按钮
    var red = document.getElementById('red')
    var blue = document.getElementById('blue')
    var green = document.getElementById('green')
    var pink = document.getElementById('pink')
    var purple = document.getElementById('purple')


    red.onclick = function () {
        context.fillStyle = 'red'
        context.strokeStyle = 'red'
        red.classList.add('highlighted')
        blue.classList.remove('highlighted')
        green.classList.remove('highlighted')
        pink.classList.remove('highlighted')
        purple.classList.remove('highlighted')
    }

    blue.onclick = function () {
        context.fillStyle = 'blue'
        context.strokeStyle = 'blue'
        red.classList.remove('highlighted')
        blue.classList.add('highlighted')
        green.classList.remove('highlighted')
        pink.classList.remove('highlighted')
        purple.classList.remove('highlighted')
    }

    green.onclick = function () {
        context.fillStyle = 'green'
        context.strokeStyle = 'green'
        red.classList.remove('highlighted')
        blue.classList.remove('highlighted')
        green.classList.add('highlighted')
        pink.classList.remove('highlighted')
        purple.classList.remove('highlighted')
    }

    pink.onclick = function () {
        context.fillStyle = 'pink'
        context.strokeStyle = 'pink'
        red.classList.remove('highlighted')
        blue.classList.remove('highlighted')
        green.classList.remove('highlighted')
        pink.classList.add('highlighted')
        purple.classList.remove('highlighted')
    }

    purple.onclick = function () {
        context.fillStyle = 'purple'
        context.strokeStyle = 'purple'
        red.classList.remove('highlighted')
        blue.classList.remove('highlighted')
        green.classList.remove('highlighted')
        pink.classList.remove('highlighted')
        purple.classList.add('highlighted')
    }

    //调整线条粗细条
    var small = document.getElementById('small')
    var middle = document.getElementById('middle')
    var big = document.getElementById('big')

    //默认线粗为2px
    context.lineWidth = 2;

    small.onclick = function () {
        context.lineWidth = 2;
    }

    middle.onclick = function () {
        context.lineWidth = 4;
    }

    big.onclick = function () {
        context.lineWidth = 8;
    }





    //定义初始点
    lastPoint = {
        "x": undefined,
        "y": undefined
    }

    //当鼠标按下时，开启画笔，记录当前画笔坐标，并画点
    newCanvas.ontouchstart = function (moveBrush) {
        using = true
        var x = moveBrush.touches[0].clientX
        var y = moveBrush.touches[0].clientY
        if (usingEraser) {
            context.clearRect(x - 3, y - 3, 12, 12)
        } else {
            lastPoint = {
                "x": x,
                "y": y
            }
            // context.fillRect(x - 3, y - 3, 6, 6)
        }
    }


    //画线函数
    function drawLine(x1, y1, x2, y2) {
        context.beginPath();
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
        context.closePath()
    }

    //当鼠标移动时，记录新点位置，并和上一点画线
    newCanvas.ontouchmove = function (moveBrush) {
        if (using) {
            var x = moveBrush.touches[0].clientX
            var y = moveBrush.touches[0].clientY
            if (usingEraser) {
                context.clearRect(x - 3, y - 3, 12, 12)
            } else {

                var newPoint = { "x": x, "y": y }
                // context.fillRect(x - 3, y - 3, 6, 6)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint //画完后，新点赋值给上一点
            }
        }
    }



    //当鼠标送开时，画笔关闭
    newCanvas.ontouchend = function (moveBrush) {
        using = false
    }

}

else {
    //获取用户窗口大小，调整画板大小


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

    var brush = document.getElementById('brush')
    var eraser = document.getElementById('eraser')
    var clear = document.getElementById('clear')
    var save = document.getElementById('save')

    brush.onclick = function () {
        usingEraser = false
        brush.classList.add('highlighted')
        eraser.classList.remove('highlighted')
        clear.classList.remove('highlighted')
        save.classList.remove('highlighted')
    }

    eraser.onclick = function () {
        usingEraser = true
        eraser.classList.add('highlighted')
        brush.classList.remove('highlighted')
        clear.classList.remove('highlighted')
        save.classList.remove('highlighted')
    }

    clear.onclick = function () {
        clearScreen()
        clear.classList.add('highlighted')
        brush.classList.remove('highlighted')
        eraser.classList.remove('highlighted')
        save.classList.remove('highlighted')
    }

    save.onclick = function () {
        save.classList.add('highlighted')
        clear.classList.remove('highlighted')
        brush.classList.remove('highlighted')
        eraser.classList.remove('highlighted')

        var url = newCanvas.toDataURL("image/png")
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = 'my picture'
        a.target = "_blank"
        a.click()
    }


    //清屏函数，把全屏覆盖背景色
    function clearScreen() {
        context.fillStyle = "#fff"
        context.fillRect(0, 0, newCanvas.width, newCanvas.height)
    }



    //颜色控制按钮
    var red = document.getElementById('red')
    var blue = document.getElementById('blue')
    var green = document.getElementById('green')
    var pink = document.getElementById('pink')
    var purple = document.getElementById('purple')


    red.onclick = function () {
        context.fillStyle = 'red'
        context.strokeStyle = 'red'
        red.classList.add('highlighted')
        blue.classList.remove('highlighted')
        green.classList.remove('highlighted')
        pink.classList.remove('highlighted')
        purple.classList.remove('highlighted')
    }

    blue.onclick = function () {
        context.fillStyle = 'blue'
        context.strokeStyle = 'blue'
        red.classList.remove('highlighted')
        blue.classList.add('highlighted')
        green.classList.remove('highlighted')
        pink.classList.remove('highlighted')
        purple.classList.remove('highlighted')
    }

    green.onclick = function () {
        context.fillStyle = 'green'
        context.strokeStyle = 'green'
        red.classList.remove('highlighted')
        blue.classList.remove('highlighted')
        green.classList.add('highlighted')
        pink.classList.remove('highlighted')
        purple.classList.remove('highlighted')
    }

    pink.onclick = function () {
        context.fillStyle = 'pink'
        context.strokeStyle = 'pink'
        red.classList.remove('highlighted')
        blue.classList.remove('highlighted')
        green.classList.remove('highlighted')
        pink.classList.add('highlighted')
        purple.classList.remove('highlighted')
    }

    purple.onclick = function () {
        context.fillStyle = 'purple'
        context.strokeStyle = 'purple'
        red.classList.remove('highlighted')
        blue.classList.remove('highlighted')
        green.classList.remove('highlighted')
        pink.classList.remove('highlighted')
        purple.classList.add('highlighted')
    }

    //调整线条粗细条
    var small = document.getElementById('small')
    var middle = document.getElementById('middle')
    var big = document.getElementById('big')

    //默认线粗为2px
    context.lineWidth = 2;

    small.onclick = function () {
        context.lineWidth = 2;
    }

    middle.onclick = function () {
        context.lineWidth = 4;
    }

    big.onclick = function () {
        context.lineWidth = 8;
    }



    // //当橡皮擦按钮被点击时，橡皮擦取反
    // var buttonEraser = document.getElementById('eraser')
    // var buttonBrush = document.getElementById('brush')
    // var actions = document.getElementById('actions')
    // buttonEraser.onclick = function () {
    //     usingEraser = !usingEraser
    //     actions.className = "actions x"
    // }

    // buttonBrush.onclick = function () {
    //     usingEraser = !usingEraser
    //     actions.className = "actions"
    // }


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
            // context.fillRect(x - 3, y - 3, 6, 6)
        }
    }


    //画线函数
    function drawLine(x1, y1, x2, y2) {
        context.beginPath();
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
        context.closePath()
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
                // context.fillRect(x - 3, y - 3, 6, 6)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint //画完后，新点赋值给上一点
            }
        }
    }



    //当鼠标送开时，画笔关闭
    newCanvas.onmouseup = function (moveBrush) {
        using = false
    }

}










