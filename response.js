const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.set({ 'content-type': 'text/html; charset=utf-8' })
  res.status(200).send('<h1>Bienvenidos a mi página</h1>')
})

app.get('/json', (req, res) => {
  res.json({ name: 'fabio', age: 33, id: 123 })
})

app.get('/archivo', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/redireccion', (req, res) => {
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
