
var comm = require("./common")

module.exports = {
    open: async function (filterParam) {
        try {

            let command = filterParam.splice(0, 1)
            let commandArr = ["start", "stop", "status", "restart", "enable", "disbale"]
            if (command && Array.isArray(command) && command.length == 0) {
                command = await comm.showOptions(commandArr, "Select action to perform.")
            }

            command = Array.isArray(command) ? command[0] : command

            if (commandArr.includes(command)) {
                let mongo_command = `sudo systemctl ${command} mongod`
                // console.log("🚀 ~ file: mongo.js:17 ~ mongo_command:", mongo_command)

                let kubenav = spawn(mongo_command, {
                    shell: true,
                    detached: true,
                    stdio: 'ignore',
                })
                kubenav.unref()


            } else {
                comm.showError("Please enter valid command.")
            }

        } catch (error) {
            // comm.showError(error)
        }
    }

}

var self = module.exports