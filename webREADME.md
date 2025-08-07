
## Webmethods.io connector builder

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![wmiocli](https://img.shields.io/badge/webmethods.io-wmiocli-blue.svg)](https://www.npmjs.com/package/@webmethodsio/wmiocli)

## Installation
``` bash
  npm i @webmethodsio/wmiocli -g
```
>NOTE: On Windows OS use default command prompt.



<font color='red'>
   BREAKING CHANGES: We have removed the logger.log API use this.$log(params) inside your action for debugging.
</font>


Issue On Windows
[ISSUE]: https://github.com/SBoudrias/Inquirer.js/issues/570

## Contents
- [Get Started](#get-started)
- [Commands](#commands)
- [Guide to create a Connector](https://docs.webmethods.io/developer-guide/connector-builder)

## Get Started
Webmethods.io wmio connector builder is a Command Line Interface tool for webmethods.io wmio. It lets you build your own connectors for Webmethods.io wmio. Using Webmethods.io wmio connector builder you can deploy your connector to Webmethods.io and share it with others.

## Commands
Following are the commands which Webmethods.io wmio connector builder supports.

- [wmio connectors](#connectors)
- [wmio auth](#auth)
- [wmio create](#create)
- [wmio deploy](#deploy)
- [wmio download](#download)
- [wmio help](#help)
- [wmio init](#init)
- [wmio login](#login)
- [wmio logout](#logout)
- [wmio versions](#versions)
- [wmio swagger](#swagger)
- [wmio oauth](#oauth)
- [wmio attach](#attach-lookup)
- [wmio detach](#detach-lookup)
- [wmio postman](#postman)
- [wmio action](#action)
- [wmio trigger](#trigger)
- [wmio lookup](#lookup)
- [wmio test](#test)
- [wmio unpublish](#unpublish)
- [wmio migrate](#migrate)


## connectors
Use this command to display all the connectors created by current user.
``` bash
  // command options -f or --filter="published=true"
  wmio connectors
```
Sample Output:

``` bash
| App Name  |      Version    |      created_at          |
|---------- |-----------------| -------------------------|
| Github    |   1.0           | 2017-06-19T14:22:23.485Z |
| Facebook  |   2.0           | 2017-06-20T11:11:24.485Z |
| Gmail     |   2.0           | 2017-06-23T10:03:22.485Z |

```
## auth
Use this command to add an authentication for your connector.
``` bash
  wmio auth
```

## create
Use this command to add a new trigger, action, lookup.
``` bash
  wmio create trigger new_push
  wmio create action create_user
  wmio create lookup list_users
```

## deploy
Use this command for building and deploying the connector on wm.io.
``` bash
  wmio deploy
```

## download
Use this command for download a zip file of your connector.
``` bash
  wmio download
```



## help
Use this command to list all the commands you can use.
``` bash
  wmio help
```

Sample Output:

``` bash
|  Command    |    Example                           |                      Info                                  |
|----------   |--------------------------------------|------------------------------------------------------------|
| connectors  |   wmio connectors                    | Lists all the connectors of the current user               |
| auth        |   wmio auth                          | Adds an authentication for your connector                  |
| create      |   wmio create trigger trigger_name   | Adds a new trigger, action and lookup                      |
| deploy      |   wmio deploy                        | Builds and deploys connector on Webmethods.io              |
| download    |   wmio download                      | Downloads zip of your connector                            |
| help        |   wmio help                          | Lists all the commands                                     |
| init        |   wmio init example                  | Initializes a new connector                                |
| login       |   wmio login                         | Login to Webmethods.io wmio account                        |
| logout      |   wmio logout                        | Logout from Webmethods.io wmio account                     |
| versions    |   wmio versions                      | Lists all the versions of your current connector           |
| oauth       |   wmio oauth deploy                  | Deploy custom user oauth to Webmethods.io wmio             |
| attach      |   wmio attach lookup                 | To attach lookup in any specific actions or triggers field |
| detach      |   wmio detach lookup                 | To detach lookup in any specific actions or triggers field |
| postman     |   wmio postman [file.json]           | To import action from postman collection exported json     |
| swagger     |   wmio swagger [swagger.json|yaml]   | To import action from swagger file                         |
| migrate     |   wmio migrate                       | To migrate a connector to other region                     |



```




## init
Use this command to create an initial project.

```bash
  wmio init [path] [foldername] --template=minimal
  wmio init example
```

- Options
  * template - Optional template argument. Default `minimal`


## login
Use this command for configuring your deploy key and logging into Webmethods.io
``` bash
  wmio login
  // or
  wmio login https://mytenanturl.webmethods.io user@softwareag.com developer_key
```

## logout
Use this command for deleting access token from your home directory.
``` bash
  wmio logout
```


## versions
Use this command for displaying all the versions and their status of the current connector.
``` bash
  wmio versions
```
Sample Output:

``` bash
| App name  |   Version     |  Status   |
|---------- |:------------: |-----------|
| Github    |      1        | Published |
|           |      2        | Pending   |
-----------------------------------------
```

## swagger
To import all swagger api calls as an action in connector.
``` bash
  wmio swagger <swagger file path>
```

## oauth
To deploy custom user oauth to Webmethods.io

``` bash
  wmio oauth deploy
```

## attach lookup
To attach lookup in any specific action's or trigger's input field.

``` bash
  wmio attach lookup
```

## detach lookup
To detach lookup in any specific action's or trigger's input field.

``` bash
  wmio detach lookup
```


## postman

To create actions from postman collections exported json

``` bash
  wmio postman [box-exported-v2.1.json]
```

## action
Short hand for `wmio create action action_name`
``` bash
  wmio action action_name command
```

## trigger
Short hand for `wmio create trigger trigger_name`
``` bash
  wmio trigger trigger_name
```

## lookup
Short hand for `wmio create lookup lookup_name`
``` bash
  wmio lookup lookup_name
```
## test
To test and run your action/triggers/auth locally provided you fill the mock_input in your action/trigger/file. By default port 8088 is used for listening webhook events
you can change the port by setting ENV variable i.e (linux) PORT=9099 wmio test | (windows) set PORT=9099

## whoami
Displays current logged in user information.

## unpublish
Unpublishes the connector which is published or global and it's respective actions/triggers will not be visible.

## migrate
Migrates the connector you own to other account in different region.

wmio migrate
