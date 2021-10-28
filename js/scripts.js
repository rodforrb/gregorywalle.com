/*!
* Start Bootstrap - New Age v6.0.4 (https://startbootstrap.com/theme/new-age)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-new-age/blob/master/LICENSE)
*/
//
// Scripts
// 

const demoPath = '/demo/'

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});


// Language switcher
jQuery(function ($) {
  
    // Initially disable language switching button.
    $('#switch-lang').css({'pointer-events':'none',
     'cursor':'default'}).attr('disabled','disabled');
  
    function langButtonListen() {
      $('#switch-lang').click(function (event) {
        event.preventDefault();
        $('[lang="en"]').toggle();
        $('[lang="fr"]').toggle();
        // Switch cookie stored language.
        if ($.cookie('lang') === 'en') {
          $.cookie('lang', 'fr', { expires: 7 });
        } else {
          $.cookie('lang', 'en', { expires: 7 });
        }
      });
      // Enable lang switching button.
      $('#switch-lang').css({'pointer-events':'auto',
       'cursor':'pointer'}).removeAttr('disabled');
    }
  
    // Check if language cookie already exists.
    if ($.cookie('lang')) {
      var lang = $.cookie('lang');
      if (lang === 'en') {
        $('[lang="fr"]').hide();
        langButtonListen();
      } else {
        $('[lang="en"]').hide();
        langButtonListen();
      }
    } else {
      // no cookie set, default English
        $('[lang="fr"]').hide();
        $.cookie('lang', 'en', { expires: 7 });
        langButtonListen();


    //   if ("geolocation" in navigator) {
    //     // geolocation is available
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //       // accepted geolocation so figure out which country
    //       var lat = position.coords.latitude,
    //           lng = position.coords.longitude;
    //       $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=true', null, function (response) {
    //         var country = response.results[response.results.length-1].formatted_address;
    //         if (country ===  'France' || country === 'China') {
    //           $('[lang="en"]').hide();
    //           $.cookie('lang', 'fr', { expires: 7 });
    //           langButtonListen();
    //         } else {
    //           $('[lang="fr"]').hide();
    //           $.cookie('lang', 'en', { expires: 7 });
    //           langButtonListen();
    //         }
    //       }).fail(function (err) {
    //         console.log('error: '+err);
    //         $('[lang="fr"]').hide();
    //         $.cookie('lang', 'en', { expires: 7 });
    //         langButtonListen();
    //       });
    //     },
    //     function (error) {
    //       if (error.code == error.PERMISSION_DENIED) {
    //         // denied geolocation
    //         $('[lang="fr"]').hide();
    //         $.cookie('lang', 'en', { expires: 7 });
    //         langButtonListen();
    //       } else {
    //         console.log('Unknown error. Defaulting to English!');
    //         $('[lang="fr"]').hide();
    //         $.cookie('lang', 'en', { expires: 7 });
    //         langButtonListen();
    //       }
    //     });
    //   } else {
    //     // geolocation IS NOT available
    //     $('[lang="fr"]').hide();
    //     $.cookie('lang', 'en', { expires: 7 });
    //     langButtonListen();
    //   }
    }
  });