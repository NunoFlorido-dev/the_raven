class Arrow {
  constructor(x, y, size, arrowImg, arrowPress) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.isPressed = false; // Initial state should typically be false (not pressed)
    this.arrowImg = arrowImg;
    this.arrowPress = arrowPress;
  }

  display() {
    noStroke();
    if (this.isPressed) {
      image(this.arrowPress, this.x, this.y, this.size, this.size); // Show pressed image
    } else {
      image(this.arrowImg, this.x, this.y, this.size, this.size); // Show unpressed image
    }
  }

  setPressed(state) {
    this.isPressed = state; // Set isPressed to true or false
  }
}
