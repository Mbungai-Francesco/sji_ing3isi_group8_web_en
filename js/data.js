var Notes = [];
var newNote = function (id,title, date, time, tags){
  var tag = ''
  for (const color of tags) {
    tag += newTag(color)
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
  </div>`
}

var newTag = function (col){
  return `<div class="tag" style="background-color: ${col};" ></div>`
}

const goGetNotes = function () {
  var xhttp = new XMLHttpRequest();
  xhttp.onload = function () {
    if (this.readyState == 4) {
      var response = JSON.parse(xhttp.responseText);
      Notes = response.Notes
      console.log(Notes);
    }
  };
  xhttp.open("GET", "../js/data.json", true);
  xhttp.send();
}

goGetNotes()