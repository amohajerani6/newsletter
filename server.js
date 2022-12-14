const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const https = require('https')
const client = require("@mailchimp/mailchimp_marketing");

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})


app.post('/submitted', function(req, res) {

  // sent a post request to mailchimp API
  var fName = req.body.Firstname
  var lName = req.body.Lastname
  var Email = req.body.Email
  console.log(Email)
  // Make a POST request to send this data to mailchimp

  client.setConfig({
    apiKey: "a2f2a5943e5cb605105f9873255c39e8-us21",
    server: "us21",
  });

  const run = async () => {
    try{
      console.log('posting to mailchimp')
    const response = await client.lists.addListMember("a965cef93d", {
      email_address: Email,
      status: "subscribed",
      merge_fields: {
        FNAME: fName,
        LNAME: lName,
      }
    });
    res.sendFile(__dirname + '/success.html')
  } catch (err) {
    console.log(err)
    res.sendFile(__dirname + '/failure.html')}
  };

  run();
})

app.listen(process.env.PORT || 3000, console.log('listening'))
