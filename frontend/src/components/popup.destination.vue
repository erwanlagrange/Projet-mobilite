<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }" >
        <v-btn color="primary" dark v-bind="attrs" v-on="on" class="mr-1 ml-1" @click="submitted = false"> 
            <span>nouvelle destination</span>  
            <v-icon right>card_travel</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">Ajouter une nouvelle destination</span>
        </v-card-title>
        <v-card-text v-if="!submitted">
          <v-container>
            <v-row>
              <v-col cols="12" sm="4" md="4" >
                <v-text-field v-model="Pays" label="Pays*" required ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" >
                <v-text-field v-model="Ville" label="Ville*" required ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" >
                <v-text-field v-model="Universite" label="Université*" required ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" >
                <v-text-field v-model="Coordonnees" label="Coordonnées*" required ></v-text-field>
              </v-col>         
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <div v-if="submitted" >
              <span >Félicitation, votre destination vient d'être créé! </span> 
            </div>
          <v-spacer></v-spacer>
          <v-btn color="darken-1"  @click="dialog = false" >
            Close
          </v-btn>
          <v-btn v-if="!submitted" color="darken-1" text @click.prevent="getDestinationValues()" >
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
      Pays :'',
      Ville:'',
      Universite:'',
      Coordonnees:'',
      submitted: false

    }),
    computed: {
    },
    methods: {
        getDestinationValues()  {
            
            if (!this.Pays) {
                alert('Le Pays est requis.');
            }
            else if (!this.Ville) {
                alert('Le Ville est requise.');
            }
            else if (!this.Universite) {
                alert('L\'Université est requise.');
            }
            else if (!this.Coordonnees) {
                alert('Les coordonées sont requises.');
            }
            if (this.Pays && this.Ville && this.Universite && this.Coordonnees){
                this.$http.post('http://localhost:3000/destinations',{
                universite: this.Universite,
                pays: this.Pays,
                ville: this.Ville,
                coordonnees: this.Coordonnees}).then(function(data){
                    console.log(data.message);
                    this.submitted=true;
                })
            }
        }   
    },
  }
  
</script>