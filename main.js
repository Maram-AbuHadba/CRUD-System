
//get input value
var courseName = document.getElementById("courseName")
var courseCategory = document.getElementById("courseCategory")
var coursePrice = document.getElementById("coursePrice")
var courseDescription = document.getElementById("courseDescription")
var courseCapacity = document.getElementById("courseCapacity")
var addBtn = document.getElementById("addBtn")
var data = document.getElementById("data")
var deleteBtn = document.getElementById("deleteBtn")
var search = document.getElementById("search")
var currentIndex =0
var courses 

if(JSON.parse(localStorage.getItem('courses')) == null ){
  courses = []
}
else{
  courses = JSON.parse(localStorage.getItem('courses'))
  displayData();
}
 

//create course 
addBtn.onclick = function(event){
    event.preventDefault()

    if(addBtn.value=='Add course'){
      addCourse();
    }
    else
      updateCourse();
      displayData();
      clear();

    courseName.classList.remove('is-valid')
    courseCategory.classList.remove('is-valid')
    courseCapacity.classList.remove('is-valid')
    courseDescription.classList.remove('is-valid')
    coursePrice.classList.remove('is-valid')
    
 }

 //add course
 function addCourse(){
   //Object
   var course ={
    name : courseName.value,
    category :courseCategory.value,
    price: coursePrice.value,
    description: courseDescription.value,
    capacity:courseCapacity.value
}

courses.push(course)
localStorage.setItem('courses', JSON.stringify(courses))
Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your course has been added',
    showConfirmButton: false,
    timer: 1500
  })
  clear();
  displayData(); 
 }

//clear inputs  
function clear(){
    courseName.value =""
    courseCategory.value=""
    coursePrice.value=""
    courseDescription.value=""
    courseCapacity.value=""
    
}

//read , display data in table 
function displayData(){
    var result='';
    for(var i=0; i<courses.length; i++){
        result +=  `
        <tr>
          <td>${i+1}</td>
          <td>${courses[i].name}</td>
          <td>${courses[i].category}</td>
          <td>${courses[i].price}</td>
          <td>${courses[i].description}</td>
          <td>${courses[i].capacity}</td>
          <td><button class="btn btn-info " onclick="getCourse(${i})"> update </button> </td>
          <td><button class="btn btn-danger" onclick="deleteCourse(${i})"> delete </button> </td>
        </tr>
         ` 
    }
    data.innerHTML= result;
}

//delete course 
 function deleteCourse(index){
    
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses.splice(index,1);
            localStorage.setItem('courses', JSON.stringify(courses))

            displayData();
          Swal.fire(
            'Deleted!',
            ' course has been deleted.',
            'success'
          )
        }
      })
 }

 //delete all 
 deleteBtn.onclick = function(){
   
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem('courses', JSON.stringify(courses))

            data.innerHTML=''
          Swal.fire(
            'Deleted!',
            'All data has been deleted.',
            'success'
          )
        }
      })
 }

 //Serach
 /**
  * onkeyup
  * onkeypress
  * onkeydown
  */
 search.onkeyup = function(){
    console.log(search.value)
    var result='';
    for(var i=0; i<courses.length; i++){
        if(courses[i].name.toLowerCase().includes(search.value.toLowerCase())){
            result +=  `
            <tr>
              <td>${i+1}</td>
              <td>${courses[i].name}</td>
              <td>${courses[i].category}</td>
              <td>${courses[i].price}</td>
              <td>${courses[i].description}</td>
              <td>${courses[i].capacity}</td>
              <td><button class="btn btn-info "> update </button> </td>
              <td><button class="btn btn-danger" onclick="deleteCourse(${i})"> delete </button> </td>
            </tr>
             ` 
        }
       
    }
    data.innerHTML= result;
 }

 //update

 function getCourse(index){
  var course = courses[index];
  courseName.value= course.name
  courseCategory.value = course.category
  coursePrice.value =course.price
  courseDescription.value = course.description
  courseCapacity.value =course.capacity
  addBtn.value = "Update course"
  currentIndex = index
  
}

//update course 
function updateCourse(){
  var course ={
    name : courseName.value,
    category :courseCategory.value,
    price: coursePrice.value,
    description: courseDescription.value,
    capacity:courseCapacity.value
  }
  var indexName = courses[currentIndex].name;
  courses[currentIndex].name = course.name
  courses[currentIndex].category = course.category
  courses[currentIndex].price = course.price
  courses[currentIndex].description = course.description
  courses[currentIndex].capacity = course.capacity
  localStorage.setItem('courses', JSON.stringify(courses))

  addBtn.value='Add course'
  
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `${indexName} updated successfully`,
    showConfirmButton: false,
    timer: 1500
  })
  displayData();
  clear();
}


//Validation
/**
 * regex
 */

/**
 * first letter capital
 * name 3-10 letter
 * no number
 * regex /^[A-Z][a-z]{2,10}$/
 */

//course name validation
courseName.onkeyup = function(){
  var pattern = /^[A-Z][a-z\s]{2,15}$/

  if(pattern.test(courseName.value) ){
    if( courseName.classList.contains('is-invalid') && document.getElementById('nameAlert').classList.contains('d-block')) {

      courseName.classList.replace('is-invalid','is-valid')
      document.getElementById('nameAlert').classList.replace('d-block', 'd-none')
    }else{
      addBtn.removeAttribute('disabled')
      courseName.classList.add('is-valid')
    }
  }
  else{
    if( courseName.classList.contains('is-valid') && document.getElementById('nameAlert').classList.contains('d-none')){

      document.getElementById('nameAlert').classList.replace('d-none', 'd-block')
      courseName.classList.replace('is-valid','is-invalid')
     
    }else{
      courseName.classList.add('is-invalid')
      document.getElementById('nameAlert').classList.replace('d-none', 'd-block')
     addBtn.setAttribute('disabled','disabled')
    }
    
  }
  
}

//courseCategory validation
 /**
 * first letter capital
 * name 3-20 letter
 * no number
 * regex /^[A-Z][a-z]{2,20}$/
 */

 courseCategory.onkeyup = function(){
  var pattern = /^[A-Z][A-Za-z0-9\s]{2,20}$/

  if(pattern.test(courseCategory.value) ){
    if( courseCategory.classList.contains('is-invalid') && document.getElementById('categAlert').classList.contains('d-block')) {

      courseCategory.classList.replace('is-invalid','is-valid')
      document.getElementById('categAlert').classList.replace('d-block', 'd-none')
    }else{
      addBtn.removeAttribute('disabled')
      courseCategory.classList.add('is-valid')
    }
  }
  else{
    if( courseCategory.classList.contains('is-valid') && document.getElementById('categAlert').classList.contains('d-none')){

      document.getElementById('categAlert').classList.replace('d-none', 'd-block')
      courseCategory.classList.replace('is-valid','is-invalid')
     
    }else{
      courseCategory.classList.add('is-invalid')
      document.getElementById('categAlert').classList.replace('d-none', 'd-block')
     addBtn.setAttribute('disabled','disabled')
    }
    
  }
  
}

// coursePrice validation 

/**
  * number
  * 3 gigits
 * regex /^[0-9]{3,4}$/
 */

coursePrice.onkeyup = function(){
  var pattern = /^[0-9]{3,4}$/

  
  if(pattern.test(coursePrice.value) ){
    if( coursePrice.classList.contains('is-invalid') && document.getElementById('priceAlert').classList.contains('d-block')) {

      coursePrice.classList.replace('is-invalid','is-valid')
      document.getElementById('priceAlert').classList.replace('d-block', 'd-none')
    }else{
      addBtn.removeAttribute('disabled')
      coursePrice.classList.add('is-valid')
    }
  }
  else{
    if( coursePrice.classList.contains('is-valid') && document.getElementById('priceAlert').classList.contains('d-none')){

      document.getElementById('priceAlert').classList.replace('d-none', 'd-block')
      coursePrice.classList.replace('is-valid','is-invalid')
     
    }else{
      coursePrice.classList.add('is-invalid')
      document.getElementById('priceAlert').classList.replace('d-none', 'd-block')
     addBtn.setAttribute('disabled','disabled')
    }
  }
}

// courseDescription validation
/**
 * first letter capital
  * number
  *  120 char
 * regex /^[A-Z][A-Za-z0-9\s]{3,120}}$/
 */
courseDescription.onkeyup = function(){
  var pattern = /^[A-Z][A-Za-z0-9\s]{3,120}$/
  if(pattern.test(courseDescription.value) ){
    if( courseDescription.classList.contains('is-invalid') && document.getElementById('desAlert').classList.contains('d-block')) {

      courseDescription.classList.replace('is-invalid','is-valid')
      document.getElementById('desAlert').classList.replace('d-block', 'd-none')
    }else{
      addBtn.removeAttribute('disabled')
      courseDescription.classList.add('is-valid')
    }
  }
  else{
    if( courseDescription.classList.contains('is-valid') && document.getElementById('desAlert').classList.contains('d-none')){

      document.getElementById('desAlert').classList.replace('d-none', 'd-block')
      courseDescription.classList.replace('is-valid','is-invalid')
     
    }else{
      courseDescription.classList.add('is-invalid')
      document.getElementById('desAlert').classList.replace('d-none', 'd-block')
     addBtn.setAttribute('disabled','disabled')
    }
  } 
}

// courseCapacity validation 

/**
  * number
  * 3 gigits
 * regex /^[0-9]{2,3}$/
 */

courseCapacity.onkeyup = function(){
  var pattern = /^[0-9]{2,3}$/
  if(pattern.test(courseCapacity.value) ){
    if( courseCapacity.classList.contains('is-invalid') && document.getElementById('capAlert').classList.contains('d-block')) {

      courseCapacity.classList.replace('is-invalid','is-valid')
      document.getElementById('capAlert').classList.replace('d-block', 'd-none')
    }else{
      addBtn.removeAttribute('disabled')
      courseCapacity.classList.add('is-valid')
    }
  }
  else{
    if( courseCapacity.classList.contains('is-valid') && document.getElementById('capAlert').classList.contains('d-none')){

      document.getElementById('capAlert').classList.replace('d-none', 'd-block')
      courseCapacity.classList.replace('is-valid','is-invalid')
     
    }else{
      courseCapacity.classList.add('is-invalid')
      document.getElementById('capAlert').classList.replace('d-none', 'd-block')
     addBtn.setAttribute('disabled','disabled')
    }
  }  
}