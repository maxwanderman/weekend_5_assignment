var app = angular.module('toDoApp', []);

app.controller('ListController', ['$http', function($http){
  var vm = this;
  vm.listItem = '';
  vm.listItems = [];


  vm.getItem = function (){
    $http.get('/list').then(function(response){
      vm.listItems = response.data;
    });
  };

  vm.postPeople = function () {
    console.log(vm.listItem);
  $http.post('/list', {task: vm.listItem, completed: false }).then(function(response) {
    console.log(response);
    vm.listItem = '';
    vm.getItem();
  });
};

vm.completeTask = function (singleTask) {
  console.log('click works');
  $http.put('/list', singleTask).then(function(response){
    console.log(response);
    vm.getItem();
  });
};

vm.delete = function (singleTask) {
  console.log('click works', singleTask);
  $http.delete('/list/' + singleTask.id).then(function(response){
    console.log(response);
    vm.getItem();
  });
};

vm.getItem();

}]);
