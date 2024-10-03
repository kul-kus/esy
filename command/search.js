



var commAppID = require("./AppId/common")
var comm = require("./common")
let chalk = require("chalk")
var Table = require('cli-table3');
var path = require('path')

function reorderKeys(obj, newOrder) {
    const newObject = {};
    newOrder.forEach((key) => {
        if (obj.hasOwnProperty(key)) {
            newObject[key] = obj[key];
        }
    });
    return newObject;
}

function formObject(targetEnvConnDetails) {
    let Obj = {}
    targetEnvConnDetails.forEach(element => {
        let key = `${element && element["title"] || ""} appID:${element && element["uid"] || ""} guid:${element && element["uid"] || ""} t:${element && element["triggers"] && element["triggers"].length || 0} a:${element && element["actions"] && element["actions"].length || 0}`
        Obj[key] = element
    })
    return Obj
}


async function searchConnector() {
    try {

        let connDetails = await commAppID.getConnectorData()
        let targetEnv = await comm.showOptionsSearch(connDetails["env"], "Select the Enviroment on which you want to search the connector.")
        let targetEnvConnDetails = connDetails["connData"][targetEnv]
        let targetEnvConnDetailsObj = formObject(targetEnvConnDetails)
        let searchKey = await comm.showOptionsSearch(Object.keys(targetEnvConnDetailsObj), "Select the connector.")

        // console.log(targetEnvConnDetailsObj[searchKey])
        let finalData = targetEnvConnDetailsObj[searchKey]
        if (finalData && typeof finalData == "string") {
            finalData = JSON.parse(finalData)
        }

        table = new Table({ head: ["Key", "Value"] });
        let arr1 = []
        let newOrder = ["title", "uid", "guid", "global", "published", "actions", "triggers", "owner"]
        finalData = reorderKeys(finalData, newOrder)
        Object.keys(finalData).forEach(curr => {
            if (Array.isArray(finalData[curr])) {
                finalData[curr] = finalData[curr].join('\n');
            }
            arr1.push([String(curr), String(finalData[curr])])
        })
        table.push(...arr1)
        console.log(table.toString());

    } catch (error) {
        comm.showMessageHex(`${error} \n`, "#e88388")
    }
}

module.exports = { searchConnector }


