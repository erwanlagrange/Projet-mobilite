<template>
    <v-app>
        <div id="tableau-etudiant">
            
            <v-card>
                <v-card-title>
                    <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details ></v-text-field>
                </v-card-title>
                <v-data-table :headers="headers" :items="demandes" @click:row="getRow" :search="search" ></v-data-table>
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
          <span class="headline">Modifier votre demande</span>
        </v-card-title>
        <v-card-text v-if="!submitted && !supprime">
          <v-container>
            <v-row>
              <v-col cols="12" sm="4" md="4" >
                <v-select :items= listPays v-model="listPays[0]" label="Pays*" required disabled></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4" >
                <v-select :items= listVille v-model="listVille[0]" label="Ville*" required disabled></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4" >
                <v-select :items= listUniversite v-model="listUniversite[0]" label="Université*" required disabled></v-select>
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

          
          <v-card-actions>
            <small>*indicates required field</small>
            <v-spacer></v-spacer>
            <v-btn v-if="!submitted" color="primary" text @click.prevent="SupprimerDemande()" >
              Supprimer demande
            </v-btn>
            <br>
            <v-btn color="darken-1"  @click="submitted = false, dialog = false" >
              Close
            </v-btn>
            <v-btn v-if="!submitted" color="darken-1" text @click.prevent="changeDemandeValues()" >
              Save
            </v-btn>
          </v-card-actions>

        </v-card-text>
        <v-card-actions v-if="submitted">
            <div>
              <span >Félicitation, votre demande vient d'être modifiée! </span> 
            </div>
            
          <v-spacer></v-spacer>
           <v-btn color="darken-1"  @click="submitted = false, dialog = false" >
              Close
            </v-btn>
        </v-card-actions>

        <v-card-actions v-if="supprime">
            <div>
              <span>Votre demande vient d'être supprimée! </span> 
            </div>
          <v-spacer></v-spacer>
          <v-btn color="darken-1"  @click="supprime = false, dialog = false" >
            Close
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
            text: 'Université',
            align: 'start',
            filterable: false,
            value: 'universite',
          },
          { text: 'Pays', value: 'pays' },
          { text: 'Ville', value: 'ville' },
          { text: 'Date de soumission', value: 'date_soumission' },
          { text: 'Date de début', value: 'date_debut' },
          { text: 'Date de fin', value: 'date_fin' },
          { text: 'Statut', value: 'statut' },
        ],
        dialog: false,
        submitted: false,
        supprime: false,
        id_destination: '',
        Statut: '',
        Id: '',
        Pays :'',
        Ville:'',
        Universite: '',
        fromDateMenu: false,
        fromDateVal: '',
        toDateMenu: false,
        toDateVal: '',
        listPays: [],
        listVille: [],
        listUniversite: [],
        destination: []
    }),computed: {
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
        this.openDemandeEtudiant(value.id);
      },
       openDemandeEtudiant(id){
        this.listPays.length = 0; //empty the list
        this.listVille.length = 0; //empty the list
        this.listUniversite.length = 0; //empty the list

        this.$http.get(`http://localhost:3000/demandes/${id}`).then(function(data){
            console.log("log data", data.body);
            this.listVille.push(data.body.ville);
            this.listPays.push(data.body.pays);
            this.listUniversite.push(data.body.universite);
            this.fromDateVal = data.body.date_debut;
            this.toDateVal = data.body.date_fin;
            this.dialog = true;
            this.Id = id;
            this.Statut = data.body.statut;
        })
      },
      reloadTableau() {
        var id_etudiant = localStorage.getItem('id_etudiant');
        this.$http.get(`http://localhost:3000/demandes/etudiant/${id_etudiant}`).then(function(data){ //add :id_etudiant
            console.log(data);
            this.demandes = data.body;})
      },
      changeDemandeValues()  {
            if (!this.fromDateVal) {
                alert('La date de départ est requise.');
            }
            else if (!this.toDateVal) {
                alert('La date de fin est requise.'); // ajouter Pays, ville Univ
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
                this.reloadTableau();
            } 
        },
        SupprimerDemande(){
          this.$http.delete(`http://localhost:3000/demandes/${this.Id}`).then(function(data){
            console.log(data);
            this.supprime = true;
            })
            this.reloadTableau();
        }
    },
    created(){
        this.$root.$refs.tableauEtudiant = this;
        this.reloadTableau();
    }   
  }
</script>