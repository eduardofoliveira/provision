require('dotenv').config()
const express = require('express')
const fs = require('fs')
const log = fs.createWriteStream('./log.txt', {flags: 'a'})
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
  const userAgent = req.headers['user-agent']

  let [,modelo, hardware, firmware, devId] = userAgent.match(/Grandstream Model HW (.*)? (.* .*) (.*) DevId (.*)/)

  modelo = modelo.trim()
  hardware = hardware.trim()
  firmware = firmware.trim()
  devId = devId.trim()

  console.log({
    mac,
    userAgent,
    devId,
    modelo,
    hardware,
    firmware
  })
  if(mac !== devId){
    console.log('mac diferente de DevId')
    return res.send()
  }

  log.write(`${userAgent}\r\n`)
  switch(modelo){
    case 'HT-502':
      template = 'ht502'
      console.log('Switch 502')
      break
    case 'HT812':
      template = 'ht812'
      console.log('Switch 812')
      break
    default:
      console.log('Switch 404')
      return res.send()
  }

  console.log('Template: ' + template)

  const usuario1 = 'Eduardo'
  const password1 = 'C8loEduardo!'
  const usuario2 = 'Eduardo'
  const password2 = 'C8loEduardo!'
  const dominio1 = 'cloud.cloudcom.com.br:6000'
  const outboundProxy1 = '18.217.251.102:6000'
  const dominio2 = 'cloud.cloudcom.com.br:6000'
  const outboundProxy2 = '18.217.251.102:6000'
  const provisionPath = proces.env.PROVISION_PATH
  const firmwarePath = proces.env.FIRMWARE_PATH
  const alterarUser = false

  res.setHeader('content-type', 'text/xml');
  res.render(template, {
    mac,
    usuario1,
    password1,
    usuario2,
    password2,
    dominio1,
    outboundProxy1,
    dominio2,
    outboundProxy2,
    provisionPath,
    firmwarePath,
    alterarUser})
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