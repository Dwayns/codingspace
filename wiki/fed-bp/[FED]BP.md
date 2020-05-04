# BEST PRACTICE - FED

- [BEST PRACTICE - FED](#best-practice---fed)
  - [Advices](#advices)
  - [Architecture / Semantics](#architecture--semantics)
  - [Standard :](#standard)
    - [Code :](#code)
    - [Code formatting / Naming conventions :](#code-formatting--naming-conventions)
    - [File and folder structure :](#file-and-folder-structure)
    - [Semantics rules :](#semantics-rules)
    - [Architecture :](#architecture)
    - [CSS / BEM (Block, Element, Modifier) :](#css--bem-block-element-modifier)
    - [Reset VS Normalize :](#reset-vs-normalize)
    - [Fonts :](#fonts)
    - [JavaScript :](#javascript)
      - [Specific-class :](#specific-class)
      - [Variable Names and Types :](#variable-names-and-types)
    - [RWD :](#rwd)
      - [Progressive enhancement :](#progressive-enhancement)
      - [Mobilie first :](#mobilie-first)
      - [Media queries :](#media-queries)
      - [Responsive Images :](#responsive-images)
    - [Cross-browser :](#cross-browser)

---
---

  ## Advices
  > MDN comes pretty close to manual for front-end development. 
  Prefix any search engine query with `mdn` -- for example, `mdn javascript arrays` -- in order to avoid the for-profit plague that is w3schools

  > Reading about these things won't make you an expert, or even moderately skilled -- the only surefire way to get better at a thing is to do that thing.

  ## Architecture / Semantics
  > "Clever code does not mean good code"

  > "Solutions should be as simple and clear as possible"
  
  > "creating code that must be read and understood by others and myself later"
  
  > "Use the same patterns between team members"

  ## Standard :
  **Strict a separation of concerns:**  
    *Semantic HyperText Markup Language (HTML)* for structure  
    *Cascading Style Sheets (CSS)* for presentation  
    *JavaScript (JS)* for behavior and interaction

  ### Code :
  - Use of whitespace, comments, and descriptive variable names as appropriate for writing easy-to-read code.

  - Separate page grids and containers from the content.  

  - Create baseline components which may be extended by other styles.  

  - JavaScript should be used sparingly / The decision to add more - scripts to a Web page should be made carefully  
  - Have the performance overhead and file size evaluated (JS)  
  - Perform only the necessary tasks without needless overhead. (JS)  
  - Have maintainability carefully assessed. (JS)  
  - Fast, efficient, and perform well. (JS)  
  - Re-usable if possible. (JS)  
  - Not conflict with other code on a given page or sets of pages. (JS)  
  - Executed only when necessary on a given page or sets of pages. (JS)  
  - Consider if failures / errors happen. (JS)  
  - Becareful about memory leaks. Use Limit Events / Event Delegation (JS)  

  **Clean, Clear, Organized, Readable Code**

  ### Code formatting / Naming conventions :
  Component :
  ```css
  /* core component */
  .component { ... }
  
  /* component elements */
  .component-header { ... }
  .component-content { ... }
  
  /* component descendant */
  .component-content-group { ... }
  
  /* component descendant element */
  .component-content-group-header { ... }
  .component-content-group-imgs { ... }

  /*components name ex: 
  navbar, footer, page-info, article-date, lead, widgetfoo...*/
  ```

  **Components are a high level concept for organizing CSS files and rules. A component simply means a grouped set of rules pertaining to an object or set of related objects on a page.**

  
  Modifiers :
  ```css
  .mod-modifier-a { ... }
  .mod-modifier-b { ... }
  .component-header.mod-modifier-a { ... }

  /* If you need to extend an existing component then create distinct modifier classes with the prefix mod- to easily indicate that it is a modifier and not a complete style. */
  ```

  State :
  ```css
    .component-group.is-full { ... } 
    .component-group.is-expired { ... }

  /* A state for an element or component is presentation information for a given component. This may be a dynamic state set by JavaScript or a user interaction, but not always */
  ```

  Utilities :
  ```css
  .u-scroll-infobox {}

  /* A utility is a type of component modifier that is specifically designed to be used on more than one component type. If it was restricted to a single component, it would simply be a modifier. */
  ```

  Color variable name :
  ```scss
  $contexte-element-color;
  ```

  Ex : 
  ```scss
  $header-link-white;
  ```

  JavaScript (JS) Prefix :
  ```html
  class="js-class"
  ```

---
[^^^](#best-practice---fed)

  ### File and folder structure :
  ex:  
  - my-project
    - resources
      - css  
        - one-theme  
          background.png
        - images  
          background.png
        - default-theme.css
        - my-index.css
      - js
        my-index.js
      - images
        - products  
            product.jpg
        my-company-logo-small.png
        my-company-logo-large.png
      - data  
        some-data.json  
        more-data.xml  
        table-data.csv  
        extra-data.txt  
    - vendors
      - jquery
        - images
          ajax-loader.gif
        jquery.min.js
        jquery.mobile-1.1.0.min.css
        jquery.mobile-1.1.0.min.js
      - some-css-library
      - some-plugin.jquery
    - my-index.html

---

  ### Semantics rules :
  **Classes :**
  - Have to be semantic (Meaning and purpose).  
  - Have to be useful for developers (what the element going to do).  
    ```html
    <div class="news"><h2>News</h2>[news content]</div>

    <!-- class "news" don't give you information about the architectural structure of the component, and it cannot be used   with content that isn’t “news”. -->
    ```
  
  **The most reusable components are those with class names that are independent of the content.**

  - use generic classes
  ```html
  .left {float:left}  
  .right {float:right}
  ```
  ### Architecture :
  => Build pages as a library of components (reusability)  

  **Markup :**  
  - Two tabs indentation
  - Reduce the number of elements on the page
  - Use a common HTML5 polyfill or HTML5 Shiv for older devices' browsers new tags compatibilty

  **Component/template/object-oriented :**  
  - The aim of a component/template/object-oriented architecture is to be able to develop a limited number of reusable components that can contain a range of different content types.

  **Component modifiers :**  
  - Components often have variants with slightly different presentations from the base component. Use one of this two mains patterns to create these component variants
  ex :
  single-class pattern :
  ```css
  .btn, .btn-primary { /* button template styles */ }
  
  .btn-primary { /* styles specific to save button */ }
  
  <button class="btn">Default</button>
  <button class="btn-primary">Login</button>
  ```

  multi-class pattern :
  ```css
  .btn, .btn-primary { /* button template styles */ }

  .btn-primary { /* styles specific to save button */ }
  
  <button class="btn">Default</button>
  <button class="btn-primary">Login</button>
  ```

  [html-semantics-front-end-architecture](http://nicolasgallagher.com/about-html-semantics-front-end-architecture/)

  ### CSS / BEM (Block, Element, Modifier) :
  ```css
  /* Block COMPONENT */
  .btn {}
  
  /* ELEMENT that depends upon the block // A child */ 
  .btn__price {}
  
  /* MODIFIER that changes the style of the block // A state or differente version */
  .btn--orange {} 
  .btn--big {}
  ```

  ```html
  <a class="btn btn--big btn--orange" href="http://css-tricks.com">
    <span class="btn__price">$9.99</span>
    <span class="btn__text">Subscribe</span>
  </a>
  ```

  - A block (such as .nav) should never override the styles of another block or modifier.
  - Never overriding modifiers in an unrelated block.
  - Avoiding making unnecessary parent elements when the child can exist quite happily by itself.

  ```css
  .personne {} /* component */
  .personne--femme {} /* differente version of component => modifier */
    .personne__main {} /* a element of personne => element */
    .personne__main--gauche {} /* differente version of element => modifier */
    .personne__main--droite {} /* differente version of element => modifier */
  ```

  ### Reset VS Normalize :
  **Reset** =
  - CSS resets aim to remove all built-in browser styling
  - 

  **Normalize** :
  - Preserves useful defaults rather than "unstyling" everything
  - Corrects some common bugs that are out of scope for reset.css
  - Doesn't clutter your dev tools
  - Is more modular
  - Has better documentation

  ### Fonts :
  **em :**  
  The pixel value you end up with is a multiplication of the font size on the element being styled.

  ```css
  if a div has a font size of 18px, 10em would equate to 180px, i.e. 10 x 18 = 180.
  
  .div {font-size: 18px; padding: 10rem;} => font-size: 16px; padding: 179.99999px (180px);
  ```

  > It’s a somewhat widespread misconception that em units are relative to the font size of the parent element. In fact, as per the W3 spec, they are relative to the font size “of the element on which they are used”. => em units are relative to the font size of the element they’re used on, (not the parent element).

  ```css 
  <div class="wrapper">
    <div class="inheritance_demo box">
    Inheritance with em units demo
    </div>
  </div>

  html {font-size: 16px} 
  .wrapper {font-size: 1.25em;} 
  .inheritance_demo {font-size: 14px; padding: 1.5em;}
  ```

  **rem :**  
  The pixel size they translate to depends on the font size of the root element of the page (i.e: html element)
  with a root element font size of 16px, 10rem would equate to 160px, i.e. 10 x 16 = 160. 

  ```css
  html {font-size: 16px; padding: 10rem;} => font-size: 16px; padding: 160px;
  ```

  > By default browsers usually have a font size of 16px. 
  The root html element inherits its font size from the settings in the browser, unless overridden with an explicitly set fixed value.

  **Good practice :  
  px at the Root, rem for Components, em for Text Elements**

---
[^^^](#best-practice---fed)

  ### JavaScript :
  #### Specific-class :
  ```html 
  js-* 
  ```

  ```html
    <a href="/login" class="btn btn-primary js-login"></a>
  ```

  > Help to reduce the risk that thematic or structural changes to components will break any JavaScript that is also applied

  #### Variable Names and Types :
  - Variable names should be camelCase.  
  - Objects, classes, and name-spaces should be TitleCase.  
  - Boolean values should be prefixed with is if at all possible.  
  - Cached jQuery objects can be prefixed with $.  
  - Use shorthand versions of empty Arrays and Objects.  

  ```javascript
  // some examples
  var exampleValue = 'my example variable value';
  var numberOfTimes = 3;

  // booleans
  var isThisWorking = true;
  var isNotWorking = 0;

  // cache a selector
  var $body = $('body');

  // short hand objects and arrays
  var newObject = {};
  var newArray = [];
  ```

  ### RWD :
  - Percentage-based grids,
  - flexible images that scale,
  - and CSS media queries.

  - Always design and develop the mobile UX first
  - Set the baseline Media Queries
  - Add additional Media Queries
  - Build for speed (load time and interaction) / Be careful of images
  - Test on real hardware
  - A mobile browser is not a small desktop browser. (They are frequently woefully different (or a totally different product))

  #### Progressive enhancement :
  > it is recommended to start with building the mobile experience first

  #### Mobilie first :
  Starting small, and work upwards. Use min-width, not max-width breakpoint definitions).

  Begin with global content styles that apply across all breakpoints.

  **Mobile first pattern :**
  - Innovate for your smallest reasonable target device.
  - Then start "sizing your window up" until the user experience or the design degrades.
  - Add in a breakpoint and make some design modifications to fix the degradation.
  - Resume sizing up your view port until you reach a similar breakdown in design and repeat this exercise.

  #### Media queries :
  > Don’t specify vendor- or device-specific widths
  Let the content and the design dictate the breakpoints.

  - All modern browsers support CSS3 Media Queries  
  - IE8 and below do not support Media Queries (Respond.js (and similar JavaScript libraries) can be used to enable support for Media Queries in these older browsers)  
  - Feature detection (with the likes of Modernizr) or with IE conditional statements and optionally including additional CSS style sheets.  
  - Next, add the styles that are seen below the smallest break point -- remember that using the min-width approach means that the "first breakpoint" will not be for small screens (like mobile size screens) but rather for larger ones (like mobile landscape or phablet size screens).
  - From here add additional styles at successive breakpoints using min-width media queries leveraging the CSS cascade to progressively add additional styles.

  ```css
  @media(min-width: 600px) { /*800px, 1400px*/
    .hero {
      /* just the new stuff here, no need to be repetitive... */   
    }  
  }
  ```

  #### Responsive Images :
  - Always optimize your images using a tool
  - Run all images though a lossless compressor like Compressor.io, Smush.it or ImageOptim (which has related tools also available as build-time scripts)

  > The choiced solution will be obsolete very soon, so be sure to stay on top of current trends.

  **Vector Graphics :**  
  **Web fonts:** => Fonts are vectors.   
  - Pros: this option allows for easy control of vector color, size and usage
  - Cons: all of the vectors single color and must be grouped others in one file.

  **S=> VG:** => SVG is an XML syntax for describing vector shapes.
  - Pros: vectors can be manipulated by CSS and/or JavaScript and allows for complex filters, animations and transitions.
  - Cons: SVG is only supported by IE9+

  ### Cross-browser :

  ---
  [Top](#best-practice---fed)

