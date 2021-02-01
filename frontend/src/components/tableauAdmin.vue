<template>
    <v-app>
        <div id="tableau-admin">
            
            <v-card>
            <v-card-title>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details ></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="demandes" :search="search" @click:row="getRow" ></v-data-table>
            </v-card>
        </div>
        <template>
          <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
          >

            <v-card>
        <v-card-title>
          <span class="headline">Evaluer la demande</span>
        </v-card-title>
        <v-card-text v-if="!submitted">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6" >
                <v-text-field v-model="Nom" label="Nom*" required disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" >
                <v-text-field v-model="Prenom" label="Prénom*" required disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" >
                <v-text-field v-model="Pays" label="Pays*" required disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" >
                <v-text-field v-model="Ville" label="Ville*" required disabled></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" >
                <v-text-field v-model="Universite" label="Université*" required disabled></v-text-field>
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
              <v-col cols="12" sm="6" md="6" >
                <v-text-field prepend-icon="event" v-model="Date_soumission" label="Date de soumission*" required disabled></v-text-field>
              </v-col> 
              <v-col cols="12" sm="4" md="4" >
                <v-select :items="['Demande', 'En cours', 'Acceptée', 'Refusée']" v-model="Statut" label="Statut*" required ></v-select>
              </v-col>            
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <div v-if="submitted" >
              <span >Félicitation, votre demande vient d'être modifiée! </span> 
            </div>
          <v-spacer></v-spacer>
          <v-btn color="darken-1"  @click="submitted = false, dialog = false" >
            Close
          </v-btn>
          <v-btn v-if="!submitted" color="darken-1" text @click.prevent="changeDemandeValues()" >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
          </v-dialog>
      </template>
    </v-app>
</template>

<script>

  export default {
    data: () => ({
        demandes: [],
        search: '',
        headers: [
          {
            text: 'Nom',
            align: 'start',
            value: 'nom',
          },
          { text: 'Prenom', value: 'prenom' },
          { text: 'Université', value: 'universite' },
          { text: 'Pays', value: 'pays' },
          { text: 'Ville', value: 'ville' },
          { text: 'Date de soumission', value: 'date_soumission' },
          { text: 'Date de début', value: 'date_debut' },
          { text: 'Date de fin', value: 'date_fin' },
          { text: 'Statut', value: 'statut' },
          { text: 'ID', value: 'id', align: ' d-none'  },
        ],
        dialog: false,
        Prenom: '',
        Nom:'',
        Pays :'',
        Ville:'',
        Universite:'',
        Date_debut:'',
        Date_fin:'',
        Date_soumission:'', 
        Statut:'',
        Id:'',
        submitted: false,

        fromDateMenu: false,
        fromDateVal: '',
        toDateMenu: false,
        toDateVal: '',
    }),
    computed: {
      fromDateDisp() {
        return this.fromDateVal;
        // format date, apply validations, etc. Example below.
        // return this.fromDateVal ? this.formatDate(this.fromDateVal) : "";
      },
      toDateDisp() {
        //console.log(this.toDateVal);
        return this.toDateVal;
        // format date, apply validations, etc. Example below.
        // return this.toDateVal ? this.formatDate(this.toDateVal) : "";
      },
    },
    methods: {
      getRow(value) {
        //console.log(value.id);
        this.openDemandeAdmin(value.id);
      },
      openDemandeAdmin(id){
        this.$http.get(`http://localhost:3000/demandes/${id}` ).then(function(data){
            console.log("log data", data.body);
            this.Prenom = data.body.prenom;
            this.Nom = data.body.nom;
            this.Pays = data.body.pays;
            this.Ville = data.body.ville;
            this.Universite = data.body.universite;
            this.fromDateVal = data.body.date_debut;
            this.toDateVal = data.body.date_fin;
            this.Date_soumission = data.body.date_soumission;
            this.Statut = data.body.statut;

            this.Id = id;
            this.dialog = true;
            this.reloadTableau();
        })
      },
      reloadTableau() {
        this.$http.get('http://localhost:3000/demandes').then(function(data){
            console.log(data);
            this.demandes = data.body;})
      },
      changeDemandeValues()  {
            if (!this.fromDateVal) {
                alert('La date de départ est requise.');
            }
            else if (!this.toDateVal) {
                alert('La date de fin est requise.');
            }
            if (this.fromDateVal && this.toDateVal){
                this.$http.put(`http://localhost:3000/demandes/${this.Id}`,{
                date_debut: this.fromDateVal,
                date_fin: this.toDateVal,
                statut: this.Statut,
                id: this.Id}).then(function(data){
                    console.log("put " ,data.body);
                    this.submitted=true;
                })
            } 
          this.reloadTableau();
        } 
    },
    created(){
        this.reloadTableau();
    }   
  }
</script>

<style>

.tableau-admin{
  max-width : 1000px;
}

</style>