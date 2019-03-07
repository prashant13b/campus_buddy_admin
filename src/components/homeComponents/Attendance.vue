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

        <button @click="modalOpen" v-if="subject" class="button "> Submit Attendance </button>
         <b-modal :active.sync="isComponentModalActive" has-modal-card>
           
                  <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Attendance</p>
                    </header>
                    <section class="modal-card-body">

        
                        <div v-for="(student,index) in Students"  :key="`${index}`">
                           <input @change="updatePresent" type="checkbox"  :value="student.rollNo"  > 
                           <label>{{student.name}}</label>
                           
                             </div>
                       
                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="isComponentModalActive = false">Close</button>
                        <button @click="submitAttendance" class="button is-primary">Submit</button>
                    </footer>
                </div>
          
        </b-modal>

          <b-notification type="is-success" has-icon :active.sync="isSuccess">
            Attendance Submitted
                    </b-notification>


        <b-notification type="is-danger" has-icon :active.sync="isFail">
           Failed
            </b-notification>
    </div>
 </section>
</template>

<script>
import axios from 'axios'
import Subject from '../../assets/data/Subjects.json'
import firebase from 'firebase'
export default {
    name: 'Attendance',
    data() {
        return {
            isComponentModalActive: false,
            SubjectList: null,
            Students : [],
            PresentStudents : [],
            semesterList: [1,2,3,4,5,6,7,8],
            branch: null,
            semester: null,
            semesterSelected: false,
            branchSelected: false,
            subject: null,
            checkedNames: [],
            isSuccess : false,
            isFail: false,
           
        }
    },methods: {
        branchChange: function(){
             this.branchSelected = true
            
        },
        semesterChange: function(){
            this.PresentStudents = []
             this.semesterSelected = true
             // import Students from 
             axios.get(`https://www.prashant13b.xyz/campus-buddy_admin/client/data/studentData/${this.branch}/${this.semester}.json`)
             .then(res => {
                 Object.keys(res.data).forEach((key , index) => {
                     
                     this.Students = [...this.Students,{index, rollNo:key,name:res.data[key]}]
                 })
             })
              
             this.SubjectList = Subject[this.branch][this.semester]

            
        },submitAttendance: function(){
            this.isComponentModalActive = false
                this.PresentStudents.forEach(element => {

     
        
        firebase.database().ref(`attendance/${this.branch.toUpperCase()}/${this.semester}/${this.subject}/total`)
            .transaction(function (value) {
                return (value || 0) + 1
            },error => {
                if (error) {
                     this.isFail = true
                           
                  } else {
                       this.isSuccess = true 
                    
                  }
            })

                })
       
                firebase.database().ref(`attendance/${this.branch.toUpperCase()}/${this.semester}/${this.subject}/${element}`)
                .transaction(function (value) {
                    return (value || 0) + 1
                })


        },updatePresent: function (e) {
           
            if(e.target.checked) this.PresentStudents =  [...this.PresentStudents,e.target.value] 
            else this.PresentStudents = this.PresentStudents.filter(value => value != e.target.value)
            
        },modalOpen: function(){
            this.isComponentModalActive = true
            this.PresentStudents = []
        }

    }, created(){

    }
}
</script>

<style scoped>
   *{
     text-align: left
   }
</style>
