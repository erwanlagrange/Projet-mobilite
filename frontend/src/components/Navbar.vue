<template>
  <nav>

    <v-toolbar >
      <v-toolbar-title class="text-uppercase grey--text" @click.prevent="Home()">
        <span class="font-weight-light">Projet </span>
        <span>mobilité</span>
      </v-toolbar-title>

      <div v-if="isAdmin" class="hidden-sm-and-down">
        <v-btn text color="grey" class="mr-1 ml-2" dark  @click.prevent="carteAdmin()"> 
              <span>Carte</span>  
              <v-icon right>map</v-icon>
        </v-btn>
      </div>

      <div v-if="isAuth" class="hidden-sm-and-down">
        <v-btn text color="grey" dark class="mr-1 ml-2" @click.prevent="mesDemandes()"> 
              <span>Demandes</span>  
              <v-icon right>login</v-icon>
        </v-btn>
      </div>
      
      <v-spacer></v-spacer>
      <div v-if="!isAuth" class="hidden-sm-and-down">
        <PopupRegister />
        <PopupLogin />
      </div>

      <div v-if="isAuth" class="hidden-sm-and-down">
        <v-btn text color="grey" @click.prevent="signOut()">
          <span>Déconnexion</span>
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
      </div>
   
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>

    </v-toolbar>

    <v-navigation-drawer app temporary v-model="drawer">
          <Drawer/>
    </v-navigation-drawer>
  

  </nav>
</template>

<script>
import Drawer from './Drawer';
import PopupLogin from './popup.login';
import PopupRegister from './popup.register';

export default {
  components: {PopupLogin, PopupRegister, Drawer},
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
  }
}
</script>

<style>
</style>