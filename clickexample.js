
window.addEventListener('DOMContentLoaded', (event) =>{



    
    let keysPressed = {}

    let circles = []

    let color = "red"
    document.addEventListener('keydown', (event) => {
        keysPressed[event.key] = true;
     });
     
     document.addEventListener('keyup', (event) => {
         delete keysPressed[event.key];
      });

    let tutorial_canvas = document.getElementById("tutorial");
    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

    tutorial_canvas.style.background = "#000000"

    let boundingRect = tutorial_canvas.getBoundingClientRect()
    let tip = {}
    let tip2 = {}

    window.addEventListener('mousedown', event =>{
        boundingRect = tutorial_canvas.getBoundingClientRect()
        tip.x = event.clientX - boundingRect.left
        tip.y = event.clientY - boundingRect.top

        let circ = new Circle(tip.x, tip.y, 10, color)
        circles.push(circ)

        window.addEventListener('mousemove', move)

    })

    window.addEventListener("mouseup", event => {
        window.removeEventListener('mousemove', move)
    })

    function move(event){
        boundingRect = tutorial_canvas.getBoundingClientRect()
        tip2.x = event.clientX - boundingRect.left
        tip2.y = event.clientY - boundingRect.top

        boundingRect = tutorial_canvas.getBoundingClientRect()
        tip.x = event.clientX - boundingRect.left
        tip.y = event.clientY - boundingRect.top

        let circ = new Circle(tip.x, tip.y, 10, color)
        circles.push(circ)

        tutorial_canvas_context.moveTo(tip.x,tip.y)
        tutorial_canvas_context.lineTo(tip2.x,tip2.y)
        tutorial_canvas_context.stroke()
        console.log(tip2)

    }


    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){
            this.x+=this.xmom
            this.y+=this.ymom
        }
    }
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){

            this.height = 0
            this.width = 0
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
            this.lens = 0
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 0
            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
           tutorial_canvas_context.lineWidth=0
            tutorial_canvas_context.stroke(); 
        }
        move(){
            this.x += this.xmom
            this.y += this.ymom
        }
    }

    

   
    window.setInterval(function(){ 
        tutorial_canvas_context.clearRect(0,0,tutorial_canvas.width,tutorial_canvas.height)

        if(keysPressed['f']){
            color = "blue"
        }
        if(keysPressed['g']){
            color = "yellow"
        }
        if(keysPressed['h']){
            color = "red"
        }
        for(let t=1;t<circles.length;t++){
            circles[t].draw()

            tutorial_canvas_context.lineWidth=circles[t].radius*2
        tutorial_canvas_context.moveTo(circles[t].x,circles[t].y)
        tutorial_canvas_context.lineTo(circles[t-1].x,circles[t-1].y)
        tutorial_canvas_context.stroke()
        }
    }, 14) 

})