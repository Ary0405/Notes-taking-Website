console.log('HELLO');
showNotes();
//If user add a note then add it to local storage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click",function(e){
    let addtxt = document.getElementById("addtxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    let notesObj = new Array();
    if(notes == null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    let myObj = {
        title : addTitle.value,
        text : addtxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addtxt.value = "";
    addTitle.value = "";
    console.log(notesObj);
    showNotes();
})

//Function to Show Notes
function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element,index){
        html+=`
        <div class="noteCard mx-2 my-2" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.text}</p>
                <button id = "${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>`
    });
    let notesElm = document.getElementById("notes");
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }else{
        notesElm.innerHTML = `Nothing to show! Use "Add a note" section above to add a note`
    }
}

//Function to delete nodes
function deleteNote(index){
    let notes = localStorage.getItem("notes");
    if(notes==null){
        notesObj = [];
    }else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

//Search Function
let search = document.getElementById("searchTxt");
search.addEventListener("input",function(){
    let inputVal = search.value.toLowerCase();
    console.log(inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }else{
            element.style.display = "none";
        }
    })
})
