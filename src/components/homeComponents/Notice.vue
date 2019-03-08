<template>
    
    <section>

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

             <div v-if="semesterSelected">

 <b-field label="Title">
            <b-input v-model="noticeTitle"></b-input>
        </b-field>


  <b-field label="Notice Body">
            <b-input maxlength="200" v-model="noticeDetail" type="textarea"></b-input>
        </b-field>

             </div>

<div class="has-text-centered">

        <button @click="submitNotice" v-if="noticeDetail && noticeTitle" class="button is-primary">Submit Notice </button>
       <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="false"></b-loading>

          <b-notification type="is-success" has-icon :active.sync="isSuccess">
            Notice Registered
                    </b-notification>


        <b-notification type="is-danger" has-icon :active.sync="isFail">
           Failed
            </b-notification>
    </div>
    </section>


</template>

<script>

import moment from 'moment'
import firebase from 'firebase'

export default {
    name: "Test",
data() {
    return {
            semesterList: [1,2,3,4,5,6,7,8],
            branch: null,
            semester: null,
            noticeTitle: null,
            noticeDetail: null,
            semesterSelected: false,
            branchSelected: false,
             isSuccess : false,
            isFail: false,
             isLoading: false,
            isFullPage: true,
    }
},    methods: {
    branchChange: function(){
             this.branchSelected = true
            
        },
        semesterChange: function(){
              this.semesterSelected = true
            
        },
        submitNotice : function(){
            this.isLoading = true
        let date = moment(this.submissionDate).format('YYYY-MM-DD')
        
          firebase.database().ref(`notice/${this.branch.toUpperCase()}/${this.semester}`).push({
            title: this.noticeTitle,
            body: this.noticeDetail,
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
},
}
</script>

<style scoped>
*{
    text-align: left;
}
</style>
