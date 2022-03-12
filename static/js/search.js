// const main = document.getElementById('main')

// const rentBook = async (id) => {
//   const username = window.location.pathname.split('/')[2]
//   const book = await window.fetch(`/books/search/${username}/${id}`)
//     .then(res => res.json())
//   console.log(book)
//   book.fail
//     ? window.alert(book.err)
//     : main.innerHTML += `
//           <section id="editSection" class="fixed flex bg-black bg-opacity-80 top-0 left-0 w-full h-screen items-center justify-center">
//             <form id="editForm" method="POST" action="/books/update/${id}"
//             class="border-4 border-black bg-orange-200 p-8 rounded-xl font-semibold min-h-max grid grid-cols-4 gap-2">

//               <h4 class="text-2xl underline col-span-3">Alquilar libro:</h4>

//               <button onclick="closeEdit()" class="border-2 font-bold text-lg bg-white bg-opacity-50 border-black rounded-xl text-red-500">Cancelar</button>

//               <label for="title" class="flex flex-col">*Título:
//                 <input name="title" type="text" required class="rounded outline-none px-2" value="${book.title}">
//               </label>

//               <label for="author" class="flex flex-col">*Autor:
//                 <input name="author" type="text" required class="rounded outline-none px-2" value="${book.author}">
//               </label>

//               <label for="year" class="flex flex-col">*Fecha de publicación:
//                 <input name="year" type="text" required class="rounded outline-none px-2" value="${book.year}">
//               </label>

//               <label for="publisher" class="flex flex-col">*Editorial:
//                 <input name="publisher" type="text" required class="rounded outline-none px-2" value="${book.publisher}">
//               </label>

//               <label for="price" class="flex flex-col">*Precio del alquiler ($):
//                 <input name="price" type="number" min="0" required class="rounded outline-none px-2" value="${book.price}">
//               </label>

//               <label for="period" class="flex flex-col">*Duración del alquiler:
//                 <input name="period" type="text" required class="rounded outline-none px-2" value="${book.period}">
//               </label>

//               <label for="category" class="flex flex-col">Categoría:
//                 <input name="category" type="text" class="rounded outline-none px-2" value="${book.category || ''}">
//               </label>

//               <label for="cover_image" class="flex flex-col">Imagen de portada (url):
//                 <input name="cover_image" type="text" class="rounded outline-none px-2" value="${book.cover_image}">
//               </label>

//               <input type="hidden" name="owner_username" value="${book.owner_username}">

//               <p class="self-center text-center">* (requerido)</p>
//               <button class="col-span-2 rounded-xl border-2 border-black bg-white bg-opacity-50 text-red-500 w-96 text-xl font-bold mx-auto px-2">Editar</button>

//           </form>
//         </section>
//     `
// }
