
var commAppID = require("./common")
var comm = require("../common")
let chalk = require("chalk")


var path = require('path')

async function replaceAppId(enviroment) {
    return new Promise(async (resolve, reject) => {
        try {
            const currConnDirectory = await comm.getCurrentPWD()

            let ignoreFoldersArr = [
                `${currConnDirectory}/node_modules/**`,
                `${currConnDirectory}/package.json`,
                `${currConnDirectory}/package-lock.json`
            ]
            const { appId, guid, triggers, actions, title } = await commAppID.getAppData(`${currConnDirectory}/index.json`)

            let targetEnv = ""
            let connDetails = await commAppID.getConnectorData()


            if (!enviroment) {
                targetEnv = await comm.showOptionsSearch(connDetails["env"], "Select the Target Enviroment on which the connector is to deployed.")
            } else {
                targetEnv = enviroment
            }

            let targetEnvConneData = comm.searchObject(connDetails["connData"][targetEnv], "guid", guid)



            if (targetEnvConneData.length == 0) {
                comm.showMessageHex(`No Connector entry present with guid: ${guid} in enviroment ${targetEnv}`, "#e88388")

            } else if (targetEnvConneData.length > 1) {
                comm.showMessageHex(`Multiple Connector entry present with guid: ${guid} in enviroment ${targetEnv}`, "#e88388")
            } else {
                let allFiles = await commAppID.getAllFilesInFolder(currConnDirectory, ignoreFoldersArr)

                if (areArraysEqualUnordered(targetEnvConneData[0]["triggers"], triggers) &&
                    areArraysEqualUnordered(targetEnvConneData[0]["actions"], actions)) {


                    if (appId == targetEnvConneData[0]["uid"]) {
                        console.log(
                           
                            chalk.hex(comm.hexColors.grey)(`\n Action: `),
                            chalk.hex(comm.hexColors.cyan)(`AppId is same `),
                            chalk.hex(comm.hexColors.grey)(`\n AppID: `),
                            chalk.hex(comm.hexColors.magenta)(`${targetEnvConneData[0]["uid"]}`),
                            chalk.hex(comm.hexColors.grey)(`\n Target Connector:  `),
                            chalk.hex(comm.hexColors.blue)(`${targetEnvConneData[0]["title"]} tg:${targetEnvConneData[0]["triggers"].length} act:${targetEnvConneData[0]["actions"].length}`),
                            chalk.hex(comm.hexColors.grey)(`\n Current Connector: `),
                            chalk.hex(comm.hexColors.blue)(`${title} tg:${triggers.length} act:${actions.length}\n`),
                            chalk.hex(comm.hexColors.green)(`✅ Contents Matched`)

                        )
                    } else {
                        await commAppID.replaceStringInFile(allFiles, appId, targetEnvConneData[0]["uid"])
                        console.log(
                            chalk.hex(comm.hexColors.grey)(`\n Action: `),
                            chalk.hex(comm.hexColors.cyan)(`AppId replaced `),
                            chalk.hex(comm.hexColors.grey)(`\n New AppID: `),
                            chalk.hex(comm.hexColors.magenta)(`${targetEnvConneData[0]["uid"]}`),
                            chalk.hex(comm.hexColors.grey)(`\n Target Connector: `),
                            chalk.hex(comm.hexColors.blue)(`${targetEnvConneData[0]["title"]} tg:${targetEnvConneData[0]["triggers"].length} act:${targetEnvConneData[0]["actions"].length}`),
                            chalk.hex(comm.hexColors.grey)(`\n Current Connector: `),
                            chalk.hex(comm.hexColors.blue)(`${title} tg:${triggers.length} act:${actions.length}\n`),
                            chalk.hex(comm.hexColors.green)(`✅ Contents Matched`)
                        )
                    }
                } else {
                    console.log(
                        chalk.hex(comm.hexColors.grey)(`\n Target Connector:  `),
                        chalk.hex(comm.hexColors.blue)(`${targetEnvConneData[0]["title"]} tg:${targetEnvConneData[0]["triggers"].length} act:${targetEnvConneData[0]["actions"].length}`),
                        chalk.hex(comm.hexColors.grey)(`\n Current Connector: `),
                        chalk.hex(comm.hexColors.blue)(`${title} tg:${triggers.length} act:${actions.length}\n`),
                        chalk.hex(comm.hexColors.red)(` \n ❌ Contents Different`),
                        
                    )
                    return reject("Error: Guid is not matching the contents with source connector")
                }

                // if (targetEnvConneData[0]["triggers"].length == triggers.length && targetEnvConneData[0]["actions"].length == actions.length) {
                //     chalk.hex(comm.hexColors.green)(` ✅ Same`)
                // } else {

                // }
                // comm.showMessageOrange(`\n AppID succesfully replaced to ${targetEnvConneData[0]["uid"]} in Connector ${targetEnvConneData[0]["title"]} \n`)
                return resolve()
            }

        } catch (error) {
            // console.log("----ere---", error)
            comm.showMessageHex(`${error}`, "#e88388")
        }
    })
}


function areArraysEqualUnordered(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    // Sort both arrays and compare
    const sortedArr1 = [...arr1].sort();
    const sortedArr2 = [...arr2].sort();

    return sortedArr1.every((str, index) => str === sortedArr2[index]);
}


module.exports = { replaceAppId }
