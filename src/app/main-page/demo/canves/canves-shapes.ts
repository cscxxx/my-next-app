export class Rectangle {
  ctx: CanvasRenderingContext2D;
  color: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  constructor(
    ctx: CanvasRenderingContext2D,
    color: string,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    this.ctx = ctx;
    this.color = color;
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
  }

  get minX() {
    return Math.min(this.startX, this.endX);
  }

  get maxX() {
    return Math.max(this.startX, this.endX);
  }

  get minY() {
    return Math.min(this.startY, this.endY);
  }
  get maxY() {
    return Math.max(this.startY, this.endY);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.minX * devicePixelRatio, this.minY * devicePixelRatio);
    this.ctx.lineTo(this.maxX * devicePixelRatio, this.minY * devicePixelRatio);
    this.ctx.lineTo(this.maxX * devicePixelRatio, this.maxY * devicePixelRatio);
    this.ctx.lineTo(this.minX * devicePixelRatio, this.maxY * devicePixelRatio);
    this.ctx.lineTo(this.minX * devicePixelRatio, this.minY * devicePixelRatio);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.strokeStyle = "#fff";
    this.ctx.lineCap = "square"; // 处理线头处如何拼接
    this.ctx.lineWidth = 3 * devicePixelRatio;
    this.ctx.stroke();
  }

  isInside(x: number, y: number) {
    return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
  }
}

export function getShape(shapes: Rectangle[], x: number, y: number) {
  for (let i = shapes.length - 1; i >= 0; i--) {
    const shape = shapes[i];
    if (shape.isInside(x, y)) {
      return shape;
    }
  }
  return null;
}
