<template>
 <section class="container">
 <b-tabs v-model="activeTab"  type= "is-boxed">
   
            <b-tab-item label="Attendance">
               <Attendance />
            </b-tab-item>

            <b-tab-item label="Assignment">
                <Assignment />
            </b-tab-item>

             <b-tab-item label="Notice">
              
            </b-tab-item>

             <b-tab-item label="Test">
              
            </b-tab-item>

        </b-tabs>
        </section>
</template>

<script>
import Attendance from '../components/homeComponents/Attendance'
import Assignment from '../components/homeComponents/Assignment'

export default {
  name: 'home',
  components: {
    Attendance,
    Assignment
  },
  data() {
    return {
      activeTab: 0,
    }
  },
  
};
</script>
