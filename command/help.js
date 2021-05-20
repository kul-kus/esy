

var Table = require('cli-table3');
var colors = require('colors');

colors.setTheme({
    "heading": "red"
})

module.exports = {
    help: function () {
        let esy = ""
        esy += ' \n';
        esy += '          █████████╗░████████╗███╗░░░░███╗\n';
        esy += '          ██╔══════╝██╔══════╝╚███╗░░███╔╝\n';
        esy += '          ███████╗░░╚███████╗░░╚███████╔╝░\n';
        esy += '          ██╔════╝░░░╚═════██╗░░░╚███╔╝░░\n';
        esy += '          █████████╗████████╔╝░░░░███║░░░\n';
        esy += '          ╚════════╝╚═══════╝░░░░░╚══╝░░░\n';


        table = new Table({ head: ["Title", "Command", "Info"] });

        table.push(

            // ---git hub commands------
            ["Push code on github", "esy push <commit message> [--copy | -c ]", "Push code on current branch."],
            ["Pull current branch", "esy pull", "Pull code on current branch."],
            ["Checkout Specific github Branch", "esy checkout <branch name> [--all]", "Checkout to a specific branch."],
            ["current branch", "esy branch", "Prints current branch"],
            ["Store Git Credential", "esy store", "Store Git credentials, (git config credential.helper store)"],


            //----- wmio commands---
            ["Change Config", "esy change <filter param> [--deploy]", "Provides a list of file to set config.json and the connector to specified tenant."],
            ["Show Config", "esy show <filter param>", "Provides a list of file to show File Content."],
            ["Create File", "esy create <file name> [--code | --nano]", "Create a new file with user specified name."],
            ["Update File", "esy update <filter param> [--code | --nano]", "Updates the content of specified file."],
            ["Rename File", "esy rename <filter param> [-- new file name]", "Rename specific file."],
            ["Delete File", "esy delete  <filter param>", "Deletes the selected file."],
            ["Who", "esy whoami", "Shows config file content"],
            ["Kill Process", "esy kill <Port number> [-a]", "Kills process of a specific port"],
            ["Create Schema", "esy schema", "Create schema for specified json object."],
            ["Help", "esy help or esy", "List all commands you can use"],
            ["Version", "esy --version | esy -v", "List the current version of your esy npm module"]

        );
        console.log()
        console.log(esy);
        console.log(table.toString());
        console.log()
    }
}