const express = require("express")
const mustacheExpress = require("mustache-express")
const data = require("./data")
const pgpPromise = require("pg-promise")
const database = pgpPromise({database: "robot-database"})
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlenconded({ extended: false}))
app.use(expressValidator())

app.engine("mustache", mustacheExpress())
app.set("views", "./templates")
app.set("view engine", "mustache")

app.get("/", (request, response) => {
  response.render("home", data)
})

app.get("/user/:username", (request, response) => {
  const profileData = {
    username: request.params.username
  }
  function username(user) {
    return user.username === profileData.username
  }

  const userData = data.users.find(username)
  response.render("user", userData)
})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})
