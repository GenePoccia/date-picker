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

app.get("/get-dates", (req, res) => {
  let datesTaken = itemData.datesReserved;
  res.send({ success: true, datesTaken: datesTaken });
});

app.post("/post-dates", upload.none(), (req, res) => {
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let city = req.body.city;

  //buffer initialization
  let buffer = 0;
  if (city === "Montreal") buffer = 1;
  if (city === "Toronto") buffer = 2;
  if (city === "Vancouver") buffer = 3;

  //check if buffer dates are available
  for (let i = 1; i < buffer + 1; i++) {
    if (itemData.datesReserved[moment(startDate).subtract(i, "d")] === true)
      return res.send({ success: false });
    if (itemData.datesReserved[moment(endDate).add(i, "d")] === true)
      return res.send({ success: false });
  }
  //get the in between dates
  let datesInBetween = [];
  let currentDate = moment(startDate);

  while (currentDate.diff(endDate, "days") <= 0) {
    if (
      itemData.datesReserved[moment(currentDate).format("MMM Do YYYY")] === true
    ) {
      return res.send({ success: false });
    } else {
      datesInBetween.push(currentDate);
      currentDate = moment(currentDate).add(1, "d");
    }
  }
  //if dates are available, reserve them
  for (let i = 0; i < datesInBetween.length; i++) {
    itemData.datesReserved[datesInBetween[i]] = true;
  }

  //if buffer dates are available, reserve these dates
  for (let i = 1; i < buffer + 1; i++) {
    itemData.datesReserved[moment(startDate).subtract(i, "d")] = true;
    itemData.datesReserved[moment(endDate).add(i, "d")] = true;
  }
  let datesReserved = itemData.datesReserved;

  res.send({
    success: true,
    datesReserved,
    startDate: moment(startDate).format("MMM Do YYYY"),
    endDate: moment(endDate).format("MMM Do YYYY"),
    buffer: buffer,
    city: city
  });
});

app.listen(4000);
