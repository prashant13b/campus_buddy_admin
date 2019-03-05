<template>
    <section>
<b-field position="is-centered" label="Select Branch" >
            <b-select  placeholder="Select a branch" v-model="branch"  align="center"  required>
                <option value="it">IT</option>
                <option value="cse">CSE</option>
            </b-select>
        </b-field>
       
        <b-field  label="Select Semester" @change.native="semesterChange" position="is-centered">

            <b-select placeholder="Select Semester" v-model="semester"   required>
                <option v-for="(sem, index) in semesterList" :key="`${index}`" :value="sem">{{sem}}</option>
            
            </b-select>
             </b-field>
       

        <b-field  label="Select Subject" position="is-centered">
                <b-select placeholder="Select Subject" @change.native="modalOpen" v-model="subject"  required>
                <option v-for="(sub, index) in SubjectList" :key="`${index}`" :value="sub">{{sub}}</option>
            
            </b-select>
        </b-field>

<b-collapse :open="false">
             <button  v-if="subject" class="button is-primary" slot="trigger"> Open Marks Test Submission Dialog </button>

            <div v-if="testRecived" class="notification">
                <div v-for="test in Test" :key="test.id" class="content">
                   <div class="card" @click="testClicked(test.id)">
  <header class="card-header">
    <p class="card-header-title">
      {{subject}}
    </p>
    
  </header>
  <div class="card-content">
    <div class="content">
     {{test.name}}
    </div>
  </div>

</div>
                </div>
            </div>


<div v-else class="notification">
<div class="content">

<p>
    No Test For Evaluation For Criteria
</p>

</div>


</div>


        </b-collapse>
    
 <b-notification type="is-success" has-icon :active.sync="isSuccess">
           Test Submitted   
                    </b-notification>


        <b-notification type="is-danger" has-icon :active.sync="isFail">
           Failed
            </b-notification>


          <b-modal :active.sync="isComponentModalActive" has-modal-card>
           
                  <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title"> Enter Marks</p>
                    </header>
                    <section class="modal-card-body">
                        <div class="notification">
                           
                           <label>Total    :</label>
                          <b-field>
            <b-input placeholder="Enter Total Marks"
                type="number"
                min="0"
                v-model="totalMarks"
                >
            </b-input>
        </b-field>
                             </div>
                        <div class="notification" v-for="(student,index) in Students"  :key="`${index}`">
                           
                           <label>({{student.rollNo}})  {{ student.name}}    :</label>
                          <b-field>
            <b-input @change-native="updateMarks(student.rollNo)" placeholder="Number"
                type="number"
                min="0"
                max= totalMarks
                v-model="marksList[student.rollNo]"
                
                >
            </b-input>
        </b-field>
                             </div>
                       
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="isComponentModalActive = false">Close</button>
                        <button @click="submitMarks" class="button is-primary">Submit</button>
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
    name: 'TestSubmission',
    data() {
        return {
            totalMarks : 0,
            semesterList: [1,2,3,4,5,6,7,8],
                  branch: null,
                  isComponentModalActive: false,
                  semester: null,
                subject:null,
                SubjectList: null,
                Students : [],
                Test: [],
                testRecived: true,
                 marksList: {},
                 isSuccess : false,
                 isFail: false
        }
    }, methods: {
        semesterChange: function(){
            this.testRecived = true
                 axios.get(`https://www.prashant13b.xyz/campus-buddy_admin/client/data/studentData/${this.branch}/${this.semester}.json`)
             .then(res => {
                 Object.keys(res.data).forEach((key , index) => {
                     
                     this.Students = [...this.Students,{index, rollNo:key,name:res.data[key]}]
                 })
             })
              
             this.SubjectList = Subject[this.branch][this.semester]
        },
        modalOpen: function(){
                let TestArray = []
                let vm = this
                 vm.Test = TestArray
                 console.log('wrokging');
                 
                    let testRef = firebase.database().ref(`test/${this.branch.toUpperCase()}/${this.semester}`)
                    testRef.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    let childKey = childSnapshot.key;
    let childData = childSnapshot.val();
    
            if (!childData.done && childData.subject == vm.subject) {
               TestArray = [...TestArray,{name:childData.testDetails,id:childKey}]
            }
            
  })   
   if(TestArray.length)
        vm.testRecived = false
   else 
        vm.Test = TestArray
    
});
         
        },
        testClicked: function(id){
            this.testRecived  = id
            let list = {}
            this.Students.forEach(stduent => {
               
                list[stduent.rollNo] = 0
            })
            this.marksList = list
            this.isComponentModalActive = true
            
        },
        updateMarks: function(rollNo,e){
            this.marksList[rollNo] = e.target.value
        },
        submitMarks : function (){
            let vm = this
            firebase.database().ref(`test/${this.branch.toUpperCase()}/${this.semester}/${this.testRecived}`).update({
                done: true
            },function(error){
                if(error){
                    console.log(error);
                    vm.isFail = true
                }
                else {
                
            firebase.database().ref(`test/${vm.branch.toUpperCase()}/${vm.semester}/${vm.testRecived}`).child('details').set(Object.assign(vm.marksList,{total:vm.totalMarks}))
            vm.isComponentModalActive = false
            vm.isSuccess = true
                }
            })   
            
            
            }
    },
}
</script>

<style scoped>
*{
    text-align: left;
}
</style>
