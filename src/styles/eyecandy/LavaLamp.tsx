// cred - Frank Lab - https://www.youtube.com/watch?v=PKQKIfv6yAw

import {useEffect, useState, useRef} from 'react'

export const LavaLamp = () => {

  const canvasRef = useRef(null)

  


  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx.fillStyle = '#d8cf8e'

    const effect = new MetaballsEffect(canvas.width, canvas.height)
    effect.init(20)

    function animate(){
      ctx.clearRect(0,0, canvas.width, canvas.height)
      effect.update()
      effect.draw(ctx)
      requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('resize', () =>{
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.fillStyle = 'white'
      effect.reset(canvas.width, canvas.height)
    })
  
    // return () => 
  }, [])
  
  return (<>
    <canvas 
      ref={canvasRef} 
      style={{
        backgroundColor: '#48452f', 
        display: 'block',
        filter: 'blur(20px) contrast(20)',
      }}
    ></canvas>
  </>
  )
}


class Ball{
  constructor(effect){
    this.effect = effect
    this.x = this.effect.width * 0.5
    this.y = this.effect.height * 0.5
    this.radius = Math.random() * 80 + 20
    this.speedX = Math.random() - .5
    this.speedY = Math.random() - .2
  }

  update(){
    if(this.x < this.radius || this.x > this.effect.width - this.radius) this.speedX *= -1
    this.x += this.speedX
    if(this.y < this.radius || this.y > this.effect.height - this.radius) this.speedY *= -1
    this.y += this.speedY

  }

  draw(context){
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    context.fill()
  }

  reset(){
    this.x = this.effect.width * .5
    this.y = this.effect.height * .5
  }
}

class MetaballsEffect{
  constructor(width, height){
    this.width = width
    this.height = height
    this.metaballsArray = []

  }

  init(numOfBalls){
    for (let i = 0; i < numOfBalls; i++) {
      this.metaballsArray.push(new Ball(this))
    }
  }

  update(){
    this.metaballsArray.forEach(metaball => metaball.update())
  }

  draw(context){
    this.metaballsArray.forEach(metaball => metaball.draw(context))
  }

  reset(newWidth, newHeight){
    this.width = newWidth
    this.height = newHeight
    this.metaballsArray.forEach(metaball => metaball.reset())
  }
}
