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
    - [**Snippets**](#snippets)
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
      - [forEach methods [Array methods]](#foreach-methods-array-methods)
      - [Map methods [Array methods]](#map-methods-array-methods)
      - [Filter methods [Array methods]](#filter-methods-array-methods)
      - [Some methods [Array methods]](#some-methods-array-methods)
      - [Every methods [Array methods]](#every-methods-array-methods)
      - [Reduce methods [Array methods]](#reduce-methods-array-methods)
      - [Closure](#closure)
      - [Create constructor ("new" keyword) [OOP]](#create-constructor-%22new%22-keyword-oop)
      - [Class [OOP]](#class-oop)
      - [Class Methods | Static [OOP]](#class-methods--static-oop)
      - [Inheritance ES2015 | Extends [OOP]](#inheritance-es2015--extends-oop)
      - [Super [OOP]](#super-oop)
      - [Template literals (Template strings)](#template-literals-template-strings)
      - [Object Shorthand Notation [Object]](#object-shorthand-notation-object)
      - [for...of [Loop]](#forof-loop)
      - [Rest](#rest)
      - [Object Rest](#object-rest)
      - [Spread](#spread)
      - [Object Spread](#object-spread)
      - [Destructuring](#destructuring)
      - [Map](#map)
      - [Set](#set)
      - [Promises](#promises)
      - [Generators](#generators)
      - [Object.assign](#objectassign)
      - [Arrray.from](#arrrayfrom)
      - [Find](#find)
      - [FindIndex](#findindex)
      - [Includes](#includes)
      - [Number.isFinite](#numberisfinite)
      - [Exponentiation Operator](#exponentiation-operator)
      - [padStart and padEnd](#padstart-and-padend)
      - [Async Functions](#async-functions)
      - [Await with Promise.all](#await-with-promiseall)
    - [**SNIPPETS**](#snippets-1)
      - [Check element](#check-element)
      - [Device detection [isMobile] :](#device-detection-ismobile)
      - [ScrollTo [JS]:](#scrollto-js)
      - [onLoad methods (Window or DOM)](#onload-methods-window-or-dom)
      - [AJAX request (XHR, Fetch, Axios)](#ajax-request-xhr-fetch-axios)
      - [Fetch / Axios](#fetch--axios)
      - [Transform an arrayLike to an array](#transform-an-arraylike-to-an-array)
      - [Prototype & Inheritance usage [OOP]](#prototype--inheritance-usage-oop)
      - [Rest (with Math.min/floor & concat)](#rest-with-mathminfloor--concat)
  - [bottom](#bottom)

---
---
[-- bottom --](#bottom)

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
  @mixin fontFace ($fontfamily, $fontweight,$basepath,$basenameNoExtension) {
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
[**^^^**](#snippets---best-practice---fed)

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

---
[**^^^**](#snippets---best-practice---fed)


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
[**^^^**](#snippets---best-practice---fed)

  ### **Snippets**
  #### Background IMG :
  ```css
  background: url("") no-repeat center center transparent;
  
  background-size: cover; /*contain*/
  ```

  #### Color variable name :
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

  #### Selectors :
  ```css
  [attr=valeur] => input[name="value"]
  ```

  ##### combinators :
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

  ##### Pseudo class :
  ```css
  .breadcrumbs__step:not(:first-child):not(:last-child) &
  ```

  ##### Pseudo elements :
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

  ##### Responsive image :
  ```css
  background: url() no-repeat center center;
  background-size: cover;
  height: auto;
  max-width: 100%;
  width: 100%;
  ```
  
---
[**^^^**](#snippets---best-practice---fed)

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
  (function($, window) {
    // use $ here freely if you think any other library might have overridden it outside.
    $(function() {
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
---
[**^^^**](#snippets---best-practice---fed)
  
  ### Vanilla :
  #### forEach methods [Array methods]
  > Iterate over an array and returns "undefined" if nothing is returned. Like a function without `return` always returns "undefined".  
  Use `forEach` if the need is to override values in array or change something externely.

  ```javascript
  /* How it works */
  function forEach(array, callback) {
    for(var i = o; i < array.length; i++) {
      callback(array[i], i, array);
    }
  }

  /* Loop in array - Example */
  let myArray = [];

  myArray.forEach(value, index, array) {
    console.log(value, index, array);
  }
  ```
  #### Map methods [Array methods]
  > Creates a new array based values returns and pushed.  
  Use `map` (bit mor friendly) instead `forEach` if the need to get a new array (specially with the same length) returned.

  ```javascript
  /* How it works */
  function map(arr, callback) {
    var newArr = [];
    for(var i = 0; i < array.legth; i++) {
      newArray.push(callback(array[i], i, array));
    }

    return newArray;
  }

  /* Map an array - Example */
  // Extract some values and put them in a new array
  let myArray = [{first:'Tim', last:'Garcia'}, {first:'Matt', last:'Lane'}];

  myArray.map(function(value) {
    return value.first;
  }) // Expected ['Tim', 'Matt]
  ```
  #### Filter methods [Array methods]
  > Always return a boolean(true).
  ```javascript
  /* How it works */
  function filter(array, calback) {
    var newArray= [];

    for(var i = 0; i < array.length; i++) {
      if(callback(array[i], i, array) {
        newArray.push(array[i]);
      }
    }

    return newArray;
  }
  /* Filter an array - Example */
  let myArray = [1,2,3];

  myArray.filter(function(value, index, array) {
    // no need for an if statement
    // just return an expression that evalaute to true or false
    return value > 2
  })
  ```
  #### Some methods [Array methods]
  > Iterate through a array and return a true or false.  
  If the callback returns "true" for at least one value, the entire `some`function returns "true". Otherwise it returns "false"

  ```javascript
  /* How it works */
  function some(array, calback) {
    for(var i = 0; i < array.length; i++) {
      if(callback(array[i], i, array) {
        return true;
      }
    }

    return false;
  }

  /* Some an array - Example */
  let myArray = [1,2,3];

  myArray.some(function(value, index, array) {
    return value > 2;
  }); // true
  ```

  #### Every methods [Array methods]
  > Iterate through a array and return a true or false.  
  If the callback returns "false" for at least one value, the entire `every`function returns "false". Otherwise it returns "true"

  ```javascript
  /* How it works */
  function every(array, calback) {
    for(var i = 0; i < array.length; i++) {
      if(callback(array[i], i, array) === false) {
        return false;
      }
    }
    
    return true;
  }

  /* Every an array - Example */
  let myArray = [1,2,3];

  myArray.every(function(value, index, array) {
    return value > 2;
  }); // false
  ```

  #### Reduce methods [Array methods]
  > Return an accumulated value.
  Always return the new value of accumulator.

  ```javascript
  /* How it works */
  // accumulator is the first value of array, nextValue is the second value of array
  array.reduce(function(accumulator, nextValue, index, array) {
    // Whatever is return here will be the new value of accumulator
  }, optional second parameter); //if second parameter exist it will be the value of accumulator in the first iteration. The first value of array will be nextValue

  /* Reduce an array - with numbers - Example */
  var myArray = [1,2,3,4,5];

  myArray.reduce(function(accumulator, nextVAlue){
    return accumulator = nextVAlue;
  },10); // 25 (11 > 13 > 16 > 20 > 25)

  /* Reduce an array - with string - Example */
  var myArray = ['Tim', 'Matt', 'Colt', 'Elie'];

  myArray.reduce(function(accumulator, nextVAlue){
    return accumulator = nextVAlue;
  },'The instructors are'); // 'The instructors are Tim Matt Colt Elie'

  /* Reduce an array - with objet - Example */
  var myArray = [5,4,1,4,5];

  myArray.reduce(function(accumulator, nextVAlue) {
    if(nextValue in accumulator) {
      accumulator[nextValue]++;
    }  else {
      accumulator[nextValue] = 1;
    }
    return accumulator;
  }, {} );
  ```
---
[**^^^**](#snippets---best-practice---fed)

  #### Closure
  > A function that makes use of variables defined in outer functions that have previously returned.  
  The inner function has to be returned to works.
  CLosure don't remember everything from an outer function. (Just the variable they need)
  >> Closures are usefull for creating private variables

  ```javascript
  /* How it works */
  function outer(a) {
    return function inner(b) { //this function can be anonymous.
      // the inner fn is making use of "a" variable which is defined in outer/parent function called "outer"
      // and by the time "inner" is called, that "outer" has returned this function called "inner" is a closure
      return `${a + b}`;
    }
  }

  /* The inner function can be called right away bien using extra () ... */
  outer(5)(5); //10

  /* ... or the result of the function can be stored in a variable */
  var storeOuter = outer(5);
  storeOuter(5); //10

  /* Closure - Example */
  function outer() {
    var noUsedVar = "This var is not used in inner fn and will be forgot by inner fn";
    var outerVar = "This var can be used by"
    return function inner() {
      return `${outerVar} this inner function`;
    }
  }
  ```

  **Private variables [Closure]**
  ```javascript
  /* Private variable - Closure - Example */
  function counter() {
    var count = 0;
    return function() {
      count++;
      return count;
    }
  }

  var counter1 = counter();
  var counter2 = counter();

  /* Each of this two variables have their own private "count" variable. Counter1 can't impact, modify Counter2 */
  counter1(); //1
  counter1(); //2

  counter2(); //1 
  counter1(); //3

  ```
---
[**^^^**](#snippets---best-practice---fed)

  #### Create constructor ("new" keyword) [OOP]
  > "new" keyword is magically generate our constructor by  
     - Creates a empty object  
     - Sets the keyword "This" to be that empty object  
     - Adds the line "return this"to the end of the function, which follows it  
     - Adds a property onto the empty object called ".__proto__" (which links the prototype on the constructor function to the empty object)
  >> The constructor functions created mimics "classes" and the objects created from them mimics "instances".
  
  ```javascript
  /* A name of constructor function always begin with a Maj */
  function MyObject(arg1, Arg2, arg3) {
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.arg3 = function() {
      return `My first arg : ${this.arg1}`;
    };
  }

  const ampoule = new MyObject(jaune,rond,arg3);
  ```
  ```javascript
  /* Examples */
  function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.numWheels = 4;
  }

  function Motorcylce(make, model, year) {
    Car.call(this, make, model, year);
    this.numWheels = 4;
  }

  function Motorcylce(make, model, year) {
    // Here arguments generate the list of arguments in an array. USefull when a lot of arguments
    Car.apply(this, arguments); // OR Car.apply(this, make, model, year);
    this.numWheels = 4;
  }
  ```

  #### Class [OOP]
  > Use the "class" keyword instead of creating a function. Still use "new" keyword to create objects => Instances/Instance methods of the class object.

  ```javascript
  // ES5
  function Student(firstN, lastN) {
    this.firtsN = firstN;
    this.lastN = lastN;
  }
  
  var yoda = new Student('Yoda', 'Sky');
  ```
  ```javascript
  //ES2015
  class Student {
    constructor(firstN, lastN) {
      this.firtsN = firstN;
      this.lastN = lastN;
    }
  }

  var yoda = new Student('Yoda', 'Sky');
  ```

  **Instance Methods** [OOP]
  > More efficient way to create instance methods

  ```javascript
  // ES5
  function Student(firstN, lastN) {
    this.firtsN = firstN;
    this.lastN = lastN;
  }

  Student.prototype.sayHello = function() {
    return "Hello ' + this.firstN + " " + this.lastN;
  }
  ```
  ```javascript
  //ES2015
  class Student {
    constructor(firstN, lastN) {
      this.firtsN = firstN;
      this.lastN = lastN;
    }
    sayHello() {
      return `Hello ${this.firstN} ${this.lastN}`;
    }
  }
  ```

  #### Class Methods | Static [OOP]
  > Add methods & properties directly on a class. They're called statics.

  ```javascript
  //ES5
  function Student(firstName){
    this.firstName = firstName;
    this.family = [];
  }

  Student.prototype.fullName = function(){
    return `${this.firstName} ${this.lastName}`;
  }

  Student.isStudent = function(obj) {
    return obj.constructor === Student;
  }
  ```
  ```javascript
  //ES2015
  class Student{
    constructor(firstName){
      this.firstName = firstName;
      this.family = [];
    }
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
    static isSutdent(obj) {
      return obj.constructor === Student;
    }
  }

  var Mo = new Student("Momo");
  Student.isStudent(Mo); // true

  var arr = [];
  Student.isStudent(arr); // false
  ```

  #### Inheritance ES2015 | Extends [OOP]
  > Have all the methods of an extended class.

  ```javascript
  //ES5
  function Person(firstName){
    this.firstName = firstName;
    this.family = [];
  }

  Person.prototype.fullName = function(){
    return `${this.firstName} ${this.lastName}`;
  }

  Student.prototype = Object.create(Person.prototype);
  Student.prototype.constructor = Student;
  ```
  ```javascript
  //ES2015
  class Person {
    constructor(firstName){
      this.firstName = firstName;
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    }
  }

  // Here we extend Person properties and method to Student
  class Student extends Person {
    //
  }

  Student.prototype.fullName; // function fullName()...
  Student.prototype.constructor === Student; // true
  ```

  #### Super [OOP]
  > Borrow properties from an object to another.
  Find a method/property by the same name in the parent class

  ```javascript
  class Person {
    constructor(firstName){
      this.firstName = firstName;
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    }
  }

  class Student extends Person {
    constructor() {
      //a
    //Able to use the same methods that is parent/extend class
      super(firstName);
      /* IF multiples arguments */
      //super(...arguments);
    }
  }
  ```
---
[**^^^**](#snippets---best-practice---fed)

  #### Template literals (Template strings)
  ```javascript
  `string text`

  `string text line 1
  string text line 2`

  `string text ${expression} string text`

  tag`string text ${expression} string text`
  ```
  **string substitution** [Template strings]  
  ```javascript
  /* Simple string substitution - Examples */
  var name = "Brendan";
  console.log(`Yo, ${name}!`);

  /* Multi-line strings - Examples */
  // With normal string
  console.log('string text line 1\n' +
  'string text line 2');

  // With template literals
  console.log(`string text line 1
  string text line 2`);
  ```
  **Expression interpolation** [Template strings]
  ```javascript
  // With normal string
  let a = 5;
  let b = 10;
  console.log('Fifteen is ' + (a + b) + ' and\nnot ' + (2 * a + b) + '.'); // "Fifteen is 15 and // not 20."

  // With template literals
  let a = 5;
  let b = 10;
  console.log(`Fifteen is ${a + b} and
  not ${2 * a + b}.`); // "Fifteen is 15 and // not 20."
  ```
  **Case of functions inside expressions** [Template strings]
  ```javascript
  function fn() { return "I am a result. Rarr"; }
  console.log(`foo ${fn()} bar`); //=> foo I am a result. Rarr bar.
  ```
  [Dev-Google - Template-Strings](https://developers.google.com/web/updates/2015/01/ES6-Template-Strings)

  #### Object Shorthand Notation [Object]
  ```javascript
  var firstName = "Yoda",
      lastName = "Sky";

  // ES5
  var instructor = {
    firstName: firstName,
    lastName: lastName
  }
  ```
  ```javascript
  // ES2015
  var instructor = {
    firstName,
    lastName
  }
  ```
  **Object Method** [Object]
  ```javascript
  /* Dont use arrows functions on object method cause you will lose the "this" context */

  // ES5
  var instructor = {
    sayhello: function() {
      return "Hello !";
    }
  }
  ```
  ```javascript
  // ES2015
  var instructor = {
    sayhello() {
      return "Hello !";
    }
  }
  ```
  **Computed Property Names** [Object]
  ```javascript
  // ES5
  var firstName = "Yoda";
  var instructor = {};
  instructor[firstName] = "it's Me";

  instructor.Elie; //"it's Me"
  ```
  ```javascript
  // ES2015
  var firstName = "Yoda";
  var instructor = {
    [firstName]: "it's Me"
  }

  instructor.Elie; //"it's Me"
  ```

  **querySelectorAll + forEach (fix for IE & FF):**  [Loop]
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

  **For loop (& get ancestor/parent):** [Loop]
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

  #### for...of [Loop]
  > Loop iterate over array  
  Can't acces an index  
  Can only be used on data structure with a Symbol.iterator method implemented (=> No objects)
  ```javascript
  var arr = [1,2,3,4,5];
  
  for (let val of arr){

  }
  ```

  #### Rest
  > Collect the remaining arguments to a function and return them to us in an array.
  ```javascript
  // Ex :
  // [ES5] Classic style
  function sumArguments() {
    var argsArray = [].slice.call(arguments);
    return argsArray.reduce(function(acc, next) {
      return acc + next
    });
  }
  // [ES2015] Rest style (Directly returns args as an array)
  var sumArguments = (...args) => args.reduce((acc, next) => acc + next);
  ```

  #### Object Rest

  ```javascript
  var instructor = {first: 'Yoda', last: 'Sky', job: 'farmer', numSibling:3};

  var {first: 'Yoda', last: ...data} = instructor;
  first; // Yoda
  data; // { job: 'farmer', numSibling:3 }
  ```

  #### Spread
  > ...
  ```javascript
  // Ex 1:
  var arr = [3,2,4,1,5];
  Math.max(arr); // NaN
  ```
  ```javascript
  // ES5
  Math.max.apply(this, arr); // 5

  // ES2015
  Math.max(...arr); // 5
  ```
  ```javascript
  /* Ex 2: */
  function sumValues(a,b,c) {
    return a + b + c;
  }
  ```
  ```javascript
  // ES5
  sumValues.apply(this, nums);
  
  // ES2015
  sumValues(...nums);
  ```

  #### Object Spread
  > Spread out keys and values from one object to another

  ```javascript
  var defaults = {job: 'farmer', ownsCat: true, ownsDog: true}

  var matt = {...defaults, ownCat: false};

  var colt = {...defaults, ownDog: false};
  ```

  #### Destructuring
  > Useful for reducing duplication and passing in default parameters as a destructured object

  ```javascript
  // Ex: Object
  var instructor = {
    firstName: "Elie",
    lastName: "Schoppik"
  }
  ```
  ```javascript
  // ES5
  var firstName = instructor.firstName,
      lastName = instructor.lastName;
  ```
  ```javascript
  // ES2015
  var {firstName:first, lastName:last} = instructor;

  firts; // "Elie"
  last; // "Schoppik"
  ```

  > Usefull for swapping variables i array without a separate swap function

  ```javascript
  // Ex: Array
  var arr = [1,2,3];
  ```
  ```javascript
  // ES5
  var a = arr[0]; // 1

  // ES2015
  var [a,b,c] = arr;

  a; //1
  ```
  ```javascript
  /* SWAP EXEMPLE */
  // ES5
  function swap(a,b) {
    var temp = a;
    a = b;
    b = temp;
    return [a,b];
  }

  swap(10,5); // [5,10]
  ```
  ```javascript
  // ES2015
  function swap(a,b) {
    return [a,b] = [b,a];
  }

  swap(10,5); // [5,10]
  ```

  #### Map
  > Data structure also called "hash map" in other languages. Useful for finding a size, use any data type for keys, iterating over keys and values...  
  Useful when creating key value pairs and the keys are not strings.

  ```javascript
  var firstMap = new Map;

  // Keys can be anytype
  firstMap.set(1, 'Yoda');

  var arrKey = [];
  firstMap.set(arrKey, [1,2,3]);

  var objKey = {};
  firstMap.set(objKey, {a:1});
  ```

  **weakMap**
  > Similar to a map but all keys MUST be objects. So more performante than a Map but can not be iterated over.

  #### Set
  > Data structure in which all of the values or unique. Any type of values can exists. Useful for ignoring duplicate values, don't need to identify values with keys or care about ordering values.  
  Useful for creating unique data sets and do not require key value pairs. 

  ```javascript
  var aSet = new Set;
  var aSet2 = new Set([3,1,4,1,2,1,5]); // {3,1,4,2,5}

  aSet.add(10); // {10}
  aSet.size; //1
  aSet.has(10); // true
  aSet.delete(10); //true
  ```

  **weakSet**
  > Similar to a set but all values MUST be objects. So more performante than a Map but can not be iterated over.

---
[**^^^**](#snippets---best-practice---fed)

  #### Promises
  > A one time guaranteed return of some future value. The promise can be resolved/fulfilled or rejected. Usefull for asynchronous. 

  ```javascript
  function disRandTime() {
    return new Promise(function(resolve,reject) {
      setTimeOut(function() {
        if(Math.random() > .5) {
          resolve('Yes');
        } else {
          reject('No');
        }
      }, 1000);
    });
  }

  disRandTime().then(function(value) {
    console.log(value);
  }).catch(function(err) {
    console.log(err);
  });
  ```
  ```javascript
  /*Chaining promises */

  var arr = [];

  $.getJSON('url')
  .then(function(data) {
    years.push(data.info);
    return $.getJSON('url');
  })
  .then(function(data) {
    years.push(data.info);
    console.log(arr);
  })
  .catch(function(err) {
    console.log(err);
  })
  ```

  **Promise.all**
  > Accept an array of promises and resolves all of them or rejects once a single one of the promises has been first rejected (fail fast). Promises dont resolve sequentially but for Promise.all waits for them

  ```javascript
  function getMovie() {
    return $.getJSON('url');
  }

  var firstPromise = getMovie('First');
  var secondPromise = getMovie('Second');
  var thirdPromise = getMovie('Third');

  Promise.all([firstPromise, secondPromise, thirdPromise]).then(function(movie) {
    return movie.forEach(function(value) {
      console.log(value.Year);
    })
  })
  ```

  #### Generators
  > Special kind of function which can pause execution of a function and resume at later/anytime point.

  ```javascript
  // the * of "function*" define the generator
  function* pauseAndReturnVal(num) {
    for(let i = 0; i < num; i++) {
      // Yield is a keyword for the value return from the pause in generator
      yield i;
    }
  }
  
  var gen = pauseAndReturnVal(4);
  ```
  ```javascript
  // Next is a method of the generator object
  // Done is a value return when the function is complete
  gen.next(); // {value: 0, done: false}
  gen.next(); // {value: 1, done: false}
  gen.next(); // {value: 2, done: false}
  gen.next(); // {value: undefined, done: true}
  ```
  ```javascript
  /* A for loop to avoid to repeat "gen.next" */
  for(val of pauseAndReturnVal(4)) {
    console.log(val);
  }
  ```

  #### Object.assign
  > An easy way to create object from another object and not just a reference.

  ```javascript
  // ES5
  var o  = {name: "Yoda"};
  var o2 = o;

  o2.name = "Sky";
  o.name; // become sky
  ```
  ```javascript
  // Es2015
  var o  = {name: "Yoda"};
  var o2 = Object.assign({}, o); // The first parameter needs to be an empty object.

  o2.name = "Sky";
  o.name; //Yoda
  ```

  #### Arrray.from
  > Convert other data types (cf: array-like-object) into arrays.

  ```javascript
  // ES5
  var divs = document.getElementsByTagName("div");
  divs.reduce; // undefined since it's not an actual array
  ```
  ```javascript
  // ES5
  /* We need to convert it in an array */
  var converted = [].slice.call(divs); // convert an array-like-object into an array

  converted.reduce; // function reduce() {...}
  ```
  ```javascript
  // ES2015
  var converted = Array.from(divs);
  ```
  ```javascript
  // ES2015
  var firstSet = new Set([3,1,4,1,2,1,5]); // {3,1,4,2,5}

  var arrayFromSet = Array.from(firstSet); // [3,1,4,2,5]
  ```

  #### Find
  > Usefull way of searching through an array and returning value without having to use a for loop.

  ```javascript
  var instructors = [{name: "Yoda"}, {name: "Sky"}, {name: "Iron"}, {name: "Marvel"}];

  instructors.find(function(val) {
    return val.name = "Iron";
  }); // {name: "Iron"}
  ```

  #### FindIndex
  > Similar to Find but return an index or -1 if the value is not found.

  ```javascript
  var instructors = [{name: "Yoda"}, {name: "Sky"}, {name: "Iron"}, {name: "Marvel"}];

  instructors.findIndex(function(val) {
    return val.name = "Iron";
  }); // 2
  ```

  #### Includes
  > Usefull to find a value in string. Returns a boolean if a value is in a string. (easier than using indexOf).

  ```javascript
  // ES5
  "awesome".indexOf("some") > -1; // true
  ```
  ```javascript
  // ES2015
  "awesome".includes("some"); // true
  ```

  #### Number.isFinite
  > A static method on a number constructor. Usefull to check if a number is not a number.
  (cf: Number.isInteger also exists)

  ```javascript
  // ES5
  function seeIfNumber(val) {
    if(typeof val === "number" && !isNaN(val)) {
      return "It is a number";
    }
  }
  ```
  ```javascript
  // ES2015
  function seeIfNumber(val) {
    if(Number.isFinite(val)) {
      return "It is a number";
    }
  }
  ```

  #### Exponentiation Operator
  ```javascript
  //ES5
  var calcNum = Math.pow(2,4);
  calcNum; // 16

  /* ****** */
  var nums = [1,2,3];
  var total = 2;

  for(let i; i = 0; i >= nums.lenght) {
    total = Math.pow(total,nums[i]);
  };
  ```
  ```javascript
  //ES2016
  var calcNum = 2**4;
  calcNum; // 16

  /* ****** */
  var nums = [1,2,3];
  var total = 2;

  for(let i; i = 0; i >= nums.length) {
    total **= nums[i];
  };
  ```

  #### padStart and padEnd
  > Allow to pad/place a certain charaters a number of times before the start of the pad.
  Useful to make sure that strings are always a certain length.

  ```javascript
  //first parameter is the total length of the new string

  //second parameter is what to pad with from start. (Default is an empty space)

  "awesome".padStart(10); // "   awesome"
  "awesome".padStart(10,'!'); // "!!!awesome"

  /* padEnd */
  "awesome".padEnd(10); // "awesome   "
  "awesome".padEnd(10,'!'); // "awesome!!!"
  ```

  #### Async Functions
  > A special kind of function that using the word **async**. It's simplify writing asynchronous code, specifically Promises.

  > **Await** is reserve keyword that can only be used inside of async functions.  
  Await pauses the execution of the async function and is followed by a promise.  
  The await keywords waits for the promise to resolve and the resumes the async function's execution and returns the resolved value

  ```javascript
  async function first() {
    return "We did it!";
  }
  first(); // return a promise
  first().then(val => console.log(val));
  ```
  ```javascript
  async function getMovieData() {
    console.log("Starting!");
    var movieData = await $.getJSON("url");
    console.log("all done");
  }

  getMovieData();
  ```
  **Object async**
  ```javascript
  var movieCol = {
    data: 'titanic',
    async getMovie() {
      var response = await $.getJSON(`https://omdbapi.com?t=${this.data}&apikey=thewdb`);
      console.log(response);
    }
  }

  movieCol.getMovie();
  ```

  **Class async**
  ```javascript
  class MovieData {
    constructor(name) {
      this.name = name;
    }
    async getMovie() {
      var response = await $.getJSON(`https://omdbapi.com?t=${this.name}&apikey=thewdb`);
      console.log(response);
    }
  }

  var newData = new MovieData('shrek');
  newData.getMovie();
  ```

  **Handling errors**
  > Use try/catch statement

  ```javascript
  async function getUser() {
    try {
      var response = await $.getJSON('URL');
      console.log(response.name);
    } catch(e) {
      console.log('User does not exist');
    }
  }
  ```

  #### Await with Promise.all
  > Usefull for await multiple resolved promises (like http request).

  ```javascript
  async getMovieData(first,second) {
    var movieList = await Promise.all([
      $.getJSON('URL1),
      $.getJSON('URL2);
    ])
    console.log(movieList[0].year);
    console.log(movieList[1].year);
  }

  getMovieData('shrek', 'blade');
  ```

---
[**^^^**](#snippets---best-practice---fed)

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
  ---
  [**^^^**](#snippets---best-practice---fed)

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

  #### Fetch / Axios
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

  #### Transform an arrayLike to an array
  ```javascript
  /* See ES2015 method Array.from instead */
  function arrayLikeToArray(arrayLikeObject) {
    return [].slice.call(arrayLikeObject);
  }
  ```
---
[**^^^**](#snippets---best-practice---fed)

  #### Prototype & Inheritance usage [OOP]
  ```javascript
  function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    isRunning = true;
    // To avoid multiple "duplication" this method has to be added in prototype of Car
    /* this.honk = function() {
      if(this.isRunning) {
        return "Beeeeeeeep";
      }
    } */
  }

  // honk method is added to prototype of Car. More efficient.
  Car.prototype.this.honk = function() {
    if(this.isRunning) {
      return "Beeeeeeeep";
    }
  }
  ```
  ```javascript
  function Person(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
    this.family = [];
  }

  Person.prototype.fullName = function(){
    return `${this.firstName} ${this.lastName}`;
  }

  let toto = new Person('Toto', 'Foo');
  toto.fullname; // Toto Foo

  Person.prototype.addToFamily = function(person){
    // indexOf check if the element to add in array is not a duplicate
    // instanceof check if the object to add is a object construced from the Person constructor
    if(this.family.indexOf(person) === -1 && person instanceof Person){
        this.family.push(person)
    }
    return this.family.length;
  }
  ```

  **Inheritance** [OOP]
  ```javascript
  function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  Person.prototype.sayHi = function() {
    return "Hello " + this.firstName; 
  }

  function Student(firstName, lastName) {
    Person.apply(this, arguments);
  }

  var ella = new Student('Ella', 'Fi');
  ella.lastName // Fi
  ella.sayHi // undefined cause Student has no method "sayHi" onto his prototype.

  /* This duplication is not good cause it's a reference/link to an existing object; not a new object */
  // Student.prototype = Person.prototype;

  /* This duplication will add additionnal unnecessary properties on object (since it's creating an object with undefined properties just for the prototype) */
  // Student.prototype = new Person; 

  // Solution to duplicate an existing object to a new object is the function Object.create()
  Student.prototype = Object.create(Person.prototype);

  // Student need to be rassigned to "Student prototype" instead the heritate "Person.prototype" due to "Object
  Student.prototype.constructor = Student;
  ```
  #### Rest (with Math.min/floor & concat)
  **Smallest value [Math.min and Rest]**
  ```javascript
  /* 
  Write a function called smallestValue which accepts a variable number of parameters and returns the smallest parameters passed to the function.

  Examples:
      smallestValue(5,4,1,121) // 1
  */
  var smallestValue = (...args) => Math.min(...args);
  ```

  **Smallest value [JoinArray and Rest]**
  ```javascript
  /* 
  Write a function called placeInMiddle which accepts two parameters, an array and another array. This function should return the first array with all of the values in the second array placed in the middle of the first array.

  Examples:
      placeInMiddle([1,2,6,7],[3,4,5]) // [1,2,3,4,5,6,7]
  */

  var placeInMiddle (arr, vals) => {
      let mid = Math.floor(arr.length / 2);
      arr.splice(mid, 0, ...args);
      return arr;
  }
  ```
  ```javascript
  /* 
  Write a function called joinArrays which accepts a variable number of parameters (you can assume that each argument to this function will be an array) and returns an array of all of the parameters concatenated together

  Examples:
      joinArrays([1],[3],[0],[7]) // [1,3,0,7]
  */

  var joinArray = (...args) => args.reduce( (acc, next) => acc.concat(next, []) )
  ```

---
[Top](#snippets---best-practice---fed)

---
## bottom
