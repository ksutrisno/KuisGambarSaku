import * as Phaser from "phaser";
import Header from "../Component/Header";
import { ILevelData } from "../Interfaces/interface";
import PuzzleConfig from "../Manager/GameManager";
import Button from "../Component/Button";
import AlignTool from "../Util/AlignTool";
import GameManager from "../Manager/GameManager";

export default class LevelScene extends Phaser.Scene {
  private levelData: ILevelData;

  private image: Phaser.GameObjects.Image;

  private header: Header;

  private level: number;

  private button: Button;

  private resultText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: "LevelScene" });
  }

  init(data: { level: number }) {
    this.levelData = PuzzleConfig.Instance.LevelData[data.level];

    this.level = data.level;
  }

  preload(): void {}

  create(): void {
    let bg = this.add.tileSprite(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      this.cameras.main.width,
      this.cameras.main.height,
      "bg"
    );

    this.header = new Header(this, true);

    this.image = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.3,
      this.levelData.Question
    );

    AlignTool.scaleToScreenWidth(this, this.image, 0.5);
    this.header.setText(" " + GameManager.Instance.PlayerScore.toString());

    let element = this.add
      .dom(this.cameras.main.width / 2, this.cameras.main.height * 0.55)
      .createFromCache("form");

    this.resultText = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height * 0.61,
        "Oops! Jawaban Anda Salah..",
        { fontSize: 38, color: "red" }
      )
      .setOrigin(0.5)
      .setVisible(false);

    this.button = new Button(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height * 0.75,
      "button",
      "SUBMIT",
      1,
      () => {
        let inputText: any = element.getChildByID("text");

        if (
          inputText.value.toLowerCase() === this.levelData.Answer.toLowerCase()
        ) {
          this.showCorrect();

          element.setVisible(false);
        }

        this.resultText.setVisible(true);
      }
    );
  }

  showCorrect() {
    this.image.setTexture("correct");

    AlignTool.scaleToScreenWidth(this, this.image, 0.5);

    GameManager.Instance.addScore(this.level);

    this.header.setText(" " + GameManager.Instance.PlayerScore.toString());

    this.button.setText("NEXT");

    this.resultText.setText("Selamat! Jawaban Anda Benar!");
    this.resultText.setColor("green");
    this.resultText.setVisible(true);

    this.button.setCallBack(() => {
      let level = (this.level);

      let count = 0;
      while (GameManager.Instance.CompletedLevel[level] === 1) {
        level++;

        count++;

        if (level >= GameManager.Instance.LevelData.length) {
          level = 0;
        }

        if (count >= GameManager.Instance.LevelData.length) {
          break;
        }
      }

      if (GameManager.Instance.CompletedLevel[level] === 1) {
        this.scene.start("TitleScene");
      } else {
        this.scene.start("LevelScene", { level: level });
      }
    });
  }

  update(): void {}
}
