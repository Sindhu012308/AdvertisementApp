(function() {

    "use strict";
  
    angular
      .module('ngClassifieds')
      .controller('editClassifiedsController', function($state, $scope, $mdSidenav, $mdDialog, $timeout, classifiedsFactory) {
  
        var vm = this;
        // getting reference to firebase 
        vm.classifieds = classifiedsFactory.ref;
        vm.closeSidebar = closeSidebar;
        vm.saveEdit = saveEdit;
  
        vm.sidebarTitle = 'Edit Classifed';
        // Take the Id and get the record of data object with that Id
        vm.classified = vm.classifieds.$getRecord($state.params.id);

  
        $timeout(function() {
          $mdSidenav('left').open();    
        });
  
        $scope.$watch('sidenavOpen', function(sidenavOpen) {
          if(sidenavOpen === false) {
            $mdSidenav('left')
              .close()
              .then(function() {
                $state.go('classifieds');
            });
          }
        });
  
        // Case 1 - close the sidenav and change state manually
        // function closeSidebar = function() {
        //   vm.classified = {};
        //   $mdSidenav('left')
        //     .close()
        //     .then(function() {
        //       $state.go('classifieds');
        //   });      
        // }
  
        // Case 2 - simply use the watcher to move state
        function closeSidebar() {
          vm.classified = {};
          $scope.sidenavOpen = false;        
        }
  
        function saveEdit() {
            //save the classified coming through the id which is edited and then close the sidenav and display the message "edit saved" using showToast
            vm.classifieds.$save(vm.classified).then(function(){
          // Need to clear the form after, or else it will be populated when we go to add new classifieds
          $scope.sidenavOpen = false;
          // showToast('Edit Saved');
          $scope.$emit('editSaved', 'Edit Saved');
        });
        }
  
  
      });
  
  })();