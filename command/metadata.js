
var commAppID = require("./AppId/common")
var comm = require("./common")

let chalk = require("chalk")
const fs = require('fs');
var Table = require('cli-table3');
var path = require('path')

function checkIfFileExist2(path) {
    return new Promise((res, rej) => {
        if (fs.existsSync(path)) {
            return res(true)
        } else {
            return res(false)
        }
    })
}

async function metadata() {
    try {
        let finalObj = {}
        const currConnDirectory = await comm.getCurrentPWD()
        const { appId, guid } = await commAppID.getAppData(`${currConnDirectory}/index.json`)
        let data = fs.readFileSync(`${currConnDirectory}/index.json`, 'utf8')
        let jdata = JSON.parse(data);

        let allTriggers = [], allAction = []

        if (checkIfFileExist2(`${currConnDirectory}/action`) && (jdata["actions"].length > 0)) {
            allAction = await commAppID.getAllFilesInFolder(`${currConnDirectory}/action`)
        }
        if (checkIfFileExist2(`${currConnDirectory}/trigger`) && (jdata["triggers"].length > 0)) {
            allTriggers = await commAppID.getAllFilesInFolder(`${currConnDirectory}/trigger`)
        }

        allAction.forEach(action => {
            let curr = require(action)

            if (finalObj[curr["name"]]) {
                finalObj[curr["name"]]["version"].push(curr["version"])
            } else {
                if (curr["version"]) {
                    finalObj[curr["name"]] = {
                        "title": curr["title"] || curr["label"],
                        "version": [curr["version"]],
                        "type": "Action"
                    }
                }

            }
        })
        allTriggers.forEach(trigger => {
            let curr = require(trigger)
            if (finalObj[curr["name"]]) {
                finalObj[curr["name"]]["version"].push(curr["version"])
            } else {
                if (curr["version"]) {
                    finalObj[curr["name"]] = {
                        "title": curr["title"] || curr["label"],
                        "version": [curr["version"]],
                        "type": "Trigger"
                    }
                }

            }
        })
        // console.log("--------------", JSON.stringify(finalObj))
        table = new Table({ head: ["Name", "Type", "Title", "Version"] });
        let arr1 = []
        Object.keys(finalObj).forEach(currkey => {
            let currObj = finalObj[currkey]
            if (Array.isArray(currObj["version"])) {
                currObj["version"] = currObj["version"].join(', ');
            }
            arr1.push([String(currkey), String(currObj["type"]), String(currObj["title"]), String(currObj["version"])])
        })
        table.push(...arr1)
        console.log(table.toString());

    } catch (error) {
        // process.exit
        comm.showMessageHex(`${error} \n`, "#e88388")
    }
}

module.exports = { metadata }
