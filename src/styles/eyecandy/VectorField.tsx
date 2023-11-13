// @ts-nocheck
// cred - https://stackoverflow.com/questions/71457792/resize-event-in-react
// cred - https://www.youtube.com/watch?v=uCH1ta5OUHw
import { useEffect, useRef, useState } from "react"

export function VectorField() {

  const canvas = useRef<HTMLCanvasElement>(null)
  const [mouse, setMouse] = useState({x:0, y:0})

  let ctx;
  let flowField;
  let flowFieldAnimation;


  useEffect(() => {
    if(!canvas.current) return console.log('no canvas found');

    const ctx = canvas?.current?.getContext('2d')
    canvas.current.width = window.innerWidth
    canvas.current.height = window.innerHeight

    window.addEventListener('resize', function() {
      if(!canvas.current) return console.log('no canvas found');
      
      cancelAnimationFrame(flowFieldAnimation)
      canvas.current.width = window.innerWidth + 1
      canvas.current.height = window.innerHeight + 1
      const flowField = new FlowFieldEffect(ctx, canvas.current.width, canvas.current.height)
      flowField.animate(0)
    });

    window.addEventListener('mousemove', function(e){
      setMouse({x: e.x, y: e.y})
    })

    class FlowFieldEffect {
      #ctx
      #width
      #height
    
      constructor(ctx, width, height){
        this.#ctx = ctx
        // this.#ctx.strokeStyle = 'blue'
        this.#ctx.lineWidth = 0.3
        this.#width = width
        this.#height = height
        this.#drawLine(10, 10)
        // this.angle = 0
        this.radius = 10
        this.lastTime = 0
        this.interval = 1000/60
        this.timer = 0
        this.cellSize = 7
        this.gradient
        this.#createGradient()
        this.#ctx.strokeStyle = this.gradient
        this.zoomx = .004
        this.zoomy = .001
        this.radius = 5
        this.velr = 0.03
      }

      #createGradient(){
        this.gradient = this.#ctx.createLinearGradient(0,0, this.#width, this.#height)
        this.gradient.addColorStop('0.1', '#33ff9c')
        this.gradient.addColorStop('0.4', '#33ffd6')
        this.gradient.addColorStop('0.7', '#33ff5c')
        this.gradient.addColorStop('0.9', '#33b4ff')
      }
    
      #drawLine(angle,x,y){
        const length = 500
        this.#ctx.beginPath()
        this.#ctx.moveTo(x,y)
        this.#ctx.lineTo(x + Math.cos(angle) * 40, y + Math.sin(angle) * 40)
        // this.#ctx.lineTo(mouse.x, mouse.y)
        this.#ctx.stroke()
      }
    
      animate(timeStamp){
        let deltaTime = timeStamp - this.lastTime
        this.lastTime = timeStamp
        // this.angle += 0.1
        if(this.timer > this.interval){
          this.#ctx.clearRect(0,0, this.#width, this.#height)
          this.radius += this.velr

          for(let y = 0; y < this.#height; y += this.cellSize){
            for(let x = 0; x < this.#width; x += this.cellSize){
              const angle = (Math.cos(x * this.zoomx) + Math.sin(y * this.zoomy)) * this.radius
              this.#drawLine(angle,x,y)
            }
          }

          this.#drawLine(this.#width/2, this.#height/2)
          // this.#draw(this.#width/2 + Math.sin(this.angle) * this.radius, this.#height/2 + Math.cos(this.angle) * this.radius)
          this.timer = 0
        } else {
          this.timer += deltaTime
        }
        flowFieldAnimation = requestAnimationFrame(this.animate.bind(this))
      }
    }

    const flowField = new FlowFieldEffect(ctx, canvas.current.width, canvas.current.height)
    flowField.animate(0)

    // return () => 
  }, [])
  

  return (<>
    <p>{mouse.x}, {mouse.y}</p>
    <canvas ref={canvas} style={{backgroundColor: 'black', width: '100%', height: '60vh'}}> what is up</canvas>
  </>
  )
}
