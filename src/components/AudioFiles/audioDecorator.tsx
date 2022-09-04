class AudioDecorator {
  private audioArr: Array<HTMLAudioElement>;

  private executeAfterStop: () => void;

  constructor(executeAfterStop = () => {}) {
    this.audioArr = [];
    this.executeAfterStop = executeAfterStop;
  }

  setExecuteAfterStop(executeAfterStop: () => void) {
    this.executeAfterStop = executeAfterStop;
  }

  runExecuteAfterStop() {
    this.executeAfterStop();
  }

  play(fileList: Array<string>) {
    this.pause();
    this.audioArr = fileList
      .map((file) => new Audio(file));
    for (let i = 0; i < this.audioArr.length - 1; i += 1) {
      this.audioArr[i].addEventListener('ended', () => this.audioArr[i + 1].play());
    }
    this.audioArr[this.audioArr.length - 1].addEventListener('ended', () => this.executeAfterStop());
    this.audioArr[0].play();
  }

  playImmediately(fileList: Array<string>) {
    const audio = new Audio(fileList[0]);
    audio.play();
  }

  pause() {
    for (let i = 0; i < this.audioArr.length; i += 1) {
      this.audioArr[i].pause();
    }
  }
}

export default AudioDecorator;
