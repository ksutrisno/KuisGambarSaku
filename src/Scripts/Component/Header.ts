import "phaser";

import AlignTool from "../Util/AlignTool";

export default class Header {
  private bgContainer: Phaser.GameObjects.Container;

  private text: Phaser.GameObjects.Text;

  private scoreBg: Phaser.GameObjects.Image;

  private bgRepetition = 8;

  constructor(scene: Phaser.Scene, showScoreFrame: boolean = false) {
    this.bgContainer = scene.add.container(0, 0);
    let screenWidth = scene.cameras.main.width;
    let bgHeight = 0;
    for (let i = 0; i < this.bgRepetition; i++) {
      let background = scene.add
        .image((screenWidth / this.bgRepetition) * i, 0, "header")
        .setOrigin(0, 0);

      AlignTool.scaleToScreenWidth(scene, background, 1 / this.bgRepetition);

      this.bgContainer.add(background);

      bgHeight = background.displayHeight;
    }

    this.scoreBg = scene.add.image(
      scene.cameras.main.width / 2,
      bgHeight / 2,
      "scoreBg"
    );

    this.scoreBg.setVisible(showScoreFrame);

    AlignTool.scaleToScreenWidth(scene, this.scoreBg, 0.2);

    this.bgContainer.add(this.scoreBg);

    this.text = scene.add
      .text(scene.cameras.main.width / 2, bgHeight / 2, "Masukan Nama Anda", {
        fontSize: 45,
        fontStyle: "bold",
      })
      .setOrigin(0.5, 0.5);

    this.bgContainer.add(this.text);
  }

  public setText(text: string) {
    this.text.setText(text);
  }
}
