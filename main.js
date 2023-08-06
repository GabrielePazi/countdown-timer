
"use strict"

const app = Vue.createApp({
  data() {
    return {
      minutesConfig: 0,
      secondsConfig: 0,
      timeInMs: 0,
      active: "",
      minutes: 0, 
      seconds: 0,
      interval: "",
      timeOut: "",
      btnControlTag: "pause"
    }
  },
  methods: {
    createTimer() {
      this.seconds = this.secondsConfig
      this.minutes = this.minutesConfig

      this.active = "timer";
      this.btnControlTag = "pause"

      this.timeInMs = this.secToMs(this.secondsConfig) + this.minToSec(this.minutesConfig);

      this.setTimer()
    },
    setTimer() {
      this.interval = setInterval(() => {
        this.timeInMs -= 1000;

        this.seconds = (this.timeInMs / 1000)% 60
        this.miutes = Math.floor((this.timeInMs / 1000)/60)
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
      this.minutesConfig = 0;
      this.secondsConfig = 0;
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