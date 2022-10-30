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

  // Make a POST request to send this data to mailchimp

  client.setConfig({
    apiKey: "a2f2a5943e5cb605105f9873255c39e8-us21",
    server: "us21",
  });

  const run = async () => {
    try{
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
    res.sendFile(__dirname + '/failure.html')}
  };

  run();
})









//  var apiKey='a2f2a5943e5cb605105f9873255c39e8-us21'
//  var listId='a965cef93d'


// respond by saying if it went through or not


//if (true) {
//  res.sendFile(__dirname + '/success.html')
//} else {
//  res.sendFile(__dirname + '/failure.html')
//}




app.listen(process.env.PORT || 3000, console.log('listening'))
