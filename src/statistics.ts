import Records from './records';

export default class Statistics {
  constructor(private readonly records: Records) {
  }

  show() {
    this.showRanking(1);
    this.showRanking(2);
    this.showRanking(3);
    this.showRanking(4);
    console.log(`total: ${this.records.length}`);
  }

  private showRanking(rank: number) {
    const rankCount = this.records.rankCount(rank);
    const { length } = this.records;
    console.log(`${rank}: ${((rankCount / length) * 100).toFixed(2)}% (${rankCount}/${length})`);
  }
}
