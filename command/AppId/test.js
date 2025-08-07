

var comm = require("./common")
var path = require('path')

// console.log("🚀 ~ connectorDataDirectory:", connectorDataDirectory)


var apps = [
    {
        "title": "Philips Hue",
        "triggers": [],
        "actions": [
            "/v2/create_user",
            "/v2/set_light_state"
        ],
        "global": true,
        "published": true,
        "owner": "wmio-connectors-accounts@softwareag.com",
        "uid": "531909b5-5d69-4d76-8065-2d29edd89a4c",
        "guid": "c5f1db57-f963-48c3-b026-246997a0bef9"
    },
    {
        "owner": "wmio-connectors-accounts@softwareag.com",
        "uid": "6fede8e4-63b7-4672-a911-c368a3940ca7",
        "guid": "0c47e412-2f6d-439e-bdd8-7a7d0280cf8d",
        "title": "Microsoft SharePoint Online Triggers",
        "triggers": [
            "/v5/new_folder",
            "/v5/new_file",
            "/v5/folder_updated",
            "/v5/file_updated",
            "/v5/folder_deleted",
            "/v5/file_deleted"
        ],
        "actions": [],
        "global": true,
        "published": true
    },
    {
        "global": true,
        "published": true,
        "owner": "wmio-connectors-accounts@softwareag.com",
        "uid": "2ab89e47-b7ad-4435-9c17-b427d8df4f59",
        "guid": "ecca8bc4-dbbf-4e84-9ee6-e9a8459533d7",
        "title": "Abstract Holidays",
        "triggers": [],
        "actions": [
            "/v1/holidays"
        ]
    }]




let data = searchObject(apps, 'guid', "true");
console.log("🚀 ~ data:", data)
