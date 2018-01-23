/**
 * Created by lyra on 22/01/2018.
 */
import Vue from 'vue/dist/vue.js'
import VueResource from 'vue-resource'
import Menubar from './components/topbar.vue'
import App from './components/app.vue'
import Play from './components/bottombar.vue'
import Icon from 'vue-awesome/components/Icon.vue'

Vue.component('icon', Icon);

Vue.use(VueResource);

//
// new Vue({
//     el: 'menubar',
//     components: {
//         Menubar
//     }
// });
//
// new Vue({
//     el: 'app',
//     components: {
//         App
//     }
// });

new Vue({
    el: 'play',
    components: {
        Play
    }
});
