var jobService = angular.module('jobService', ['ngResource']);

jobService.factory('jobService', ['$resource',
  function($resource){
    //return $resource( base_url + '/queue', {id:'@eId'}, {
    return $resource( base_url + '/queue', {}, {
      post: { method: 'POST', params:{ format:'json' }, headers:{ 'Content-Type':'application/json' } }
    });
  }]);
