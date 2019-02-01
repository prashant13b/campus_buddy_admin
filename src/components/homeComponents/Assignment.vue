<template>
    
 <section>
    <div class="has-text-centered columns">
        <div class="column">
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
 <b-field v-if="subject"  label="Assigment Details">
            <b-input  v-model="assignmentDetail" maxlength="200" type="textarea"></b-input>
        </b-field>
</div>
<div class="column">
        <b-field   v-if="subject" label="Submission date">
        <b-datepicker
            v-model="submissionDate"
            icon="calendar"
            placeholder="Click to select..."
            :min-date="minDate"
            :max-date="maxDate"
           >
        </b-datepicker>
    </b-field>
</div>

     
    </div>
    <div class="has-text-centered">

        <button @click="submitAssignment" v-if="assignmentDetail && submissionDate" class="button is-primary">Submit Assignment </button>
       <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="false"></b-loading>

          <b-notification type="is-success" has-icon :active.sync="isSuccess">
            Assignment Registered
                    </b-notification>


        <b-notification type="is-danger" has-icon :active.sync="isFail">
           Failed
            </b-notification>
    </div>
 </section>



</template>
<script>
import axios from 'axios'
import moment from 'moment'
import Subject from '../../assets/data/Subjects.json'
import firebase from 'firebase'

export default {
    name:"Assignment",
    data() {
         const today = new Date()
        return {
             date: new Date(),
            minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() ),
            maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 90),
            SubjectList: null,
            isLoading: false,
            isFullPage: true,
            semesterList: [1,2,3,4,5,6,7,8],
            branch: null,
            semester: null,
            semesterSelected: false,
            branchSelected: false,
            subject: null,
            assignmentDetail: null,
            submissionDate:null,
            isSuccess : false,
            isFail: false
        }
    },methods: {
        branchChange: function(){
             this.branchSelected = true
            
        },
        semesterChange: function(){
              this.semesterSelected = true
             this.SubjectList = Subject[this.branch][this.semester]

            
        },submitAssignment:  function(){
            this.isLoading = true
        let date = moment(this.submissionDate).format('YYYY-MM-DD')
        
          firebase.database().ref(`assignment/${this.branch.toUpperCase()}/${this.semester}`).push({
            subject: this.subject,
            assignmentDetails: this.assignmentDetail,
            date: date
        },error => {
            if (error) {
                this.isLoading= false
                this.isFail = true                 
              } else {
                  
                  this.isLoading = false
                    this.isSuccess = true 
              }
        });

                 }
    }
}
</script>

<style scoped>
   *{
     text-align: left
   }
</style>

