const pages = $('#sideBar .page')

pages.on('click', function (){
  if($(this).children('p').text().includes('Note')){
    window.location.href = './notes.html'
  }else{
    var link = $(this).children('p').text().toLowerCase()
    window.location.href = `./${link}.html`
  }
  console.log($(this).children('p'));
})