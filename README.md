## Installation
In order to get started with ‘esy’, you will first need to install it on your system. To do so, run the following command:
``` bash
npm i @kul-kus/esy -g
```

>NOTE: For Ubuntu OS, make sure to run the 'esy store' command before using any git commands.

## Contents
- [Get Started](#get-started)
- [Commands](#commands)
<!-- - [Guide to create a Connector](https://docs.webmethods.io/developer-guide/connector-builder) -->

## Get Started
esy is a Command Line Interface tool that simplifies basic git operations. Also, it simplifies account switching in webMethods.io Integration connectors along with performing various CRUD operations in accounts.

## Commands
Following are the commands which esy npm supports.

- [esy push](#push)
- [esy pull](#pull)
- [esy checkout](#checkout)
- [esy branch](#branch)
- [esy store](#store)
- [esy change](#change)
- [esy show](#show)
- [esy create](#create)
- [esy update](#update)
- [esy remane](#rename)
- [esy delete](#delete)
- [esy whoami](#whoami)
- [esy kill](#kill)
- [esy schema](#schema)
- [esy help](#help)
- [esy version](#version)



## push
Pushes changes to your git repository. It provides you with an interactive CLI user interface to select your changes to push.
``` bash
  esy push <commit_message>
```
![Push](https://github.com/kul-kus/esy/blob/master/Images/push.png?raw=true)

## pull
Pulls changes from git repository.
``` bash
  esy pull
```
![Pull](https://github.com/kul-kus/esy/blob/master/Images/pull.png?raw=true)


## checkout
Checks out to a specific branch and pulls latest changes from the selected branch. It provides a list of branches you can checkout to.
``` bash
  esy checkout 
```
![Checkout](https://github.com/kul-kus/esy/blob/master/Images/checkout.png?raw=true)


## branch
Use this command to know your current branch.
``` bash
  esy branch 
```

## store
Use this command to store your git credentials on your disk.
``` bash
  esy branch 
```

## change
Changes the account for webMethods.io Integration CLI connector.
This Command provides you an interactive CLI user interface to select your account from.
``` bash
  esy change <filter_param>
```

## show
Use this command to view specific authentication files.
``` bash
  esy show <filter_param>
```
## create
Use this command to create a new authentication file.
``` bash
  esy create
```
## update
Use this command to update a specific authentication file.
``` bash
  esy update <filter_param>
```

## rename
Use this command to rename a specific authentication file.
``` bash
  esy rename <filter_param>
```

## delete
Use this command to delete a specific authentication file.
``` bash
  esy delete <filter_param>
```

## whoami
Use this command to show the current user.
``` bash
  esy whoami
``` 
## kill
Use this to kill any running process.
``` bash
  esy kill <port_number>
```
![Checkout](https://github.com/kul-kus/esy/blob/master/Images/kill.png?raw=true)



## schema
Use this schema for specified object.
``` bash
  esy schema <input_object>
```

## help
Use this command to list all the commands you can use.
``` bash
  esy help
```

## version
Use this command to list current version of your esy npm.
``` bash
  esy version
```

<!-- ## Homepage
[github.com/kul-kus/esy#readme](https://github.com/kul-kus/esy#readme)

## Repository
[github.com/kul-kus/esy](https://github.com/kul-kus/esy) -->