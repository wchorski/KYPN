// @ts-nocheck
'use client'
import React, { Component } from 'react';

class VectorGPT extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.ctx = props.ctx
    this.strokeStyle = 'blue'
    this.lineWidth = 1
    this.lineLength = 15
    this.width = props.width
    this.height = props.height
    this.flowFieldAnimation;
    // this.angle = 0
    this.lastTime = 0
    this.interval = 1000/60
    this.timer = 0
    this.cellSize = 15
    this.zoomx = .004
    this.zoomy = .001
    this.gradient
    this.radius = 2
    this.velr = .01
    this.mouse = {
      x: 0,
      y: 0
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.initializeCanvas();
    this.startAnimation();
    window.addEventListener('mousemove', this.handleMouseMove)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
  }

  // createGradient(ctx){
  //   this.gradient = ctx.createLinearGradient(0,0, this.width, this.height)
  //   this.gradient.addColorStop('0.1', '#33ff9c')
  //   this.gradient.addColorStop('0.4', '#33ffd6')
  //   this.gradient.addColorStop('0.7', '#33ff5c')
  //   this.gradient.addColorStop('0.9', '#33b4ff')
  // }

  handleResize = () => {
    cancelAnimationFrame(this.flowFieldAnimation)
    this.initializeCanvas();
    this.startAnimation();
  };

  handleMouseMove = (event) => {
    const { left, top } = this.canvasRef.current.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    this.mouse = { x, y }
  };

  initializeCanvas() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Adjust canvas size based on window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set initial position and angle
    this.centerX = canvas.width / 2;
    this.centerY = canvas.height / 2;
  }

  draw(ctx, angle, x, y){
    let posX = x
    let posY = y
    let dx = this.mouse.x - posX
    let dy = this.mouse.y - posY
    let distance = dx*dx + dy*dy
    if(distance > 100000) distance = 100000
    else if(distance < 40000) distance = 40000
    this.lineLength = distance/10000 - 1

    ctx.beginPath();
    // ctx.arc(this.mouse.x, this.mouse.y, 5, 0, Math.PI * 2);
    ctx.moveTo(x, y);
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.gradient
    // ctx.lineTo(this.mouse.x, this.mouse.y);
    ctx.lineTo(x + Math.cos(angle) * this.lineLength, y + Math.sin(angle) * this.lineLength);
    ctx.stroke();
    // ctx.strokeStyle = this.strokeStyle
  }

  startAnimation() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop('0.1', '#33ff9c7e')
    gradient.addColorStop('0.4', '#33ffd67d')
    gradient.addColorStop('0.7', '#33ff5c96')
    gradient.addColorStop('0.9', '#33b4ff90')
    ctx.strokeStyle = gradient;

    const animation = (timeStamp) => {
      const deltaTime = timeStamp - this.lastTime
      this.lastTime = timeStamp
      if(this.timer > this.interval){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.radius += this.velr
        if(this.radius > 100 || this.radius < -15) this.velr *= -1

        for(let y = 0; y < canvas.height; y += this.cellSize){
          for(let x = 0; x < canvas.width; x += this.cellSize){
            const angle = (Math.cos(x * this.zoomx) + Math.sin(y * this.zoomy)) * this.radius
            this.draw(ctx, angle, x,y)
          }
        }

        this.timer = 0

      } else {
        this.timer += deltaTime
      }

      this.flowFieldAnimation = requestAnimationFrame(animation.bind(this));
    };

    animation(0);
  }

  render() {
    return <canvas ref={this.canvasRef} style={{backgroundColor: 'black', width: '100%', }} />;
  }
}


export default VectorGPT;