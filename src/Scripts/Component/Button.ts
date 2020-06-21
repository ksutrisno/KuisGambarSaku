import AlignTool from "../Util/AlignTool";

export default class Button extends Phaser.GameObjects.Container {
  private image: Phaser.GameObjects.Image;
  private text: Phaser.GameObjects.Text;

  private callback: ()=> void;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    text: string,
    scale: number,
    callback: () => void
  ) {
    super(scene, x, y);

    this.image = scene.add.image(0, 0, texture);

    AlignTool.scaleToScreenWidth(scene, this.image, 0.35 * scale);

    this.text = scene.add.text(0, 0, text, { fontSize: 50, fontStyle: "bold" }).setOrigin(0.5);

    AlignTool.scaleToScreenWidth(scene, this.text, 0.25 * scale);

    this.add(this.image);

    this.add(this.text);

    this.image.setInteractive();

    this.callback = callback;

    this.image.on("pointerdown", () => {
        this.callback();
    });

    this.scene.add.existing(this);
  }

  setText(text: string)
  {
        this.text.setText(text);
  }

  setCallBack(callback: ()=>void)
  {
      this.callback = callback;
  }
}
