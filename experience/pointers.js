class Pointer {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.lifetime = 255;
    this.speed = 2;
  }

  display() {
    noFill();
    stroke(this.color, this.lifetime);
    circle(this.x, this.y, this.size);
  }

  move() {
    this.y += this.speed;
  }

  removelife() {
    this.lifetime = 0; // Decrease lifetime
  }

  die() {
    return this.lifetime <= 0; // Pointer dies if lifetime is 0
  }

  intersect(arrowX, arrowY) {
    return dist(this.x, this.y, arrowX, arrowY) <= this.size - 24;
  }

  interact(arrowX, arrowY) {
    if (this.intersect(arrowX, arrowY)) {
      this.removelife(); // Remove life if intersecting
    }
  }
}
