<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on" class="mr-1 ml-1"> 
            <span>Connexion</span>  
            <v-icon right>login</v-icon>
        </v-btn> 
      </template>

      <v-card>
        <v-card-title>
          <span class="headline">Connexion</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
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

          <v-spacer></v-spacer>
          <v-btn color="darken-1"  @click="dialog = false" >
            Cancel
          </v-btn>
          <v-btn color="darken-1" text  @click.prevent="getLoginValues()" >
            Connection
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      Email:'',
      Password:'',
    }),
    methods: {
      getLoginValues()  {
              
          if (!this.Email) {
              alert('Votre adresse Email est requise.');
          }
          else if (!this.Password) {
              alert('Votre Password est requis.');
          }
          
          if (this.Email && this.Password){
              this.$http.post('http://localhost:3000/login',{
              email: this.Email,
              motdepasse: this.Password
              }).then(function(data){
                  console.log(data.body);
                  
                  if (data.body.isAuth){
                    localStorage.setItem('token', data.body.accessToken);
                    localStorage.setItem('isAdmin', data.body.isAdmin);
                    localStorage.setItem('id_etudiant', data.body.id_etudiant);
                    this.$parent.$parent.isAuth = true;
                    this.$root.$refs.Drawer.isAuth = true;

                    if(data.body.isAdmin){
                      this.$router.push("Admin");
                      this.$parent.$parent.isAdmin = true;
                      this.$root.$refs.Drawer.isAdmin = true;
                      this.dialog=false;
                    }
                    else{
                      this.$router.push("Etudiant")
                      this.dialog=false;
                    }
                  }
                  
              })

          }
        } 
    }
  }
</script>