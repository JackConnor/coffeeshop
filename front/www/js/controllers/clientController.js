angular.module('clientController', ['menuItemsFactory'])

  .controller('clientCtrl', clientCtrl);

  clientCtrl.$inject = ['$http', '$timeout', 'menuItems'];

  function clientCtrl($http, $timeout, menuItems){

    //////////////////////////////////////////////
    ////////All Global Variables//////////////////
    //////////////////////////////////////////////

    var vm = this;
    console.log(vm);
    // vm.chat = Chats.get($stateParams.chatId);
    vm.optionsModal = false;
    vm.moreOptions  = false;
    vm.cartModal    = false;
    vm.totalShots   = 0;
    vm.currentDrink = {}
    vm.currentOrder = [];
    vm.data;////////this is all menuItems

    //////////////////////////////////////////////
    ////////End Global Variables//////////////////
    //////////////////////////////////////////////


    //////////////////////////////////////////////
    ////////All Data Function (i/o)///////////////
    //////////////////////////////////////////////

    ///////function returns all menu items for restaurant
    menuItems()
    .then(function(items){
      vm.data = items.data.data;/////all menu items
    });

    //////////////////////////////////////////////
    ////////End Data Function (i/o)///////////////
    //////////////////////////////////////////////


    //////////////////////////////////////////////
    ////////All Animation Functions///////////////
    //////////////////////////////////////////////

    /////opens the options modal when user selects an item
    function openOptionsModal(currentDrink){
      vm.currentDrink = currentDrink;
      vm.optionsModal = true;
    }
    /////////function to close the options modal
    function closeModal(){
      vm.optionsModal = false;
      vm.moreOptions  = false;
      vm.totalShots   = 0;
    }
    vm.openOptionsModal = openOptionsModal;
    vm.closeModal = closeModal;

    //function to create a translucent layer to block all background clicks
    function addLayer(zIndex, jqEl){
      jqEl.prepend(
        "<div class='clearLayer'></div>"
      );
      $('.clearLayer').css({
        zIndex: zIndex
      });
    }
    function addBlackLayer(zIndex, jqEl, opacity){
      jqEl.prepend(
        "<div class='blackLayer'></div>"
      );
      $('.blackLayer').css({
        zIndex: zIndex
        ,opacity: opacity
      });
    }


    function openMoreOptions(){
      if(!vm.moreOptions){
        vm.moreOptions = true;
      }
      else {
        vm.moreOptions = false;
      }
    }
    vm.openMoreOptions = openMoreOptions;

    function addShot(){
      vm.totalShots++;
    }
    vm.addShot = addShot;

    function subtractShot(){
      vm.totalShots--;
    }
    vm.subtractShot = subtractShot;

    function choseSize(evt){
      $('.sizeSmall').removeClass('selected');
      $('.sizeSmall').css({
        backgroundColor: 'transparent'
      })
      $('.sizeMedium').removeClass('selected');
      $('.sizeMedium').css({
        backgroundColor: 'transparent'
      })
      $('.sizeLarge').removeClass('selected');
      $('.sizeLarge').css({
        backgroundColor: 'transparent'
      })
      if($(evt.currentTarget).hasClass('sizeSmall')){
        if($(evt.currentTarget).hasClass('selected')){
          $(evt.currentTarget).css({
            backgroundColor: 'transparent'
          })
          $(evt.currentTarget).removeClass('selected')
        }
        else {
          console.log('med');
          $(evt.currentTarget).css({
            backgroundColor: '#dddddd'
          })
          $(evt.currentTarget).addClass('selected')
        }
      }
      else if($(evt.currentTarget).hasClass('sizeMedium')){
        if($(evt.currentTarget).hasClass('selected')){
          $(evt.currentTarget).css({
            backgroundColor: 'white'
          })
          $(evt.currentTarget).removeClass('selected')
        }
        else {
          console.log('med');
          $(evt.currentTarget).css({
            backgroundColor: '#dddddd'
          })
          $(evt.currentTarget).addClass('selected')
        }
      }
      else if($(evt.currentTarget).hasClass('sizeLarge')){
        if($(evt.currentTarget).hasClass('selected')){
          $(evt.currentTarget).css({
            backgroundColor: 'white'
          })
          $(evt.currentTarget).removeClass('selected')
        }
        else {
          console.log('med');
          $(evt.currentTarget).css({
            backgroundColor: '#dddddd'
          })
          $(evt.currentTarget).addClass('selected')
        }
      }
    }
    vm.choseSize = choseSize;

    vm.removeItem = function(something, index) {
        console.log(something)
        console.log("this is the index", index)
        vm.currentOrder.splice(index, 1)
        console.log(vm.currentOrder)
    }

    function submitDrinkOptions() {
      var drinkDetails = {size: '', flavours: '', toppings: '', shots: 0}
      var sizeEl = $('.selected');
      if(sizeEl.hasClass('sizeSmall')){
        drinkDetails.size = 'small';
      }
      else if(sizeEl.hasClass('sizeMedium')){
        drinkDetails.size = 'medium';
      }
      else if(sizeEl.hasClass('sizeLarge')){
        drinkDetails.size = 'large';
      } else {
          console.log("no size selected")
      }

      drinkDetails.flavours = $('.flavourDropdown').val();
      drinkDetails.toppings = $('.toppingDropdown').val();
      drinkDetails.shots = vm.totalShots;
      drinkDetails.photo = vm.currentDrink.photourl;
      drinkDetails.price = vm.currentDrink.price;
      drinkDetails.title = vm.currentDrink.name;
      drinkDetails.itemId = vm.currentDrink._id
      console.log(drinkDetails);
      ///////put all settings back to zero
      vm.optionsModal = false;
      vm.moreOptions  = false;
      vm.totalShots   = 0;
      vm.currentOrder.push(drinkDetails)
    }
    vm.submitDrinkOptions = submitDrinkOptions;

    //////functions to open/close shopping carts/////
    function openCart(){
      console.log('ipeing');
      $('.drinkRepeatContainer').animate({
        opacity: 0.0
      }, 350);
      setTimeout(function(){
        $('.cartHolder i').animate({
          fontSize: 60+"px"
          ,paddingTop: 0+'px'
          ,paddingRight: 5+'px'
          ,color: 'black'
        }, 850);
        $('.cartModalHolder').animate({
          width: 90+"%"
          ,marginLeft: 0+'%'
          ,marginTop: 30+'px'
          ,paddingTop: 10+'px'
          ,height: 450+"px"
          ,marginRight: 5+"%"
        }, 850);
      }, 250);
      setTimeout(function(){
        $('.cartModalHolder').prepend(
          "<div class='cartTitle'>Your Order</div>"
        );
        $(".cartTitle").animate({
          opacity: 1
        }, 350);
        $('.cartModalHolder').animate({
          borderWidth: 5
        }, 350);
      }, 1250);
      $timeout(function(){
        vm.cartModal = true;
        console.log('wot?');
        addLayer(28, $('.drinkRepeatContainer'));
        // addBlackLayer(29, $('.navContainer'), .1);
      }, 1500);
    }
    vm.openCart = openCart;

    ///////function to close the shopping cart
    function closeCart(){
      console.log('clising');
      $('.cartModalHolder').animate({
        borderWidth: 0
      }, 200);
      setTimeout(function(){
        $('.cartHolder i').animate({
          fontSize: 30+"px"
          ,paddingTop: 0+'px'
          ,paddingRight: 0+'px'
        }, 450);
        $('.cartModalHolder').animate({
          width: "auto"
          ,marginLeft: 0+'%'
          ,marginTop: 0+'px'
          ,paddingTop: 25+'px'
          ,height: 100+"%"
          ,marginRight: 0+"%"
        }, 450);
      }, 400);
      $('.clearLayer').remove();
      $('.blackLayer').remove();
      $('.cartTitle').remove();
      setTimeout(function(){
        $('.drinkRepeatContainer').animate({
          opacity: 1
        }, 350);
      }, 850);
      vm.cartModal = false
    }
    vm.closeCart = closeCart;

    // function checkout(order){
    //     $rootScope.currentOrder = vm.currentOrder
    //     $location.path('tab/payment');
    // }
    // vm.checkout = checkout;
    // vm.socket = io.connect('http://192.168.0.7:3000/api')
    // vm.socket.on('test', function(data){
    //   console.log('it works', data);
    // });

  /////////////////////////////
  ///////end Client Ctrl///////
  /////////////////////////////
  }
