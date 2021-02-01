<template>
  <v-app class="stylemap">
      <gmaps-map :options= mapOptions>
        <!-- <gmaps-marker v-for="(item, i) in items" :key="i" :options="item.options" /> -->
        <gmaps-marker v-for="(demande, i) in demandes" :key="i" :options="{ position: { lat: parseFloat(demande.Coordonnees.substr(0,9)), lng: parseFloat(demande.Coordonnees.substr(10,10)) } }" />
      </gmaps-map>
  </v-app>
</template>


<script>

  import { gmapsMap, gmapsMarker } from 'x5-gmaps'

  export default {
    components: { gmapsMap, gmapsMarker },
    data: () => ({
      demandes: [],
      mapOptions: {
        center: { lat: 48.86, lng: 2.347 },
        zoom: 2,
      }
    }),
    methods: {
      reloadMap(){
        this.$http.get(`http://localhost:3000/demandesaccepte` ).then(function(data){
            console.log("log data", data.body);
            this.demandes = data.body;}
        )
      }
    },
    created(){
        this.reloadMap();
    }
  }
</script>


<style>


</style>