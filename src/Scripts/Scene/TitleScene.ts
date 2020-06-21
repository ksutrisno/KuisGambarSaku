import * as Phaser from "phaser";
import AlignTool from "../Util/AlignTool";
import Header from "../Component/Header";
import { ILevelData } from "../Interfaces/interface";
import PuzzleConfig from "../Manager/GameManager";
import Button from "../Component/Button";
import GameManager from "../Manager/GameManager";
export default class TitleScene extends Phaser.Scene {
  private levelDatas: ILevelData[];

  private header: Header;

  constructor() {
    super({ key: "TitleScene" });
  }

  preload(): void {
    const puzzle: ILevelData[] = this.game.cache.json.get("puzzle");

    PuzzleConfig.Instance.init(puzzle);

    this.load.path = "src/Assets/image/";
    for (let index = 0; index < puzzle.length; index++) {
      const element = puzzle[index];

      this.load.image(element.Question, element.Question + ".jpg");
    }
  }

  create(): void {
    let bg = this.add.tileSprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      "bg"
    );

    this.header = new Header(this);

    let logo = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.65,
      "logo"
    );

    AlignTool.scaleToScreenWidth(this, logo, 0.7);

    this.levelDatas = this.game.cache.json.get("puzzle");

    if (localStorage.getItem("userName")) {
      this.displayLevels();
    } else {
      this.showUsernamePrompt();
    }
  }

  private showUsernamePrompt() {
    let element = this.add
      .dom(this.cameras.main.width / 2, this.cameras.main.height * 0.30)
      .createFromCache("form");

    let button = new Button(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.40,
      "button",
      "SUBMIT",
      0.55,
      () => {
        let inputText: any = element.getChildByID("text");

        if (inputText.value !== "") {
          localStorage.setItem("userName", inputText.value);

          element.setVisible(false);

          button.setVisible(false);

          this.displayLevels();
        }
      }
    );
  }

  private displayLevels() {
    for (let index = 0; index < this.levelDatas.length; index++) {
      const element = this.levelDatas[index];

      let image = this.add.image(
        this.cameras.main.width / 10 +
          ((index % 5) * this.cameras.main.width) / 5,
        this.cameras.main.height / 5 +
          (this.cameras.main.height / 8) * Math.floor(index / 5),
        element.Question
      );

      this.header.setText("Pilih Level");

      AlignTool.scaleToScreenWidth(this, image, 0.15);

      image.setInteractive();

      if(GameManager.Instance.CompletedLevel[index] === 1)
      {
          image.setTint(0x808080)
          image.setAlpha(0.5);
      }
      else
      {
          image.on("pointerup", () => {
        this.loadLevel(index);
      });
      }
    
    }
  }

  loadLevel(level: number) {
    this.scene.start("LevelScene", { level: level });
  }

  update(): void {}
}
