angular.module('vendorController', ['allOrdersFactory', 'processItemFactory', 'allMenuitemsFactory'])

  .controller('vendorCtrl', vendorCtrl);

  vendorCtrl.$inject = ['$http', 'allOrders', 'processItem', 'allMenuitems'];

  function vendorCtrl($http, allOrders, processItem, allMenuitems){
    ///////////////////////////////
    ////////global variables///////
    var vm = this;
    vm.allItems = [];
    vm.slideHappening = false;
    ////end global variables///////
    ///////////////////////////////

    /////////////////////////////////
    ///////data calls anf functions//
    allMenuitems()
    .then(function(data){
      console.log('firing');
      vm.allItems = data.data.data.reverse();
    })

    vm.orderList = ['hi'];
    vm.socket = io.connect('http://192.168.0.3:3000/');
    /////socket function which receives socket orders
    vm.socket.on('orderForVendor', function(data){
      // vm.allItems[vm.allItems.length] = 'test'
      var menuLength = data.order.data.menuitems.length;
      // vm.allItems.push(data.order);
      for (var i = 0; i < menuLength; i++) {
        if(data.order.data.menuitems[i] !== null){
          var newMenuItem = data.order.data.menuitems[i];
          addOrder(newMenuItem, newMenuItem.name);
        }
      }
    });

    function markAsDone(evt, itemId, status){
      console.log('yo');
      processItem(itemId, status)
      .then(function(updatedItem){
        console.log(updatedItem);
        console.log($(evt.currentTarget).parent());
        var parentEl = $(evt.currentTarget).parent();
        var sibRight = parentEl.find('.orderCellRight');
        var sibLeft  = parentEl.find('.orderCellLeft');
        console.log(sibRight);
        console.log(sibLeft);
        sibRight.animate({
          height: '0px'
          ,marginTop: '0px'
        }, 300);
        sibLeft.animate({
          height: '0px'
        }, 300);
        parentEl.animate({
          height: '0px'
        }, 300);
        setTimeout(function(){
          sibRight.remove();
          sibLeft.remove();
          parentEl.remove();
        }, 300);
      })
    }
    vm.markAsDone = markAsDone;

    ///////end data calls anf functions//
    /////////////////////////////////////

    //////animations
    function addOrder(menuItems, customerName){
      console.log(menuItems);
      var name = customerName
      /////these are the items, as pulled from db
      var rawItems = menuItems;
      /////these are the speicifcations for the items
      var ordLength = menuItems.length;
      console.log(ordLength);
      for (var i = 0; i < ordLength; i++) {
        console.log(vm.allItems);
        vm.allItems.reverse();
        vm.allItems.push({name: customerName, item: menuItems[i]});
        vm.allItems.reverse();
      }
    }

    function goToClientView(){
      window.location.hash = "#/tab/dash"
    }
    vm.goToClientView = goToClientView;

    ///animations
    function cellSwipeLeft(evt){
      var target = $(evt.currentTarget);
      var rightSib = $(target).next();
      var leftSib = $(target).siblings();
      if(!vm.slideHappening){
        if (target.hasClass('center')){
          vm.slideHappening = true;
          target.animate({
            width: '70%'
          }, 180);
          rightSib.animate({
            opacity: 1
            ,width: '30%'
            ,marginLeft: '70%'
          }, 180);
          setTimeout(function(){
            vm.slideHappening = false;
          }, 180);
          target.addClass('left');
          target.removeClass('center');
        }
        else if(target.hasClass('left')){
          return;
        }
        else if(target.hasClass('right')){
          vm.slideHappening = true;
          target.animate({
            width: '100%'
            ,marginLeft: '-2px'
            ,backgroundColor: 'translucent'
          }, 180);
          leftSib.animate({
            opacity: 0
            ,width: '0%'
          }, 180);
          setTimeout(function(){
            vm.slideHappening = false;
          }, 180);
          target.addClass('center');
          target.removeClass('right');
        }
        else {
          return;
        }
      }
      else {
        console.log('slide is happpppppening');
      }
    }
    vm.cellSwipeLeft = cellSwipeLeft;

    function cellSwipeRight(evt){
      var target = $(evt.currentTarget);
      var rightSib = $(target).next();
      var leftSib = $(target).siblings();
      console.log(leftSib);
      if(!vm.slideHappening){
        if (target.hasClass('center')){
          vm.slideHappening = true;
          target.animate({
            width: '70%'
            ,marginLeft: '30%'
          }, 180);
          leftSib.animate({
            opacity: 1
            ,width: '30%'
          }, 180);
          setTimeout(function(){
            vm.slideHappening = false;
          }, 180);
          target.addClass('right');
          target.removeClass('center');
        }
        else if(target.hasClass('left')){
          console.log('left to right');
          vm.slideHappening = true;
          target.animate({
            width: '100%'
            ,backgroundColor: 'translucent'
          }, 180);
          rightSib.animate({
            opacity: 0
            ,width: '0%'
            ,marginLeft: '100%'
          }, 180);
          setTimeout(function(){
            vm.slideHappening = false;
          }, 180);
          target.addClass('center');
          target.removeClass('left');
        }
        else if(target.hasClass('right')){
          return;
        }
      }
      else {
        console.log('slide is happpppppening');
      }
    }
    vm.cellSwipeRight = cellSwipeRight;

  //////////////////////////////////
  ////////end vendor controller/////  //////////////////////////////////
  }
