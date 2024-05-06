const switcher = $('#svgs svg')

switcher.eq(1).on('click', function() {
  $('#mainBody').toggleClass('grid_mainBody')
  $('#mainBody').toggleClass('block_mainBody')
})