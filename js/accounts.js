const userName = $('header p span')
const indexBtn = $('header input')
const indexBtnA = $('header .right a')
var currentUser = ''
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', '');
  localStorage.setItem('loged', JSON.stringify('false'));
}
let users = localStorage.getItem('users');
let loged = localStorage.getItem('loged');
loged = JSON.parse(loged);
if (loged == 'false') {
  console.log(users.length);
  console.log(userName.text());
  userName.text('Guest')
  indexBtn.val('Sign Up')
}
else{
  users = JSON.parse(users);
  currentUser = users[users.length - 1]
  userName.text(currentUser.username)
  indexBtn.val('Log Out')
}

indexBtnA.on('click', function () {
  if (loged == 'false') {
    window.location.href = './html/signUp.html'
  }
  else {
    loged = 'false'
    loged = JSON.stringify(loged);
    localStorage.setItem('loged', loged);
    logOutForm.addClass('active')
    overlay.addClass('active')
  }
})

$('#toNotes').on('click', function () {
  console.log(loged);
  if(loged == 'false'){
    alert('Please log in to access this page')
  }
  else{
    window.location.href = './html/notes.html'
  }
})