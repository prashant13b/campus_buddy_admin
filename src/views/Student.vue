<template>
  <section class="container">
 <b-tabs v-model="activeTab"  type= "is-boxed">
   
            <b-tab-item label="New Student Registration">
              <Register />
            </b-tab-item>

            <b-tab-item label="Assignment Submission">
               <AssignmentSubmission />
            </b-tab-item>

            <b-tab-item label="Test Mark Submission">
                <TestSubmission />
            </b-tab-item>

        </b-tabs>
        </section>
</template>
<script>
import Register from '../components/studentComponent/Register.vue'
import TestSubmission from '../components/studentComponent/TestSubmission'
import AssignmentSubmission from '../components/studentComponent/AssignmentSubmission'
export default { 
 name: 'student',
  components: {
   Register,
   TestSubmission,
   AssignmentSubmission
  },
  data() {
    return {
      activeTab: 0,

    }
  },
  
};
</script>