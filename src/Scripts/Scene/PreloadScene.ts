import * as Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload(): void {
    this.loadImageAssets();
    this.loadWebComponent();
    this.loadDataFromJSON();

    let loading = this.add.text(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "0/100",
      { fontSize: 60, color: "black" }
    ).setOrigin(0.5);

    this.load.on("progress", (value) => {
      loading.setText((value / 100).toString());
    });

    this.load.on("complete", () => {
      this.scene.start("TitleScene");
    });
  }

  loadImageAssets() {
    this.load.path = "src/Assets/image/";
    this.load.spritesheet("bg", "bg_pattern.png", {
      frameWidth: 510,
      frameHeight: 510,
    });

    this.load.spritesheet("header", "header_pattern.png", {
      frameWidth: 512,
      frameHeight: 512,
    });

    this.load.image("logo", "logo.png");
    this.load.image("button", "button_blue.png");
    this.load.image("scoreBg", "score_frame.png");
    this.load.image("correct", "tini_happy.png");
  }

  loadWebComponent() {
    this.load.path = "src/Scripts/WebComponent/";
    this.load.html("form", "TextBox.html");
  }

  loadDataFromJSON() {
    this.load.path = "src/Assets/";

    this.load.json("puzzle", "puzzle.json");
  }
}
