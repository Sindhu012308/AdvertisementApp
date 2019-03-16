(function() {

	"use strict";
  
	angular
	  .module('ngClassifieds')
	  .controller('classifiedsController', function($scope, $mdToast, $mdSidenav, $mdDialog, $state, $stateParams, classifiedsFactory) {
  
		var vm = this;
  
		vm.openSidebar = openSidebar;
		//vm.editClassified = editClassified;
		//vm.deleteClassified = deleteClassified;
		vm.showSearchBar = false;
		vm.showFilters = false;
	
		vm.classifieds = classifiedsFactory.ref;
		vm.classifieds.$loaded().then(function(classifieds){
			vm.categories = getCategories(classifieds);
		});
	/*	classifiedsFactory.getClassifieds().then(function(data) {
		  vm.classifieds = data.data;
		  vm.categories = getCategories(vm.classifieds);
		});*/
		
		// $scope.$on is used in conjunction with either $scope.$broadcast or $scope.$emit. They both are used to send messages between scopes
		//$broadcast is used to send data to child scope
		//$emit is used to emit the data send to parent scope from the child scope.
		//classifieds.new.ctrl.js is child for classifieds.ctr.js
		$scope.$on('newClassified', function(event, classified) {
		  vm.classifieds.$add(classified);
		  showToast('Classified Saved');
		});
  
		$scope.$on('editSaved', function(event, message) {
		  showToast(message);
		});
  
		vm.sidebarTitle;
	
		function openSidebar() {
		  vm.sidebarTitle = 'Add a Classified';
		  $state.go('classifieds.new');
		}

	/*
		function showToast(message) {
		  $mdToast.show(
			$mdToast.simple()
			  .content(message)
			  .position('top, right')
			  .hideDelay(3000)
		  );
		}

		function editClassified(classified) {
		  vm.editing = true;
		  vm.sidebarTitle = 'Edit Classified';
		  vm.classified = classified;
			$state.go('classifieds.edit', { id: classified.$id});
			//$state.go('classifieds.edit', { id: classified.id, classified:classified});
		}
  
		function deleteClassified(event, classified) {
		  var confirm = $mdDialog.confirm()
			  .title('Are you sure you want to delete ' + classified.title + '?')
			  .targetEvent(event)
			  .ok('Yes')
			  .cancel('No');
		  $mdDialog.show(confirm).then(function() {
			console.log(event);
			//var index = vm.classifieds.indexOf(classified);
			//vm.classifieds.splice(index, 1);
			vm.classifieds.$remove(classified);
			showToast('Classified Deleted');
		  }, function() {
			vm.status = classified.title + ' is still here.';
		  });
		}
		*/
  
		function getCategories(classifieds) {
  
		  var categories = [];
  
		  angular.forEach(classifieds, function(ad) {
			angular.forEach(ad.categories, function(category) {
			  categories.push(category);
			});
		  });
  
		  return _.uniq(categories);
		}
		/*
		var data = [
			{
				"id":"1",
				"title":"20 Foot Equipment Trailer",
				"description":"It is wall decorator.Sceneary photo is the one which makes anyone feel happy by seeing it.",
				"price":6000,
				"posted":"2015-10-24",
				"contact": {
					"name":"John Doe",
					"phone":"(555) 555-5555",
					"email":"johndoe@gmail.com"
				},
				"categories":[
					"Vehicles",
					"Parts and Accessories"
				],
				"image": "http://www.appalachiantrailers.com/cms/wp-content/uploads/2014/01/Light-Duty-Equipment-Trailer.png",
				"views":213
			},
			{
				"id":"2",
				"title":"Canada Goose Jacket",
				"description":"Red woman's Canada Goose Montebello jacket. It was used for two seasons. This jacket retails for $745. The jacket has been professionally cleaned since it was last worn by anyone.",
				"price": 500,
				"posted": "2015-10-28",
				"contact": {
					"name": "Jane Doe",
					"phone": "(555) 555-5555",
					"email": "janedoe@gmail.com"
				},
				"categories": [
					"Clothing"
				],
				"image":"http://canadagoose-jacket.weebly.com/uploads/9/2/3/3/9233177/9087323_orig.jpg",
				"views":422
			},
			{
				"id":"3",
				"title":"Baby Crib and Matress",
				"description":"Good condition.",
				"price":50,
				"posted":"2015-10-27",
				"contact": {
					"name":"Jane Doe",
					"phone":"(555) 555-5555",
					"email":"janedoe@gmail.com"
				},
				"categories":[
					"Furniture"
				],
				"image":"http://images.landofnod.com/is/image/LandOfNod/Crib_Anderson_Nat_V1/$web_setitem$/1308310657/andersen-crib-maple.jpg",
				"views":23
			},
			{
				"id":"4",
				"title":"Leather Sofa",
				"description":"Brown leather sofa for sale.  Good condition but small tear on one cushion.",
				"price":250,
				"posted":"2015-11-01",
				"contact": {
					"name":"John Doe",
					"phone":"(555) 555-5555",
					"email":"johndoe@gmail.com"
				},
				"categories":[
					"Furniture"
				],
				"image":"https://images2.roomstogo.com/is/image/roomstogo/lr_sof_14150279_lusso_papaya~Cindy-Crawford-Home-Lusso-Papaya-Leather-Sofa.jpeg?$PDP_Primary_936x650$",
				"views":77
			},
			{
				"id":"5",
				"title":"MacBook Air",
				"description":"2013 MacBook Air. Great condition, but a few scratches.",
				"price":1150,
				"posted":"2015-11-02",
				"contact": {
					"name":"John Doe",
					"phone":"(555) 555-5555",
					"email":"johndoe@gmail.com"
				},
				"categories":[
					"Electronics",
					"Computer Parts and Accessories"
				],
				"image":"http://cdn.macrumors.com/article-new/2014/11/macbook_air_yosemite-800x450.jpg?retina",
				"views":889
			},
			{
				"id":"6",
				"title":"2008 Dodge Caliber",
				"description":"Battery blanket and block heater installed. Winter tires, good tread left are on the car currently. Car comes with 4 summer tires with also good treads left. Hydraulic power steering fluid line installed so this won't break on you in the cold Yellowknife winters! Synthetic oil used, good for 1000+ more KMs. AC/Sunroof/power doors/steering, CD player/radio. Red accented dash and upolstry.",
				"price":4800,
				"posted":"2015-11-03",
				"contact": {
					"name":"John Doe",
					"phone":"(555) 555-5555",
					"email":"johndoe@gmail.com"
				},
				"categories":[
					"Vehicles",
					"Cars"
				],
				"image":"http://images.buysellsearch.com/image/orig/8dfc4f6c5d411130d19dedd28d61bc2b/2009-dodge-caliber-se.jpg",
				"views":423
			}
		]
	var firebase = classifiedsFactory.ref;
	
	angular.forEach(data, function(item){
		firebase.$add(item);
	})*/
	  });
  
  })();

//ng-init="message='Hello, World!'" 