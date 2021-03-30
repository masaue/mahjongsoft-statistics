export default class Statistics {
  constructor(private readonly login: string, private readonly records: {}[]) {
  }

  show() {
    this.showRanking(1);
    this.showRanking(2);
    this.showRanking(3);
    this.showRanking(4);
    console.log(`total: ${this.records.length}`);
  }

  private rankCount(rank: number) {
    const key = `player${rank - 1}`;
    return this.records.filter((record) => { return record[key] === this.login; }).length;
  }

  private showRanking(rank: number) {
    const rankCount = this.rankCount(rank);
    const { length } = this.records;
    console.log(`${rank}: ${((rankCount / length) * 100).toFixed(2)}% (${rankCount}/${length})`);
  }
}
