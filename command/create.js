
var commandFun = require("./CURD_command")
var createCommon = require("./create_common_fun_file")
var comm = require("./common.js")

module.exports = {
    create: async function (param) {

        let createCommand = ""
        if (param && Array.isArray(param) && param.length > 0) {
            param = comm.cleanedArray(param).reverse()
            if (param.length > 0) {
                createCommand = param.shift()
            }

        } else {
            let optionsArr1 = [
                "Create request2axios",
                "Create commonfuntion.js",
                "Create config file",
            ]
            createCommand = await comm.showOptions(optionsArr1, "Select the new File Creation.")
            if (createCommand.includes("axios")) {
                createCommand = "axios"
            } else if (createCommand.includes("config")) {
                createCommand = "config"
            } else if (createCommand.includes("common")) {
                createCommand = "common"
            } else {
                return comm.showError("Enter valid parameter")
            }

        }

        if (createCommand == "axios") {
            return createCommon.copy_axios()

        } else if (createCommand == "common") {
            return createCommon.copy_common()

        } else if (createCommand == "config") {
            return commandFun.create(param)
        } else {
            return comm.showError("Enter valid parameter")
        }
    }
}