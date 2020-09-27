

//import the neccessary modules
//handles http requests
const http = require('http');
//handles url requests
const url = require('url');
//handles IO file handling
const fs = require('fs');

///////////////////////////////////
//If you are inporting (requiring) your own modules
//using ./ instead of ${__dirname}
//would mean get it relative from THIS files directory
//this is not the case below where ./ would mean relative to where we are 
//running the server from
///////////////////////////////////





//////
//Read below as to why we have moved this out of the CREATESERVER
//Also doing this Synchronously (readFileSync instead of readFile) as it is outside of the CREATESERVER request 
//so it doesn't matter - will do this only once

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);


//create the server object with the necessary request and response arguments
////////////////////////////////////////////////////////////////////////////////

//EVERYTHING IN THIS CREATESERVER REQUEST will get executed EVERY time there is
//a new request and remember this is done in an ASYNCHRONOUS manner
//The reason we have taken the function for reading the JSON file and parsing this
//is that we don't want to have to get this EVERY time a request is made
//get it at the start then each time a request is made to it, it's already loaded
//i.e. it doesn't have to be fetched again

///////////////////////////////////////////////////////////////////////////////
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
        res.writeHead(200, { 'Content-type': 'application/json'});
        res.end(data);
        
        //using a template string i.e. ` not '
        //S{__dirname} is a realtive path from where THIS file is. ./
        //would mean from the projects root directory
        //////////////////////////////////////////////
        ////SEE ABOVE for more details on this
        //////////////////////////////////////////////


        /////////////////////////////////////////////////////////////////////////////////////
        //The reason we are taking this code out of here is becasue we have put it outside of the 
        //CREATE SERVER request instead - see lines xxxx for reasons why
        ////////////////////////////////////////////////////////////////////////////////////////

        /////
        // fs.readFile(`${__dirname}/starter/dev-data/data.json`, 'utf-8', (err, data) => {
        //     //JSON.parse will take the json script we have read, which is a string stored in data
        //     //and parse it as a JavaScript object which in this case will be an array
        //     //This array is then stored in the variable productData
        //     const productData = JSON.parse(data);
        //     //This is so we can look at the array in the console
        //     console.log(productData);
        //     //if we want to output the JavaScript object (which is an array)
        //     //we need it to be in a string
        //     //remember above the JSON string was a string stored in data
        //     //so we can simply return that BUT we need the broswer to know that we
        //     //are sending JSON not HTML - reason being, we are building and API so that
        //     //someone can request something from this string, which they can do if it is seen
        //     //as JSON as opposed to HTML
        //     //it will still present the data (JSON string) without this line BUT
        //     //it won't be seen by the broswer as JSON, it will be seen as HTML
        //     res.writeHead(200, { 'Content-type': 'application/json'});
        //     res.end(data);

        // })

        

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