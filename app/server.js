let express = require('express')
let app = express()

let multer = require('multer')
let upload = multer();

let bodyParser = require('body-parser')
app.use(bodyParser())

let cors = require('cors')
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

let dummyTest = {item: '',
state: '',
price: '',
datesReserved: {}
}

app.get('/get-dates', upload.none(), (req, res) => {
    let datesTaken = dummyTest.datesReserved
    res.send(JSON.stringify({success: true, datesTaken: datesTaken}))
})

app.post('/post-dates', upload.none(), (req, res) => {
    let date = req.body.date
    dummyTest.datesReserved[date] = true;
    res.send({success: true, dummyTest})
})

app.listen(4000)