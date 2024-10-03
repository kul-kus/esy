
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
            const { appId, guid } = await commAppID.getAppData(`${currConnDirectory}/index.json`)
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

                if (appId == targetEnvConneData[0]["uid"]) {
                    console.log(
                        chalk.hex(comm.hexColors.green)(`\n AppID`),
                        chalk.keyword("green")(`${targetEnvConneData[0]["uid"]}`),
                        chalk.hex(comm.hexColors.green)(` is same for the `),
                        chalk.keyword("green")(`${targetEnvConneData[0]["title"]}`),
                        chalk.hex(comm.hexColors.green)(` Connector\n`),
                    )
                } else {
                    await commAppID.replaceStringInFile(allFiles, appId, targetEnvConneData[0]["uid"])
                    console.log(
                        chalk.hex(comm.hexColors.green)(`\n AppID succesfully replaced to`),
                        chalk.keyword("green")(`${targetEnvConneData[0]["uid"]}`),
                        chalk.hex(comm.hexColors.green)(` in Connector`),
                        chalk.keyword("green")(`${targetEnvConneData[0]["title"]}\n`)
                    )
                }

                // comm.showMessageOrange(`\n AppID succesfully replaced to ${targetEnvConneData[0]["uid"]} in Connector ${targetEnvConneData[0]["title"]} \n`)
                return resolve()
            }

        } catch (error) {
            comm.showMessageHex(`${error}`, "#e88388")
            return reject("")
        }
    })
}

module.exports = { replaceAppId }
