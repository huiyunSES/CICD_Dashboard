import { get } from './request';

const queryIssue = async (params) => {
    let url = `/issue/`;
    if (params.product_team) {
        url = url + `?product_team=${params.product_team}`;
    }
    return await get(url);
}

const queryDeployment = async (params) => {
    let url = `/deployment/`;
    if (params.product_team) {
        url = url + `?product_team=${params.product_team}`;
    }
    return await get(url);
}

const queryRepository = async (params) => {
    let url = `/repository/`;
    if (params.product_team) {
        url = url + `?product_team=${params.product_team}`;
    }
    return await get(url);
}

const queryPullRequest = async (params) => {
    let url = `/pull-request/`;
    if (params.product_team) {
        url = url + `?product_team=${params.product_team}`;
    }
    return await get(url);
}

const queryConverage = async (params) => {
    let url = `/coverage-rate/`;
    if (params.product_team) {
        url = url + `?product_team=${params.product_team}`;
    }
    return await get(url);
}

const queryProjectLead = async (params) => {
    let url = `/project-lead/`;
    let dataStr = ''; 

    Object.keys(params).forEach(key => {
        if (params[key] !== '' && params[key] !== 'All') {
            dataStr += key + '=' + params[key] + '&';
        }
    })
    if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
    }
    return await get(url);
}

const queryDeveloper = async (params) => {
    let url = `/developer/`;
    let dataStr = ''; 

    Object.keys(params).forEach(key => {
        if (params[key] !== '' && params[key] !== 'All') {
            dataStr += key + '=' + params[key] + '&';
        }
    })
    if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
    }
    return await get(url);
}


export {
    queryIssue,
    queryDeployment,
    queryRepository,
    queryPullRequest,
    queryConverage,
    queryProjectLead,
    queryDeveloper
}
