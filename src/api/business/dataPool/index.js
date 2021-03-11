import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/datapool/list',
    method: 'get',
    params: query
  });
}
