<template>
    <main>
    <gmap-map
        :center="center"
        :zoom="15"
        :options="{styles: styles}"
        style="width: 70%; height: 100%"
    >
        <gmap-marker
        v-for="m in markers"
        :position="m.position"
        :icon = "m.icon"
        :clickable="true"
        :draggable="false"
        :label="m.label"
        :animation="4"
        @click="refresh(m)"
        @change="refresh"
        ></gmap-marker>
        <gmap-info-window
            v-for="m in markers"
            :position="m.position"
            :opened="m.opened"
            :content="m.content"
        ></gmap-info-window>


    </gmap-map>

    <div class="filter">
        <div class="title">SPORTIFY</div>
        <form method="get" @submit.prevent="doNothing" action="/#/find">
            <div class="form-group">
                <label for="exampleSelect1">Choose Activity</label>
                <select
                    v-model="activity"
                    class="form-control"
                    id="exampleSelect1"
                    >
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
                <label for="exampleSelect2">Spots left</label>
                <select
                    v-model="spots"
                    class="form-control"
                    >
                    <option selected ></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>

                </select>
            </div>
            <div class="form-group">
                <label for="exampleSelect2">Radius</label>
                <select
                    v-model="radius"
                    class="form-control"
                    id="exampleSelect2"
                >
                    <option value="500">0.5km</option>
                    <option value="1000">1.5km</option>
                    <option value="3000">3km</option>
                    <option value="5000">5km</option>
                </select>

            </div>
            <button @click="filter(activity, spots, radius, center)" class="btn btn-primary" style="color: #fff; text-align: center; margin: 0 auto; display: block;">Filter</button>
        </form>
       </div>
    </div>
</main>
</template>

<script>
  import * as VueGoogleMaps from 'vue2-google-maps';
  import Vue from 'vue';

  Vue.use(VueGoogleMaps, {
      load: {
        key: 'AIzaSyD5nhcX6Yqsw4Tr_Cfw19fCoXzHJnEOfuo',
        libraries: 'places',
      }
  });

  export default {
    data () {
      navigator.geolocation.getCurrentPosition(this.success, this.error);
      return {
          center: {
              lat: 44.80,
              lng: 20.45
          },
          markers: [],
          activity: "",
          spots: "",
          radius: "",
          styles: [
            {
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#8ec3b9"
                }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1a3646"
                }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#4b6878"
                }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#64779e"
                }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#4b6878"
                }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#334e87"
                }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#023e58"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#283d6a"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#6f9ba5"
                }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#023e58"
                }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#3C7680"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#304a7d"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#98a5be"
                }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#2c6675"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                {
                    "color": "#255763"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#b0d5ce"
                }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#023e58"
                }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#98a5be"
                }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                {
                    "color": "#1d2c4d"
                }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                {
                    "color": "#283d6a"
                }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#3a4762"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                {
                    "color": "#0e1626"
                }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                {
                    "color": "#4e6d70"
                }
                ]
            }
        ]
      }
    },
    methods: {
        doNothing: function() {

       },
        refresh: function(marker) {
            if(marker.opened)
                marker.opened = false;
            else
                marker.opened = true;
        },
        filter: function(activity, spots, radius, center) {
            this.markers = [];

            this.$http.get('/api/find').then((res) => {
                let R = 6371000;
                let lon1 = center.lng;
                let lat1 = center.lat;

                res.body.forEach((element) => {

                    if(element.activity == activity && element.people >= spots) {
                        let lon2 = element.lng;
                        let lat2 = element.lat;

                        let dLat = (lat2-lat1) * Math.PI / 180;
                        let dLng = (lon2-lon1) * Math.PI / 180;

                        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                                Math.sin(dLng / 2) * Math.sin(dLng / 2);
                        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                        let d = R * c;
                        if (d <= parseInt(radius)) {
                            this.markers.push({
                            position: {
                                lat: element.lat,
                                lng: element.lng
                            },
                            icon: element.icon,
                            opened: false,
                            content: `
                                <h4>${element.name}</h4>
                                <div id="elipsis">${element.description}</div>
                                <div>${element.time}</div>
                                <div>spots left: ${element.people}</div>
                                <button @click="join">Join!</button>
                            `
                            });
                        }
                    }
                });
            });
        },
        /*this.markers.push({
                            position: {
                                lat: element.lat,
                                lng: element.lng
                            },
                            icon: element.icon,
                            opened: false,
                            content: `
                                <h4>${element.name}</h4>
                                <div id="elipsis">${element.description}</div>
                                <div>${element.time}</div>
                                <div>spots left: ${element.people}</div>
                            `
                            });*/
        success: function(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            this.center.lat = latitude;
            this.center.long = longitude;

            // fetch
            this.$http.get('/api/find').then((res) => {
                res.body.forEach((element) => {
                    this.markers.push({
                        position: {
                            lat: element.lat,
                            lng: element.lng
                        },
                        icon: element.icon,
                        opened: false,
                        content: `
                            <h4>${element.name}</h4>
                            <div id="elipsis">${element.description}</div>
                            <div>time: ${element.time}</div>
                            <div>spots left: ${element.people}</div>
                            <button @click="join">Join!</button>

                            `
                    })
                });
            });
        },
        error: function() {
            console.log('error');
        },
        join: function() {
            console.log('join');
        }
    }
}
</script>

<style src="./Find.scss" lang="scss" ></style>
