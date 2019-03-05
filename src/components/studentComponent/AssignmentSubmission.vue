<template>
<section>
  <div class="has-text-centered">
      
         <b-field position="is-centered" label="Select Branch" >
            <b-select  placeholder="Select a branch" v-model="branch" @change.native="branchChange" align="center"  required>
                <option value="it">IT</option>
                <option value="cse">CSE</option>
            </b-select>
        </b-field>
       
        <b-field v-if="branchSelected"  label="Select Semester" position="is-centered">

            <b-select placeholder="Select Semester" v-model="semester" @change.native="semesterChange"  required>
                <option v-for="(sem, index) in semesterList" :key="`${index}`" :value="sem">{{sem}}</option>
            
            </b-select>
             </b-field>
       

        <b-field v-if="semesterSelected" label="Select Subject" position="is-centered">
                <b-select placeholder="Select Subject" v-model="subject"  required>
                <option v-for="(sub, index) in SubjectList" :key="`${index}`" :value="sub">{{sub}}</option>
            
            </b-select>
        </b-field>


     
    </div>

    <b-collapse :open="false">
             <button @click="modalOpen" v-if="subject" class="button is-primary" slot="trigger"> Open Assignment Submission Dialog </button>

            <div class="notification">
                <div v-for="assignment in Assignment" :key="assignment.id" class="content">
                   <div class="card" @click="testClicked(assignment.id)">
  <header class="card-header">
    <p class="card-header-title">
      {{subject}}
    </p>
    
  </header>
  <div class="card-content">
    <div class="content">
     {{assignment.name}}
    </div>
  </div>

</div>
                </div>
            </div>
        </b-collapse>
    
 <b-notification type="is-success" has-icon :active.sync="isSuccess">
            Assignment Registered
                    </b-notification>


        <b-notification type="is-danger" has-icon :active.sync="isFail">
           Failed
            </b-notification>

    </section>
</template>

<script>
import axios from 'axios'
import Subject from '../../assets/data/Subjects.json'
import firebase from 'firebase'
export default {
    name:'AssignmentSubmission',
    data() {
        return {
             SubjectList: null,
            isLoading: false,
            isFullPage: true,
            semesterList: [1,2,3,4,5,6,7,8],
            branch: null,
            semester: null,
            semesterSelected: false,
            branchSelected: false,
            subject: null,
            Assignment: [],
            Students : [],
            isSuccess : false,
            isFail: false
            
        }
    },    methods: {
          branchChange: function(){
             this.branchSelected = true
            
        },
        semesterChange: function(){
              this.semesterSelected = true
             this.SubjectList = Subject[this.branch][this.semester]

            
        }
    },
}
</script>

<style scoped>

</style>
