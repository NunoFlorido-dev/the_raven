// Create new PIXI application with background color and automatic resize
const app = new PIXI.Application({});

await app.init({ background: "#5d96f0", resizeTo: window });

// Append the application's canvas to the document body
document.body.appendChild(app.canvas);

function loadFont() {
  // Use WebFont to load the custom font
  WebFont.load({
    custom: {
      families: ["TheRaven-Regular"], // Match the font-family name in @font-face
    },
    active: () => {
      // Only create the text when the font is fully loaded
      const text = new PIXI.Text("BAZA AAC", {
        fontFamily: "TheRaven-Regular",
        fontSize: 50,
        fill: 0x000000, // Black color for the text
        align: "center",
      });

      // Center the text on the screen
      text.anchor.set(0.5); // Center the text horizontally and vertically
      text.x = app.screen.width / 2;
      text.y = app.screen.height / 2;

      // Add the text to the stage
      app.stage.addChild(text);
    },
  });
}

loadFont();
