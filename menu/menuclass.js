class Menu {
  constructor(font, settingsImg, creditsImg) {
    this.font = font;
    this.settings = false;
    this.settingsImg = settingsImg; // Store the settings icon
    this.creditsImg = creditsImg; // Store the credits icon
    this.credits = false;
    this.menuColor = color("#6cdbfd");
    this.menuColor.setAlpha(240);
    this.menuSelected = 0;
    this.volume = 0;
    this.narrationState = true;

    this.buttons = [];
    this.buttonsSettings = [];
    this.buttonsAudio = [];
    this.buttonsKeybinds = [];
    this.initButtons();
    this.changeKeys = true;
  }

  initButtons() {
    this.buttons = [
      new ButtonImg((width / 10) * 0.2, 20, 40, 40, this.settingsImg),
      new ButtonImg((width / 10) * 9.72 - 20, 20, 40, 40, this.creditsImg),
    ];

    this.buttonsSettings = [
      new ButtonText(
        (width / 6) * 1.6,
        height / 3 + 50,
        35,
        "AUDIO",
        this.font
      ),
      new ButtonText((width / 6) * 1.6, height / 2, 35, "KEYBINDS", this.font),
      /*
      new ButtonText(
        (width / 6) * 1.6,
        height / 2 + (height / 2 - height / 3) - 50,
        35,
        "VISUAL",
        this.font
      ),*/
      new ButtonText(
        (width / 6) * 1.6,
        height / 2 + 220,
        24,
        "CONTINUE",
        this.font
      ),
      new ButtonText(
        (width / 6) * 1.6,
        height / 2 + 180,
        24,
        "RETURN TO HOMEPAGE",
        this.font
      ),
    ];

    this.buttonsAudio = [
      new ButtonText(
        (width / 6) * 2.57,
        (height / 4) * 2.2,
        35,
        "-",
        this.font
      ),
      new ButtonText(
        (width / 6) * 4.55,
        (height / 4) * 2.2,
        35,
        "+",
        this.font
      ),

      new ButtonImg((width / 6) * 3.5, (height / 4) * 3, 40, 40, ""),
    ];
    this.buttonsKeybinds = [
      new ButtonText(
        (width / 6) * 3.5,
        height / 2 + (height / 2 - height / 3) - 150,
        64,
        "WAD",
        this.font
      ),
      new ButtonText(
        (width / 6) * 3.5,
        height / 2 + (height / 2 - height / 3),
        64,
        "ARROWS",
        this.font
      ),
    ];
  }

  hover() {
    let isHoveringButton = false;

    // Check if in settings
    if (this.settings) {
      // Hover effect for buttons in settings
      for (let button of this.buttonsSettings) {
        if (button.isPressed(mouseX, mouseY)) {
          cursor(HAND); // Set cursor to pointer if hovered
          isHoveringButton = true; // We are hovering over a button
        }
      }
    }
    // Check if in credits
    else if (this.credits) {
      // Hover effect for buttons in credits (if any)
      for (let button of this.buttons) {
        if (button.isPressed(mouseX, mouseY)) {
          cursor(HAND); // Set cursor to pointer if hovered
          isHoveringButton = true;
        }
      }
    }
    // Default menu buttons (if settings and credits are not active)
    else {
      for (let button of this.buttons) {
        if (button.isPressed(mouseX, mouseY)) {
          cursor(HAND); // Set cursor to pointer if hovered
          isHoveringButton = true;
        }
      }
    }

    // Check buttons in settings (audio and keybinds)
    for (let button of this.buttonsAudio) {
      if (button.isPressed(mouseX, mouseY)) {
        cursor(HAND); // Set cursor to pointer if hovered
        isHoveringButton = true;
      }
    }

    for (let button of this.buttonsKeybinds) {
      if (button.isPressed(mouseX, mouseY)) {
        cursor(HAND); // Set cursor to pointer if hovered
        isHoveringButton = true;
      }
    }

    // If not hovering over any button, set the cursor to default arrow
    if (!isHoveringButton) {
      cursor(ARROW); // Reset cursor to default arrow if not hovering over buttons
    }
  }

  display() {
    if (this.settings) {
      this.displaySettings();
    } else if (this.credits) {
      this.displayCredits();
    }

    for (let button of this.buttons) {
      button.display();
    }
  }

  displaySettings() {
    noStroke();
    // Create a semi-transparent overlay to obscure background elements

    // Draw the menu box
    fill(this.menuColor);
    rect(width / 8, height / 8, (width / 8) * 6, (height / 8) * 6);

    for (let i = 0; i < this.buttonsSettings.length; i++) {
      // Check if this button is selected
      if (this.menuSelected === i) {
        fill("#ffeb77"); // Blue for selected button
      } else {
        fill(255); // White for unselected buttons
      }

      // Display each button
      this.buttonsSettings[i].display();
    }

    switch (this.menuSelected) {
      case 0:
        this.displayAudioSettings();
        break;
      case 1:
        this.displayKeybindsSettings();
        break;
      /* case 2:
        this.displayVisualSettings();
        break;
        */
    }
  }

  displayCredits() {
    // Add your credits display logic here
  }

  displayAudioSettings() {
    let sliderBegin = (width / 3) * 1.35;
    let sliderW = (width / 4) * 1.15;

    fill(255);
    textSize(85);
    text("AUDIO", (width / 6) * 3.55, (height / 4) * 1.2);

    // Volume label and slider
    fill(255);
    textSize(40);
    text("VOLUME", (width / 6) * 3.55, (height / 2) * 0.95);
    for (let i = 0; i < 5; i++) {
      let temp =
        (width / 3) * 1.325 + (((width / 4) * 1.15) / 9) * i * 1.965 + 20;
      rect(temp + 10, (height / 2) * 1.025, 10, 45);
    }

    // Slider thumb
    let sliderX =
      (width / 3) * 1.325 + (((width / 4) * 1.15) / 9) * this.volume * 0.99;

    fill("#ffeb77");
    rect(sliderX + 13, (height / 2) * 1.025 + 2, 40, 40);

    // Display volume control buttons
    for (let button of this.buttonsAudio) {
      button.display();
    }

    // Narration label
    fill(255);
    text("NARRATION", (width / 6) * 3.55, (height / 3) * 2.1);

    // Narration state indicator
    if (this.narrationState) {
      fill("#ffeb77");
      rect((width / 6) * 3.525, (height / 4) * 3, 20, 20);
    } else {
      stroke(255);
      rect((width / 6) * 3.525, (height / 4) * 3, 20, 20);
    }
  }

  displayKeybindsSettings() {
    fill(255);
    textSize(85);
    text("KEYBINDS", (width / 6) * 3.55, (height / 4) * 1.2);

    if (this.changeKeys === false) {
      fill("#ffeb77");
    } else {
      fill(255);
    }
    this.buttonsKeybinds[0].display();

    if (this.changeKeys === true) {
      fill("#ffeb77");
    } else {
      fill(255);
    }

    this.buttonsKeybinds[1].display();
  }

  handleMouseClick(mx, my) {
    // Check if settings button is clicked
    if (this.buttons[0].isPressed(mx, my)) {
      paused = true; // Toggle paused state
      this.settings = paused; // If paused, show settings
      this.credits = false; // Hide credits
      return; // Exit after handling the button
    }

    // Check if credits button is clicked (only in homepage mode)
    if (mode === "homepage" && this.buttons[1].isPressed(mx, my)) {
      paused = true; // Toggle paused state
      this.credits = paused; // If paused, show credits
      this.settings = false; // Hide settings
      return; // Exit after handling the button
    }

    // If settings are active, handle clicks in settings
    if (this.settings) {
      this.handleSettingsClick(mx, my);
    }
  }

  handleSettingsClick(mx, my) {
    // Check if "Continue" button is pressed
    if (this.buttonsSettings[2].isPressed(mx, my)) {
      paused = false; // Resume the game
      this.settings = false; // Close settings menu
      return; // Exit after handling the button
    }

    if (this.buttonsSettings[3].isPressed(mx, my)) {
      window.location.href = "../index.html"; // Redirect to index.html
    }

    // Handle settings menu navigation
    if (this.buttonsSettings[0].isPressed(mx, my)) {
      this.menuSelected = 0; // Audio
    } else if (this.buttonsSettings[1].isPressed(mx, my)) {
      this.menuSelected = 1; // Keybinds
    } /* else if (this.buttonsSettings[2].isPressed(mx, my)) {
      this.menuSelected = 2; // Visual
    }*/

    if (this.menuSelected === 0) {
      if (this.buttonsAudio[0].isPressed(mx, my)) {
        if (this.volume > 0) this.volume -= 1;
        this.volume = max(0, this.volume - 1); // Decrease volume
      } else if (this.buttonsAudio[1].isPressed(mx, my)) {
        if (this.volume < 8) this.volume += 1;
        this.volume = min(8, this.volume + 1); // Increase volume
      } else if (this.buttonsAudio[2].isPressed(mx, my)) {
        this.narrationState = !this.narrationState;
      }
    }

    // Keybinds settings interaction
    if (this.menuSelected === 1) {
      if (this.buttonsKeybinds[0].isPressed(mx, my)) {
        this.changeKeys = false;
        console.log(this.changeKeys);
      } else if (this.buttonsKeybinds[1].isPressed(mx, my)) {
        this.changeKeys = true;
        console.log(this.changeKeys);
      }
    }
  }

  getChangeKeys() {
    return this.changeKeys;
  }
}
