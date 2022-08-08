<template>
  <div style='width:100%; height:100%'>
    <div class='player-container'>
      <video id='myVideo' class='video-js'>
        <source
          src='https://video-qn.51miz.com/preview/video/00/00/13/70/V-137009-A4970EDC.mp4'
          type='video/mp4'
        >
      </video>
    </div>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'welcome',
  data() {
    return {}
  },
  mounted() {
    this.initVideo()
  },
  methods: {
    initVideo() {
      // 初始化视频方法
      this.$video('myVideo', {
        // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        // 自动播放属性,muted:静音播放
        autoplay: 'muted',
        // 使视频一结束就重新开始。
        loop: 'true',
        // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: 'auto',
        // 设置视频播放器的显示宽度（以像素为单位）
        width: '1000px',
        // 设置视频播放器的显示高度（以像素为单位）
        height: '400px'
      })
    }
  }
}
</script>

<style lang='less' scoped>
.player-container {
  width: 100%;
  height: 100%
}

#myVideo {
  width: 100%;
  height: 100%
}

</style>
