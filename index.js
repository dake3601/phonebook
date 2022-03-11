require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('post', (request, response) => {
  if(request.method === 'POST') {
    const body = request.body

    const person = {
      name: body.name,
      number: body.number,
    }

    return JSON.stringify(person)
  }
  return ' '
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))

app.get('/', (request, response) => {
  response.send('<h1>Phonebook</h1>')
})

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</p>
                  <p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

const generateId = () => {
  return Math.floor(Math.random() * 1e10 + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }

  const repeat = persons.reduce((s, p) => s || body.name === p.name, false)

  if (repeat) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
