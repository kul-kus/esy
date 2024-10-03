let chalk = require("chalk")
const fuzzy = require('fuzzy');
const inquirer = require('inquirer');
var spawn = require('child_process').spawn;
var config = require("./../config")
const clipboardy = require('clipboardy');
const fs = require('fs');
const { exec } = require("child_process");
const _ = require('lodash');
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));


module.exports = {
    "homePath": config.homePath,
    "wmioPath": config.wmioPath,
    "gitPath": config.gitPath,
    "alexa_code": config.alexa_code,
    "basepath": config.basepath,
    "kubenavPath": config.kubenavPath,
    "jmeterPath": config.jmeterPath,


    hexColors: {
        red: "#e88388",
        yellow: "#dbab78",
        green: "#a8cc8c",
        blue: "#71bef2",
        magenta: "#d290e4",
        cyan: "#66c2cd",
        grey: "#b9c0cb"
    },

    cleanedArray: function (inputArray) {
        return inputArray
            .filter(item => item !== null && item !== undefined && item.trim() !== '')
        // .map(item => item.replace(/^[-]+/, '').trim());
    },
    searchObject: function (arr, key, value) {
        return arr.filter(obj => obj[key] == value);
    },

    ensureJsonExtension: function (filename) {
        if (!filename.includes('.') || !/\.[^\/\\]+$/.test(filename)) {
            return `${filename}.json`;
        }
        return filename;
    },
    startSpinner: function (oraspinner, message, color) {
        if (!message) {
            message = ""
        }
        if (color && color != "none") {
            message = chalk.keyword(color)(message)
        }
        oraspinner.text = message
        oraspinner.start()
        return oraspinner
    },

    stopSpinner: function (oraspinner) {
        oraspinner.stop()
        return oraspinner
    },

    stopSpinnerAndShowMessage: function (oraspinner, type, message, color) {
        if (message && type) {
            if (color && color != "none" && !color.includes("#")) {
                message = chalk.keyword(color)(message)
            }
            if (color && color.includes("#")) {
                message = chalk.hex(color)(message)
            }
            if (type == "succeed") {
                message = (!color) ? chalk.keyword("lightgreen")(message) : message
                oraspinner.succeed(message)
            }
            if (type == "fail") {
                message = (!color) ? chalk.keyword("red")(message) : message
                oraspinner.fail(message)
            }
            if (type == "warn") {
                message = (!color) ? chalk.keyword("yellow")(message) : message
                oraspinner.warn(message)
            }
            if (type == "info") {
                message = (!color) ? chalk.keyword("lightblue")(message) : message
                oraspinner.info(message)
            }
        }
        oraspinner.stop()
        return oraspinner

    },

    copyStringToClipBoard: function (str) {
        clipboardy.writeSync(str);
    },
    getCurrentPWD: async function () {
        return new Promise((res, rej) => {
            return res(process.cwd())
        })
    },

    checkIfFileExist: function (fileName) {
        return new Promise(async function (res, rej) {
            try {

                let FileList = await self.getFileList()
                return (FileList.includes(fileName)) ? res(true) : res(false)
            } catch (error) {
                return rej(false)
            }
        })
    },
    addEscapeToSpace: function (str) {
        return str.replace(/(\s+)/g, '\\$1')
    },
    getFileList: function (filterParam, excludeConfig, command) {
        return new Promise((res, rej) => {
            let data = fs.readdirSync(self.wmioPath)
            data = data.filter(Boolean)
            wmioFileName = self.getWindowsFileConfig(data)
            // console.log("🚀 ~ returnnewPromise ~ wmioFileName:", wmioFileName)
            if (filterParam && filterParam.length && filterParam[0]) {
                wmioFileName = wmioFileName.filter(curr => curr.toLowerCase().startsWith(filterParam[0].toLowerCase()))
            }
            if (excludeConfig) {
                wmioFileName = wmioFileName.filter(e => e !== 'config.json' && e !== 'alias.json');
            }
            return res(wmioFileName)
        })
    },

    getFileListFs: function (filterParam, excludeConfig, command) {
        return new Promise((res, rej) => {
            let wmioFileName = fs.readdirSync((command && command == "git") ? (self.gitPath) : (self.wmioPath))
            if (filterParam && filterParam.length && filterParam[0]) {
                wmioFileName = wmioFileName.filter(curr => curr.toLowerCase().startsWith(filterParam[0].toLowerCase()))
            }
            if (excludeConfig) {
                wmioFileName = wmioFileName.filter(e => e !== 'config.json' && e !== 'alias.json');
            }
            return res(wmioFileName)
        })
    },
    getWindowsFileConfig: function (dataArr) {
        let finalArr = []
        if (dataArr && dataArr.length) {
            dataArr.forEach(element => {
                if (element.includes(".json") || element.includes(".txt")) {
                    let data = element.split(" ")
                    data = data[data.length - 1].replace("\r", "")
                    // console.log("🚀 ~ file: common.js ~ line 140 ~ data--->",typeof data)
                    finalArr.push(data)
                }
            });
        }
        // console.log("🚀 ~ file: common.js ~ line 146 ~ finalArr------->", Array.isArray(finalArr))
        return finalArr
    },
    showError: function (msg) {
        console.log(chalk.keyword("red")("Error: " + msg))
        // console.log(chalk.hex("red")("Error:" + msg))
    },
    showTerminationMsg: function (msg) {
        console.log(chalk.keyword("red")(msg))
        // console.log(chalk.hex("red")("Error:" + msg))
    },
    showMessage: function (msg) {
        console.log(chalk.keyword('brown')(msg))
    },
    showMessageOrange: function (msg) {
        console.log(chalk.keyword('orange')(msg))
    },
    showMessageRandom: function (msg, color) {
        console.log(chalk.keyword(color || 'orange')(msg))
    },
    showMessageHex: function (msg, color) {
        console.log(chalk.hex(color || "#a8cc8c")(msg))
    },

    convertJson: function (str) {
        try {
            str = (str && typeof str === "string") ? JSON.parse(str) : str;
        } catch (e) {
            return str;
        }
        return str;
    },

    checkJson: function (str) {
        // console.log("TCL :- ~ file: common.js ~ line 184 ~==> str", str,typeof str);
        try {
            // console.log("TCL :- ~ file: common.js ~ line 184 ~ str",JSON.parse(str));
            (str && typeof str === "string") ? JSON.parse(str) : str;
        } catch (e) {
            // console.log("TCL :- ~ file: common.js ~ line 189 ~ e", e);
            return false;
        }
        return true;
    },

    showOptionsSearch: function (choices, message) {
        choices = _.compact(choices);
        const question = [{
            name: "alexa",
            type: 'autocomplete',
            message,
            pageSize: 5,
            source: function (answer, input) {
                input = input || '';
                return new Promise((resolve) => {
                    setTimeout(function () {
                        let result = fuzzy.filter(input, choices);
                        resolve(
                            result.map(el => el.original)
                        );
                    }, _.random(30, 200));
                });
            }
        }];

        return inquirer.prompt(question).then(data => {
            return data.alexa
        });
    },
    showOptions: function (arr, msg) {
        return new Promise((res, rej) => {
            try {
                let opt = [{
                    name: "alexa",
                    type: 'list',
                    message: (msg) ? (msg) : "select the file to show",
                    pageSize: 5,
                    choices: arr
                }];

                inquirer.prompt(opt).then(data => {
                    res(data.alexa)
                });

            } catch (error) {
                rej(error)
            }
        })

    },
    confirmOptions: function (msg) {
        return new Promise((res, rej) => {
            try {
                let opt = [{
                    name: "alexa",
                    type: 'confirm',
                    message: (msg) ? (msg) : "Confirm?",
                    validate: (input) => {
                        if (input.toLowerCase() === 'y' || input.toLowerCase() === 'Y') {
                            return true;
                        }
                        return 'You must type "y" to proceed.';
                    },
                }];
                inquirer.prompt(opt).then(answers => {
                    return res(answers
                        .alexa)
                });
            } catch (error) {
                rej(error)
            }
        })

    },
    getInput: function (questions) {
        return new Promise((res, rej) => {
            try {
                inquirer.prompt(questions).then((answers) => {
                    // console.log(JSON.stringify(answers, null, '  '));
                    return res(answers)
                });
            } catch (error) {
                return rej(error)
            }
        })

    },
    readFile: function (fileName) {
        return new Promise((res, rej) => {
            try {
                let readCommand = spawn(`cd "$@" && cat ${self.wmioPath}/${fileName}`, {
                    shell: true
                })
                readCommand.stdout.on('data', function (data) {
                    data = data.toString()
                    if (self.checkJson(data)) {
                        data = self.convertJson(data)
                    }
                    return res(data)
                });
                readCommand.stdout.on("error", (err) => {
                    return rej(err)
                })
            } catch (error) {
                return rej(error)
            }
        })
    },
    readFileFS: function (fileName) {
        return new Promise((res, rej) => {
            try {
                let path = `${self.wmioPath}/${fileName}`
                let data = fs.readFileSync(path);
                return res(data.toString())
            } catch (error) {
                return rej(error)
            }
        })
    },
    createFile: function (fileName) {
        return new Promise((res, rej) => {
            try {
                let createCommand = spawn(`cd "$@" && touch ${self.wmioPath}/${fileName}`, {
                    shell: true
                })
                createCommand.stdout.on("end", (data) => {
                    return res(data)
                })
                createCommand.stdout.on('data', function (data) {
                    data = data.toString()
                    if (self.checkJson(data)) {
                        data = self.convertJson(data)
                    }
                    return res(data)
                });
                createCommand.stdout.on("error", (err) => {
                    return rej(err)
                })
            } catch (error) {
                return rej(error)
            }
        })
    },
    copyFile: function (source, dest) {
        return new Promise((res, rej) => {
            try {
                let copyCommand = spawn(`cp ${source} ${dest}`, {
                    shell: true
                })
                copyCommand.stdout.on('data', function (data) {
                    // console.log(data.toString());
                })
                copyCommand.stderr.on('error', function (err) {
                    self.showError(err.toString());
                })
                copyCommand.stdout.on("end", async function (data) {
                    // console.log("--end--",data.toString());

                    res("done")
                })
            } catch (error) {
                return rej(error)
            }
        })
    },
    checkIfFileExist: function (path, name) {
        return new Promise((res, rej) => {
            if (fs.existsSync(path)) {
                return res(true)
            } else {
                return rej(`File doesnot exist in config ${name}`)
            }
        })

    },
    copyFileFS: function (source, dest) {
        return new Promise((res, rej) => {
            try {
                fs.copyFile(source, dest, (err) => {
                    if (err) {
                        return rej("Something went wrong while copying.", err)
                    }
                    return res('File Copied Successfuly..');
                });
            } catch (error) {
                return rej(error)
            }
        })
    },
    openFileInNanoEditor: async function (filename, param, command) {
        // console.log("param", param)
        try {
            let editior = "nano"
            if (param && Array.isArray(param) && param.length && param[1] == "--code") {
                editior = "code"
            }

            let tempPath = `${self.homePath}/${filename}`
            if (command && command == "git") {
                if (filename == "Sag") {
                    tempPath = `${self.gitPath}`
                } else {
                    tempPath = `${self.gitPath}/${filename}`
                }

            }
            if (command && command == "config") {
                tempPath = self.homePath
            }
            if (command && command == "code") {
                // tempPath = await self.getCurrentPWD()
                tempPath = self.alexa_code
            }
            let updateCommand = exec(`${editior} ${tempPath}`)
            updateCommand.stdout.on("data", function (data) {
                // process.stdout.pipe(data);
            });
        } catch (error) {
            return self.showError(error)
        }
    }
}
var self = module.exports
