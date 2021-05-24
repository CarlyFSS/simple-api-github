import express from 'express'
import http from 'http'
import cors from 'cors'
import api from './api'


const app = express()

app.use(cors())

app.use(express.json())

app.get('/:repo', async (req, res) => {
  const param = req.params

  const response = await api.get(`/orgs/${param}/repos`)

  const { owner } = response.data[0]
  
  // res.redirect(`https://avatars.githubusercontent.com/u/${owner.id}?v=4`)

  res.json(owner.url)
})


const httpServer = http.createServer(app);

httpServer.listen(3333, () => {
  console.log('Listening on port 3333')
})