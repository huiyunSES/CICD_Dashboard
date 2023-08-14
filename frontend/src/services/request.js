// for node.js connection

const baseUrl = 'http://localhost:3003/api/v1'; //port has to match with NodeJS_api

export const get = (url) => {
    return fetch(baseUrl + url).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
};

export const post = (url,data) => {
    return fetch(baseUrl + url,{
        method:'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
};
