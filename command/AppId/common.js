

var { glob } = require('glob')
var path = require('path')
const fs = require('fs');
var connectorDataDirectory = require("./../../config").connectorDataPath
// var AllEnvAppId = require("./allEnvAppId")



async function getAllFilesInFolder(targetDirectory, ignoreFoldersArr) {
    return new Promise(async (resolve, reject) => {
        try {
            var jsfiles = await glob(`${targetDirectory}/**/*.{js,json}`, { ignore: ignoreFoldersArr })
            return resolve(jsfiles)
            // console.log("🚀 ~ async ~ jsfiles:", jsfiles)
        } catch (error) {
            return reject(error)
        }
    })
}


function replaceStringInFile(jsfiles, searchString, replacementString) {
    return new Promise((resolve, reject) => {
        jsfiles.forEach((file) => {
            if (fs.lstatSync(file).isFile()) {
                fs.readFile(file, 'utf8', (readErr, data) => {
                    if (readErr) {
                        return reject(`Error reading file ${file}:`, readErr)
                    }
                    if (data.includes(searchString)) {
                        const updatedData = data.replace(new RegExp(searchString, 'g'), replacementString);

                        fs.writeFile(file, updatedData, 'utf8', (writeErr) => {
                            if (writeErr) {
                                console.error(`Error writing file ${file}:`, writeErr);
                            } else {
                                // console.log(`Updated file: ${file}`);
                            }
                        });
                    }
                });
            }

        });
        return resolve("All Files replaced")
    })

}

function getAppData(filePath) {
    return new Promise((resolve, reject) => {
        try {
            let data = fs.readFileSync(filePath, 'utf8')
            const jsonData = JSON.parse(data);
            const appId = jsonData["appId"] || null; // Return null if appId is not found
            const guid = jsonData["guid"] || null; // Return null if appId is not found
            const triggers = jsonData["triggers"] || null; // Return null if appId is not found
            const actions = jsonData["actions"] || null; // Return null if appId is not found
            const title = jsonData["title"] || jsonData["name"] || null; // Return null if appId is not found


            return resolve({ appId, guid, triggers, actions, title })
        } catch (parseError) {
            // return reject("invalid")
            return reject(`Invalid path to Connector Folder.\n Unable to read index.json on path ${filePath}`)
        }
    })
}

function getCurrEnvAppID(guid, env, AllEnvAppId) {
    return new Promise((resolve, reject) => {
        try {
            if (AllEnvAppId[env]) {
                let allAppID = AllEnvAppId[env]
                if (allAppID[guid]) {
                    return resolve(allAppID[guid])
                }
                return reject(`Unable to find appId for the guid:${guid} in the enviroment ${env}`)
            }
            return reject(`Unable to find appIds data for the enviroment ${env}`)
        } catch (error) {
            return reject(error)
        }
    })
}

function getConnectorData() {
    return new Promise(async (resolve, reject) => {
        try {
            let connDetails = {
                env: [],
                connData: {}
            }
            var connDataFiles = await getAllFilesInFolder(connectorDataDirectory)
            connDataFiles.map(curr => {
                let conn = require(curr)
                connDetails["env"].push(conn["env"])
                connDetails["connData"][conn["env"]] = conn["data"]
            })
            return resolve(connDetails)
        } catch (error) {
            return reject(error)
        }
    })
}


module.exports = {
    replaceStringInFile,
    getAllFilesInFolder,
    getAllFilesInFolder,
    getAppData,
    getCurrEnvAppID,
    getConnectorData
}