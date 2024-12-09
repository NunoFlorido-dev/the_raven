class Arrow {
  constructor(x, y, size, color1, color2) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color1 = color1;
    this.color2 = color2;
    this.isPressed = true;
  }

  display() {
    if (this.isPressed) {
      fill(this.color1);
    } else {
      fill(this.color2);
    }
    noStroke();
    circle(this.x, this.y, this.size);
  }

  setPressed(state) {
    this.isPressed = state; // Set isPressed to true or false
  }
}
