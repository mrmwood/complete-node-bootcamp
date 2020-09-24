//This code creates and establishes a server with a request and response

//import the neccessary modules
//handles http requests cv  
const http = require('http');
//handles url requests
const url = require('url');

//create the server object with the necessary request and response arguments
const server = http.createServer((req, res) => {
    //if you want to see the output of the request uncomment next line
    //console.log(req);

    //view the url requests in the console
    console.log(req.url);

    //This will implement the URL routing
    //store the req.url into a variable
    const pathName = req.url;
    //based on the pathName make different responses
    if(pathName === '/' || pathName === '/overview'){
        res.end('this is the overview');
    } else if (pathName === '/product'){
        res.end('This is the Product');
    } else if (pathName === '/api'){
        res.end('This is the API');
    }else {
        //This is how you can handle 404 errors
        res.writeHead(404, {
            //HTTP Haders allow you to send meta data along with your request
            //read http://t.ly/T5I1
            //This will be seen in the meta data F12 Network - Headers
            //'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        //This is the content on the page
        res.end('<h1>Page not found</h1>');
    }

    //This is the response which will output to the browser
    //res.end('Hello from the server');
});

//to see the server running open up a browser and go to the IP address 127.0.0.1
server.listen(8000, '127.0.0.1', () => {
    console.log('listening to requests on port 8000');
});