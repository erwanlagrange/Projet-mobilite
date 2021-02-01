<template>
  <div class="Admin">

    <v-container>
      <v-row justify-content="space-between" >
        <v-col>
            <h1>Toutes les demandes</h1>
        </v-col>
        <v-col>
            <PopupDestination />
        </v-col>
      </v-row>   
    </v-container>

    <div id="tableau-admin">
        <TableauAdmin />
    </div>
    
  </div>
</template>


<script>
import TableauAdmin from '../components/tableauAdmin'
import PopupDestination from '../components/popup.destination';

export default {
  components: {
    TableauAdmin,
    PopupDestination
  },
  data() {
    return {
    }
  }
}
</script>


<style>

</style>