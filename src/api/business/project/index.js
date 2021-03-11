import fetch from 'utils/fetch';


export function addObj(obj) {
  return fetch({
    url: '/api/project',
    method: 'post',
    params: obj
  });
}

export function delObj(obj) {
  return fetch({
    url: '/api/project/deleteProject',
    method: 'delete',
    params: obj
  });
}

export function page(query) {
  return fetch({
    url: '/api/project/list',
    method: 'get',
    params: query
  });
}


export function getObj(obj) {
  return fetch({
    url: '/api/project/detail',
    method: 'get',
    params:obj
  })
}


export function getDeptList(query) {
  return fetch({
    url: '/api/project/getDeptList',
    method: 'get',
    params: query
  });
}


export function getGoodsList(query) {
  return fetch({
    url: '/api/project/getGoodsList',
    method: 'get',
    params: query
  });
}
