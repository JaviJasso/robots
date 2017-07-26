const express = require("express")
const mustacheExpress = require("mustache-express")
const data = require("./data")

const app = express()

// Use the middleware (i.e plugin) for static files
// and tell express they are in the 'public' folder
app.use(express.static("public"))

app.engine("mustache", mustacheExpress())
app.set("views", "./templates")
app.set("view engine", "mustache")

// app.get is similar to our old friend addEventListener
// except we are listening for requests from a
// browser
//
// document.addEventListener('click', (event) => {
//
// })
// Este abajo es mi HOME "app"
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
