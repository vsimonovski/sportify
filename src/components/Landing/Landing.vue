<template>
    <main>
        <section class="landing">
            <div class="landing__brand">
                Sportify
                <div class="landing__btns">
                    <a href="#/find" class="btn-a btn-1">
                        <svg>
                        <rect x="0" y="0" fill="none" width="100%" height="100%"/>
                        </svg>
                        Find
                    </a>
                    <a href="#/organize" class="btn-a btn-1">
                        <svg>
                        <rect x="0" y="0" fill="none" width="100%" height="100%"/>
                        </svg>
                        Organize
                    </a>
                </div>
            </div>
            <p id="demo"></p>
        </section>
    </main>
</template>

<script>
  export default {
    data () {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
        return {
        }
    },
    methods: {
        success: function(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            console.log(latitude, longitude);
        },
        error: function() {
            console.log('error');
        }
    }
  }
</script>

<style src="./Landing.scss" lang="scss" ></style>
