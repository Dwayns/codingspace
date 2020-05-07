# SNIPPETS - BEST PRACTICE - FED

- [SNIPPETS - BEST PRACTICE - FED](#snippets---best-practice---fed)
  - [CSS / SCSS](#css--scss)
    - [Import files :](#import-files)
    - [Mixins :](#mixins)
    - [Extend class :](#extend-class)
    - [Functions :](#functions)
    - [BEM syntax :](#bem-syntax)
    - [**SASS / COMPASS :**](#sass--compass)
      - [Install :](#install)
      - [Activate css :](#activate-css)
    - [RWD](#rwd)
      - [Media query :](#media-query)
      - [Calcul pourcentage elements :](#calcul-pourcentage-elements)
    - [Snippets](#snippets)
    - [Background IMG :](#background-img)
    - [Color variable name :](#color-variable-name)
    - [Selectors :](#selectors)
      - [combinators :](#combinators)
      - [Pseudo class :](#pseudo-class)
      - [Pseudo elements :](#pseudo-elements)
      - [Responsive image :](#responsive-image)
  - [JAVASCRIPT](#javascript)
    - [jQuery :](#jquery)
      - [Check if DOM or Window are ready](#check-if-dom-or-window-are-ready)
      - [Isolate jQuery($) and avoid conflicts](#isolate-jquery-and-avoid-conflicts)
      - [Ajax methods and shorthand](#ajax-methods-and-shorthand)
    - [Vanilla :](#vanilla)
    - [**SNIPPETS**](#snippets-1)
      - [Check element](#check-element)
      - [Device detection [isMobile] :](#device-detection-ismobile)
      - [ScrollTo [JS]:](#scrollto-js)
      - [onLoad methods (Window or DOM)](#onload-methods-window-or-dom)
      - [AJAX request (XHR, Fetch, Axios)](#ajax-request-xhr-fetch-axios)
      - [Fetch](#fetch)

---
---

  ## CSS / SCSS
  ### Import files :
  **Partials :**
  ```scss
  /* Fichier ds le mm rep. EX: "_filename" 
    File in "partials" directory => _filename
  */

  @import 'filename'; /* => one MORE Http request call */

  @import 'partials/filename'; /* => NO Http request call. It's just a partial */
  ```

  **Images :**
  ```scss
  /* SASS will make a sprite of all png in folder */
  @import 'url/folder/*.png';
  @import '../parent_directory/icons/*.png';

  /*Generate all the classes names based on images in sprite*/
  @include all-folder-sprite; 
  @include all-icons-sprite;
  ```

  ```scss
  /*V1*/
  myClass {
    div.class { @include icons-sprite(image-name); /*Only generate the class of specified image*/ }

    div.class:hover { @include icons-sprite(image-name_on); }
  }
  ```

  ```scss
  /*V2*/
  myClass { 
    div.class { 
      @include icons-sprite(image-name); 

      /*Get the real height of this icon(image-name)*/
      height: icons-sprite-width(image-name); 

      /*Get the real width of this icon(image-name)*/
      width: icons-sprite-width(image-name); 
    } 
  }
  ```

  ### Mixins :
  > ALL KIND OF MIXINS CAN BE FOUND ON WEB FOR FREE

  ```scss
  @mixin translateX($val) { /* @mixin translateX($val) have no value by default. If i want set a default value, use : @mixin translateX($val: 10px) */
    -webkit-translateX: translateX($val);
    -moz-translateX: translateX($val);
    -ms-translateX: translateX($val);
    -o-translateX: translateX($val);
    translateX: translateX($val);
  }
  ```

  ```scss
  @mixin fontFace ($fontfamily, $fontweight,$basepath,$basenameNoExtension){
    @font-face {
      font-family: $fontfamily;
      font-style: normal;
      font-weight: $fontweight;
      src: url($basepath + "/" + $basenameNoExtension + ".eot");
      src: url($basepath + "/" + $basenameNoExtension + ".eot?#iefix") format("embedded-opentype"),
      url($basepath + "/" + $basenameNoExtension + ".woff") format("woff"),
      url($basepath + "/" + $basenameNoExtension + ".ttf") format("truetype"),
      url($basepath + "/" + $basenameNoExtension + ".svg") format("svg");
    }
  }
  ```

  ```scss
  /* Use mixin */
  .myClass {
    @include fontFace('ALSSyysScript','normal',$fontsdirectory,'alssyysscript-webfont');
    @include transLateX(10px);
  }
  ```

  ```scss
  // Media query mixin 
  @mixin max-screen($max) {
    // code
  }
  ```

  ### Extend class :
  ```scss
  @extend .[class-name]

  .one {color: #000; font-size: 14px;}
  .two {
    @extend .one; // .one is used => extended
    font-weight: bold;
  }
  ```

  ### Functions :
  ```scss
  @function foo($param1, $param2) {}

  @function heightCalc($param1, $param2) {
    @return $element / $param1 - $element2 / $param2;
  }

  .myClass {
    height : heightCalc(5,8);
  }
  ```

  **Each / Loop:**
  ```scss
  $myCollections : color1 #5aa8be #00758e, color2 #77c4bb #39928b, color3 #ffcb00 #e3a400;

  @each $myCollection in $myCollections {
    &.#{nth($myCollection, 1)} {
      color: nth($myCollection, 2);
      @media (min-width: $screen-sm-min) {
        background-color: nth($myCollection, 2);
        border-color: nth($myCollection, 2);
        color: #fff;
      }
    }
  }
  ```

  --- ✄ -----------------------
  ### BEM syntax :
  ```scss
  .block {
    @at-root #{&}__element {
    }
    @at-root #{&}--modifier {
    }
  }

  /* Author in a nested format, but get CSS that isn't nested, with @at-root. */
  ```

  **Spécifier une propriété selon un class/id d'un parent (cf: body) :**
  ```scss
  /* => & à la fin de la propriété */
  body.lang-fr & {}
  
  .banner_promotion {
    .pick_up_in_store { 
      body.lang-fr & {
        background: url("banner_promo/pick_up_in_store/ccl-hp-pick_up_in_store-free-fr.jpg") top left no-repeat transparent;
      }
    }
  }
  ```

---
[^^^](#snippets---best-practice---fed)

  ### **SASS / COMPASS :**
  #### Install :
  **(THIS IS FOr LINUX/OS X && IF SASS / COMPASS Is NOT ALREADY INSTALL) :**  
  1. Check if ruby is installed => `ruby -v`
  2. `sudo gem install sass` /*OR `sudo gem install compass`. COMPASS need SASS so it's also installed*/
  3. `sass -v`

  **(THIS IS FOr LINUX/OS X && IF SASS / COMPASS Is ALREADY INSTALL) :**  
  V1 :  
  1. create .scss file
  2. [in the [name].scss place] `sass [name].scss [name].css` => *Sass will create [name].css and [name].css.map and watch ONLY ONE TIME*
  3. (2B) [in the [name].scss place] `sass --watch [name].scss:[name].css` => *Sass will create [name].css and [name].css.map and watch/update CONSTENTLY*
  4. (2C) [in the parent directory of 'sass' folder] `sass --watch [sass folder]:[css folder].css` => *Sass will watch/update CONSTENTLY and compile sass files in sass folder to css files in css folder*

  V2 :  
  **Create a new compass project**
  1. Move in the good repertory
  2. compass create project_folder_name OR SPECIFIQ `compass create --sass-dir "sass" -css-dir "css"` 
   => compass generate "sass" & "stylesheet" rep + "config.rb" file)
  3. Move in the project folder
  4. `ls -a` => look in the folder and see all the contents, including hidden files
  1. `compass watch`
   => Start watching the project

  #### Activate css :
  1. Trouver le binome scss/css
  2. Modifier le fichiers .scss et non css
  3. verifier l'emplacement du fichier config.rb

  Dans un nouveau terminal
  1. Se placer dans le dossier contenant le rb
  2. configurer le fichier config.rb selon l'emplacement des éléments (css/images...)
  3. activer compass => "compass watch"

  (Si pas de config.rb)  
  `sass --sourcemap=none --watch sass:css`  
  `sass -- watch sass:css`

  CTRL+C = stopper "compass watch" (désactivation de compass)

  ### RWD
  #### Media query :
  ```css
  @media only screen and () {}
  ```

  #### Calcul pourcentage elements :
  CIBLE ÷ CONTEXTE = RESULTAT x 100  

  Calcul fonts em :  
  1em = 100% (de la taille par défaut)  

  CIBLE ÷ CONTEXTE = RESULTAT x 100 => 12 / 16 = 0.75em | 22 / 16 = 1.375em

---

  ### Snippets
  ### Background IMG :
  ```css
  background: url("") no-repeat center center transparent;
  
  background-size: cover; /*contain*/
  ```

  ### Color variable name :
  ```scss
  $contexte-element-color;

  /* Ex : */
  $header-link-white;
  ```

  **Definir variables :**
  ```scss
  $color-table : #ef4579; /* Couleurs */
  $fontsdirectory : "/common/fonts"; /* Paths */
  $minBreakPoint : 1300px; /* Breakpoints */
  ```

  ### Selectors :
  ```css
  [attr=valeur] => input[name="value"]
  ```

  #### combinators :
  **Adjacent sibling selectors :**  
  The `+` combinator selects nodes that immediately follow the former specified element.
  ```css
  Syntax: A + B
  ```

  **General sibling selectors :**  
  The `~` combinator selects nodes that follow (not necessarily immediately) the former specified element, if both elements shared the same parent.
  ```css
  Syntax: A ~ B
  ```

  **Child selectors :**  
  The `>` combinator selects nodes that are direct children of the former specified element.
  ```css
  Syntax: A > B
  ```

  **Descendant selectors :**  
  The ` ` combinator selects nodes that are children (not necessary direct children) of the former specified element.
  ```css
  Syntax: A B
  ```

  #### Pseudo class :
  ```css
  .breadcrumbs__step:not(:first-child):not(:last-child) &
  ```

  #### Pseudo elements :
  The CSS `::after`: pseudo-element matches a virtual last child of the selected element. It is typically used to add cosmetic content to an element by using the content CSS property. This element is inline by default.

  ```css
  /* CSS2 syntax : */
  element:after  { style properties }

  /* CSS3 syntax : */
  element::after { style properties }

  element::after {
    content: "<- now this *is* exciting!"; 
    color: green;
  }
  ```

  > The `::after` notation (with two colons) was introduced in CSS 3 in order to establish a discrimination between pseudo-classes and pseudo-elements. Browsers also accept the notation :after introduced in CSS 2.

  **DIV auto size to content :**
  ```css
  display: inline-block;
  overflow: auto;
  ```

  #### Responsive image :
  ```css
  background: url() no-repeat center center;
  background-size: cover;
  height: auto;
  max-width: 100%;
  width: 100%;
  ```
  
---
[^^^](#snippet---best-practice---fed)

  ## JAVASCRIPT
  ### jQuery :
  #### Check if DOM or Window are ready
  ```javascript
  $('document').ready(function() {

  });
  
  // OR
  // $() => Shorthand for $( document ).ready()
  $(function() {
    // jQuery stuff
  });

  // OR
  // Passing a named function instead of an anonymous function.
 
  function readyFn( jQuery ) {
      // Code to run when the document is ready.
  }
  
  $( document ).ready( readyFn );
  // or:
  $( window ).on( "load", readyFn );
  ```
  #### Isolate jQuery($) and avoid conflicts
  ```javascript
  (function($, window){
    // use $ here freely if you think any other library might have overridden it outside.
    $(function(){
      // do this after dom is ready
    });
  })(jQuery, window);

  jQuery(function($) { 
    /* jQuery is aliased to $ inside this block even if another library is normally assigned to $ */ 
  });
  ```

  #### Ajax methods and shorthand
  ```javascript
  /* AJAX */
  $.ajax({
    method: 'GET', // POST
    url: 'url',
    // dataType: 'json', // If not specify by defaut a "intelligent guess" will be used
    // data: { name:"Jack", location:"Wwakanda"} // If POST method
  })
    .done(/* function */)
    .fail(/* function */);

  /* GET */
  $.get('url')
    .done(function(data) {
    //console.log(data);
    })
    .fail(function() {
      //console.log('ERROR !');
    });

  /* POST */
  var data = { name: 'Jack', city: 'Kin' };

  $.post('url', data)
    .done(/* function */)
    .fail(/* function */);

  /* getJSON */
  $.getJSON('url')
    .done(/* function */)
    .fail(/* function */);
  ```

  ### Vanilla :
  **querySelectorAll + forEach (fix for IE & FF):**  
  ```javascript
  // querySelector send a nodeList and forEach (for IE and FF) needs a array, so [].slice.call() put the querySelector nodeList in a array.
  var elements = [].slice.call( document.querySelectorAll('selectors') ), 
      elementsTwo = [].slice.call( document.querySelectorAll('.js-toogle-infos') );

  elements.forEach(function(element) {
    console.log(element);

    elementsTwo.forEach(function(elementTwo) {
        console.log(elementTwo);
    });
  }
  ```

  [CSS-Tricks - loop queryselectorall matches](https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/)  
  [Starkoverflow - array prototype slice call work](https://stackoverflow.com/questions/7056925/how-does-array-prototype-slice-call-work)  
  [MDN - Array/slice](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/slice)  
  [Coderwall - use array foreach](https://coderwall.com/p/kvzbpa/don-t-use-array-foreach-use-for-instead)

  **For loop (& get ancestor/parent):**
  ```javascript
  // Get ancestor function
  function getAncestor( elem, selector ) {
      for ( ; elem && elem !== document; elem = elem.parentNode ) {
          if ( elem.matches( selector ) ) return elem;
      }
  }

  var element = document.querySelectorAll(selectors);

  for (var i = 0; i < element.length; i++) {
      element[i].addEventListener('click', function() {
          // Get ancestor
          var ancestorElem = getAncestor(this, '.bl-info-item');
        
          // Matches children in ancestor
          var elementTwo = ancestorElem.querySelectorAll(selectors);

          for(var j = 0; j < elementTwo.length; j++) {
              console.log(elementTwo);
          }
      });
  }
  ```
  [JSPerf - for vs foreach](https://jsperf.com/for-vs-foreach/37)

---

  ### **SNIPPETS**
  #### Check element 
  **Check if element exists:**
  ```javascript
  if ($('#element').length > 0) {
    // exists.
  }
  ```

  **Check if the function exists before calling it to avoid the error:**
  ```javascript
  if (typeof yourFunctionName == 'function') { 
    yourFunctionName(); 
  }
  ```
  #### Device detection [isMobile] :
  ```javascript
  (function( window ) {
    isMobile = false;

    if (matchMedia) {
        var mq = window.matchMedia("(min-width: 768px)");
        mq.addListener(widthChange);
        widthChange(mq);

        function widthChange(mq) {
          if (!mq.matches) {
            isMobile = true;
          } else {
            isMobile = false;
          }
        }
    }
  })(window);
  ```
  [MDN - Cross-browser testing Feature detection](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection)

  #### ScrollTo [JS]:
  **Scroll to target in page:**
  ```javascript
  function scrolltoTarget(blocTarget) {
      var inputTargetTop = blocTarget.offset().top;

      $('body,html').animate({
          scrollTop: inputTargetTop
      }, 800);
  }
  ```

  **Scroll to element in div:**
  ```javascript
  marker.addListener('click', function() {
    var currentContainer = $('class'),
    currentContainerTop = currentContainer.offset().top,
    inputTargetTop = $('class/id').offset().top;

    currentContainer.animate({
        scrollTop: currentContainer.scrollTop() - currentContainerTop + inputTargetTop
    }, 400);
  });
  ```

  No plugin (scroll to):
  ```javascript
  var container = $('div'),
  scrollTo = $('#row_8');

  container.scrollTop(
      scrollTo.offset().top - container.offset().top + container.scrollTop()
  );

  // Or you can animate the scrolling:
  container.animate({
      scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
  });​
  ```

  **jquery animate function:**
  ```javascript
  jQuery.fn.scrollTo = function(elem, speed) { 
      $(this).animate({
          scrollTop:  $(this).scrollTop() - $(this).offset().top + $(elem).offset().top 
      }, speed == undefined ? 1000 : speed); 
      return this; 
  };
  ```

  **jquery no animate function:**
  ```javascript
  jQuery.fn.scrollTo = function(elem) { 
      $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top); 
      return this; 
  };

  $("#overflow_div").scrollTo("#innerItem");
  $("#overflow_div").scrollTo("#innerItem", 2000); //custom animation speed 
  ```
  #### onLoad methods (Window or DOM)
  ```javascript
  // Whole DOM loaded include styles, images and others
  window.onload = function() {
    // console.log("On load !");
  };

  // Whole DOM only loaded
document.addEventListener("DOMContentLoaded", function() {
    // console.log("DOM loadeed !");
  });
  ```
  #### AJAX request (XHR, Fetch, Axios)
  ```javascript
  /* ONREADYSTATECHANGE VERSION */
  // Initiate request
  var XHR = new XMLHttpRequest();

  // Check request state/status
  XHR.onreadystatechange = function() {
      if(XHR.readyState == 4 && XHR.status == 200) {
          console.log(XHR.responseText);
      } else {
          console.log(XHR.status);
      }

  }
  
  // Get url
  XHR.open("GET", "../json/default.json");
  // Specify type of data
  XHR.responseType = 'json';
  // Send request
  XHR.send();
  ```

  ```javascript
  /* ONLOAD VERSION */
  var XHR = new XMLHttpRequest(),
      method = 'GET',
      url = '../json/default.json',
      dataType = 'json';
  
  // Get url
  XHR.open(method, url);

  // Specify type of data
  XHR.responseType = dataType;

  /* onload event is only called if response succeed. So it can replace "XHR.onreadystatechange" verification */
  XHR.onload = function() {
    // Do stuff
  }

  // Send request
  XHR.send();
  ```

  #### Fetch
  ```javascript
  // Request Url that will return promise 
  fetch(url)
  // The promise returns Response object (which contains all informations(status code, type, datas...)) 
  .then(function(response) { 
    console.log(response);
  })
  // If something goes wrong an error will be catched
  .catch(function(error) {
    console.log(error);
  })
  ```
  ```javascript
  /* Fetch with extract data with JSON method */
  fetch(url)
  .then(function(resp) { 
    // parsing JSON response and return an JS object
    return resp.json; 

    /* the return can also be directly chained here */
    //return resp.json.then(function(data) {});
  })
  // return datas of response's object
  .then(function(data) {})
  // The response return
  .catch(function(error) {
    console.log(error);
  })
  ```

  **Fetch options**
  ```javascript
  fetch(url, {
    //By default method is "GET"
    method: "POST",
    // body => Content to display
    body: JSON.stringify ({
      name : 'blue',
      login: 'bluecat'
    })
  })
  .then(function(response) {
    return response.json();
  })
  .catch(function(data) {
    console.log(data.status);
  })
  ```

  **Axios**
  ```javascript
  axios.get(url)
  .then(function(res) {
    console.log(res.data);
  })
  .catch(function(e) {
    console.log(e);
  });
  ```

---
[Top](#snippets---best-practice---fed)
