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
    vm.optionsModal    = false;
    vm.moreOptions     = false;
    vm.cartModal       = false;
    vm.totalShots      = 0;
    vm.currentDrink    = {}
    vm.currentOrder    = [];
    vm.optionsArray    = false;
    vm.orderTotalPrice = 0;
    vm.openCart;
    vm.data;////////this is all menuItems
    vm.totalShots;

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
    function openOptionsModal(currentDrink, index, evt){
      var index = index;
      /////closure function to transition to options modal
      function openUp(){
        var clonedEl = $(evt.currentTarget).clone();
        clonedEl.find('.sizeCell').on('click', choseSize);
        clonedEl.find('.openMore').on('click', function(){
          openMoreOptions(clonedEl);
        });
        clonedEl.find('.closeOptions').on('click', closeModal);
        clonedEl.addClass('optionOpen');
        clonedEl.removeClass('optionClosed');
        var removeCircle = clonedEl.find('.fa-plus-circle');
        removeCircle.remove();
        var elOffset   = $(evt.currentTarget).offset().top;
        var drinkListTop = $('.drinkListContainer').offset().top;
        var distance   = elOffset - drinkListTop;
        clonedEl.css({
          marginTop: distance
          ,borderBottom: "2px solid black"
          ,borderWidth: 1
        });
        $('.optionClosed').animate({
          opacity: 0
        }, 300);
        setTimeout(function(){
          $('.drinkListContainer').prepend(clonedEl[0]);
        }, 100);
        setTimeout(function(){
          clonedEl.animate({
            height: '325px'
            ,width: '90%'
            ,marginTop: '10px'
            ,marginLeft: '5%'
            ,borderWidth: 5
            ,borderBottomWidth: 5
          }, 500);
          clonedEl.find('.drinkPhotoHolder').animate({
            width: '75px'
            ,height: '75px'
            ,marginTop: '20px'
            ,marginLeft: '30px'
          }, 500);
          clonedEl.find('.drinkIn').animate({
            fontSize: '28px'
            ,paddingLeft: '20px'
            ,width: '50%'
            ,marginTop: '20px'
          }, 500);
        }, 500);
        setTimeout(function(){
          clonedEl.prepend(
            "<div class='col-xs-4 closeOptions'>"+
              "<p class='fa fa-times'></p>"+
            "</div>"
          );
          clonedEl.find('.closeOptions').on('click', closeModal);
          clonedEl.find('.optionsPart').animate({
            height: '200px'
            ,opacity: 1
            ,zIndex: 500
          }, 500);
        }, 700);
      }
      openUp();
      vm.currentDrink = currentDrink;
    }
    /////////function to close the options modal
    function closeModal(){
      $('.optionOpen').remove();
      $('.optionClosed').animate({
        opacity: 1
      }, 500);
      $('.optionsPart').animate({
        opacity: 0
        ,height: 0
      }, 500);
    }
    vm.openOptionsModal = openOptionsModal;
    // vm.closeModal = closeModal;

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

    function openMoreOptions(parentEl){
      console.log(parentEl);
      if(vm.moreOptions === false){
        console.log('yoooooooo');
        parentEl.animate({
          height: '475px'
        }, 300);
        parentEl.find('.moreOptionsContainer').animate({
          height: '150px'
        }, 300);
        setTimeout(function(){
          parentEl.find('.moreOptionsContainer').animate({
            opacity: 1
          }, 500);
          parentEl.find('.moreDrinkOps').text('Close Drink Options');
        }, 200);
        vm.moreOptions = true;
      }
      //////the ext part actuall closes it
      else {
        parentEl.animate({
          height: '325px'
        }, 300);
        parentEl.find('.moreOptionsContainer').animate({
          height: '0px'
          ,opacity: 0
        }, 300);
        parentEl.find('.moreDrinkOps').text('Close Drink Options');
        vm.moreOptions = false;
      }
    }
    // vm.openMoreOptions = openMoreOptions;

    function addShot(){
      vm.totalShots++;
    }
    vm.addShot = addShot;

    function subtractShot(){
      vm.totalShots--;
    }
    vm.subtractShot = subtractShot;

    var elSize;
    var elem;
    function choseSize(evt){
      if($(evt.target).hasClass('sizeSmall')){
        var elSize = 'small';
        var elem = $(evt.target);
        $('.sizeMedium').removeClass('selected');
        $('.sizeMedium').css({
          backgroundColor: 'transparent'
        })
        $('.sizeLarge').removeClass('selected');
        $('.sizeLarge').css({
          backgroundColor: 'transparent'
        });
      }
      else if($(evt.target).parent().hasClass('sizeSmall')){
        var elSize = 'small';
        var elem = $(evt.target).parent();
        $('.sizeMedium').removeClass('selected');
        $('.sizeMedium').css({
          backgroundColor: 'transparent'
        })
        $('.sizeLarge').removeClass('selected');
        $('.sizeLarge').css({
          backgroundColor: 'transparent'
        });
      }
      else if($(evt.target).hasClass('sizeMedium')){
        var elSize = 'medium';
        var elem = $(evt.target);
        $('.sizeSmall').removeClass('selected');
        $('.sizeSmall').css({
          backgroundColor: 'transparent'
        })
        $('.sizeLarge').removeClass('selected');
        $('.sizeLarge').css({
          backgroundColor: 'transparent'
        });
      }
      else if($(evt.target).parent().hasClass('sizeMedium')){
        var elSize = 'medium';
        var elem = $(evt.target).parent();
        $('.sizeSmall').removeClass('selected');
        $('.sizeSmall').css({
          backgroundColor: 'transparent'
        });
        $('.sizeLarge').removeClass('selected');
        $('.sizeLarge').css({
          backgroundColor: 'transparent'
        });
      }
      else if($(evt.target).hasClass('sizeLarge')){
        var elSize = 'large';
        var elem = $(evt.target);
        $('.sizeSmall').removeClass('selected');
        $('.sizeSmall').css({
          backgroundColor: 'transparent'
        });
        $('.sizeMedium').removeClass('selected');
        $('.sizeMedium').css({
          backgroundColor: 'transparent'
        });
      }
      else if($(evt.target).parent().hasClass('sizeLarge')){
        var elSize = 'large';
        var elem = $(evt.target).parent();
        $('.sizeSmall').removeClass('selected');
        $('.sizeSmall').css({
          backgroundColor: 'transparent'
        })
        $('.sizeMedium').removeClass('selected');
        $('.sizeMedium').css({
          backgroundColor: 'transparent'
        })
      }
      if(elSize === 'small'){
        if(elem.hasClass('selected')){
          elem.css({
            backgroundColor: 'transparent'
          })
          elem.removeClass('selected')
        }
        else {
          elem.css({
            backgroundColor: '#dddddd'
          })
          elem.addClass('selected')
        }
      }
      else if(elSize === 'medium'){
        if(elem.hasClass('selected')){
          elem.css({
            backgroundColor: 'white'
          })
          elem.removeClass('selected')
        }
        else {
          elem.css({
            backgroundColor: '#dddddd'
          })
          elem.addClass('selected')
        }
      }
      else if(elSize === 'large'){
        if(elem.hasClass('selected')){
          elem.css({
            backgroundColor: 'white'
          })
          elem.removeClass('selected')
        }
        else {
          elem.css({
            backgroundColor: '#dddddd'
          })
          elem.addClass('selected')
        }
      }
    }
    // vm.choseSize = choseSize;

    vm.removeItem = function(something, index) {
        console.log(something)
        console.log("this is the index", index);
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
      vm.currentOrder.push(drinkDetails);
      vm.orderTotalPrice += drinkDetails.price;
      console.log(vm.currentOrder);
    }
    vm.submitDrinkOptions = submitDrinkOptions;

    //////functions to open/close shopping carts/////
    function openCart(evt){
      closeModal();
      $('.drinkRepeatContainer').animate({
        opacity: 0.0
      }, 350);
      setTimeout(function(){
        $('.cartHolder i').animate({
          fontSize: 60+"px"
          ,paddingTop: 0+'px'
          ,paddingRight: 5+'px'
          ,color: 'black'
        }, 450);
        $('.cartModalHolder').animate({
          width: 90+"%"
          ,marginLeft: 0+'%'
          ,marginTop: 30+'px'
          ,paddingTop: 10+'px'
          ,height: 450+"px"
          ,marginRight: 5+"%"
        }, 450);
      }, 100);
      setTimeout(function(){
        $('.cartModalHolder').prepend(
          "<div class='cartTitle'>Your Order</div>"
        );
        $('.cartModalHolder').animate({
          borderWidth: 5
        }, 200);
      }, 250);
      setTimeout(function(){
        $(".cartTitle").animate({
          opacity: 1
        }, 300);
      }, 700);
      $timeout(function(){
        vm.cartModal = true;
        console.log('wot?');
        addLayer(28, $('.drinkRepeatContainer'));
        // addBlackLayer(29, $('.navContainer'), .1);
      }, 700);
    }
    vm.openCart = function(){
      if(!vm.cartModal){
        openCart();
      }
    };

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
        }, 250);
        $('.cartModalHolder').animate({
          width: "auto"
          ,marginLeft: 0+'%'
          ,marginTop: 0+'px'
          ,paddingTop: 25+'px'
          ,height: "115%"
          ,marginRight: 0+"%"
        }, 250);
      }, 201);
      $('.clearLayer').remove();
      $('.blackLayer').remove();
      $('.cartTitle').remove();
      setTimeout(function(){
        $('.drinkRepeatContainer').animate({
          opacity: 1
        }, 350);
      }, 350);
      $timeout(function(){
        vm.cartModal = false
      }, 100);
    }
    vm.closeCart = closeCart;

    // function checkout(order){
    //     $rootScope.currentOrder = vm.currentOrder
    //     $location.path('tab/payment');
    // }
    // vm.checkout = checkout;
    // vm.socket = io.connect('http://192.168.0.3:3000/api')
    // vm.socket.on('test', function(data){
    //   console.log('it works', data);
    // });

  /////////////////////////////
  ///////end Client Ctrl///////
  /////////////////////////////
  }
