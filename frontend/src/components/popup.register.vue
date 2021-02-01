<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on" class="mr-1 ml-1" @click="submitted = false"> 
            <span>Inscription</span>  
            <v-icon right>how_to_reg</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">Inscription</span>
        </v-card-title>
        <v-card-text  v-if="!submitted">
          <v-container>
            <v-row>
              <v-col cols="12" sm="4" md="4" >
                <v-text-field v-model="Prenom" label="Prenom*" required ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" >
                <v-text-field v-model="Nom" label="Nom*" hint="example of persistent helper text" persistent-hint required  ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4" >
                <v-select :items="['FISE1', 'FISE2', 'FISE3', 'FISA1', 'FISA2', 'FISA3']" v-model="Promotion" label="Promotion*" required ></v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="Email" label="Email*" required ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="Password" label="Password*" type="password" required ></v-text-field>
              </v-col>
              
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <div v-if="submitted" >
              <span >Félicitation, votre compte vient d'être créé! </span> 
            </div>
          <v-spacer></v-spacer>
          <v-btn color="darken-1"  @click="dialog = false" >
            Close
          </v-btn>
          <v-btn v-if="!submitted" color="darken-1" text @click.prevent="getFormValues()" >
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
      Prenom :'',
      Nom:'',
      Promotion:'',
      Email:'',
      Password:'',
      submitted: false,
    }),
    methods: {
        getFormValues()  {
            
            if (!this.Prenom) {
                alert('Votre Prenom est requis.');
            }
            else if (!this.Nom) {
                alert('Votre Nom est requis.');
            }
            else if (!this.Promotion) {
                alert('Votre Promotion est requise.');
            }
            else if (!this.Email) {
                alert('Votre adresse Email est requise.');
            }
            else if (!this.Password) {
                alert('Votre Password est requis.');
            }
            
            if (this.Nom && this.Prenom && this.Promotion && this.Email && this.Password){
                this.$http.post('http://localhost:3000/etudiants',{
                nom: this.Nom,
                prenom: this.Prenom,
                email: this.Email,
                motdepasse: this.Password,
                promotion: this.Promotion}).then(function(data){
                    console.log(this.Prenom, this.Nom, this.Promotion, this.Email, this.Password);
                    console.log(data.message);
                    this.submitted=true;
                })

            }
            
        }   
    },
  }
  
</script>