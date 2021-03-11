import fetch from 'utils/fetch';


export function getOperationList(query) {
  return fetch({
    url: '/api/theme/getOperationList',
    method: 'get',
    params: query
  });
}


export function runFactorAnalysis(params) {
  return fetch({
    url: '/api/theme/runFactorAnalysis',
    method: 'post',
    params: params
  });
}

export function getNumFactorList(query) {
  return fetch({
    url: '/api/theme/getNumFactorList',
    method: 'get',
    params: query
  })
}

export function getDistributionList(query) {
  return fetch({
    url: '/api/theme/getDistributionList',
    method: 'get',
    params: query
  })
}

export function purchaseThemes(query) {
  return fetch({
    url: '/api/theme/purchaseThemes',
    method: 'get',
    params: query
  })
}

export function getLoadFactorResult(query) {
  return fetch({
    url: '/api/theme/getLoadFactorResult',
    method: 'get',
    params: query
  })
}

export function getSaveSolutions(query) {
  return fetch({
    url: '/api/theme/getSaveSolutions',
    method: 'get',
    params: query
  })
}

export function getFactorResult(query) {
  return fetch({
    url: '/api/theme/getFactorResult',
    method: 'get',
    params: query
  })
}

export function getFamilyList(query) {
  return fetch({
    url: '/api/theme/getFamilyList',
    method: 'get',
    params: query
  })
}

export function deleteFactorSolution(params) {
  return fetch({
    url: '/api/theme/deleteFactorSolution',
    method: 'delete',
    params: params
  })
}


export function deleteFactorAnalysis(params) {
  return fetch({
    url: '/api/theme/deleteFactorAnalysis',
    method: 'delete',
    params: params
  })
}

export function saveFactorName(params) {
  return fetch({
    url: '/api/theme/saveFactorName',
    method: 'post',
    params: params
  })
}

export function getSavedSolutions(params) {
  return fetch({
    url: '/api/theme/getSavedSolutions',
    method: 'get',
    params: params
  })
}

export function getPurchaseThemes(params) {
  return fetch({
    url: '/api/theme/getPurchaseThemes',
    method: 'get',
    params: params
  })
}


export function getDeptDistribution(params) {
  return fetch({
    url: '/api/theme/getDeptDistribution',
    method: 'get',
    params: params
  })
}


export function getClusterDistribution(params) {
  return fetch({
    url: '/api/theme/getClusterDistribution',
    method: 'get',
    params: params
  })
}