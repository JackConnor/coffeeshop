angular.module('clientController', ['menuItemsFactory', 'braintreeTokenFactory', 'braintreeProcessFactory', 'singleOrderFactory'])

  .controller('clientCtrl', clientCtrl);

  clientCtrl.$inject = ['$http', '$timeout', 'menuItems', '$rootScope', 'braintreeToken', 'braintreeProcess', '$location', '$ionicScrollDelegate', 'singleOrder'];

  function clientCtrl($http, $timeout, menuItems, $rootScope, braintreeToken, braintreeProcess, $location, $ionicScrollDelegate, singleOrder){
    //////////////////////////////////////////////
    ////////All Global Variables//////////////////
    //////////////////////////////////////////////
    var vm = this;
    vm.optionsModal      = false;
    vm.moreOptions       = false;
    vm.cartModal         = false;
    vm.optionsArray      = false;
    vm.checkoutOpen      = false;
    vm.postCartOpen      = false;
    vm.hasHistory        = false;
    vm.signinModalClient = true;
    vm.totalItems        = 0;
    vm.totalShots        = 0;
    vm.currentDrink      = {}
    vm.currentOrder      = [];
    vm.orderTotalPrice   = 0;
    vm.lastScrollPosition;
    vm.ogPrice;
    vm.openCart;
    vm.data;////////this is all menuItems
    vm.totalShots;
    var elSize;
    var elem;

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
      var dataLength = vm.data.length;
      vm.hotDrinks  = [];
      vm.coldDrinks = []
      for (var i = 0; i < dataLength; i++) {
        if(vm.data[i].category === 'hot drink'){
          vm.hotDrinks.push(vm.data[i]);
        }
        else if(vm.data[i].category === 'cold drink'){
          vm.coldDrinks.push(vm.data[i]);
        }
      }
    })
    .catch( function( err ) {
      console.log( 'Error', err )
    } );

    ////function to get the data from last order
    function getLastOrder(){
      var lastOrderStr = window.localStorage.lastOrder;
      var lastOrderArr = lastOrderStr.split('-&-');
      console.log(lastOrderArr);
      var lastOrderItem = lastOrderArr.slice(0, [lastOrderArr.length-2]);
      var allOrderedItems = [];
      for (var i = 0; i < lastOrderArr.length; i++) {
        if(lastOrderArr[i] !== null && lastOrderArr[i] !== ''){
          singleOrder(lastOrderArr[i])
          .then(function(lastOrderDetails){
            var arr = allOrderedItems.concat(lastOrderDetails.data.data.menuitems)
            allOrderedItems = arr;
            vm.lastOrder = arr;
            console.log(vm.lastOrder);
          })
        }
      }

    }
    getLastOrder();

    //////////////////////////////////////////////
    ////////End Data Function (i/o)///////////////
    //////////////////////////////////////////////


    //////////////////////////////////////////////
    ////////All Animation Functions///////////////
    //////////////////////////////////////////////

    /////splash intro function
    function unloadIntro(){
      console.log('osdafjlkasjflksaj');
      setTimeout(function(){
        $('.splashIntro').animate({
          opacity: 0
        }, 800);
      }, 1500);
      setTimeout(function(){
        $('.splashIntro').remove();
      }, 2300);
    }
    unloadIntro();

    ///function to control number in the cart
    function cartNumberAdd(){
      vm.totalItems += 1;
    }

    function cartNumberMinus(){
      vm.totalItems -= 1;
    }

    /////opens the options modal when user selects an item
    function openOptionsModal(currentDrink, index, evt){
      console.log(evt.target);
      vm.ogPrice = currentDrink.price;
      vm.currentOpenModal = $(evt.currentTarget)[0].classList[2];
      console.log(vm.currentOpenModal);
      var shotPrice = currentDrink.customFields.espressoShots.addedPrice;
      vm.currentDrink = currentDrink
      var index = index;
      var clonedEl = $(evt.currentTarget).clone();
      clonedEl.find('.drinkIn-price').addClass('activePrice');
      clonedEl.find('.sizeCell').on('click', choseSize);
      clonedEl.find('.openMore').on('click', function(){
        openMoreOptions(clonedEl);
      });
      clonedEl.find('.nextArrow').animate({
        opacity: 0
      }, 250);
      if(typeof evt.currentTarget !== 'string'){
        clonedEl.find('.submitItem')[0].id = $(evt.currentTarget)[0].classList[2];
        var elOffset   = $(evt.currentTarget).offset().top;
        var drinkListTop = $('.drinkListContainer').offset().top;
        var distance   = elOffset - drinkListTop;
      }
      else {
        var distance = $('.drinkListContainer').offset().top;
      }
      clonedEl.find('.closeOptions').on('click', closeModal);
      clonedEl.find('.espressoMath-less').on('click', function(){
        subtractShot(shotPrice);
      });
      clonedEl.find('.espressoMath-more').on('click', function(){
        addShot(shotPrice);
      });
      clonedEl.find('.submitItem').on('click', submitDrinkOptions);
      clonedEl.addClass('optionOpen');
      clonedEl.removeClass('optionClosed');
      var removeCircle = clonedEl.find('.fa-plus-circle');
      removeCircle.remove();
      clonedEl.css({
        marginTop: distance
        ,borderBottom: "0px solid #D4D4D4"
        ,borderWidth: 0
        ,borderRadius: '5px'
      });
      $('.optionClosed').animate({
        opacity: 0
      }, 150);
      $('.categoryTitle').animate({
        opacity: 0
      }, 150);
      clonedEl.find('.drinkIn-price').animate({
        opacity: 0
      }, 150);
      vm.lastScrollPosition = $ionicScrollDelegate.getScrollPosition().top;
      console.log(vm.lastScrollPosition);
      $ionicScrollDelegate.scrollTop(true);
      setTimeout(function(){
        clonedEl.find('.drinkIn-price').css({
          float: 'left'
          ,marginLeft: '20px'
          ,marginTop: '10px'
        });
        addBlackLayer(0, $("ion-content"), 0.3);
      }, 500);
      setTimeout(function(){
        $('.drinkListContainer').prepend(clonedEl[0]);
      }, 05);
      setTimeout(function(){
        clonedEl.animate({
          height: '325px'
          ,width: '90%'
          ,marginTop: '35px'
          ,marginLeft: '5%'
        }, 300);
        clonedEl.find('.drinkPhotoHolder').animate({
          width: '75px'
          ,height: '75px'
          ,marginTop: '20px'
          ,marginLeft: '40px'
        }, 300);
        clonedEl.find('.drinkIn').animate({
          fontSize: '28px'
          ,marginTop: '20px'
        }, 300);
      }, 250);
      setTimeout(function(){
        clonedEl.prepend(
          "<div class='col-xs-4 closeOptions'>"+
            "<p class='fa fa-times'></p>"+
          "</div>"
        );
        clonedEl.animate({
          borderWidth: 2
          ,borderBottomWidth: 2
        }, 250);
        clonedEl.find('.closeOptions').on('click', closeModal);
        clonedEl.find('.optionsPart').animate({
          height: '200px'
          ,opacity: 1
          ,zIndex: 500
        }, 250);
      }, 550);
      setTimeout(function(){
        clonedEl.find('.drinkIn-price').animate({
          opacity: 1
        }, 500);
      }, 700);
      vm.currentDrink        = currentDrink;
      vm.currentDrink.index  = index;
    }
    vm.openOptionsModal = openOptionsModal;

    /////////function to close the options modal
    function closeModal(){
      /////animation work
      $ionicScrollDelegate.freezeAllScrolls(false);
      $('.optionOpen').animate({
        opacity: 0
      }, 200);
      $ionicScrollDelegate.scrollTo(0, vm.lastScrollPosition, false);
      setTimeout(function(){
        $('.optionOpen').remove();
        $('.blackLayer').remove();
      }, 200);
      $('.optionClosed').animate({
        opacity: 1
      }, 500);
      $('.categoryTitle').animate({
        opacity: 1
      }, 150);
      $('.optionsPart').animate({
        opacity: 0
        ,height: 0
      }, 500);
      $('.nextArrow').animate({
        opacity: 1
      }, 250);
      vm.moreOptions = false;

    }

    function openOptionsFromCart(evt, itemObj, index){
      $ionicScrollDelegate.$getByHandle('cartList').scrollTo(0, 0 , true);
      $ionicScrollDelegate.freezeAllScrolls(true);
      vm.cartOptionsOpen = true;
      vm.currentDrink = itemObj;
      if(itemObj.itemId.customFields.espressoShots.on === false){
        $('.optionEspressoShot').parent().remove();
      }
      if(itemObj.itemId.customFields.flavourShot.on == false){
        $('.optionFlavor').parent().remove();
      }
      var shotPrice = itemObj.itemId.customFields.espressoShots.addedPrice;
      vm.currentItemShots = itemObj.customizations.shots;
      var offTopEl = $($('.shoppingCartCell')[index]).offset().top;
      var offTopCont = $('.shoppingCartList').offset().top;
      var distance = (-index*60) -10
      var targItem = $(evt.currentTarget).closest('.shoppingCartCell').clone();
      targItem.find('.cartActions').remove();
      /////clone the options things so we can add it
      var optionClone = $($(".optionsPart")[1]).clone();
      // var optionHtml = $(optionClone[0]).html();
      // console.log(optionHtml);
      targItem.find('.cartPrice').addClass('activeCartPrice');
      targItem.find('.activeCartPrice').css({
        paddingRight: '30px'
      });
      ////quick loop to add the proper size
      var sizeArr = optionClone.find('.sizeCell');
      var sizeLength = sizeArr.length;
      //////
      if(vm.cartModal === true){
        if(itemObj.customizations.size === 'small'){
          $(sizeArr[0]).css({
            backgroundColor: '#666666'
            ,color: 'white'
          });
        }
        else if(itemObj.customizations.size === 'medium') {
          $(sizeArr[1]).css({
            backgroundColor: '#666666'
            ,color: 'white'
          });
        }
        else if(itemObj.customizations.size === 'large') {
          $(sizeArr[2]).css({
            backgroundColor: '#666666'
            ,color: 'white'
          });
        }
        // vm.totalShots = itemObj.shots;
        optionClone.find('.flavourDropdown').val(itemObj.customizations.flavours);
        optionClone.find('.flavourDropdown').addClass('flavourCart');
      }
      optionClone.find('.modalActionSubmit').remove();
      optionClone.find('.espressoMath-number').text(itemObj.customizations.shots)
      optionClone.css({
        "position": 'absolute'
        ,marginTop: '55px'
        ,marginLeft: '-100%'
      });

      targItem.find('.checkoutDrinkInfo-name').css({
        marginTop: '12px'
      });
      targItem.find('.cartPrice span').css({
        marginLeft: '120px'
      });
      targItem.append(optionClone);
      targItem.addClass('cartOptionOpen')
      targItem.append(
        "<div class='cartOpClose'>Close</div>"
      );
      targItem.css({
        height: '60px'
        ,paddingLeft: '10px'
        ,paddingTop: '10px'
        ,position: 'absolute'
        ,marginTop: distance+10+'px'
        ,width: '100%'
        ,left: '0%'
        ,border: '2px solid #666666'
        ,zIndex: 5
      });
      $(evt.currentTarget).closest('.shoppingCartCell').append(
        targItem
      );
      //////let's add all events
      $('.cartOpClose').on('click', function(){
        closeCartOptions(index);
      });
      targItem.find('.sizeCell').on('click', choseSizeCart);
      targItem.find('.openMore').on('click', function(){
        openMoreOptions(targItem);
        if(vm.moreOptions === true){
          $('.cartOpClose').animate({
            marginTop: '305px'
          }, 300);
        }
        else {
          $('.cartOpClose').animate({
            marginTop: '210px'
          }, 250);
        }
      });
      var shoppingCartHeight = $('.shoppingCartList').height();
      console.log(shoppingCartHeight);
      if(shoppingCartHeight < 270){
        $('.shoppingCartList').animate({
          height: '270px'
        }, 300);
      }
      targItem.find('.closeOptions').on('click', function(){
        closeCartOptions();
      });
      vm.totalShots = itemObj.customizations.shots;
      targItem.find('.espressoMath-less').on('click', function(){
        subtractShot(shotPrice)
      });
      targItem.find('.espressoMath-more').on('click', function(){
        addShot(shotPrice)
      });

      targItem.animate({
        height: '298px'
        ,backgroundColor: 'white'
      }, 350);
      setTimeout(function(){
        optionClone.animate({
          opacity: 1
          ,height: '300px'
        }, 200);
        $('.checkoutDrinkInfo-name').animate({
          opacity: 1
        }, 250);
      }, 200);
    }
    vm.openOptionsFromCart = openOptionsFromCart;
    // vm.closeModal = closeModal;

    function closeCartOptions(itemObj){
      ////data stuff
      $ionicScrollDelegate.freezeAllScrolls(false);
      var targetIndex = itemObj;
      var currentItem = vm.currentOrder[targetIndex];
      currentItem.customizations.shots = vm.totalShots;
      currentItem.customizations.flavours = $('.flavourCart').val();
      //////animation stuff
      var opEl = $('.cartOptionOpen');
      vm.moreOptions = false;
      opEl.animate({
        height: '60px'
        ,backgroundColor: 'tranparent'
      }, 250);
      opEl.find('.optionsPart').animate({
        opacity: 0
      }, 250);
      opEl.find('.cartOpClose').animate({
        opacity: 0
      }, 250);
      $('.cartOptionOpen').css({
        marginTop: -itemObj*60+'px'
      });
        $('.shoppingCartList').css({
          height: 'auto'
        });
        var autoHeight = $('.shoppingCartList').height();
        $('.shoppingCartList').css({
          height: '270'
        });
        console.log(autoHeight);
        $('.shoppingCartList').animate({
          height: autoHeight
        }, 300);
      opEl.animate({
        opacity: 0
      }, 450);
      $('.checkoutDrinkInfo-name').animate({
        opacity: 0
      }, 250);
      setTimeout(function(){
        opEl.find('.optionsPart').remove();
        opEl.find('.cartOpClose').remove();
        setTimeout(function(){
          opEl.remove();
        }, 250)
      }, 420);
      $('.cartPrice span').text("$"+vm.currentDrink.price.toFixed(2));
      vm.totalShots = 0;
      vm.currentDrink = null;
      var newTotal = getPrice();
      $('.checkoutTotal').text("$"+newTotal.toFixed(2));
    }

    /////function to get total price
    function getPrice(){
      var totalPrice = 0;
      for (var i = 0; i < vm.currentOrder.length; i++) {
        totalPrice += vm.currentOrder[i].price;
        vm.totalPrice = totalPrice;
        if(i === vm.currentOrder.length - 1){
          return totalPrice;
        }
      }
    }

    ////////function to add last order to yoru cart
    function addLastOrderCart(){
      var newCartItem = {}
      newCartItem.customizations = vm.lastOrder[0].customizations[0];
      newCartItem.itemId = vm.lastOrder[0].itemId;
      newCartItem.price = vm.lastOrder[0].price;
      newCartItem.status = vm.lastOrder[vm.lastOrder.length-1].status;
      vm.currentOrder.push(newCartItem);
      vm.orderTotalPrice += newCartItem.price;
      console.log(vm.lastOrder);
      vm.lastOrder = vm.lastOrder.slice(1, vm.lastOrder.length)
      if(vm.lastOrder.length === 0){
        getLastOrder();
      }
      cartNumberAdd();
      // console.log(vm.lastOrder);
      var lastClone = $(".drinkCellLastOrder").clone();
      lastClone.css({
        position: 'absolute'
        ,outline: '3px solid black'
        ,marginTop: '-100px'
        ,backgroundColor: 'transparent'
      });
      lastClone.html('')
      $('.categoryContainerRecommended').append(
        lastClone
      );
      lastClone.animate({
        marginTop: '-200px'
        ,width: '30px'
        ,height: '30px'
        ,marginLeft: '86%'
        ,opacity: .25
      }, 500);
      setTimeout(function(){
        lastClone.remove();
      }, 500);
    }
    vm.addLastOrderCart = addLastOrderCart;

    function checkHistory(){
      console.log('kjsdhfkjsdhaflkjahskljfhsdakjlhas');
      var locObj = window.localStorage.lastOrder;
      console.log(locObj);
      console.log(locObj.length);
      if(locObj.length > 5){
        vm.hasHistory = true;
        console.log(vm.hasHistory);
      }
    }
    checkHistory();

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
      var opacity = opacity;
      $('.blackLayer').css({
        zIndex: zIndex
        ,opacity: opacity
      }, 250);
      $('.blackLayer').animate({
        backgroundColor: 'black'
      }, 500);
    }

    function openMoreOptions(parentEl){
      console.log(parentEl);
      if(vm.moreOptions === false){
        $ionicScrollDelegate.scrollTo(0, 20, true);
        parentEl.animate({
          height: '425px'
        }, 300);
        parentEl.find('.moreOptionsContainer').animate({
          height: '100px'
        }, 300);
        parentEl.find('.optionsPart').css({
          zIndex: 0
        });
        $('.shoppingCartList').animate({
          height: '366px'
          ,maxHeight: '366px'
        }, 300);
        $('.cartModalHolder').animate({
          height: '500px'
        }, 300);
        setTimeout(function(){
          parentEl.find('.moreOptionsContainer').animate({
            opacity: 1
          }, 500);
          parentEl.find('.moreDrinkOps').html('Close <span><i class="fa fa-angle-up"></i></span>');
        }, 200);
        vm.moreOptions = true;
      }
      //////the ext part actuall closes it
      else {
        $ionicScrollDelegate.scrollTo(0, 0, true);
        parentEl.animate({
          height: '325px'
        }, 300);
        parentEl.find('.moreOptionsContainer').animate({
          height: '0px'
          ,opacity: 0
        }, 300);
        parentEl.find('.optionsPart').css({
          zIndex: 0
        });
        $('.shoppingCartList').animate({
          maxHeight: '270px'
        }, 250);
        $('.cartModalHolder').animate({
          height: '410px'
        }, 300);
        parentEl.find('.moreDrinkOps').html('More Options <span><i class="fa fa-angle-down"></i></span>');
        vm.moreOptions = false;
        // $ionicScrollDelegate.scrollTo(0, 30, true);
      }
    }

    function addShot(shotPrice){
      vm.totalShots++;
      vm.currentDrink.price += shotPrice;
      $('.activePrice').text('');
      $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
      $('.activeCartPrice span').text('');
      $('.activeCartPrice span').text("$"+vm.currentDrink.price.toFixed(2));
      vm.currentOrder.shots = vm.totalShots;
      $('.espressoMath-number').text(vm.totalShots);
    }
    vm.addShot = addShot;

    function subtractShot(shotPrice){
      if(vm.totalShots > 0){
        vm.totalShots--;
        vm.currentDrink.price -= shotPrice;
        $('.activeCartPrice span').text('');
        $('.activeCartPrice span').text("$"+vm.currentDrink.price.toFixed(2));
        vm.currentOrder.shots = vm.totalShots;
      }
      // vm.currentOrder.shotss = vm.totalShots;
      $('.espressoMath-number').text(vm.totalShots);
    }
    vm.subtractShot = subtractShot;

    function choseSize(evt){
      console.log(vm.currentDrink.customFields);
      if($(evt.target).hasClass('sizeSmall')){
        var elSize = 'small';
        var elem = $(evt.target);
        var lastElSizeFunc = function(){
          if($(evt.target).hasClass('selected')){
            return false;
          }
          else if ($(evt.target).parent().hasClass('selected')){
            return false;
          }
          else {
            return true;
          }
        }
        var lastElSize = lastElSizeFunc();

        if(vm.currentDrink.customFields.size.sizes.value === false){
          vm.currentDrink.customFields.size.sizes.value = 'small'
        }
        else if(vm.currentDrink.customFields.size.sizes.value === 'medium'){
          vm.currentDrink.customFields.size.sizes.value = 'small';
          vm.currentDrink.price -= vm.currentDrink.customFields.size.sizes.medium;
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        else if(vm.currentDrink.customFields.size.sizes.value === 'large'){
          vm.currentDrink.customFields.size.sizes.value = 'small';
          vm.currentDrink.price -= vm.currentDrink.customFields.size.sizes.large;
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        //////animate
        $('.sizeMedium').removeClass('selected');
        $('.sizeMedium').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        })
        $('.sizeLarge').removeClass('selected');
        $('.sizeLarge').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        });
      }
      if($(evt.target).parent().hasClass('sizeSmall')){
        var elSize = 'small';
        var elem = $(evt.target).parent();
        var lastElSizeFunc = function(){
          if($(evt.target).hasClass('selected')){
            return false;
          }
          else if ($(evt.target).parent().hasClass('selected')){
            return false;
          }
          else {
            return true;
          }
        }
        var lastElSize = lastElSizeFunc();

        if(vm.currentDrink.customFields.size.sizes.value === false){
          vm.currentDrink.customFields.size.sizes.value = 'small'
        }
        else if(vm.currentDrink.customFields.size.sizes.value === 'medium'){
          vm.currentDrink.customFields.size.sizes.value = 'small';
          vm.currentDrink.price -= vm.currentDrink.customFields.size.sizes.medium;
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        else if(vm.currentDrink.customFields.size.sizes.value === 'large'){
          vm.currentDrink.customFields.size.sizes.value = 'small';
          vm.currentDrink.price -= vm.currentDrink.customFields.size.sizes.large;
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        //////animate
        $('.sizeMedium').removeClass('selected');
        $('.sizeMedium').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        })
        $('.sizeLarge').removeClass('selected');
        $('.sizeLarge').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        });
      }
      else if($(evt.target).hasClass('sizeMedium')){
        var elSize = 'medium';
        var elem = $(evt.target);
        var lastElSizeFunc = function(){
          if($(evt.target).hasClass('selected')){
            return false;
          }
          else if ($(evt.target).parent().hasClass('selected')){
            return false;
          }
          else {
            return true;
          }
        }
        var lastElSize = lastElSizeFunc();

        if(vm.currentDrink.customFields.size.sizes.value === false){
          vm.currentDrink.customFields.size.sizes.value = 'medium';
          vm.currentDrink.price += vm.currentDrink.customFields.size.sizes.medium;
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        else if(vm.currentDrink.customFields.size.sizes.value === 'small'){
          vm.currentDrink.customFields.size.sizes.value = 'medium';
          vm.currentDrink.price += vm.currentDrink.customFields.size.sizes.medium;
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        else if(vm.currentDrink.customFields.size.sizes.value === 'large'){
          vm.currentDrink.customFields.size.sizes.value = 'medium';
          vm.currentDrink.price -= (vm.currentDrink.customFields.size.sizes.large - vm.currentDrink.customFields.size.sizes.medium)
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        $('.sizeSmall').removeClass('selected');
        $('.sizeSmall').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        })
        $('.sizeLarge').removeClass('selected');
        $('.sizeLarge').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        });
      }
      else if($(evt.target).parent().hasClass('sizeMedium')){
        var elSize = 'medium';
        var elem = $(evt.target).parent();
        var lastElSizeFunc = function(){
          if($(evt.target).hasClass('selected')){
            return false;
          }
          else if ($(evt.target).parent().hasClass('selected')){
            return false;
          }
          else {
            return true;
          }
        }
        var lastElSize = lastElSizeFunc();

        if(vm.currentDrink.customFields.size.sizes.value === false){
          vm.currentDrink.customFields.size.sizes.value = 'medium';
          vm.currentDrink.price += vm.currentDrink.customFields.size.sizes.medium;
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        else if(vm.currentDrink.customFields.size.sizes.value === 'small'){
          vm.currentDrink.customFields.size.sizes.value = 'medium';
          vm.currentDrink.price += vm.currentDrink.customFields.size.sizes.medium;
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        else if(vm.currentDrink.customFields.size.sizes.value === 'large'){
          vm.currentDrink.customFields.size.sizes.value = 'medium';
          vm.currentDrink.price -= (vm.currentDrink.customFields.size.sizes.large - vm.currentDrink.customFields.size.sizes.medium)
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        $('.sizeSmall').removeClass('selected');
        $('.sizeSmall').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        })
        $('.sizeLarge').removeClass('selected');
        $('.sizeLarge').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        });
      }
      else if($(evt.target).hasClass('sizeLarge')){
        var elSize = 'large';
        var elem = $(evt.target);
        var lastElSizeFunc = function(){
          if($(evt.target).hasClass('selected')){
            return false;
          }
          else if ($(evt.target).parent().hasClass('selected')){
            return false;
          }
          else {
            return true;
          }
        }
        var lastElSize = lastElSizeFunc();

        if(vm.currentDrink.customFields.size.sizes.value === false){
          vm.currentDrink.customFields.size.sizes.value = 'large';
          vm.currentDrink.price += vm.currentDrink.customFields.size.sizes.large;
          console.log(vm.currentDrink);
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        else if(vm.currentDrink.customFields.size.sizes.value === 'small'){
          vm.currentDrink.customFields.size.sizes.value = 'large';
          vm.currentDrink.price += vm.currentDrink.customFields.size.sizes.large;
          console.log(vm.currentDrink);
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        else if(vm.currentDrink.customFields.size.sizes.value === 'medium'){
          vm.currentDrink.customFields.size.sizes.value = 'large';
          vm.currentDrink.price -= (vm.currentDrink.customFields.size.sizes.large - vm.currentDrink.customFields.size.sizes.medium)
          console.log(vm.currentDrink);
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        $('.sizeSmall').removeClass('selected');
        $('.sizeSmall').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        });
        $('.sizeMedium').removeClass('selected');
        $('.sizeMedium').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        });
      }
      else if($(evt.target).parent().hasClass('sizeLarge')){
        console.log(vm.currentDrink.customFields);
        var elSize = 'large';
        var elem = $(evt.target).parent();
        var lastElSizeFunc = function(){
          if($(evt.target).hasClass('selected')){
            return false;
          }
          else if ($(evt.target).parent().hasClass('selected')){
            return false;
          }
          else {
            return true;
          }
        }
        var lastElSize = lastElSizeFunc();

        if(vm.currentDrink.customFields.size.sizes.value === false){
          vm.currentDrink.customFields.size.sizes.value = 'large';
          vm.currentDrink.price += vm.currentDrink.customFields.size.sizes.large;
          console.log(vm.currentDrink);
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        else if(vm.currentDrink.customFields.size.sizes.value === 'small'){
          vm.currentDrink.customFields.size.sizes.value = 'large';
          vm.currentDrink.price += vm.currentDrink.customFields.size.sizes.large;
          console.log(vm.currentDrink);
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        else if(vm.currentDrink.customFields.size.sizes.value === 'medium'){
          vm.currentDrink.customFields.size.sizes.value = 'large';
          vm.currentDrink.price += (vm.currentDrink.customFields.size.sizes.large - vm.currentDrink.customFields.size.sizes.medium)
          console.log(vm.currentDrink);
          $('.activePrice').text('');
          $('.activePrice').text("$"+vm.currentDrink.price.toFixed(2));
        }
        $('.sizeSmall').removeClass('selected');
        $('.sizeSmall').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        })
        $('.sizeMedium').removeClass('selected');
        $('.sizeMedium').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        })
      }
      console.log(vm.currentDrink.price);
      if(elSize === 'small' && lastElSize === true){
        if(elem.hasClass('selected')){
          elem.css({
            backgroundColor: 'transparent'
            ,color: '#323232'
          })
          elem.removeClass('selected')
        }
        else {
          elem.css({
            backgroundColor: '#666666'
            ,color: 'white'
          })
          elem.addClass('selected')
        }
      }
      else if(elSize === 'medium' && lastElSize === true){
        if(elem.hasClass('selected')){
          elem.css({
            backgroundColor: 'transparent'
            ,color: '#323232'
          })
          elem.removeClass('selected')
        }
        else {
          elem.css({
            backgroundColor: '#666666'
            ,color: 'white'
          })
          elem.addClass('selected')
        }
      }
      else if(elSize === 'large' && lastElSize === true){
        if(elem.hasClass('selected')){
          elem.css({
            backgroundColor: 'transparent'
            ,color: '#323232'
          })
          elem.removeClass('selected')
        }
        else {
          elem.css({
            backgroundColor: '#666666'
            ,color: 'white'
          })
          elem.addClass('selected')
        }
      }
    }

    function choseSizeCart(evt){
      console.log($(evt.target));
      console.log($(evt.target).hasClass('selected'));
      if($(evt.target).hasClass('sizeSmall')){
        var elSize = 'small';
        var lastElSizeFunc = function(){
          if(evt.target.hasClass('selected')){
            return false;
          }
          else if ($(evt.target).parent().hasClass('selected')){
            return false;
          }
          else {
            return true;
          }
        }
        var lastElSize = lastElSizeFunc();
        var elem = $(evt.target);
        if(vm.currentDrink.customizations.size === 'medium'){
          vm.currentDrink.customizations.size = 'small';
          vm.currentDrink.price -= vm.currentDrink.itemId.customFields.size.sizes.medium;
          $('.activeCartPrice span').text('');
          $('.activeCartPrice span').text("$"+vm.currentDrink.price.toFixed(2));
          animateSmall();
        }
        else if(vm.currentDrink.customizations.size === 'large'){
          vm.currentDrink.customizations.size = 'small';
          vm.currentDrink.price -= vm.currentDrink.itemId.customFields.size.sizes.large;
          $('.activeCartPrice span').text('');
          $('.activeCartPrice span').text("$"+vm.currentDrink.price.toFixed(2));
          animateSmall();
        }
        //////animate
        function animateSmall(){
          $('.sizeMedium').removeClass('selected');
          $('.sizeMedium').css({
            backgroundColor: 'transparent'
            ,color: '#323232'
          })
          $('.sizeLarge').removeClass('selected');
          $('.sizeLarge').css({
            backgroundColor: 'transparent'
            ,color: '#323232'
          });
        }
      }
      if($(evt.target).parent().hasClass('sizeSmall')){
        var elSize = 'small';
        var elem = $(evt.target).parent();
        var lastElSizeFunc = function(){
          if($(evt.target).hasClass('selected')){
            return false;
          }
          else if ($(evt.target).parent().hasClass('selected')){
            return false;
          }
          else {
            return true;
          }
        }
        var lastElSize = lastElSizeFunc();

        if(vm.currentDrink.customizations.size === 'medium'){
          vm.currentDrink.customizations.size = 'small';
          vm.currentDrink.price -= vm.currentDrink.itemId.customFields.size.sizes.medium;
          $('.activeCartPrice span').text('');
          $('.activeCartPrice span').text("$"+vm.currentDrink.price.toFixed(2));
          animateSmall();
        }
        else if(vm.currentDrink.customizations.size === 'large'){
          vm.currentDrink.customizations.size = 'small';
          vm.currentDrink.price -= vm.currentDrink.itemId.customFields.size.sizes.large;
          $('.activeCartPrice span').text('');
          $('.activeCartPrice span').text("$"+vm.currentDrink.price.toFixed(2));
          animateSmall();
        }
        //////animate
        function animateSmall(){
          $('.sizeMedium').removeClass('selected');
          $('.sizeMedium').css({
            backgroundColor: 'transparent'
            ,color: '#323232'
          })
          $('.sizeLarge').removeClass('selected');
          $('.sizeLarge').css({
            backgroundColor: 'transparent'
            ,color: '#323232'
          });
        }
      }
      else if($(evt.target).hasClass('sizeMedium')){
        var elSize = 'medium';
        var elem = $(evt.target);
        var lastElSizeFunc = function(){
          if($(evt.target).hasClass('selected')){
            return false;
          }
          else if ($(evt.target).parent().hasClass('selected')){
            return false;
          }
          else {
            return true;
          }
        }
        var lastElSize = lastElSizeFunc();

        if(vm.currentDrink.customizations.size === 'small'){
          vm.currentDrink.customizations.size = 'medium';
          vm.currentDrink.price += vm.currentDrink.itemId.customFields.size.sizes.medium;
          $('.activeCartPrice span').text('');
          $('.activeCartPrice span').text("$"+vm.currentDrink.price.toFixed(2));
        }
        else if(vm.currentDrink.customizations.size === 'large'){
          vm.currentDrink.customizations.size = 'medium';
          vm.currentDrink.price -= (vm.currentDrink.itemId.customFields.size.sizes.large - vm.currentDrink.itemId.customFields.size.sizes.medium)
          $('.activeCartPrice span').text('');
          $('.activeCartPrice span').text("$"+vm.currentDrink.price.toFixed(2));
        }
        $('.sizeSmall').removeClass('selected');
        $('.sizeSmall').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        })
        $('.sizeLarge').removeClass('selected');
        $('.sizeLarge').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        });
      }
      else if($(evt.target).parent().hasClass('sizeMedium')){
        var elSize = 'medium';
        var elem = $(evt.target).parent();
        var lastElSizeFunc = function(){
          if($(evt.target).hasClass('selected')){
            return false;
          }
          else if ($(evt.target).parent().hasClass('selected')){
            return false;
          }
          else {
            return true;
          }
        }
        var lastElSize = lastElSizeFunc();

        if(vm.currentDrink.customizations.size === 'small'){
          vm.currentDrink.customizations.size = 'medium';
          vm.currentDrink.price += vm.currentDrink.itemId.customFields.size.sizes.medium;
          $('.activeCartPrice span').text('');
          $('.activeCartPrice span').text("$"+vm.currentDrink.price.toFixed(2));
        }
        else if(vm.currentDrink.customizations.size === 'large'){
          vm.currentDrink.customizations.size = 'medium';
          vm.currentDrink.price -= (vm.currentDrink.itemId.customFields.size.sizes.large - vm.currentDrink.itemId.customFields.size.sizes.medium)
          $('.activeCartPrice span').text('');
          $('.activeCartPrice span').text("$"+vm.currentDrink.price.toFixed(2));
        }
        $('.sizeSmall').removeClass('selected');
        $('.sizeSmall').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        })
        $('.sizeLarge').removeClass('selected');
        $('.sizeLarge').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        });
      }
      else if($(evt.target).hasClass('sizeLarge')){
        var elSize = 'large';
        var elem = $(evt.target);
        var lastElSizeFunc = function(){
          if($(evt.target).hasClass('selected')){
            return false;
          }
          else if ($(evt.target).parent().hasClass('selected')){
            return false;
          }
          else {
            return true;
          }
        }
        var lastElSize = lastElSizeFunc();

        if(vm.currentDrink.customizations.size === 'small'){
          vm.currentDrink.customizations.size = 'large';
          vm.currentDrink.price += vm.currentDrink.itemId.customFields.size.sizes.large;
          $('.activeCartPrice span').text('');
          $('.activeCartPrice span').text("$"+vm.currentDrink.price.toFixed(2));
        }
        else if(vm.currentDrink.customizations.size === 'medium'){
          vm.currentDrink.customizations.size = 'large';
          vm.currentDrink.price -= (vm.currentDrink.itemId.customFields.size.sizes.large - vm.currentDrink.itemId.customFields.size.sizes.medium)
          $('.activeCartPrice span').text('');
          $('.activeCartPrice span').text("$"+vm.currentDrink.price.toFixed(2));
        }
        $('.sizeSmall').removeClass('selected');
        $('.sizeSmall').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        });
        $('.sizeMedium').removeClass('selected');
        $('.sizeMedium').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        });
      }
      else if($(evt.target).parent().hasClass('sizeLarge')){
        var elSize = 'large';
        var elem = $(evt.target).parent();
        var lastElSizeFunc = function(){
          if($(evt.target).hasClass('selected')){
            return false;
          }
          else if ($(evt.target).parent().hasClass('selected')){
            return false;
          }
          else {
            return true;
          }
        }
        var lastElSize = lastElSizeFunc();

        if(vm.currentDrink.customizations.size === 'small'){
          vm.currentDrink.customizations.size = 'large';
          vm.currentDrink.price += vm.currentDrink.itemId.customFields.size.sizes.large;
          $('.activeCartPrice span').text('');
          $('.activeCartPrice span').text("$"+vm.currentDrink.price.toFixed(2));
        }
        else if(vm.currentDrink.customizations.size === 'medium'){
          vm.currentDrink.customizations.size = 'large';
          vm.currentDrink.price += (vm.currentDrink.itemId.customFields.size.sizes.large - vm.currentDrink.itemId.customFields.size.sizes.medium)
          $('.activeCartPrice span').text('');
          $('.activeCartPrice span').text("$"+vm.currentDrink.price.toFixed(2));
        }
        $('.sizeSmall').removeClass('selected');
        $('.sizeSmall').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        })
        $('.sizeMedium').removeClass('selected');
        $('.sizeMedium').css({
          backgroundColor: 'transparent'
          ,color: '#323232'
        })
      }
      if(elSize === 'small' && lastElSize === true){
        if(elem.hasClass('selected')){
          elem.css({
            backgroundColor: 'transparent'
            ,color: '#323232'
          })
          elem.removeClass('selected')
        }
        else {
          elem.css({
            backgroundColor: '#666666'
            ,color: 'white'
          })
          elem.addClass('selected')
        }
      }
      else if(elSize === 'medium' && lastElSize === true){
        if(elem.hasClass('selected')){
          elem.css({
            backgroundColor: 'transparent'
            ,color: '#323232'
          })
          elem.removeClass('selected')
        }
        else {
          elem.css({
            backgroundColor: '#666666'
            ,color: 'white'
          })
          elem.addClass('selected')
        }
      }
      else if(elSize === 'large' && lastElSize === true){
        if(elem.hasClass('selected')){
          elem.css({
            backgroundColor: 'white'
            ,color: '#323232'
          })
          elem.removeClass('selected')
        }
        else {
          elem.css({
            backgroundColor: '#666666'
            ,color: 'white'
          })
          elem.addClass('selected')
        }
      }
      console.log(vm.currentDrink);
    }
    // vm.choseSize = choseSize;

    vm.removeItem = function(something, index) {
      vm.orderTotalPrice -= vm.currentOrder[index].price
      vm.currentOrder.splice(index, 1);
      cartNumberMinus();
    }

    function submitDrinkOptions(evt) {
      console.log(vm.ogPrice);
      var drinkDetails = {customizations: {}}
      var sizeEl = $('.selected');
      var drinkPrice = vm.currentDrink.price;
      console.log(vm.currentDrink);
      if(sizeEl.hasClass('sizeSmall')){
        drinkDetails.customizations.size = 'small';
      }
      else if(sizeEl.hasClass('sizeMedium')){
        drinkDetails.customizations.size = 'medium';
      }
      else if(sizeEl.hasClass('sizeLarge')){
        drinkDetails.customizations.size = 'large';
      } else {
          console.log("no size selected")
      }
      if(!drinkDetails.customizations.size == ''){
        drinkDetails.itemId = vm.currentDrink;
        drinkDetails.customizations.flavours = $('.flavourDropdown').val();
        drinkDetails.customizations.toppings = $('.toppingDropdown').val();
        drinkDetails.customizations.shots = vm.totalShots;
        drinkDetails.status = 'active';
        drinkDetails.price = drinkPrice;
        drinkDetails.evt = {currentTarget: ''}
        drinkDetails.evt.currentTarget = evt.target.id;
        vm.orderTotalPrice += vm.currentDrink.price;
        ///////put all settings back to zero
        vm.currentOrder.push(drinkDetails);
        setTimeout(function(){
          console.log(vm.currentOrder.length);
          cartNumberAdd();
        }, 1000);
        vm.currentDrink = {};
        vm.totalShots   = 0;
        vm.moreOptions = false;
        setTimeout(function(){
          $("."+vm.currentOpenModal).find('.drinkIn-price').text('$'+vm.ogPrice.toFixed(2));
        }, 700);
        $('.activePrice').removeClass('activePrice');
        closeModal();
      }
      else {
        alert('Please Choose a Size');
      }
    }
    // vm.submitDrinkOptions = submitDrinkOptions;

    //////functions to open/close shopping carts/////
    function openCart(evt){
      $ionicScrollDelegate.scrollTop();
      // $ionicScrollDelegate.freezeScroll(true);
      $('.drinkRepeatContainer').animate({
        opacity: 0
      }, 150);
      $('.optionsPart').css({
        zIndex: 0
      });
      // setTimeout(function(){
      $('.cartHolder i').animate({
        fontSize: 60+"px"
        ,paddingTop: 0+'px'
        ,paddingRight: 5+'px'
        ,color: '#323232'
      }, 350);
      $('.cartTotal').animate({
        marginLeft: '218px'
        ,paddingTop: '13px'
        ,fontSize: '25px'
      }, 350);
      $('.cartModalHolder').animate({
        width: 90+"%"
        ,marginLeft: 0+'%'
        ,marginTop: 10+'px'
        ,paddingTop: 10+'px'
        ,height: 400+"px"
        ,marginRight: 5+"%"
        ,backgroundColor: 'white'
      }, 350);
      setTimeout(function(){
        addBlackLayer(0, $("ion-content"), 0.3);
      }, 250);
      setTimeout(function(){
        $('.cartModalHolder').prepend(
          "<div class='cartTitle'>Your Order</div>"
        );
        $('.cartModalHolder').animate({
          borderWidth: 2
        }, 300);
      }, 450);
      setTimeout(function(){
        $(".cartTitle").animate({
          opacity: 1
        }, 300);
      }, 500);
      $timeout(function(){
        vm.cartModal = true;
      }, 500);
    }
    vm.openCart = function(){
      if(!vm.cartModal){
        openCart();
      }
    };

    ///////function to close the shopping cart
    function closeCart(){
      vm.moreOptions = false;
      // $ionicScrollDelegate.freezeScroll(false);
      ////removes the cart and adds it back
      $('#checkout').remove();
      $('.checkoutForm').append(
        "<div id='checkout'></div>"
      );
      $('.optionsPart').css({
        zIndex: 0
      });
      $('.cartModalHolder').animate({
        borderWidth: 0
      }, 200);
      $('.cartTotal').animate({
        marginLeft: '241px'
        ,paddingTop: '3px'
        ,fontSize: '14px'
      }, 250);
      // setTimeout(function(){
        $('.cartHolder i').animate({
          fontSize: 35+"px"
          ,paddingTop: 0+'px'
          ,paddingRight: 0+'px'
        }, 250);
        $('.cartModalHolder').animate({
          width: "auto"
          ,marginLeft: 0+'%'
          ,marginTop: 0+'px'
          ,paddingTop: 2+'px'
          ,height: "35px"
          ,marginRight: 0+"px"
          ,backgroundColor: 'transparent'
        }, 250);
      // }, 135);
      $('.clearLayer').remove();
      $('.blackLayer').remove();
      $('.cartTitle').remove();
      setTimeout(function(){
        $('.drinkRepeatContainer').animate({
          opacity: 1
        },200);
        closeCartOptions();
        // vm.getToken();
        $('.checkoutName').val('');
        $(".checkoutName").css({
          opacity: 0
          ,marginLeft: '200%'
        })
      }, 400);
      $timeout(function(){
        // vm.getToken();
        vm.cartModal = false
      }, 100);
    }
    vm.closeCart = closeCart;

    ///////payment and braintree injection function
    vm.getToken = getToken;
    function getToken() {
      var optionId = $('.cartOptionOpen').id
      if(!vm.checkoutOpen){
        // animation stuff
        var listOffset = $('.shoppingCartList').offset().top;
        var checkoutOffset = $('.checkoutContainer').offset().top;
        var margDist = checkoutOffset - listOffset;
        $('.checkoutButton').text('Back');
        $('.shoppingCartCell').animate({
          opacity: 0
        }, 200);
        setTimeout(function(){
          $('.shoppingCartList').animate({
            height: '0px'
          }, 250);
        })
        $('.checkoutName').css({
          marginLeft: '10%'
        });
        $('.addNameOrder').css({
          marginLeft: '0%'
        });
        $('.addNameButton').css({
          marginLeft: '45%'
        });
        setTimeout(function(){
          $('.checkoutName').animate({
            opacity: 1
          });
          $('.addNameOrder').animate({
            opacity: 1
          });
          $('.addNameButton').animate({
            opacity: 1
          });
        }, 250);
        $('.cartModalHolder').animate({
          height: '425px'
        });

        vm.checkoutOpen = true;
        braintreeToken()
        .success(function (data) {
          ///////begin braintree injection
          vm.submitName = function(){
            var name = $('.checkoutName').val();
            if(name.length > 0){
              $('.checkoutName').animate({
                opacity: 0
              }, 250);
              $('.addNameOrder').animate({
                opacity: 0
              }, 250);
              $('.addNameButton').animate({
                opacity: 0
              }, 250);
              setTimeout(function(){
                $('.checkoutName').css({
                  marginLeft: '200%'
                });
                $('.addNameOrder').css({
                  marginLeft: '200%'
                });
                $('.addNameButton').css({
                  marginLeft: '200%'
                });
              }, 250);
              braintreeStuff();
            }
          }
          function braintreeStuff(){
            $('.checkoutForm').css({
              marginTop: '-110px'
            })
            ////function to bring in payment button
            setTimeout(function(){
              $('.checkoutSubmit').animate({
                height: '35px'
                ,opacity: 1
              }, 250);
            }, 500);
            braintree.setup(data.client_token, 'dropin', {
              container: 'checkout' ,
              // Form is not submitted by default when paymentMethodNonceReceived is implemented
              paymentMethodNonceReceived: function (event, nonce) {
                //////if-statement to check if user has added a name
                if($('.checkoutName').val().length > 0){
                  vm.message = 'Processing your payment...';
                  $http({
                    method: 'POST',
                    url: 'http://52.39.40.7/payments/process',
                    data: {
                      amount: vm.orderTotalPrice
                      ,payment_method_nonce: nonce
                    }
                  })
                  .success(function (data) {
                    if (data.success) {
                      vm.message = 'Payment authorized, thanks.';
                      vm.isError = false;
                      vm.isPaid = true;
                      vm.currentOrder.shots = vm.totalShots
                      var orderObj = {order: {
                        items: vm.currentOrder
                        ,name: $('.checkoutName').val()
                      }}
                      if(vm.signedInUser){
                        orderObj.decoded.id = signedInUser.id
                      }
                      console.log(vm.currentOrder);
                      $http({
                        method: "POST"
                        ,url: 'http://52.39.40.7/orders'
                        ,data: orderObj
                      })
                      .then(function(data){
                        vm.postCartOpen = true;
                        var orderId = data.data.data._id;
                        //////////we store up to fie localstorage orders on a device, seperated by  an -&-
                        storeLocal(orderId);
                        vm.socket = io.connect('http://52.39.40.7/');
                        vm.socket.emit('orders', {message: 'Order Biatches', order: data.data});
                      })
                      //

                    } else {
                      // implement your solution to handle payment failures
                      vm.message = 'Payment failed: ' + data.message + ' Please refresh the page and try again.';
                      vm.isError = true;
                    }

                  }).error(function (error) {
                    vm.message = 'Error: cannot connect to server. Please make sure your server is running431.';

                    vm.isError = true;
                  });
                }
                else {
                  alert('Please add your name');
                }
              }
            });
          }

        }).error(function (error) {
          vm.message = 'Error: cannot connect to server. Please make sure your server is running440.';

          vm.isError = true;
        });
      }
      else {
        vm.checkoutOpen = false;
        ////removes the cart and adds it back
        $('#checkout').remove();
        $('.checkoutContainer').animate({
          marginTop: '60px'
        }, 250);
        $('.checkoutName').animate({
          opacity: 0
        }, 250);
        $('.checkoutSubmit').animate({
          height: '0px'
          ,opacity: 0
        }, 150);
        $('.addNameOrder').animate({
          opacity: 0
        }, 250);
        $('.addNameButton').animate({
          opacity: 0
        }, 250);
        $('.cartModalHolder').animate({
          height: '400px'
        });
        setTimeout(function(){
          $('.shoppingCartCell').animate({
            opacity: 1
          }, 250);
          $('.checkoutName').css({
            marginLeft: '200%'
          });
          $('.addNameOrder').css({
            marginLeft: '200%'
          });
          $('.addNameButton').css({
            marginLeft: '200%'
          });
          $('.shoppingCartList').animate({
            height: '100%'
          }, 250);
          $('.checkoutContainer').animate({
            marginTop: '0px'
          }, 0);
        }, 250);
        setTimeout(function(){

        }, 500);
        $('.checkoutForm').prepend(
          "<div id='checkout'></div>"
        );
        $('.checkoutButton').text('Checkout');
      }
    };

    function storeLocal(newOrderId){
      if(localStorage.hasOwnProperty('lastOrder')){
        var stor = localStorage.lastOrder;
        if(stor === null && stor === ''){
          var splitStor = ''
        }
        else {
          var splitStor = stor.split('-&-').splice(0, stor.split('-&-').length-1);
        }
        if(splitStor.length < 5){
          var newStor = localStorage.lastOrder
          newStor += newOrderId+"-&-";
          console.log(localStorage);
          localStorage.setItem('lastOrder', newStor);
          console.log(localStorage);
        }
        else {
          splitStor = splitStor.slice(0, 4);
          splitStor.push(newOrderId+"-&-");
          console.log(localStorage);
          localStorage.setItem('lastOrder', splitStor.join('-&-'));
          console.log(localStorage);
        }
      }
      else {
        localStorage.lastOrder = newOrderId+"-&-";
      }

    }

    //////function to go to login page
    function toLoginPage(){
      window.location.hash = "#/login";
      window.location.reload();
    }
    vm.toLoginPage = toLoginPage;

    function toBack(){
      window.location.hash = "#/tab/dash";
      window.location.reload();
    }
    vm.toBack = toBack;
  /////////////////////////////
  ///////end Client Ctrl///////
  /////////////////////////////
  }
