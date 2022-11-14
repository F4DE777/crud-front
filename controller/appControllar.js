
myApp.controller('appController', ['$mdEditDialog', '$http', '$q', '$timeout', '$scope', function ($mdEditDialog, $http, $q, $timeout, $scope) {
  
    $scope.options = {
      rowSelection: true,
      multiSelect: true,
      autoSelect: true,
      decapitate: false,
      largeEditDialog: false,
      boundaryLinks: false,
      limitSelect: true,
      pageSelect: true
    };
  
    $scope.selected = [];
    $scope.limitOptions = [5, 10, 15, {
      label: 'All',
      value: function () {
        return $scope.desserts ? $scope.desserts.count : 0;
      }
    }];
  
    $scope.query = {
      order: 'name',
      limit: 5,
      page: 1
    };
  
    // for testing ngRepeat
    $scope.columns = [{
      name: 'Dessert',
      orderBy: 'name',
      unit: '100g serving'
    }, {
      descendFirst: true,
      name: 'Type',
      orderBy: 'type'
    }, {
      name: 'Calories',
      numeric: true,
      orderBy: 'calories.value'
    }, {
      name: 'Fat',
      numeric: true,
      orderBy: 'fat.value',
      unit: 'g'
    },
    {
      name: 'Protein',
      numeric: true,
      orderBy: 'protein.value',
      trim: true,
      unit: 'g'
    },
    {
      name: 'Iron',
      numeric: true,
      orderBy: 'iron.value',
      unit: '%'
    }, {
      name: 'Comments',
      orderBy: 'comment'
    }];
  
    $http.get('data/desserts.json').then(function (desserts) {
      $scope.desserts = desserts.data;
    });
  
    $scope.editComment = function (event, dessert) {
      event.stopPropagation();
  
      var dialog = {
        // messages: {
        //   test: 'I don\'t like tests!'
        // },
        modelValue: dessert.comment,
        placeholder: 'Add a comment',
        save: function (input) {
          dessert.comment = input.$modelValue;
        },
        targetEvent: event,
        title: 'Add a comment',
        validators: {
          'md-maxlength': 30
        }
      };
  
      var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
  
      promise.then(function (ctrl) {
        var input = ctrl.getInput();
  
        input.$viewChangeListeners.push(function () {
          input.$setValidity('test', input.$modelValue !== 'test');
        });
      });
    };
  
    $scope.toggleLimitOptions = function () {
      $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
    };
  
    $scope.getTypes = function () {
      return ['Candy', 'Ice cream', 'Other', 'Pastry'];
    };
  
    $scope.onPaginate = function(page, limit) {
      console.log('Scope Page: ' + $scope.query.page + ' Scope Limit: ' + $scope.query.limit);
      console.log('Page: ' + page + ' Limit: ' + limit);
  
      $scope.promise = $timeout(function () {
  
      }, 2000);
    };
  
    $scope.deselect = function (item) {
      console.log(item.name, 'was deselected');
    };
  
    $scope.log = function (item) {
      console.log(item.name, 'was selected');
    };
  
    $scope.loadStuff = function () {
      $scope.promise = $timeout(function () {
  
      }, 2000);
    };
  
    $scope.onReorder = function(order) {
      $scope.promise = $timeout(function () {
      }, 2000);
    };
  
}]);

