<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on" class="mr-1 ml-1" @click="submitted = false"> 
            <span>nouvelle demande</span>  
            <v-icon right>card_travel</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">Faire une nouvelle demande</span>
        </v-card-title>
        <v-card-text v-if="!submitted">
          <v-container>
            <v-row>
              <v-col cols="12" sm="4" md="4" >
                <v-select :items= listePays v-model="Pays" v-on:change= PaysSelected() label="Pays*" required ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4" >
                <v-select :items= listVille v-model="Ville" v-on:change= VilleSelected() label="Ville*" required ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4" >
                <v-select :items= listUniversite v-model="Universite" label="Université*" required ></v-select>
              </v-col>

              <v-col cols="12" sm="6" md="6">
              <v-layout row wrap>
                <v-menu v-model="fromDateMenu" :close-on-content-click="false" :nudge-right="40"
                  transition="scale-transition" offset-y max-width="290px" min-width="290px" >
                  <template v-slot:activator="{ on }">
                    <v-text-field label="From Date*" prepend-icon="event" readonly :value="fromDateDisp" v-on="on" ></v-text-field>
                  </template>
                  <v-date-picker v-model="fromDateVal" no-title @input="fromDateMenu = false" ></v-date-picker>
                </v-menu>
              </v-layout>
              </v-col>

              <v-col cols="12" sm="6" md="6">
              <v-layout row wrap>
                <v-menu v-model="toDateMenu" :close-on-content-click="false" :nudge-right="40"
                  transition="scale-transition" offset-y max-width="290px" min-width="290px" >
                  <template v-slot:activator="{ on }">
                    <v-text-field label="To Date*" prepend-icon="event" readonly :value="toDateDisp" v-on="on" ></v-text-field>
                  </template>
                  <v-date-picker v-model="toDateVal" no-title @input="toDateMenu = false" ></v-date-picker>
                </v-menu>
              </v-layout>
              </v-col>              
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <div v-if="submitted" >
              <span >Félicitation, votre demande vient d'être créé! </span> 
            </div>
          <v-spacer></v-spacer>
          <v-btn color="darken-1"  @click="dialog = false" >
            Close
          </v-btn>
          <v-btn v-if="!submitted" color="darken-1" text @click.prevent="getDemandeValues()" >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      id_destination: '',
      Pays :'',
      Ville:'',
      Universite:'',
      Date_debut:'',
      Date_fin:'',
      submitted: false,
      fromDateMenu: false,
      fromDateVal: '',
      toDateMenu: false,
      toDateVal: '',
      listePays: [],
      listVille: [],
      listUniversite: [],
      destination: [],
    }),
    computed: {
      fromDateDisp() {
        return this.fromDateVal;
        // format date, apply validations, etc. Example below.
        // return this.fromDateVal ? this.formatDate(this.fromDateVal) : "";
      },
      toDateDisp() {
        console.log(this.toDateVal);
        return this.toDateVal;
        // format date, apply validations, etc. Example below.
        // return this.toDateVal ? this.formatDate(this.toDateVal) : "";
      },
    },
    methods: {
        getDemandeValues()  {
            
            if (!this.Pays) {
                alert('Le Pays est requis.');
            }
            else if (!this.Ville) {
                alert('Le Ville est requise.');
            }
            else if (!this.Universite) {
                alert('L\'Université est requise.');
            }
            else if (!this.fromDateVal) {
                alert('La date de début est requise.');
            }
            else if (!this.toDateVal) {
                alert('La date de fin est requise.');
            }
            if (this.Pays && this.Ville && this.Universite && this.fromDateVal && this.toDateVal){

                for (var i=0 ; i < this.destination.length ; i++){
                  if (this.destination[i].Universite === this.Universite){
                    this.id_destination = this.destination[i].ID ;
                  }
                }

                this.$http.post('http://localhost:3000/demandes',{
                id_etudiant: localStorage.getItem('id_etudiant'),
                id_destination: this.id_destination,
                date_soumission: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
                date_debut: this.fromDateVal,
                date_fin: this.toDateVal,
                statut: "Demande"}).then(function(data){
                    console.log(data.message);
                    this.submitted=true;
                    console.log(this.$root.$refs.tableauEtudiant)
                    this.$root.$refs.tableauEtudiant.reloadTableau();
                })
            }
        },
        PaysSelected(){
          this.listVille.length = 0; //empty the list
          this.listUniversite.length = 0; //empty the list
          for (var i=0 ; i < this.destination.length ; i++){
            if (this.destination[i].Pays === this.Pays){
              this.listVille.push(this.destination[i].Ville);
              this.listUniversite.push(this.destination[i].Universite);
            }
          }
        },
        VilleSelected(){
          this.listUniversite.length = 0; //empty the list
          for (var i=0 ; i < this.destination.length ; i++){
            if (this.destination[i].Ville === this.Ville){
              this.listUniversite.push(this.destination[i].Universite);
            }
          }
        } 
    },created(){
        this.$http.get('http://localhost:3000/destinations').then(function(data){
            this.destination = data.body;
            for (var i=0 ; i < data.body.length ; i++){
              this.listePays.push(data.body[i].Pays);
              this.listVille.push(data.body[i].Ville);
              this.listUniversite.push(data.body[i].Universite);
            }
        })       

    }
  }
  
</script>