
"use strict"

const app = Vue.createApp({
  data() {
    return {
      minutes: 0,
      seconds: 0,
      timeInMs: 0,
      active: "",
      interval: "",
      timeOut: "",
      btnControlTag: "pause"
    }
  },
  methods: {
    createTimer() {
      this.active = "timer";
      this.btnControlTag = "pause"

      this.timeInMs = this.secToMs(this.seconds) + this.minToSec(this.minutes);

      this.setTimer()
    },
    setTimer() {
      this.interval = setInterval(() => {
        this.timeInMs -= 1000;

        this.seconds = (this.timeInMs / 1000)% 60
        this.minutes = Math.floor((this.timeInMs / 1000)/60)
      }, 1000);

      this.timeOut = setTimeout(() => {
        clearInterval(this.interval);
        clearTimeout(this.timeOut)
        this.active = "";  
      }, this.timeInMs)
    },
    secToMs(sec) {
      return sec * 1000;
    },
    minToSec(min) {
      return (min * 60)* 1000;
    },
    resetTimer() {
      clearInterval(this.interval);
      clearTimeout(this.timeOut)
      this.active = "";
      this.minutes = 0;
      this.seconds = 0;
    },
    stopTimer() {
      clearInterval(this.interval);
      clearTimeout(this.timeOut)
      this.btnControlTag = "resume"
    }, 
    resumeTimer() {
      this.btnControlTag = "pause"
      this.setTimer()
    }
  }
}).mount('#app')