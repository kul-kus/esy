
var commAppID = require("./AppId/common")
var comm = require("./common")
var AppID = require("./AppId/replaceAppid")
var basefile = "config.json"
const { spawn } = require('child_process');
let chalk = require("chalk")
const fs = require('fs');
const inquirer = require('inquirer');


var path = require('path')

function checkIfFileExist2(path, name, type) {
    return new Promise((res, rej) => {
        if (fs.existsSync(path)) {
            return res(true)
        } else {
            if (type == "string") {
                return rej(`File doesnot exist config ${name}`)
            }
            return res(false)
        }
    })
}

async function intiateDeployment() {
    const command = 'sudowmio';
    const args = ["deploy"];


    // Spawn the child process
    const deployProcess = spawn(command, args);
    deployProcess.stdout.on('data', (data) => {
        let dataArr = String(data).split("[INFO]")
        if (dataArr.length > 1) {
            console.log(
                chalk.keyword("orange")(`${dataArr[0]}`),
                chalk.keyword("white")(`[`),
                chalk.hex(comm.hexColors.green)(`INFO`),
                chalk.keyword("white")(`]`),
                chalk.hex(comm.hexColors.grey)(`${dataArr[1] || ""}`)
            )
        } else {
            console.log(chalk.hex(comm.hexColors.magenta)(`${dataArr[0]}`))
        }
        // console.log(`Output: ${data}`);
    });
    deployProcess.stderr.on('data', (data) => {
        comm.showMessageRandom(data, "red")
        // console.error(`Error: ${data}`);
    });

    deployProcess.on('close', (code) => {
        // comm.showMessageRandom(data, "green")
        // console.log(`Process exited with code ${code}`);
    });

    // Optional: If you want to send input data to the process
    // deployProcess.stdin.write('your input data here\n'); // Replace with actual data
    deployProcess.stdin.end(); // End the input stream
}

function deleteIndexJS() {
    return new Promise(async (resolve, reject) => {
        try {
            const currConnDirectory = await comm.getCurrentPWD()
            if (await checkIfFileExist2(`${currConnDirectory}/index.js`, "index.js", "boolean")) {
                fs.unlinkSync(`${currConnDirectory}/index.js`)
                comm.showMessageRandom("\nindex.js file deleted successfully.\n", "grey")
                return resolve("done")
            } else { return resolve("done") }
        } catch (error) {
            console.log("🚀 ~ returnnewPromise ~ error:", error)
            return reject(error)
            // comm.showMessageHex(`${error} \n`, "#e88388")
        }
    })
}
async function deploy() {
    try {

        let connDetails = await commAppID.getConnectorData()
        let targetEnv = await comm.showOptionsSearch(connDetails["env"], "Select the Target Enviroment on which the connector is to deployed.")
        // let targetEnv = "AZ_PROD_US"
        await checkIfFileExist2(`${comm.wmioPath}/${targetEnv}.json`, `${targetEnv}.json`, "string")
        await comm.copyFileFS(`${comm.wmioPath}/${targetEnv}.json`, `${comm.wmioPath}/${basefile}`)
        let cofigData = await comm.readFileFS(basefile)
        if (cofigData && typeof cofigData == "string") {
            cofigData = JSON.parse(cofigData)
        }

        comm.showMessageHex(`\n\nWmio login details`, "#b9c0cb")

        comm.showMessageRandom(`Email: ${cofigData["email"]}`, "grey")
        comm.showMessageRandom(`Host: ${cofigData["host"]}`, "grey")
        console.log(
            chalk.hex(comm.hexColors.green)(`\n Connector Config Successfully changed to`),
            chalk.keyword("orange")(`${targetEnv}`
            ))

        await AppID.replaceAppId(targetEnv)
        console.log(
            chalk.keyword("white")(`\n Enviroment Selected for Deployment: `),
            chalk.keyword("orange")(`${targetEnv}`
            ))
        if (await comm.confirmOptions(`Do you want to initate the sudowmio deploy on ${targetEnv}?`)) {
            // if (await comm.confirmOptions(`Do you want to initate the sudowmio deploy?`)) {
            if (targetEnv.includes("_PROD")) {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'confirmation',
                        message: 'Type "deploy" to confirm:',
                        validate: (input) => {
                            if (input.toLowerCase() === 'deploy') {
                                return true;
                            }
                            return 'You must type "deploy" to proceed.';
                        },
                    },
                ]).then(async (answers) => {
                    await deleteIndexJS()
                    intiateDeployment()
                });

            } else {
                await deleteIndexJS()
                intiateDeployment()
            }

            // }

        } else {
            comm.showMessageHex(`${"❌ Deployment Terminated"}`, "#e88388")
        }
    } catch (error) {
        comm.showMessageHex(`${error} \n`, "#e88388")
    }
}

module.exports = { deploy }
