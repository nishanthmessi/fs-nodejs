const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')

const port = 8000

const fileDir = `${__dirname}/dir`

app.get('/', (req, res) => {
	res
		.status(200)
		.send('go to /create or /read')
})

app.get('/create', (req, res) => {
	const data = (+new Date()).toString()
	fs.appendFile(`${fileDir}/${+new Date()}.txt`, data, (err, data) => {
		if (err) console.log(err)
		res.status(201).send('File created')
	})
})

const readFile = fs.readdirSync(fileDir)
const latestFile = readFile.reverse()[0]

app.get('/read', (req, res) =>
	fs.readFile(`${fileDir}/${latestFile}`, 'utf8', (err, data) => {
		if (err) res.status(500).send('Something went wrong')
		else res.status(200).send(data)
	})
)

app.listen(port, () => {
	console.log('Listening on port ' + port)
})