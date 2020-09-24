//using the fs module https://nodejs.org/dist/latest-v12.x/docs/api/fs.html
//so we can inport and export to and from external files
//create an object called fs 
const fs = require('fs');


/////////
// BLOCKING SYNCHRONOUS WAY
/////////
//create a variable which will contain the text that exists in the input.txt file
const textIn = fs.readFileSync('./starter/txt/input.txt','utf-8');
//output the text to the console
console.log(textIn);

//to include variables in a string need to use es6 standards and use back ticks
//` (next to 1 key NOT ' apostrophies)
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
//use writeFileSync function from fs module to write to a file
fs.writeFileSync('./starter/txt/output.txt', textOut);
console.log('file written');

/////////
// NON-BLOCKING ASYNCHRONOUS WAY
/////////
//use readFile not readFileSync
//include the call back function i.e. once it has done what it needs to do i.e. it is ready
//it will call the callback function taht we specificy (2nd parameter below)
//2 arguments are required for the callback function
//the error and the data (data can be called whatever you want e.g.  Bob
//what will be stored in this parameter is the output of the readFile i.e. 
//the text from the file)
fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data) => {
    //If an error arises in the function above (the function is (err, data) = >)
    //then this if statement outputs ERROR!
    if (err) return console.log('ERROR!');
    console.log(data);
});
//Notice if we run the above the line below will output first as the 
//asynchronous way in which this code runs it won't do the console log
//above until it has loaded the file
console.log('Will read file!');

//we can trigger another event from reading the content of one file to act
//as the directory/file name for the next readFile
//i.e. in data1 we are storing the string 'read-this'
//therefore the directory on linw 46 is then pointing to a file called
//read-this.txt getting the data from that file and storing it in data2
fs.readFile('./starter/txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
    //This will create a file and write to it in an asynchronous way
    fs.writeFile('./starter/txt/final2.txt',`${data1}\n${data2}`,'utf-8', err => {
    console.log('Your file has been written');
    })
    });
});

console.log('Will NOW read file!');

////////////////FUNCTITONS for es6 standard
// (err, data) =>{
//     xxx
// }

// is a function which could be expressed like this
// function (eer){

// }