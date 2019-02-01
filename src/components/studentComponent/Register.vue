<template>
 <section class="form ">
     <b-field label="Name">
            <b-input placeholder="Name" v-model="name"></b-input>
        </b-field>
        <b-field label="Email">
            <b-input placeholder="Email" type="email" v-model="email"></b-input>
        </b-field>

        <b-field label="Roll No" >
            <b-input placeholder="Roll Number"
            v-model="rollNo"
                type="number"
                >
            </b-input>
        </b-field>

       <b-field position="is-centered" label="Select Branch" >
            <b-select  placeholder="Select a branch" v-model="branch" align="center"  required>
                <option value="it">IT</option>
                <option value="cse">CSE</option>
            </b-select>
        </b-field>
       
        <b-field  label="Select Semester" position="is-centered">

            <b-select placeholder="Select Semester" v-model="semester"  required>
                <option v-for="(sem, index) in semesterList" :key="`${index}`" :value="sem">{{sem}}</option>
            
            </b-select>
             </b-field>
             <div class="has-text-centered">
                    <button @click="newStudent" v-if="name && branch && semester && email && rollNo" class="button is-primary">Register Student</button>
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
import firebase from 'firebase'
export default {
    name: 'Register',
    data() {
        return {
        
            name:null,
            semesterList: [1,2,3,4,5,6,7,8],
            branch: null,
            semester: null,
            email: null,
            rollNo: null,
            isSuccess : false,
            isLoading: false,
            isFullPage: true,
            isFail: false,
            
        }
    },methods: {
        newStudent: function(){

            this.isLoading = true
            
        firebase.auth().createUserWithEmailAndPassword(this.email, "password").then(response => {
            if(response.user.uid){
                firebase.auth().currentUser.updateProfile({
                    displayName: this.name
                })
                console.log(response.user.uid);
                firebase.database().ref("users/"+response.user.uid).set({
                    branch: this.branch,
                    semester:this.semester,
                    rollNo: this.rollNo
                 });
                this.isLoading = false
                this.isSuccess = true
            }
            
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
           this.isLoading = false
            this.isFail = true
          });
           
       
    },  
}, created() {
   
},
}
</script>
<style scoped>
    *{
        text-align: left;
    }
</style>
