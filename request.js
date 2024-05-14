const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user/:id-:name-:age', (req, res) => {
  // para acceder a los atributos dinamicos de la url
  const { id, name, age } = req.params
  console.log(req.params)
  res.send(
    `<h1>Bienvenido ${name}.</h1><h2>Tu id es: ${id}, tienes ${age} años.</h2>`
  )
})

app.get('/search', (req, res) => {
  const { name, age } = req.query
  res.send(`<h1>Su busqueda fue: ${name} de ${age} años.</h1>`)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
