const express = require('express')
const app = express()
const port = 3000
const pelis = require('./movies.json')
const crypto = require('node:crypto')
const { validarPeli } = require('./schemas/pelis')

app.disable('x-powered-by')
app.use(express.json())

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

app.post('/peliculas', (req, res) => {
  const resultado = validarPeli(req.body)

  if (!resultado.success) return res.status(400).json(resultado.error.message)

  const nuevaPeli = {
    id: crypto.randomUUID(),
    ...resultado.data,
  }
  pelis.push(nuevaPeli)
  res.json(nuevaPeli)
})

app.delete('/peliculas/:id', (req, res) => {
  const { id } = req.params
  const peliIndex = pelis.findIndex((peli) => peli.id === id)

  if(peliIndex === -1){
    return res.status(404).json({message: 'Peli no encontrada para borrar'})
  }
  pelis.splice(peliIndex, 1)
  res.json({message: 'Peli borrada con exito'})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
