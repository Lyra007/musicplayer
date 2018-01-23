<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <script src="https://unpkg.com/vue"></script>
</head>

<body>

<div id="test">
  <button @click="play">
    <p v-show="!playclick">Play</p>
    <p  v-show="playclick">stop</p>
  </button>


</div>

</body>
<script>

  new Vue({
      el: '#test',
      data: {
          playclick: false
      },
      methods:{
          play(){
              this.playclick = !this.playclick
          }
      }
  })

</script>

</html>