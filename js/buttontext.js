class ButtonText { 
    constructor(x, y, size, text, font) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.text = text;
        this.font = font;
    }
 
    display() {
        textFont(this.font);
        fill(0);
        textSize(this.size);
        text(this.text, this.x, this.y);
        fill(255,0,0)
        rect(this.x)
    }
    
    isPressed(mx, my) {
        return mx > this.x-textWidth(this.text)/2 && mx < this.x + textWidth(this.text)/2 && my > this.y - this.size && my < this.y;
    }
    
}