angular.module('dashboardController', [])

  .controller('dashboardCtrl', dashboardCtrl);

  dashboardCtrl.$inject = ['$http','allPhotos', 'submitPrice', 'rejectPhoto'];

  function dashboardCtrl($http, allPhotos, submitPrice, rejectPhoto){
    //////////////////////////////////
    ////////begin all global variables
    var self = this;
    self.currentTab = "allPhotos";///////////this can be set to "allPhotos", "soldPhotos", or "photoStream"
    self.yesNoPopupVariable = false;
    //////////end all global variables
    //////////////////////////////////

    ///////function to load all Photos
    allPhotos()
    .then(function(photoList){
      self.allPhotos = photoList.data.reverse();
      //////lets add all the sold photos to it's own array
      self.soldPhotos = []
      for (var i = 0; i < self.allPhotos.length; i++) {
        if(self.allPhotos[i].status == 'sold'){
          self.soldPhotos.push(self.allPhotos[i]);

        }
      }
      self.currentPhoto = self.allPhotos[0];
    })

    ////////////function to controler which tab is showing;
    self.tabController = function tabController(event){
      ///////function checks to see which tab you've clicked on (via the classname), and changes self.currentTab to trigger the html ng-if statements for each tab
      var targetClassStream = $(event.currentTarget).hasClass('photoCarouselTab');
      var targetClassAll = $(event.currentTarget).hasClass('photoAllTab');
      var targetClassSold = $(event.currentTarget).hasClass('photoSoldTab');
      if(targetClassStream){
        console.log('stream');
        self.currentTab = "photoStream";
      }
      else if(targetClassAll){
        console.log('all');
        self.currentTab = "allPhotos";
      }
      else if(targetClassSold){
        console.log('sold');
        self.currentTab = "soldPhotos";
      }
    }

    self.yesNoPopup = function(){
      self.yesNoPopupVariable = true;
    }

    /////////////functions to submit accepted photo, with price, to the database
    self.submitSuccessPhoto = function submitSuccessPhoto(photoId){
      var price = $('.popupPrice').val();
      submitPrice(photoId, price)
      .then(function(newPhoto){
        self.soldPhotos.push(newPhoto.data);
        self.yesNoPopupVariable = false;
        //////function to slice out the photo from the allphotos array
        for (var i = 0; i < self.allPhotos.length; i++) {
          if(self.allPhotos[i]._id == photoId){
            self.allPhotos.splice(i, 1);
          }
        }
        self.currentPhoto = self.allPhotos[0];
      })
    }

    self.rejectPhoto = function(photoId){
      rejectPhoto(photoId)
      .then(function(rejectedPhoto){
        console.log(rejectedPhoto);
        console.log(self.allPhotos);
        console.log(self.soldPhotos);
        //////lets clean up the dashboard arrays
        for (var i = 0; i < self.allPhotos.length; i++) {
          if(self.allPhotos[i]._id == rejectedPhoto.data._id){
            self.allPhotos.splice(i, 1);
            console.log(self.allPhotos[i]);
          }
          else if(self.soldPhotos[i]._id == rejectedPhoto.data._id){
            console.log(self.soldPhotos[i]);
            self.soldPhotos.splice(i, 1);
          }
        }
      })
    }

    /////close popup
    self.closePopup = function(){
      self.yesNoPopupVariable = false;
    }

    //////////function to click on a photo to open the photo Popup modal
    self.submitPhoto = function(photo){
      currentPhotoFunc(photo);
      self.yesNoPopupVariable = true;
    }

    ////function to change a the active current photo to a new one
    function currentPhotoFunc(photo){
      //////photo is the whole photo object
      self.currentPhoto = photo;
    }
    self.currentPhotoFunc = currentPhotoFunc;



  }
