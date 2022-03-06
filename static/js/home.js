const loginForm = document.getElementById('loginForm')
const signupForm = document.getElementById('signupForm')

loginForm.addEventListener('submit', async e => {
  e.preventDefault()
  const formData = {
    email: e.target.email.value,
    password: e.target.password.value
  }

  window.fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      if (data.fail) return window.alert(data.message)
      window.location.href = data.url
    })
})

signupForm.addEventListener('submit', async e => {
  e.preventDefault()
  const formData = {
    firstname: e.target.firstname.value,
    lastname: e.target.lastname.value,
    username: e.target.username.value,
    email: e.target.email.value,
    password: e.target.password.value,
    cellphone: e.target.cellphone.value,
    profile_pic: e.target.profile_pic.value,
    birthday: e.target.birthday.value
  }

  window.fetch('/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      if (data.fail) return window.alert(data.err)
      window.location.href = data.url
    })
})
