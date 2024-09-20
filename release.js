#! /usr/bin/env node

const { exec, execSync } = require('child_process');
const os = require('os');
const axios = require('axios');
const http = require('http');
const fs = require('fs');
const child_process = require('child_process');
const { createHttpTerminator } = require('http-terminator');

if (process.argv.length < 4) {
    console.error("This script requires two arguments: first either dev (for development execution), prod-test (for production test), or prod (for production release), and third the token. A fourth optional arg is the IP of the selected interface.");
    process.exit(1);
}

const release = process.argv[2];
const token = process.argv[3];
const selectedIp = process.argv[4];
const dsServer =  require(`./config-${release}.json`).datasetService;

const networkInterfaces = os.networkInterfaces();
//console.log(networkInterfaces);
// Connections that use a local address
const localAddr = new Set(["127", "192"]);
let interf = Object.values(networkInterfaces).flat().filter(e => e.internal === false 
    && e.family === 'IPv4' && !localAddr.has(e.address.substring(0, 3)));
if (selectedIp) {
    console.log(`Searching for your own provided IP '${selectedIp}'...`);
    interf = interf.filter(e => e.address === selectedIp);
}
if (interf.length !== 1) {
    console.error(interf);
    throw new Error("too many or too few interfaces left after filtering, pass the IP of the network you want to use via the cmd arguments");
}
const ip = interf[0].address;
console.log(`Uploading from IP ${ip}`);

// const pyServerProc = exec('python3 -m http.server 3005', (err, stdout, stderr) => {
//     if (err) {
//       //some err occurred
//       console.error(err)
//     } else {
//      // the *entire* stdout and stderr (buffered)
//      console.log(`python server stdout: ${stdout}`);
//      console.log(`python server stderr: ${stderr}`);
//     }
//   });
//pyServerProc.stdout.on('data', data =>  console.log(data));


const server = http.createServer(function (req, response) {
    fs.readFile(`${__dirname}/build/build.zip`, function(error, content) {
        response.writeHead(200, { 'Content-Type': "application/zip" });
        response.end(content, 'utf-8');
    });
}).listen(3005);
try {
    let res = child_process.spawnSync("bash",
        ["-c", 
        `cd ${__dirname} \
        && npm run build-${release} \
        && cd build \
        && zip -r ./build.zip ./*`
    ]
        , {
            stdio: 'inherit',
            encoding: 'utf-8'
        });
        console.log('status: ' + res.status);
    var config = {
            method: 'post',
            url: `${dsServer}/set-ui`,
            headers: { 
                devToken: token
            },
            data : `http://${ip}:3005/build/build.zip`
            };
            
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {              
                console.log("Stopping py server");
                //pyServerProc.kill();
                const httpTerminator = createHttpTerminator({
                    server,
                });
                
                httpTerminator.terminate();
            });
} catch (e) {
    console.error(e);
}




