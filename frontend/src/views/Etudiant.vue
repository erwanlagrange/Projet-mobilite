<template>
  <div class="etudiant">

    <v-container>
      <v-row justify-content="space-between" >
        <v-col>
            <h1>Mes demandes</h1>
        </v-col>
        <v-col>
            <PopupDemande />
        </v-col>
      </v-row>   
    </v-container>

    <div id="tableau-etudiant">
        <TableauEtudiant />
    </div>
    
  </div>
</template>

<script>
import TableauEtudiant from '../components/tableauEtudiant'
import PopupDemande from '../components/popup.demande'; 

export default {
  components: {
    TableauEtudiant,
    PopupDemande
  },
  data() {
    return {
    }
  }
}
</script>


<style>
</style>