const express = require('express')
const app = express()
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  // console.log(req.originalUrl)
  // console.log(req.headers)
  // console.log(req.query)
  // console.log(req.body)
  // console.log(req.params)
  // res.setHeader('content-type', 'text/xml');
  // res.render('config')
  res.send('Provision Server - Cloud Comunicação')
})

app.get('/cfg:id.xml', (req, res) => {
  const { id: mac } = req.params

  const dominio = 'crtsp.cloudcom.com.br:6000'
  const outboundProxy = '18.217.251.102:6000'
  const alterarUser = false

  res.setHeader('content-type', 'text/xml');
  res.render('config', {mac, dominio, outboundProxy, alterarUser})
})

app.get('*', function(req, res){
  console.log(req.originalUrl)
  // console.log(req.headers)
  // console.log(req.query)
  // console.log(req.body)
  // console.log(req.params)
  // res.setHeader('content-type', 'text/xml');
  // res.render('config')
  res.status(404).send()
});

app.listen(80, () => {
  console.log('Running at port 80')
})