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
              <Notice />
            </b-tab-item>

             <b-tab-item label="Test">
              <Test />
            </b-tab-item>

        </b-tabs>
        </section>
</template>

<script>
import Attendance from '../components/homeComponents/Attendance'
import Assignment from '../components/homeComponents/Assignment'
import Notice from '../components/homeComponents/Notice'
import Test from '../components/homeComponents/Test'

export default {
  name: 'home',
  components: {
    Attendance,
    Assignment,
    Test,
    Notice
  },
  data() {
    return {
      activeTab: 0,
    }
  },
  
};
</script>
