// Create the application helper and add its render target to the page
const app = new PIXI.Application(); //create new application
await app.init({ resizeTo: window }); // size(640, 360)
document.body.appendChild(app.canvas); //append <canvas> to <body>

// Create the sprite and add it to the stage
await PIXI.Assets.load("assets/images/sample.png"); //load assets
let sprite = PIXI.Sprite.from("assets/images/sample.png"); //create sprite from asset
app.stage.addChild(sprite); //stage = container root of the scene graph

// Add a ticker callback to move the sprite back and forth
let elapsed = 0.0; //time variable
app.ticker.add((ticker) => {
  //void draw();
  elapsed += ticker.deltaTime;
  sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
});
