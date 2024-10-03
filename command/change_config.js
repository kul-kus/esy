
var basefile = "config.json"
var comm = require("./common")
var spawn = require('child_process').spawn;

module.exports = {
    change_config: async function (filterParam) {
        try {
            // let wmioFileName = await comm.getFileList(filterParam, true)
            let wmioFileName = await comm.getFileListFs(filterParam, true)

            if (wmioFileName.length) {
                let selectedOpt = await comm.showOptionsSearch(wmioFileName, "Select the tenant.")

                let copy_res = await comm.copyFileFS(`${comm.wmioPath}/${selectedOpt}`, `${comm.wmioPath}/${basefile}`)

                let cofigData = await comm.readFileFS(basefile)
                console.log(cofigData)
                comm.showMessageOrange(`Connector Config Successfully to ${selectedOpt}`)
                /*
                                if (filterParam && filterParam.length && filterParam[1] && filterParam[1] == "--deploy") {
                
                                    //----------------------------------------
                                    comm.showMessageRandom(`------ Deployment started on ${cofigData.host} ------`, "lightblue")
                                    var cmdToGetPWD = spawn(`pwd`, {
                                        shell: true
                                    });
                                    cmdToGetPWD.stdout.on('data', function (data) {
                                        let pwd = comm.addEscapeToSpace(data.toString().trim())
                                        console.log("pwd", pwd)
                                        var cmdToExecDeployCommand = spawn(`cd ${pwd} "$@" && wmio deploy`, {
                                            shell: true
                                        });
                
                                        cmdToExecDeployCommand.stdout.on('data', function (data) {
                                            data = data.toString()
                                            if (data.includes("[ERROR]")) {
                                                return comm.showError(data)
                                            }
                                            else if (data.includes("[INFO]") && data.includes("successfully")) {
                                                comm.showMessageOrange(data)
                                            } else {
                                                comm.showMessageRandom(data, "green")
                                            }
                                        })
                                        cmdToExecDeployCommand.stdout.on('close', function (data) {
                                            console.log("close", data)
                
                                        })
                                        cmdToExecDeployCommand.stdout.on("end", function (data) {
                                            console.log("end", data)
                
                                        })
                                        cmdToExecDeployCommand.stdout.on("error", function (data) {
                                            console.log("error", data)
                
                                        })
                                    })
                                    //---------------------------------
                
                                }
                  */
            } else {
                comm.showMessageOrange("No records found..")
            }

        } catch (error) {
            console.log("🚀 ~ file: change_config.js ~ line 67 ~ error", error)
            comm.showError(error)
        }
    }

}

var self = module.exports