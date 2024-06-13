const userName = $('header p span')
const indexBtn = $('header input')
const indexBtnA = $('header .right a')
if (!localStorage.getItem('users')) {
  localStorage.setItem('users', '');
  localStorage.setItem('loged', JSON.stringify('false'));
  localStorage.setItem('currentUser', JSON.stringify({username: "", email: "", password: "", id : ""}));
}
// $('#profile .profile_name').text(currentUser.username)
let users = localStorage.getItem('users');
let loged = localStorage.getItem('loged');
let currentUser = localStorage.getItem('currentUser');
currentUser = JSON.parse(currentUser);
loged = JSON.parse(loged);
if (loged == 'false') {
  console.log(users.length);
  console.log(userName.text());
  userName.text('Guest')
  // indexBtn.val('Sign Up')
  indexBtn.val('Log in')
}
else{
  users = JSON.parse(users);
  // currentUser = users[users.length - 1]
  userName.text(currentUser.username)
  indexBtn.val('Log Out')
}

indexBtnA.on('click', function () {
  if (loged == 'false') {
    // window.location.href = './html/signUp.html'
    window.location.href = './html/logIn.html'
  }
  else {
    $('#logOutForm').toggle('active')
    $('#overlay').toggle('active')
    $('#logOutForm p span').text(currentUser.username)
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

$('#logCreate').on('click', function () {
  loged = 'false'
  loged = JSON.stringify(loged);
  localStorage.setItem('loged', loged);
  window.location.href = '../index.html'
})

$('#logCancel').on('click', function () {
  $('#logOutForm').toggle('active')
  $('#overlay').toggle('active')
})