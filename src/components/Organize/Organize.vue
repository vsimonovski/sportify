<template>
    <div class="container-fluid" style="height: 100%; width: 800px;">
    <div class="container" style="padding-top: 100px;">
        <h2 class="title">Create new event</h2>
        <form method="post" @submit.prevent="sendToBase" @keydown.enter.prevent="doNothing">
        <div class="form-group">
            <label for="name">Name</label>
            <input class="form-control" v-model="name" id="name" type="text">
        </div>
        <div class="form-group">
            <label for="exampleTextarea">Description</label>
            <textarea v-model="desc" class="form-control" id="exampleTextarea" rows="3"></textarea>
        </div>
        <div class="form-group">
            <label for="examplet">Time</label>
            <input class="form-control" v-model="time" id="examplet" type="text">
        </div>
        <div class="form-group">
            <label for="exampleSelect1">Choose Activity</label>
            <select v-model="activity" class="form-control" id="exampleSelect1">
                <option selected ></option>
                <option value="basketball">Basketball</option>
                <option value="football">Football</option>
                <option value="volleyball">Volleyball</option>
                <option value="bowling">Bowling</option>
                <option value="pool">Pool</option>
                <option value="tennis">Tennis</option>
                <option value="esports">Esports</option>
            </select>
        </div>
        <div class="form-group">
            <label for="people"></label>
            <input v-model="numOfPeople" type="number" value="0" min="0" max="15" class="form-control" id="people" name="people" style="width: 100%;">
        </div>
        <span>
            <gmap-place-input name="loc" :select-first-on-enter="true" @place_changed="updatePlace($event)"></gmap-place-input>
        </span>
        <button class="btn btn-primary" style="color: #fff; text-align: center; margin: 0 auto; display: block;">Create Event</button>
        </form>
    </div>
    </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';
import Vue from 'vue';
import VueRouter from 'vue-router';

console.log(VueRouter.$go);

Vue.use(VueGoogleMaps, {
    load: {
    key: 'AIzaSyD5nhcX6Yqsw4Tr_Cfw19fCoXzHJnEOfuo',
    libraries: 'places',
    }
});


export default {
  name: 'organize',
  data() {
    return {
        name: "",
        desc: "",
        activity: 0,
        numOfPeople: 0,
        lat: 0,
        lng: 0,
        time: ''
    }
  },
  methods: {
    doNothing: function() {

    },
    sendToBase: function(event) {
        var ico = '';
        switch(this.activity) {
            case 'basketball':
                ico = 'http://vsimonovski.me/slike/novo/basket.png';
                break;
            case 'football':
                ico = 'http://vsimonovski.me/slike/novo/fudbal.png';
                break;
            case 'volleyball':
                ico = 'http://vsimonovski.me/slike/novo/odbojka.png'
                break;
            case 'bowling':
                ico = 'http://vsimonovski.me/slike/novo/kuglanje.png'
                break;
            case 'pool':
                ico = 'http://vsimonovski.me/slike/novo/bilijar.png';
                break;
            case 'tennis':
                ico = 'http://vsimonovski.me/slike/novo/tenis.png';
                break;
            case 'esports':
                ico = '';
                break;
            default:
                break;
        }

        let obj = {
            name: this.name,
            description: this.desc,
            activity: this.activity,
            people: this.numOfPeople,
            lng: this.lng,
            lat: this.lat,
            time: this.time,
            icon: ico
        };

        this.$http.post('/api/organize', obj);
        console.log(obj);
        window.location = '#/success';

    },
    updatePlace(place) {
        if (place && place.geometry && place.geometry.location) {
            this.lat  = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
        }
    }
  }
}
</script>

<style src="./Organize.scss" lang="scss" scoped></style>
