<template>
  <v-container>
    <v-row justify="center">
      Video Here<v-btn @click="start">start</v-btn
      ><v-btn @click="play">play</v-btn>
    </v-row>
    <v-row justify="center">
      <video ref="video" autoplay></video>
    </v-row>
  </v-container>
</template>

<script>
const { ipcRenderer } = require('electron')

export default {
  data() {
    return {
      videoUrl: 'udp://@235.101.23.11:51010',
      mimecode: 'video/webm; codecs="vp8"',
      mediaSource: new MediaSource(),
      sourceBuffer: null,
      video: null,
      isPlay: false
    }
  },
  mounted() {
    this.video = this.$refs.video
    console.log(this.video)
    ipcRenderer.on('test-reply', (e, m) => this.receiveFromMain(e, m))
  },
  methods: {
    play() {
      this.video.play()
    },
    start() {
      console.log('start')
      this.video.src = URL.createObjectURL(this.mediaSource)

      this.mediaSource.addEventListener('sourceopen', () =>
        this.onMediasource()
      )
      ipcRenderer.send('getStream')
    },
    onMediasource() {
      console.log('onMediasource open')
      this.sourceBuffer = this.mediaSource.addSourceBuffer(
        'video/webm; codecs="vp8"'
      )
      this.sourceBuffer.mode = 'sequence'
      console.log(this.sourceBuffer)
    },
    receiveFromMain(e, m) {
      console.log('got media: ' + m.length)

      this.sourceBuffer.appendBuffer(m)

      this.video.play()
    }
  }
}
</script>

<style scoped></style>
