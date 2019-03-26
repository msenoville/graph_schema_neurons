var jobService = angular.module('jobService', ['ngResource']);

var base_url = "https://nmpi-staging.hbpneuromorphic.eu/api/v2";

jobService.factory('jobService', ['$resource',
  function($resource){
    //return $resource( base_url + '/queue', {id:'@eId'}, {
    return $resource( base_url + '/queue', {}, {
      post: { method: 'POST', params:{ format:'json' }, headers:{ 'Content-Type':'application/json' } }
    });
  }]);
