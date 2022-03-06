const updateForm = document.getElementById('updateForm')
const newBookForm = document.getElementById('newBookForm')

updateForm.addEventListener('submit', async e => {
  e.preventDefault()
  const formData = {
    username: e.target.username.value,
    cellphone: e.target.cellphone.value,
    profile_pic: e.target.profile_pic.value,
    id: e.target.id.value
  }

  window.fetch(window.location.pathname, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if (data.fail) return window.alert(data.err)
      window.location.reload()
    })
})

newBookForm.addEventListener('submit', async e => {
  e.preventDefault()
  const formData = {
    title: e.target.title.value,
    author: e.target.author.value,
    year: e.target.year.value,
    publisher: e.target.publisher.value,
    price: e.target.price.value,
    period: e.target.period.value,
    category: e.target.category.value,
    cover_image: e.target.cover_image.value,
    owner_username: e.target.owner_username.value
  }

  window.fetch('/books/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      if (data.fail) return window.alert(data.err)
      window.location.reload()
    })
})
