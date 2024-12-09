class ButtonImg {
  constructor(x, y, sizex, sizey, pathtoimg) {
    this.x = x;
    this.y = y;
    this.sizex = sizex;
    this.sizey = sizey;
    this.img = loadImage(pathtoimg);
  }

  display() {
    image(this.img, this.x, this.y, this.sizex, this.sizey);
  }

  isPressed(mx, my) {
    return (
      mx > this.x &&
      mx < this.x + this.sizex &&
      my > this.y &&
      my < this.y + this.sizey
    );
  }
}
