const express = require('express')
var cors = require('cors')
const app = express()
const port = 4000

app.use(cors())

let detailsInServer=[]
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post(`/createMerchant/:details`, (req, res) => {
    detailsInServer=(JSON.parse( req.params.details))
    console.log(detailsInServer)
  res.send('Hello Kavin!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})