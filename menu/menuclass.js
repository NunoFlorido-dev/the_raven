class Menu {
  constructor(font, settingsImg, creditsImg) {
    this.font = font;
    this.settings = false;
    this.settingsImg = settingsImg; // Store the settings icon
    this.creditsImg = creditsImg; // Store the credits icon
    this.credits = false;
    this.menuColor = color(180);
    this.menuColor.setAlpha(240);
    this.menuSelected = 0;
    this.volume = 0;
    this.narrationState = true;

    this.buttons = [];
    this.buttonsSettings = [];
    this.buttonsAudio = [];
    this.buttonsKeybinds = [];
    this.initButtons();
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
      new ButtonText((width / 6) * 1.6, height / 2, 35, "KEY-BINDS", this.font),
      new ButtonText(
        (width / 6) * 1.6,
        height / 2 + (height / 2 - height / 3) - 50,
        35,
        "VISUAL",
        this.font
      ),
      new ButtonText(
        (width / 6) * 1.2,
        height / 2 - 260,
        24,
        "CONTINUE",
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
    ];
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
    // Create a semi-transparent overlay to obscure background elements

    // Draw the menu box
    fill(this.menuColor);
    rect(width / 8, height / 8, (width / 8) * 6, (height / 8) * 6);

    for (let button of this.buttonsSettings) {
      button.display();
    }

    switch (this.menuSelected) {
      case 0:
        this.displayAudioSettings();
        break;
      case 1:
        this.displayKeybindsSettings();
        break;
      case 2:
        this.displayVisualSettings();
        break;
    }
  }

  displayCredits() {
    // Add your credits display logic here
  }

  displayAudioSettings() {
    fill(255);
    textSize(85);
    text("AUDIO", (width / 6) * 3.55, (height / 4) * 1.2);

    // Volume label and slider
    fill(0);
    textSize(40);
    text("VOLUME", (width / 6) * 3.55, (height / 2) * 0.95);
    rect((width / 3) * 1.35, (height / 4) * 2.1, (width / 4) * 1.15, 20);

    // Slider thumb
    let sliderX =
      (width / 3) * 1.325 + (((width / 4) * 1.15) / 9) * this.volume * 0.99;
    rect(sliderX, (height / 2) * 1.025, 40, 40);

    // Display volume control buttons
    for (let button of this.buttonsAudio) {
      button.display();
    }

    // Narration label
    fill(0);
    text("NARRATION", (width / 6) * 3.55, (height / 3) * 2.1);

    // Narration state indicator
    if (this.narrationState) {
      fill(0);
      rect((width / 6) * 3.525, (height / 4) * 3, 20, 20);
    }
  }

  displayKeybindsSettings() {
    fill(255);
    textSize(85);
    text("KEYBINDS", (width / 6) * 3.55, (height / 4) * 1.2);

    for (let button of this.buttonsKeybinds) {
      // Use this.buttonsKeybinds
      button.display();
    }
  }

  displayVisualSettings() {
    fill(255);
    textSize(85);
    text("VISUAL", (width / 6) * 3.55, (height / 4) * 1.2);
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
    if (this.buttonsSettings[3].isPressed(mx, my)) {
      paused = false; // Resume the game
      this.settings = false; // Close settings menu
      return; // Exit after handling the button
    }

    // Handle settings menu navigation
    if (this.buttonsSettings[0].isPressed(mx, my)) {
      this.menuSelected = 0; // Audio
    } else if (this.buttonsSettings[1].isPressed(mx, my)) {
      this.menuSelected = 1; // Keybinds
    } else if (this.buttonsSettings[2].isPressed(mx, my)) {
      this.menuSelected = 2; // Visual
    }

    // Audio settings
    if (this.menuSelected === 0) {
      if (this.buttonsAudio[0].isPressed(mx, my)) {
        this.volume = max(0, this.volume - 1); // Decrease volume
      } else if (this.buttonsAudio[1].isPressed(mx, my)) {
        this.volume = min(9, this.volume + 1); // Increase volume
      } else if (this.buttonsAudio[2].isPressed(mx, my)) {
        this.narrationState = !this.narrationState; // Toggle narration
      }
    }
  }
}
