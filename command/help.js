

var Table = require('cli-table3');
var colors = require('colors');

colors.setTheme({
    "heading": "red"
})

module.exports = {
    help: function () {

        let output = ""
        output += ' \n';
        output += '          ░█████╗░██╗░░░░░███████╗░██╗░░██╗░█████╗░\n';
        output += '          ██╔══██╗██║░░░░░██╔════╝░╚██╗██╔╝██╔══██╗\n';
        output += '          ███████║██║░░░░░█████╗░░░░╚███╔╝░███████║\n';
        output += '          ██╔══██║██║░░░░░██╔══╝░░░░██╔██╗░██╔══██║\n';
        output += '          ██║░░██║███████╗███████╗░██╔╝╚██╗██║░░██║\n';
        output += '          ╚═╝░░╚═╝╚══════╝╚══════╝░╚═╝░░╚═╝╚═╝░░╚═╝\n';

        let alexa = ""
        alexa += ' \n';
        alexa += '          █████████╗░████████╗███╗░░░░███╗\n';
        alexa += '          ██╔══════╝██╔══════╝╚███╗░░███╔╝\n';
        alexa += '          ███████╗░░╚███████╗░░╚███████╔╝░\n';
        alexa += '          ██╔════╝░░░╚═════██╗░░░╚███╔╝░░\n';
        alexa += '          █████████╗████████╔╝░░░░███║░░░\n';
        alexa += '          ╚════════╝╚═══════╝░░░░░╚══╝░░░\n';


        table = new Table({ head: ["Title", "Command", "Info"] });
        // table = new Table({ style: { head: [], border: [] } })

        table.push(
            // [{ colSpan: 3, content: output }],
            // ["Title".heading, "Command".heading, "Info".heading],


            //----- wmio commands---
            ["Who", "alexa whoami", "Shows config file content"],
            // ["Open", "alexa open", "Opens the .connector folder in Visual studio Code."],
            ["Change Config", "alexa change <filter param> [--deploy]", "Provides a list of file to set config.json and the connector to specified tenant."],
            ["Show Config", "alexa show <filter param>", "Provides a list of file to show File Content."],
            ["Create File", "alexa create <file name> [--code | --nano]", "Create a new file with user specified name."],
            ["Update File", "alexa update <filter param> [--code | --nano]", "Updates the content of specified file."],
            ["Rename File", "alexa rename <filter param> [-- new file name]", "Rename specific file."],
            ["Delete File", "alexa delete  <filter param>", "Deletes the selected file."],
            // ["Migrate", "alexa migrate", "Migrates the conncetor to specified tenant."],

            ["Create Schema", "alexa schema", "Create schema for specified json object."],
            ["Create common file", "alexa create_common", "creates common file with user defined functions to develop Connectors."],

            // ---git hub commands------
            ["Checkout Specific github Branch", "alexa checkout <branch name> [--all]", "Checkout to a specific branch."],
            ["Push code on github", "alexa push <commit message> [--copy | -c ]", "Push code on current branch."],
            ["Pull current branch", "alexa pull", "Pull code on current branch."],
            ["current branch", "alexa branch", "Prints current branch"],


            //------------ other commands------
            ["Shutdown Laptop", "alexa shutdown | alexa off | alexa poweroff", "Shutdown the Laptop"],
            ["Store Git Credential", "alexa store", "Store Git credentials, (git config credential.helper store)"],
            ["Night Node", "alexa nightmode < on | off >", "Enable Night Node"],
            ["Kill Process", "alexa kill <Port number> [-a]", "Kills process of a specific port"],


            //--------------- to open files-----
            ["Opens specified Repo", "alexa open [git | config] <file name>", "Provides list of Repository and opens them in Visual studio Code."],
            ["Opens Kubenav", "alexa kubenav | kube", "Opens kubenav for debugging purpose"],
            ["Opens Jmeter", "alexa jmeter", "Opens jmeter for testing purpose"],




            //----------- help commads----
            ["Help", "alexa help or esy", "List all commands"],
            ["Restart Laptop", "alexa restart | alexa reboot", "Restarts the Laptop"],
            ["Version", "alexa --version | alexa -v", "List version of your alexa bot"]

        );
        console.log()


        console.log(output);

        console.log(table.toString());
        console.log()
    }
}