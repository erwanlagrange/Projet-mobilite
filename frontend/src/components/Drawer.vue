<template>
  <div>

      <v-list>
        <v-list-item-group>
          <v-toolbar-title class="text-uppercase grey--text mt-3 ml-5" @click.prevent="Home()">
            <span class="font-weight-light">Projet </span>
            <span>mobilité</span>
          </v-toolbar-title>

          <v-list-item v-if="isAdmin">
            <div>
              <v-btn text color="grey" class="mr-1 ml-2" dark  @click.prevent="carteAdmin()"> 
                    <span>Carte</span>  
                    <v-icon right>map</v-icon>
              </v-btn>
            </div>
          </v-list-item>

          <v-list-item  v-if="isAuth">
            <div>
              <v-btn text color="grey" dark class="mr-1 ml-2" @click.prevent="mesDemandes()"> 
                    <span>Demandes</span>  
                    <v-icon right>login</v-icon>
              </v-btn>
            </div>
          </v-list-item>

          <v-list-item v-if="!isAuth">
            <div>
              <PopupRegister />
            </div>
          </v-list-item>

          <v-list-item v-if="!isAuth">
            <div>
              <PopupLogin />
            </div>
          </v-list-item>

          <v-list-item v-if="isAuth">
            <div>
              <v-btn text color="grey" @click.prevent="signOut()">
                <span>Déconnexion</span>
                <v-icon right>exit_to_app</v-icon>
              </v-btn>
            </div>
          </v-list-item>

        </v-list-item-group>
      </v-list>

      
  </div>
</template>

<script>
import PopupLogin from './popup.login';
import PopupRegister from './popup.register';

export default {
  components: {PopupLogin, PopupRegister},
  data() {
    return {
      isAuth: false,
      isAdmin: false,
      drawer: false
    }
  },
  methods:{
    signOut(){
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('id_etudiant');
      this.isAuth = false;
      this.isAdmin = false;
      this.$router.push("/");
    },
    mesDemandes(){
      if(this.$router.currentRoute.fullPath === '/Admin' || this.$router.currentRoute.fullPath === '/Etudiant'){
        return
      }
      if(localStorage.getItem('isAdmin') == 1){
        this.$router.push("Admin");
      }else 
        this.$router.push("Etudiant");
    },
    carteAdmin(){
      if(localStorage.getItem('isAdmin') == 1){
        this.$router.push("MapAdmin");
      }
    },
    Home(){
      if(this.$router.currentRoute.fullPath === '/'){
        return
      }
      this.$router.push("/");
    } 
  },
  created() {
      if(localStorage.getItem('token')){
        this.isAuth = true;
      }
      if(localStorage.getItem('isAdmin') == 1){
        this.isAdmin = true;
      }
      this.$root.$refs.Drawer = this;
  }
}
</script>

<style>
</style>