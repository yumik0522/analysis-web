import fetch from 'utils/fetch';



export function getHierList(query) {
  return fetch({
    url: '/api/family/getHierList',
    method: 'get',
    params: query
  });
}

export function getDigitalList(query) {
  return fetch({
    url: '/api/family/getDigitalList',
    method: 'get',
    params: query
  })
}

export function getRecommList(query) {
  return fetch({
    url: '/api/family/getRecommList',
    method: 'get',
    params: query
  })
}

export function getRecommSaleList(query) {
  return fetch({
    url: '/api/family/getRecommSaleList',
    method: 'get',
    params: query
  })
}

export function getSkuList(query) {
  return fetch({
    url: '/api/family/getSkuList',
    method: 'get',
    params: query
  })
}

export function runClusterAll(params) {
  return fetch({
    url: '/api/family/runClusterAll',
    method: 'post',
    params: params
  })
}


export function runCluster(params) {
  return fetch({
    url: '/api/family/runCluster',
    method: 'post',
    params: params
  })
}

export function getTop20List(query) {
  return fetch({
    url: '/api/family/getTop20List',
    method: 'get',
    params: query
  })
}

export function getDistributionList(query) {
  return fetch({
    url: '/api/family/getDistributionList',
    method: 'get',
    params: query
  })
}


export function getSolutionsList(query) {
  return fetch({
    url: '/api/family/getSolutionsList',
    method: 'get',
    params: query
  })
}


export function updateGroupName(params) {
  return fetch({
    url: '/api/family/updateGroupName',
    method: 'put',
    params: params
  })
}


export function deleteSolution(params) {
  return fetch({
    url: '/api/family/deleteSolution',
    method: 'delete',
    params: params
  })
}

export function saveClusterSolution(params) {
  return fetch({
    url: '/api/family/saveClusterSolution',
    method: 'post',
    params: params
  })
}

