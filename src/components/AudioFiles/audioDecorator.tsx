// import React from 'react';

class AudioDecorator {
  private audioArr: Array<HTMLAudioElement>;

  private callback: () => void;

  constructor(callback = () => {}) {
    this.audioArr = [];
    this.callback = callback;
  }

  setCallback(callback: () => void) {
    this.callback = callback;
  }

  play(fileList: Array<string>) {
    console.log('this ', this);
    this.pause();
    this.audioArr = fileList
      .map((file) => new Audio(file));
    for (let i = 0; i < this.audioArr.length - 1; i += 1) {
      this.audioArr[i].addEventListener('ended', () => this.audioArr[i + 1].play());
    }
    this.audioArr[this.audioArr.length - 1].addEventListener('ended', () => this.callback());
    this.audioArr[0].play();
  }

  pause() {
    console.log('this ', this);
    console.log('decorator pause clicked ', this.audioArr.length);
    for (let i = 0; i < this.audioArr.length; i += 1) {
      this.audioArr[i].pause();
    }
  }
}

export default AudioDecorator;
