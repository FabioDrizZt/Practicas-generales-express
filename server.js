const express = require('express')
const app = express()
const port = 3000
const pelis = require('./movies.json')

app.disable('x-powered-by')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/peliculas', (req, res) => {
  const { genero } = req.query
  if (genero) {
    const peliculas = pelis.filter((peli) =>
      peli.genre.some((g) => g.toLowerCase() === genero.toLocaleLowerCase())
    )
    res.json(peliculas)
  }
  res.json(pelis)
})

app.get('/peliculas/:id', (req, res) => {
  const { id } = req.params
  const pelicula = pelis.find((peli) => peli.id === id)
  if (pelicula) return res.json(pelicula)
  res.status(404).json({ message: 'Peli no encontrada' })
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
