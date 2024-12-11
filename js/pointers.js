class Pointer {
  constructor(x, y, size, img) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.img = img;
    this.lifetime = 255;
    this.speed = 2;
  }

  display() {
    alpha(this.lifetime);
    image(this.img, this.x, this.y, this.size, this.size);
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
    return dist(this.x, this.y, arrowX, arrowY) <= this.size / 2; // Use size / 2 for radius-based detection
  }

  interact(arrowX, arrowY) {
    if (this.intersect(arrowX, arrowY)) {
      this.removelife(); // Remove life if intersecting
    }
  }
}
