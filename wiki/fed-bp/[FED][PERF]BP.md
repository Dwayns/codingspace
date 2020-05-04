# PERFORMANCES - BEST PRACTICE - FED

- [PERFORMANCES - BEST PRACTICE - FED](#performances---best-practice---fed)
  - [Perfomances articles](#perfomances-articles)
  - [Rendering performance:](#rendering-performance)
  - [The pixel pipeline:](#the-pixel-pipeline)
  - [Optimize JavaScript Execution:](#optimize-javascript-execution)
  - [Reduce the Scope and Complexity of Style Calculations:](#reduce-the-scope-and-complexity-of-style-calculations)
  - [Avoid Large, Complex Layouts and Layout Thrashing:](#avoid-large-complex-layouts-and-layout-thrashing)
  - [Simplify Paint Complexity and Reduce Paint Areas:](#simplify-paint-complexity-and-reduce-paint-areas)
    - [Optimisation Steps:](#optimisation-steps)
      - [Speed :](#speed)
      - [Compression :](#compression)

---
---
  ## Perfomances articles
  [Smashingmag - Performance checklist 2018](https://www.smashingmagazine.com/2018/01/front-end-performance-checklist-2018-pdf-pages/)  
  [Smashingmag - Fundamentals performance rendering](https://developers.google.com/web/fundamentals/performance/rendering/)

  ## Rendering performance:
  > "Most devices refresh screens 60 times a second" 
  - => Frames budget = 16ms (1 second / 60) BUT for browser's housekeeping = 10ms

  - First meaningful paint => < 1000ms

  **RAIL** (a user-centric performance model):
  - **Response** => respond in under 100ms (to user input before they notice a lag).
  - **Animation** => produce a frame in 10ms (Animations aren't just fancy UI effects).
  - **Idle** => maximize idle time (Use idle time to complete deferred work).
  - **Load** => deliver content under 1000ms (Load your site in under 1 second).

  ## The pixel pipeline:
  - 1. ***JS / CSS > Style > Layout > Paint > Composite*** (“layout” property changes, like element’s geometry, like its width, height, or its position  => the browser will have to check all the other elements and “reflow” the page => repaint)
  - 2. ***JS / CSS > Style > Paint > Composite*** (“paint only” property changes, like a background image, text color, or shadows => the browser skips layout but it will still do paint)
  - 3. ***JS / CSS > Style > Composite*** (change a property that requires neither layout nor paint => the browser jumps to just do compositing)

  > "Performance is the art of avoiding work, and making any work you do as efficient as possible."

  ## Optimize JavaScript Execution:
  - Use requestAnimationFrame for visual changes (Avoid Avoid setTimeout or setInterval for visual updates).
  - Reduce complexity or use Web Workers => Move long-running JavaScript off the main thread to Web Workers || Use micro-tasks to make DOM changes over several frames.
  - Know your JavaScript’s “frame tax” => Use Chrome DevTools’ Timeline and JavaScript Profiler to assess the impact of JavaScript.

  ## Reduce the Scope and Complexity of Style Calculations:
  - Reduce the complexity of your selectors (cf: use a class-centric methodology like BEM) => make selectors simple (".final-box-title" instead ".box:nth-last-child(-n+1) .title").
  - Reduce the number of elements on which style calculation must be calculated.
  - Measure your Style Recalculation Cost.

  > "Changing the DOM, through adding and removing elements, changing attributes, classes, or through animation, will all cause the browser to recalculate element styles and, in many cases, layout (or reflow) the page, or parts of it. This process is called computed style calculation."

  ## Avoid Large, Complex Layouts and Layout Thrashing:
  - The number of elements that require layout => Avoid layout wherever possible (cf: “geometric properties”, such as widths, heights, left, or top).
  - The complexity of those layouts and Use flexbox over older layout models.

  ## Simplify Paint Complexity and Reduce Paint Areas:
  - Reduce paint areas (Reducing paint areas is often a case of orchestrating your animations and transitions to not overlap as much, or finding ways to avoid animating certain parts of the page.)
  - Simplify paint complexity (Ask yourself if it’s possible to use a cheaper set of styles or alternative means to get to your end result).
  - Use Chrome DevTools to quickly identify paint bottlenecks => Go to the rendering tab in the panel that appears and choose “Show paint rectangles”.

  > "Paint is often the most expensive part of the pixel pipeline; avoid it where you can."

---

  ### Optimisation Steps:
    - Make a performance budget
     -> Be 20% faster than competitors

  #### Speed :
  - Start with global styles that apply across all breakpoints. (
    Optionally in-line these vital styles for faster initial render time
  - Consider every HTTP request
  - Load the least amount of JavaScript that is needed
    Wherever possible include script files at the end of your HTML document 
  - Advanced CSS3 techniques are easy to implement, but when you start combining them, rendering and scrolling performance can be affected.
  - Be careful of images
    Use a responsive image pattern that starts by serving a mobile optimized

  #### Compression :
  - Images
  - Minify CSS / JS
  - Zip files

    
    
    