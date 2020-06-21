import { ILevelData } from "../Interfaces/interface";

export default class GameManager {
  private static m_instance: GameManager;

  private levelData: ILevelData[] = [];

  private playerScore: number = 0;

  private completedLevel = [];

  public static get Instance() {
    if (!this.m_instance) {
      this.m_instance = new GameManager();
    }
    return this.m_instance;
  }

  public get LevelData() {
    return this.levelData;
  }

  public get PlayerScore() {
    return this.playerScore;
  }

  public get CompletedLevel() {
    return this.completedLevel;
  }

  public init(data: ILevelData[]) {
    this.levelData = data.slice();

    if (localStorage.getItem("playerScore")) {
      this.playerScore = Number(localStorage.getItem("playerScore"));
    }

    if (localStorage.getItem("completedLevel")) {
      const completedLevelString = localStorage.getItem("completedLevel");
      this.completedLevel = JSON.parse(completedLevelString);
    } else {
      this.completedLevel = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
  }

  public addScore(levelIndex: number) {
    this.playerScore += 10;

    localStorage.setItem("playerScore", this.playerScore.toString());

    this.completedLevel[levelIndex] = 1;

    localStorage.setItem("completedLevel", JSON.stringify(this.completedLevel));
  }
}
