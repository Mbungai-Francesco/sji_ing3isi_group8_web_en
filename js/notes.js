const body = $('body')
const switcher = $('#svgs svg')
const notes = $('.notes')
const dots = $('.notes .dots')
const notes_opt = $('.notes .note_option')

noteHeight = notes.eq(0).height()
notes_opt.css('bottom',`${-1 * noteHeight}px`) // positions the note-option someway below the note

var noteOptionOnSite = function (){
  for (const iterator of notes_opt) {
    if(iterator.classList.contains('hidden')) continue
    else return true
  }
  return false
}

switcher.eq(1).on('click', function() {
  $('#mainBody').toggleClass('grid_mainBody')
  $('#mainBody').toggleClass('block_mainBody')
})

dots.on('click', function() {
  notes_opt.addClass('hidden');
  // console.log(notes_opt)
  this.nextElementSibling.classList.toggle('hidden')
  // console.log(this.nextElementSibling.classList);
})

notes_opt.on('focusout', function(){
  // console.log('moon');
  notes_opt.addClass('hidden');
  // notes_opt.addClass(hidden);
})

body.on('click', function (e){
  var val = e.target.getAttribute('class')
  // console.log(val != 'note_option' && noteOptionOnSite());
  // console.log( noteOptionOnSite());
  // console.log(val != 'note_option');
  if(val != 'note_option' && noteOptionOnSite() && val != 'dots' && val != 'dot'){
    notes_opt.addClass('hidden')
  }
  // console.log(val);
})

// $(document).ready(function () {
  
// });

$("#searchIn").on("input", function () {
  console.log($(this).val().toLowerCase());
  var searchTerm = $(this).val().toLowerCase();
  filterContacts(searchTerm);
});

function filterContacts(searchTerm) {
  $("#mainBody .notes").each(function () {
    // console.log($(this).children(":first"));
    // var text = $(this).text().toLowerCase();
    var text = $(this).children(":first").text().toLowerCase();
    if (text.includes(searchTerm)) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}