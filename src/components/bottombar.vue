<template>
    <div class="player">
        <div class="topbar">
            <h4>{{ song.singer }} - {{song.name }}</h4> <br/>
        </div>
        <div class="image-set">
            <img :class=" {'image': playclick||otherclick } " class="img-size" :src="url" />
            <img :class=" {'image': playclick||otherclick } " class="cd-img" :src="song.img"/>
        </div>

        <div v-if="menuclick" class="listitem">
            <button class="close" @click="closemenu()">
                <icon  name="close" ></icon>
            </button>

            <ul v-for="item in songList">
                <li @click="changemusic(item.id)">
                    {{ item.singer }} - {{ item.name }}
                </li>
            </ul>
        </div>

        <div class="btnbar">
            <div class="btn">
                <button @click="pre()">
                    <icon  name="step-backward" ></icon>
                </button>
            </div>

            <div class="btn">
                <button @click="playMusic()">
                    <icon  name="play-circle-o"  v-show="!playclick"></icon>
                    <icon  name="pause" v-show="playclick"></icon>
                </button>
            </div>

            <div class="btn">
                <button @click="next()">
                    <icon  name="step-forward" ></icon>
                </button>
            </div>

            <div class="btn">
                <button @click="list()">
                    <icon  name="bars" ></icon>
                </button>
            </div>


            <div>
                <audio id="audio" :src="song.url"></audio>
            </div>


        </div>

    </div>

</template>

<script>
    import 'vue-awesome/icons'

    export default {
        data(){
            return{
                josnurl: '/homework/vuejs/music/static/song.json',
                musicid: 0,
                song: {},
                songList: [],
                playclick: false,
                otherclick: false,
                menuclick: false,
                url: "cd.png"
            }
        },
        created(){
          this.getsong(this.musicid);
        },
        watch:{
            'musicid':'getsong',
        },
//        mounted () {
//
//        },
        methods:{
            getsong(id){
                console.log('get song:' + id);
                this.$http.get(this.josnurl).then(response => {

                    response = response.body;
                    this.songList = response.songs;
//                    console.log("this is song list");
//                    console.log(this.songList);
                    if(id >= response.songs.length){

                        id = 0;
                        this.musicid = id;

                    }else if(id < 0){

                        id = response.songs.length-1
                        this.musicid = id;
                    }

                    this.song = response.songs[id];
//                    console.log(this.song);
//                    console.log(response);
//                    console.log(id);

                    if(this.playclick && this.otherclick){
                        document.getElementById("audio").oncanplay = () => {
                            console.log('can play');
                            document.getElementById("audio").play();
                        };
                    }

//                    setTimeout(() => {
//                        document.getElementById("audio").play();
//                    }, 1000);

                })
            },
            pre(){

                this.otherclick = true;
                this.playclick = true;
                this.musicid--;

            },
            playMusic(){

                if(!this.playclick) {
                    document.getElementById("audio").play();
                }else{
                    document.getElementById("audio").pause();
                }
                this.playclick = !this.playclick;
                this.otherclick = !this.otherclick;

            },
            next(){
                this.otherclick = true;
                this.playclick = true;
                this.musicid++;
               // document.getElementById("audio").play();

                // console.log('next finish');
            },

            list(){
                this.menuclick = !this.menuclick;

            },
            changemusic(id){
                this.musicid = id;
                this.otherclick = true;
                this.playclick = true;
            },

            closemenu(){
                this.menuclick = false;
            }


        }
    }
</script>

<style>
    body{
        background-color: black;
    }

    h4{
        font-size: 3em;
        margin:0;
    }
    .player{
        margin:0 auto;
        padding:0 ;
    }

    .topbar{
        color: white;
        background-color: rgb(174, 35, 1);
        height: 15em;
        text-align: center;
        line-height: 15em;

    }
    .image-set{
        text-align: center;
        margin-top: 14em;
    }
    .fa-icon {
        color: rgba(255,255,255,0.3);
        height: 8em;
        width: auto;
        /*margin-left: 13em;*/
        /*margin-top: 5em;*/
    }
    .btnbar{
        color: white;
        background-color: rgb(174, 35, 1);
        height: 15em;
        width: 100em;
        position: fixed;
        bottom: 0;
    }


    .btn{
        float: left;
        height: 15em;
        width: 15em;
        line-height: 15em;
        text-align: center;
        margin-left: -0.5em;
        margin-top: 3em;
    }
    .img-size{
        position: relative;
        width: 80%;
    }
    .cd-img{
        position: absolute;
        margin-left: -38em;
        margin-top: 11em;
        z-index:20;
    }
    .image{
        -webkit-animation:circle 4s infinite linear;
    }
    @-webkit-keyframes circle{

        0%{ transform:rotate(0deg); }

        100%{ transform:rotate(-360deg); }

    }

    .listitem{
        background:#000;
        width:100%;
        height:20em;
        text-align: center;
        color:white;
        filter:alpha(Opacity=80);
        -moz-opacity:0.5;
        opacity: 0.5;
        margin-top: -8em;
    }

    li{
        list-style: none;
        color: white;
        font-size: 2em;
    }

    li:hover{
        color:white;
        font-weight: bold;
    }

    .close{
        height: 1em;
        position: fixed;
        margin-left:32em;
    }

</style>