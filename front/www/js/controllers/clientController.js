angular.module('clientController', ['menuItemsFactory', 'braintreeTokenFactory', 'braintreeProcessFactory'])

  .controller('clientCtrl', clientCtrl);

  clientCtrl.$inject = ['$http', '$timeout', 'menuItems', '$rootScope', 'braintreeToken', 'braintreeProcess', '$location'];

  function clientCtrl($http, $timeout, menuItems, $rootScope, braintreeToken, $location){

    //////////////////////////////////////////////
    ////////All Global Variables//////////////////
    //////////////////////////////////////////////
    var vm = this;
    vm.optionsModal    = false;
    vm.moreOptions     = false;
    vm.cartModal       = false;
    vm.optionsArray    = false;
    vm.checkoutOpen    = false;
    vm.postCartOpen    = false;
    vm.totalShots      = 0;
    vm.currentDrink    = {}
    vm.currentOrder    = [];
    vm.orderTotalPrice = 0;
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
    });

    //////////////////////////////////////////////
    ////////End Data Function (i/o)///////////////
    //////////////////////////////////////////////


    //////////////////////////////////////////////
    ////////All Animation Functions///////////////
    //////////////////////////////////////////////

    /////opens the options modal when user selects an item
    function openOptionsModal(currentDrink, index, evt){
      console.log(currentDrink);
      vm.currentDrink = currentDrink
      var index = index;
      var clonedEl = $(evt.currentTarget).clone();
      clonedEl.find('.sizeCell').on('click', choseSize);
      clonedEl.find('.openMore').on('click', function(){
        openMoreOptions(clonedEl);
      });
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
      clonedEl.find('.espressoMath-less').on('click', subtractShot);
      clonedEl.find('.espressoMath-more').on('click', addShot);
      clonedEl.find('.submitItem').on('click', submitDrinkOptions);
      clonedEl.addClass('optionOpen');
      clonedEl.removeClass('optionClosed');
      var removeCircle = clonedEl.find('.fa-plus-circle');
      removeCircle.remove();
      clonedEl.css({
        marginTop: distance
        ,borderBottom: "0px solid black"
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
      setTimeout(function(){
        clonedEl.find('.drinkIn-price').css({
          float: 'left'
          ,marginLeft: '20px'
          ,marginTop: '10px'
        });
      }, 500);
      setTimeout(function(){
        $('.drinkListContainer').prepend(clonedEl[0]);
      }, 05);
      setTimeout(function(){
        clonedEl.animate({
          height: '325px'
          ,width: '90%'
          ,marginTop: '10px'
          ,marginLeft: '5%'
          // ,borderWidth: 5
          // ,borderBottomWidth: 5
        }, 300);
        clonedEl.find('.drinkPhotoHolder').animate({
          width: '75px'
          ,height: '75px'
          ,marginTop: '20px'
          ,marginLeft: '30px'
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
    /////////function to close the options modal
    function closeModal(){
      $('.optionOpen').animate({
        opacity: 0
      }, 200);
      setTimeout(function(){
        $('.optionOpen').remove();
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
      vm.moreOptions = false;

    }
    vm.openOptionsModal = openOptionsModal;

    function openOptionsFromCart(evt, itemObj){
      var offTopEl = $(evt.currentTarget).closest('.shoppingCartCell').offset().top;
      var offTopCont = $('.shoppingCartList').offset().top;
      var distance = offTopEl - offTopCont;
      var targItem = $(evt.currentTarget).closest('.shoppingCartCell').clone();
      targItem.find('.cartActions').remove();
      targItem.find('.cartPrice').remove();
      /////clone the options things so we can add it
      var optionClone = $($(".optionsPart")[0]).clone();
      ////quick loop to add the proper size
      var sizeArr = optionClone.find('.sizeCell');
      var sizeLength = sizeArr.length;
      //////
      if(vm.cartModal === true){
        if(itemObj.size === 'small'){
          $(sizeArr)[0].css({
            backgroundColor: '#dddddd'
          });
        }
        else if(itemObj.size === 'medium') {
          $(sizeArr[1]).css({
            backgroundColor: '#dddddd'
          });
        }
        else if(itemObj.size === 'large') {
          $(sizeArr[2]).css({
            backgroundColor: '#dddddd'
          });
        }
        vm.totalShots = itemObj.shots;
        optionClone.find('.flavourDropdown').val(itemObj.flavours);
      }


      optionClone.find('.modalActionSubmit').remove();
      optionClone.css({
        "position": 'relative'
        ,marginTop: '20px'
      });
      targItem.append(optionClone);
      targItem.addClass('cartOptionOpen')
      targItem.append(
        "<div class='cartOpClose'>Close Options</div>"
      );
      targItem.css({
        height: '60px'
        ,position: 'absolute'
        ,marginTop: distance+'px'
        ,width: '90%'
        ,left: '5%'
        ,border: '2px solid black'
        ,zIndex: 5
      });
      $('.shoppingCartList').prepend(
        targItem
      );
      //////let's add all events
      $('.cartOpClose').on('click', closeCartOptions);
      targItem.find('.sizeCell').on('click', choseSize);
      targItem.find('.openMore').on('click', function(){
        openMoreOptions(targItem);
        if(vm.moreOptions === true){
          $('.cartOpClose').animate({
            marginTop: '341px'
          }, 300);
        }
        else {
          $('.cartOpClose').animate({
            marginTop: '241px'
          }, 300);
        }
      });
      targItem.find('.closeOptions').on('click', closeModal);
      targItem.find('.espressoMath-less').on('click', subtractShot);
      targItem.find('.espressoMath-more').on('click', addShot);

      targItem.animate({
        height: '375px'
        ,marginTop: 0
        ,backgroundColor: 'white'
      }, 350);
      setTimeout(function(){
        optionClone.animate({
          opacity: 1
          ,height: '300px'
        }, 200);
      }, 200);
      console.log(targItem);
    }
    vm.openOptionsFromCart = openOptionsFromCart;
    // vm.closeModal = closeModal;

    function closeCartOptions(){
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
      opEl.animate({
        opacity: 0
      }, 450)
      setTimeout(function(){
        opEl.find('.optionsPart').remove();
        opEl.find('.cartOpClose').remove();
        setTimeout(function(){
          opEl.remove();
        }, 250)
      }, 420)
    }

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
      if(vm.moreOptions === false){
        parentEl.animate({
          height: '425px'
        }, 300);
        parentEl.find('.moreOptionsContainer').animate({
          height: '100px'
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
        parentEl.find('.moreDrinkOps').text('More Drink Options');
        vm.moreOptions = false;
      }
    }
    // vm.openMoreOptions = openMoreOptions;

    function addShot(){
      vm.totalShots++;
      $('.espressoMath-number').text(vm.totalShots);
    }
    vm.addShot = addShot;

    function subtractShot(){
      vm.totalShots--;
      $('.espressoMath-number').text(vm.totalShots);
    }
    vm.subtractShot = subtractShot;

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
        vm.currentOrder.splice(index, 1)
    }

    function submitDrinkOptions(evt) {
      var drinkDetails = {customizations: {}}
      var sizeEl = $('.selected');
      var drinkPrice = vm.currentDrink.price;
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
        ///////put all settings back to zero
        vm.currentOrder.push(drinkDetails);
        vm.totalShots   = 0;
        vm.orderTotalPrice += vm.currentDrink.price;
        vm.moreOptions = false;
        closeModal();
      }
      else {
        alert('Please Choose a Size');
      }
    }
    // vm.submitDrinkOptions = submitDrinkOptions;

    //////functions to open/close shopping carts/////
    function openCart(evt){
      $('.drinkRepeatContainer').animate({
        opacity: 0
      }, 150);
      // setTimeout(function(){
      $('.cartHolder i').animate({
        fontSize: 60+"px"
        ,paddingTop: 0+'px'
        ,paddingRight: 5+'px'
        ,color: 'black'
      }, 250);
      $('.cartModalHolder').animate({
        width: 90+"%"
        ,marginLeft: 0+'%'
        ,marginTop: 40+'px'
        ,paddingTop: 10+'px'
        ,height: 400+"px"
        ,marginRight: 5+"%"
      }, 250);
      // }, 150);
      setTimeout(function(){
        $('.cartModalHolder').prepend(
          "<div class='cartTitle'>Your Order</div>"
        );
        $('.cartModalHolder').animate({
          borderWidth: 5
        }, 300);
      }, 450);
      setTimeout(function(){
        $(".cartTitle").animate({
          opacity: 1
        }, 300);
      }, 500);
      $timeout(function(){
        vm.cartModal = true;
        // addLayer(28, $('.drinkRepeatContainer'));
        // addBlackLayer(29, $('.navContainer'), .1);
      }, 500);
    }
    vm.openCart = function(){
      if(!vm.cartModal){
        openCart();
      }
    };

    ///////function to close the shopping cart
    function closeCart(){
      ////removes the cart and adds it back
      $('#checkout').remove();
      $('.checkoutForm').append(
        "<div id='checkout'></div>"
      );
      $('.cartModalHolder').animate({
        borderWidth: 0
      }, 200);
      // setTimeout(function(){
        $('.cartHolder i').animate({
          fontSize: 30+"px"
          ,paddingTop: 0+'px'
          ,paddingRight: 0+'px'
        }, 250);
        $('.cartModalHolder').animate({
          width: "auto"
          ,marginLeft: 0+'%'
          ,marginTop: 0+'px'
          ,paddingTop: 15+'px'
          ,height: "60px"
          ,marginRight: 0+"%"
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
    vm.getToken = function () {
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
                    url: 'http://192.168.0.3:3000/payments/process',
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
                        ,url: 'http://192.168.0.3:3000/orders'
                        ,data: orderObj
                      })
                      .then(function(data){
                        vm.postCartOpen = true;
                        var orderId = data.data.data._id;
                        //////////we store up to fie localstorage orders on a device, seperated by  an -&-
                        storeLocal(orderId);
                        vm.socket = io.connect('http://192.168.0.3:3000/');
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
        $('.checkoutButton').text('Checkout');
        setTimeout(function(){
          $('.shoppingCartCell').animate({
            opacity: 1
          }, 250);
        }, 200);
        $('.shoppingCartList').animate({
          height: '100%'
        });
        $('.checkoutSubmit').animate({
          height: '0px'
          ,opacity: 0
        }, 150);
        $('.checkoutName').animate({
          opacity: 0
        }, 250);
        setTimeout(function(){
          $('.checkoutName').css({
            marginLeft: '200%'
          });
        }, 255);
        $('.cartModalHolder').animate({
          height: '400px'
        });
        $('.checkoutForm').prepend(
          "<div id='checkout'></div>"
        );
      }
    };

    function storeLocal(newOrderId){
      if(window.localStorage.hasOwnProperty('lastOrder')){
        var stor = window.localStorage.lastOrder;
        var splitStor = stor.split('-&-').splice(0, stor.split('-&-').length-1);
        if(splitStor.length < 5){
          window.localStorage.lastOrder+=newOrderId+"-&-";
        }
        else {
          splitStor = splitStor.reverse();
          splitStor = splitStor.slice(0, 4);
          splitStor = splitStor.reverse();
          splitStor.push(newOrderId+"-&-");
          window.localStorage.lastOrder = splitStor.join('-&-');
        }
      }
      else {
        window.localStorage.lastOrder = newOrderId+"-&-";
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
