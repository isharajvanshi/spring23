var https = require('https');
var fs = require('fs');
var quotes = [];
quotes.push("Your allergies are some of the least embarrassing allergies");
quotes.push("You have exceptionally riveting eyebrows");
quotes.push("Your parents argue over which one of them you look like");
quotes.push("At least two friends are going to name their goldfish after you");
quotes.push("Your handshake conveys intelligence, confidence and minor claminess");

function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

var options = {
    key: fs.readFileSync('/etc/ssl/server.key'),
    cert: fs.readFileSync('/etc/ssl/server.crt')
};

function respond(theText) {

    theResponse = {
        version: '1.0',
        response: {
            outputSpeech: {
                type: 'PlainText',
                text: theText
            },
            card: {
                type: 'Simple',
                title: 'Compliments',
                subtitle: 'emergencycompliment.com',
                content: theText
            },
            shouldEndSession: 'true'
        }
    }
    return (theResponse);
}


https.createServer(options, function(req, res) {
    if (req.method == 'POST') {
        var jsonString = '';
        req.on('data', function(data) {
            jsonString += data;
        });
        req.on('end', function() {
            console.log(JSON.parse(jsonString));
        });
    }
    myResponse = JSON.stringify(respond(getRandomQuote()));
    res.setHeader('Content-Length', myResponse.length);
    res.writeHead(200);
    res.end(myResponse);
    console.log(myResponse);
}).listen(443); //Put number in the 3000 range for testing and 443 for production
