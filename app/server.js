let express = require("express");
let app = express();

let multer = require("multer");
let upload = multer();

let bodyParser = require("body-parser");
app.use(bodyParser());

let cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

let moment = require("moment");

let itemData = { itemData: "", state: "", price: "", datesReserved: {} };

app.get("/get-dates", upload.none(), (req, res) => {
  let datesTaken = itemData.datesReserved;
  res.send({ success: true, datesTaken: datesTaken });
});

app.post("/post-dates", upload.none(), (req, res) => {
  let date = req.body.date;
  let city = req.body.city;

  //defaults the city to Montreal
  if (city === "") {
    city = "Montreal";
  }
  //reserves date selected
  itemData.datesReserved[date] = true;

  //buffer initialization
  let buffer = 0;

  //adds buffers to date selected
  if (city === "Montreal") {
    buffer = 1;
    for (let i = 1; i < 2; i++) {
      itemData.datesReserved[moment(date).subtract(i, "d")] = true;
      itemData.datesReserved[moment(date).add(i, "d")] = true;
    }
  }
  if (city === "Toronto") {
    buffer = 2;
    for (let i = 1; i < 3; i++) {
      itemData.datesReserved[moment(date).subtract(i, "d")] = true;
      itemData.datesReserved[moment(date).add(i, "d")] = true;
    }
  }
  if (city === "Vancouver") {
    buffer = 3;
    for (let i = 1; i < 4; i++) {
      itemData.datesReserved[moment(date).subtract(i, "d")] = true;
      itemData.datesReserved[moment(date).add(i, "d")] = true;
    }
  }

  let testing = itemData.datesReserved;

  res.send({
    success: true,
    testing,
    date: moment(date).format("MMM Do YYYY"),
    buffer: buffer
  });
});

app.listen(4000);
