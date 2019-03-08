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
                <b-select placeholder="Select Subject" @change.native="modalOpen" v-model="subject"  required>
                <option v-for="(sub, index) in SubjectList" :key="`${index}`" :value="sub">{{sub}}</option>
            
            </b-select>
        </b-field>


     
    </div>

    <b-collapse :open="false">
             <button  v-if="subject" class="button is-primary" slot="trigger"> Open Assignment Submission Dialog </button>

            <div v-if="assignRec" class="notification">
                <div v-for="assignment in Assignment" :key="assignment.id" class="content">
                   <div class="card" @click="assignClicked(assignment.id)">
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

<b-loading v-else-if="isLoading" :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="false"></b-loading>
<div v-else class="notification">
<div class="content">

<p>
    No Assignment For Evaluation For Criteria
</p>

</div>
</div>

        </b-collapse>
    
 <b-notification type="is-success" has-icon :active.sync="isSuccess">
            Assignment Registered
                    </b-notification>


        <b-notification type="is-danger" has-icon :active.sync="isFail">
           Failed
            </b-notification>


<b-modal :active.sync="isComponentModalActive" has-modal-card>
           
                  <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title"> Select Student's</p>
                    </header>
                    <section class="modal-card-body">
                        
                        <!-- <div class="notification" v-for="(student,index) in Students"  :key="`${index}`">
                           
                           <label>({{student.rollNo}})  {{ student.name}}    :</label>
                          <b-field>
            <b-input placeholder="Number"
                type="number"
                min="0"
                max= totalMarks
                v-model="marksList[student.rollNo]"
                
                >
            </b-input>
        </b-field>
                             </div> -->

                    <div class="notification">
                            <b-input placeholder="Enter Rollno" type="number" v-model="submitRollNo"  ></b-input>
                    </div>

                       
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="isComponentModalActive = false">Close</button>
                        <button @click="submitAssignment" class="button is-primary">Submit</button>
                    </footer>
                </div>
          
        </b-modal>



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
            assignRec: false,
            SubjectList: null,
            isLoading: false,
            isFullPage: true,
            semesterList: [1,2,3,4,5,6,7,8],
            isComponentModalActive: false,
            branch: null,
            semester: null,
            semesterSelected: false,
            branchSelected: false,
            subject: null,
            Assignment: [],
            Students : [],
            isSuccess : false,
            assignId: null,
            isFail: false,
            submitRollNo: null
            
        }
    },    methods: {
          branchChange: function(){
             this.branchSelected = true
            
        },
        semesterChange: function(){
              this.semesterSelected = true
                  axios.get(`https://www.prashant13b.xyz/campus-buddy_admin/client/data/studentData/${this.branch}/${this.semester}.json`)
             .then(res => {
                 Object.keys(res.data).forEach((key , index) => {
                     
                     this.Students = [...this.Students,{index, rollNo:key,name:res.data[key]}]
                 })
             })
             this.SubjectList = Subject[this.branch][this.semester]

            
        },
    modalOpen: function(){

                 let AssignArray = []
                let vm = this
                vm.isLoading = true
                vm.assignRec = false
                 vm.Assignment = AssignArray
                vm.isLoading = true 
                    let assignRef = firebase.database().ref(`/assignment/${this.branch.toUpperCase()}/${this.semester}`)
                    assignRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    let childKey = childSnapshot.key;
    let childData = childSnapshot.val();            
              //  console.log('working');
              if(vm.subject === childData.subject)
            AssignArray = [...AssignArray,{name:childData.assignmentDetails,id:childKey}]
            
  })   

if(AssignArray.length){
 vm.assignRec = true
 vm.Assignment = AssignArray
}
    vm.isLoading  = false
                    })
                    
 // console.log(TestArray);
  
//    if(TestArray.length){
//      vm.Test = TestArray
//      vm.testRecived = true
//    }
//    else 
//       vm.testRecived = false

    

    },submitAssignment: function(){
        let vm = this
        if(vm.submitRollNo){
            firebase.database().ref(`assignment/${this.branch.toUpperCase()}/${this.semester}/${this.assignId}/submitted`).push({
                rollno: vm.submitRollNo
            },function(error){
                if(error) vm.isFail = true
                else vm.isSuccess = true
            })
        }
            vm.submitRollNo = null
            vm.isComponentModalActive = false
            vm.assignId = null

    },assignClicked: function(id){
        this.assignId = id
        this.isComponentModalActive = true
    }
}
}   
</script>

<style scoped>

</style>
