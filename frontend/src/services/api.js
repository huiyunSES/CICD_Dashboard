import { get,post } from "./request";

const normalizeParams = (params) => {
  let dataStr = "";

  Object.keys(params).forEach((key) => {
    if (params[key] !== "" && params[key] !== "All") {
      dataStr += key + "=" + params[key] + "&";
    }
  });
  if (dataStr !== "") {
    dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
  }
  return dataStr;
};

const queryIssue = async (params) => {
  let url = `/issue/`;
  const dataStr = normalizeParams(params);
  url = url + "?" + dataStr;
  return await get(url);
};

const queryDeployment = async (params) => {
  let url = `/deployment/`;
  const dataStr = normalizeParams(params);
  url = url + "?" + dataStr;
  return await get(url);
};

const queryRepository = async (params) => {
  let url = `/repository/`;
  const dataStr = normalizeParams(params);
  url = url + "?" + dataStr;
  return await get(url);
};

const queryPullRequest = async (params) => {
  let url = `/pull-request/`;
  const dataStr = normalizeParams(params);
  url = url + "?" + dataStr;
  return await get(url);
};

const queryConverage = async (params) => {
  let url = `/coverage-rate/`;
  const dataStr = normalizeParams(params);
  url = url + "?" + dataStr;
  return await get(url);
};

const queryProjectLead = async (params) => {
  let url = `/project-lead/`;
  const dataStr = normalizeParams(params);
  url = url + "?" + dataStr;
  return await get(url);
};

const queryDeveloper = async (params) => {
  let url = `/developer/`;
  const dataStr = normalizeParams(params);
  url = url + "?" + dataStr;
  return await get(url);
};

const queryAdmin = async (params) => {
  let url = `/admin/`;
  const dataStr = normalizeParams(params);
  url = url + "?" + dataStr;
  return await get(url);
};

const queryRepoList = async () => {
  return await get(`/get-repo-list/`);
};

const saveAdmin = async (data) => {
  return await post(`/save-portfolio/`, data);
};

export {
  queryIssue,
  queryDeployment,
  queryRepository,
  queryPullRequest,
  queryConverage,
  queryProjectLead,
  queryDeveloper,
  queryAdmin,
  queryRepoList,
  saveAdmin,
};

