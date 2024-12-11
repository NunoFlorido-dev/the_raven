class Arrow {
  constructor(x, y, size, arrowImg, arrowPress, arrowOutline) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.isPressed = false;
    this.arrowImg = arrowImg;
    this.arrowPress = arrowPress;
    this.arrowOutline = arrowOutline;
    this.outlineOpacity = 0; // Initial opacity for the outline
    this.fadeSpeed = 5; // Speed of the fade-out effect
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
    if (state) {
      this.outlineOpacity = 255; // Reset opacity to fully visible when pressed
    }
  }

  displayOutline() {
    if (this.outlineOpacity > 0) {
      tint(255, this.outlineOpacity); // Apply opacity to the outline image
      image(
        this.arrowOutline,
        this.x - 15,
        this.y - 15,
        this.size + 30,
        this.size + 30
      );
      noTint(); // Reset tint after drawing
    }
  }

  fadeOutline() {
    if (this.outlineOpacity > 0) {
      this.outlineOpacity -= this.fadeSpeed; // Gradually decrease opacity
      if (this.outlineOpacity < 0) this.outlineOpacity = 0; // Clamp to zero
    }
  }
}
