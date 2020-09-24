//This code creates and establishes a server with a request and response

//import the neccessary modules
const http = require('http');

//create the server object with the necessary request and response arguments
const server = http.createServer((req, res) => {
    //iff you want to see the output of the request uncomment next line
    //console.log(req);
    //This is the response which will output to the browser
    res.end('Hello from the server');
});

//to see the server running open up a browser and go to the IP address 127.0.0.1
server.listen(8000, '127.0.0.1', () => {
    console.log('listening to requests on port 8000');
});