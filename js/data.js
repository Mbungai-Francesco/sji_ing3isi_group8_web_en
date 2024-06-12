if (!localStorage.getItem('currentBody')) {
  localStorage.setItem('currentBody', 'grid_mainBody');
}
var Notes = [];
var categories = ""
var tagSelect = "<option value=''>Choose tags</option>"
let catSet = new Set()
catSet.add('All') 
let arrTag
// let tagSet = new Set()
// tagSet.add('Tags')

const sortNotes = function (notes,sortBy) {
  if(sortBy == ''){}
  else{
    for (let i = 0; i < (notes.length -1); i++) {
      let min = i
      for (let j = i + 1; j < notes.length; j++) {
        // console.log(notes[j]);
        if (notes[j][sortBy] < notes[min][sortBy]) {
          min = j;
        }
      }
      if(min != i){
        let temp = notes[min]
        notes[min] = notes[i]
        notes[i] = temp
       }
    }
  }
  return notes
}

var newNote = function (id,title, date, time, tags,cats){
  var tag = ''
  var cat = ''
  for (const color of tags) {
    tag += newTag(color)
    // tagSet.add(color)
  }
  // console.log(tagSet);
  for (const cate of cats) {
    catSet.add(cate)
    cat += newCat(cate)
  }
  return `
  <div class="notes" val="${id}">
    <h1 class="title">${title}</h1>
    <div class="notesBottom">
      <div class="details">
        <div class="date">
          <p> <span class="day">${date}</span>  <span class="time">${time}</span></p>
        </div>
        <div class="tags">
        ${tag}
        </div>
      </div>
      <div class="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="note_option hidden">
        <div class="ren"><p>Rename</p></div>
        <div class="del"><p>Delete</p></div>
      </div>
    </div>
    <div class="selfTags">
      ${cat}
    </div>
  </div>`
}

var newTag = function (col){
  return `<div class="tag" style="background-color: ${col};" ></div>`
}

var newCat = function (col,i){
  return `<div class="options" value="${col}" index="${i}"><p>${col}</p></div>`
}

var newTagSelect = function (nom,col){
  return `<option value="${col.toLowerCase()}">${nom}</option>`
}

// const goGetNotes = function () {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onload = function () {
//     if (this.readyState == 4) {
//       var response = JSON.parse(xhttp.responseText);
//       Notes = response.Notes
//       arrTag = response.Tags
//       Notes = sortNotes(Notes)
//       console.log(Notes);
//       // console.log(arrTag);
//     }
//   };
//   xhttp.open("GET", "../js/data.json", true);
//   xhttp.send();
// }

// goGetNotes()