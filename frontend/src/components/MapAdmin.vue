<template>
  <v-app class="stylemap">
      <gmaps-map :options= mapOptions id="map">

        <gmaps-info-window :options="options">
          <div id="text-card">
            <p style="font-weight: bold;" id="nomprenom"></p>
            <p id="localisation"></p>
          </div>
        </gmaps-info-window>

        <gmaps-marker v-for="(demande, i) in demandes" :key="i" :options="{ position: { lat: parseFloat(demande.Coordonnees.substr(0,9)), lng: parseFloat(demande.Coordonnees.substr(10,10)) } }" @click="AfficherEtudiant(demande)" />
        
      </gmaps-map>
  </v-app>
</template>


<script>

  import { gmapsMap, gmapsMarker, gmapsInfoWindow } from 'x5-gmaps'

  export default {
    components: { gmapsMap, gmapsMarker, gmapsInfoWindow },
    data: () => ({
      demandes: [],
      mapOptions: {
        center: { lat: 48.86, lng: 2.347 },
        zoom: 2,
      },
       options: {
        position: { lat: null , lng: null },
      },
    }),
    methods: {
      reloadMap(){
        this.$http.get(`http://localhost:3000/demandesaccepte` ).then(function(data){
            console.log("log data", data.body);
            this.demandes = data.body;}
        )
      },
      AfficherEtudiant(demande){
              
        this.options.position.lat = parseFloat(demande.Coordonnees.substr(0,9))
        this.options.position.lng = parseFloat(demande.Coordonnees.substr(10,10))      

        var new_card = document.getElementById("text-card")
        var nomprenom = document.getElementById("nomprenom")
        nomprenom.textContent = demande.prenom + ", " + demande.nom
        var localisation = document.getElementById("localisation")
        localisation.textContent = demande.pays + ", "+ demande.ville  + ", " + demande.universite

        new_card.appendChild(nomprenom);
        new_card.appendChild(localisation);        

        // var new_gmaps_info_window = document.createElement("gmaps-info-window")
        // var new_div = document.createElement("div")
        // var new_p1 = document.createElement("p")
        // var new_p2 = document.createElement("p")

        // new_p1.textContent = demande.prenom + ", " + demande.nom
        // new_p2.textContent = demande.pays + ", "+ demande.ville  + ", " + demande.universite

        // new_div.appendChild(new_p1)
        // new_div.appendChild(new_p2)
        // new_gmaps_info_window.appendChild(new_div)
        // var map = document.getElementById("map")
        // map.appendChild(new_gmaps_info_window)

      }
    },
    created(){
        this.reloadMap();
    }
  }
</script>


<style>

.stylemap {
  margin: auto;
  margin-top: 3em;
  padding-top: auto;
  max-width: 80%;
}

.stylemap div {
  max-height: 80vh!important;
}
</style>