const axios = require('axios');
const FormData = require('form-data');


function request(obj, cb) {
    if (typeof obj == "string") {
        return axiosGET(obj, cb)
    } else {
        return axiosRequest(formAPIObj(obj), cb)
    }

}

function formAPIObj(obj) {
    if (obj["qs"]) {
        obj["params"] = obj["qs"]
        delete_key(obj, "qs")
    }
    if (obj["body"]) {
        obj["data"] = obj["body"]
        delete_key(obj, "body")
    }
    if (obj["json"] && typeof obj["json"] === "object") {
        obj["data"] = obj["json"]
    }
    delete_key(obj, "json")
    if (obj["form"]) {
        let formData = new FormData();
        Object.keys(obj["form"]).forEach(key => {
            formData.append(key, obj["form"][key]);
        });
        obj["data"] = formData
        obj["headers"] = {
            ...obj["headers"],
            ...formData.getHeaders()
        },

            delete_key(obj, "form")
    }
    return obj
}
// Define the request.get function
function requestGET(param, cb) {
    if (typeof param == "string") {
        return axiosGET(param, cb)
    } else {
        param["method"] = "GET"
        return axiosRequest(param, cb)
    }
}

function requestPOST(param, cb) {
    if (typeof param == "string") {
        return axiosPOST(param, cb)
    } else {
        param["method"] = "POST"
        return axiosRequest(param, cb)
    }
}
function requestPATCH(param, cb) {
    if (typeof param == "string") {
        return axiosPATCH(param, cb)
    } else {
        param["method"] = "PATCH"
        return axiosRequest(param, cb)
    }
}

function requestPUT(param, cb) {
    if (typeof param == "string") {
        return axiosPUT(param, cb)
    } else {
        param["method"] = "PUT"
        return axiosRequest(param, cb)
    }
}

function requestDELETE(param, cb) {
    if (typeof param == "string") {
        return axiosDELETE(param, cb)
    } else {
        param["method"] = "DELETE"
        return axiosRequest(param, cb)
    }
}

function axiosRequest(obj, cb) {
    try {
        return axios.request(obj)
            .then((response) => {
                return successCallback(response, cb)
            })
            .catch(error => {
                return errorCallback(error, cb)
            });
    } catch (error) {
        return cb(error, null)
    }

}

function axiosGET(param, cb) {
    try {
        return axios.get(param)
            .then((response) => {
                return successCallback(response, cb)
            })
            .catch(error => {
                return errorCallback(error, cb)
            });
    } catch (error) {
        return cb(error, null)
    }
}

function axiosPOST(param, cb) {
    try {
        return axios.post(param)
            .then((response) => {
                return successCallback(response, cb)
            })
            .catch(error => {
                return errorCallback(error, cb)
            });
    } catch (error) {
        return cb(error, null)
    }
}

function axiosPATCH(param, cb) {
    try {
        return axios.patch(param)
            .then((response) => {
                return successCallback(response, cb)
            })
            .catch(error => {
                return errorCallback(error, cb)
            });
    } catch (error) {
        return cb(error, null)
    }
}

function axiosPUT(param, cb) {
    try {
        return axios.put(param)
            .then((response) => {
                return successCallback(response, cb)
            })
            .catch(error => {
                return errorCallback(error, cb)
            });
    } catch (error) {
        return cb(error, null)
    }
}

function axiosDELETE(param, cb) {
    try {
        return axios.delete(param)
            .then((response) => {
                return successCallback(response, cb)
            })
            .catch(error => {
                return errorCallback(error, cb)
            });
    } catch (error) {
        return cb(error, null)
    }
}

function successCallback(response, cb) {
    let statusCode = response.status
    let bdy = response.data
    return cb(null, {
        "statusCode": statusCode,
        "body": bdy
    }, bdy)
}
function errorCallback(error, cb) {
    let statusCode = error && error.status || null
    let bdy = error && error.response && error.response.data || null
    if (!statusCode && !bdy) {
        return cb(error.message || "An error occurred while attempting to invoking the API")
    }
    return cb(null, {
        "statusCode": statusCode,
        "body": bdy
    }, bdy)
}

function delete_key(obj, key) {
    if (obj.hasOwnProperty(key)) {
        delete obj[key]
    }
}
request.get = requestGET;
request.post = requestPOST;
// request.put = requestPUT;
// request.patch = requestPATCH;
// request.delete = requestDELETE;

module.exports = request;