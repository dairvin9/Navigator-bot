var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var niceComments = ["Are y'all talking about Ellen? She is the nicest girl I have ever met.",
                    "Can you teach me how to have game like Ellen?",
                    "Ellen is soooo cool",
                    "Can you be my lunch date? Ellen",
                    "I just wanna be like Ellen",
                    "Did you just mention Ellen?",
                    "Did you just mention Ellen? Are you secretly in love with her?",
                    "I have enough Ellen for today",
                    "@Clayton",
                    "I like country dance too",
                    "Ellen's bf application is still open. Apply here http://ellenstanfill.com/",
                    "You can never be as good as Ellen",
                    "@Ellen",
                    "@Ellen @Clayton",
                    "Happy Ellen day",
                    "Knock, Knock\n Who's there?\n very long pause... \"Java\"",
                    cool(),
                    "Ellen is so awesome; everyone wants to be her friend.",
                    "Don't talk to Ellen like that",
                    "Ellen's beauty makes me stack overflow",
                    "I want to marry a cat lady",
                    "Ellen's beauty is illegal to have",
                    "Ellen Ella ella eh eh eh"
                    ]
function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^\/Ellen$/;
  console.log(request)
  if(request.text && botRegex.test(request.text) && request.name != "Ellen\'s Secret Admirer" ) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = niceComments[Math.floor(Math.random() * (niceComments.length))]

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;