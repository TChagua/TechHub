//Total Students
let studNum = document.getElementById("studNum");
let students = document.querySelectorAll(".names div").length;
studNum.innerHTML = students;

 //Total Days
 let dayNum = document.getElementById("dayNumber");

 //Missed Lessons
 let missed = document.getElementById("missed");



 //Date
let date;
let list;
let newDay;
let gridPapa = document.querySelector("#gridLayout");


function getMyDate(date) {
    let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  
    return days[date.getDay()] + " " + months[date.getMonth()] + " " + date.getDate();
}


 // Add a new day
let add = document.querySelector('#add');
const start = new Date(2018, 3, 30);
add.addEventListener("click", function(e){
    newDay = document.createElement("div");
    newDay.innerHTML = `
    <p class = "title">0</p>
    <div class = "student-1">0</div>
    <div class = "student-2">0</div>
    <div class = "student-3">0</div>
    <div class = "student-4">0</div>
    <div class = "student-5">0</div>
    <div class = "student-6">0</div>
    <div class = "student-7">0</div>
    <div class = "student-8">0</div>
    <div class = "student-9">0</div>
    <div class = "student-10">0</div>
    <div class = "student-11">0</div>
    <div class = "student-12">0</div>
    <div class = "student-13">0</div>
    <div class = "student-14">0</div>
    <div class = "student-15">0</div>`
    newDay.style.gridColumn = "1fr";
    gridPapa.appendChild(newDay);
    dayNum.innerHTML = Number(dayNum.innerHTML) +1
    list = newDay.querySelectorAll("div");
    date = newDay.firstElementChild;
    list.forEach(function(item){
        item.classList.add("red");
    })
    
    // Add Date
        if (dayNum.innerHTML == 1){
            date.innerHTML = getMyDate(start);
        }else if(dayNum.innerHTML%4 == 2 || dayNum.innerHTML%4 == 3 || dayNum.innerHTML%4 == 1){
            start.setDate(start.getDate() + 2);
            date.innerHTML = getMyDate(start);
        }else if (dayNum.innerHTML % 4 == 0) {
            start.setDate(start.getDate() + 1);
            date.innerHTML = getMyDate(start);
        }
 remove.disabled = false;
})


//Prompt and Grades
    gridPapa.addEventListener("click", function(e){
        if(e.target.classList.contains("red")){
            input = Number(prompt("Enter a grade"));
            if(input > 5){
                input = 5;
            }else if(input < 0 || isNaN(input)){
                input = 0;
            }else if(input % 1 != 0){
                input = Math.round(input);
            }
            e.target.innerHTML = input;
            if(e.target.innerHTML != 0){
            e.target.classList.add("green");
            } 
        }
    })
    
    //Update Button
    let update = document.querySelector("#update");
    update.addEventListener("click", function(e){
        missed.innerHTML = document.querySelectorAll(".red").length - document.querySelectorAll(".green").length;
        average();
    });
    
    function average(){
        //One Student's average
        for (let i = 1; i <= 15; i++) {
            let sum = 0;
            if(document.querySelectorAll(".student-"+i).length > 0){
                let student = document.querySelectorAll(".student-"+i);
                let studAv = document.getElementById("student-"+i);
                for (let j = 0; j < student.length; j++) {
                    sum += Number(student[j].innerHTML);
                }
                let oneStudAv = Number(sum / student.length).toFixed(1);
                studAv.innerHTML = oneStudAv;
            }
        }
        //Average Mark
        let average = document.querySelectorAll(".average div");
        let avGrade = 0;
        for (let a = 0; a < 15; a++) {
            avGrade += Number(average[a].innerHTML);
        }
        let total = Number(avGrade/15).toFixed(1);
        document.getElementById("averageMark").innerHTML = total;
    }

//Remove last added day

let remove = document.querySelector('#remove')
remove.addEventListener("click", function(e){
    
    if(gridPapa.childElementCount > 2){
    gridPapa.removeChild(gridPapa.lastElementChild)

    //Remove Date
        if (dayNum.innerHTML == 1){
            date.innerHTML = new Date(2018, 3, 30);
        }else if(dayNum.innerHTML%4 == 1 || dayNum.innerHTML%4 == 2 || dayNum.innerHTML%4 == 3){
            start.setDate(start.getDate() - 2);
            date.innerHTML = getMyDate(start)
        }else if (dayNum.innerHTML % 4 == 0) {
            start.setDate(start.getDate() - 1);
            date.innerHTML = getMyDate(start)
        }
    }
    
    if (dayNum.innerHTML > 0){
    dayNum.innerHTML = Number(dayNum.innerHTML) - 1
    }
})

 

 






