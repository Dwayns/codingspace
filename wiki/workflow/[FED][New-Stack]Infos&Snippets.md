# [FED] [New Stack => App]

  ## Guidelines:  
  ### SVG:  
  Pour les svg : pensez à déposer vos svg dans le dossier default puis dans votre dossier souhaité.(cf: bemile/HipChat Feb282017)

  Pour éviter d'avoir 32 versions de arrow-bottom d'ici décembre, la best practice : déposer le arrow-bottom dans svgs-folder/default/arrow-bottom.svg => faire un lien symbolique. (cf: bemile/HipChat Feb282017)

  [Bad way]  
  *cf: se positionner dans le repo cible (ex: prm/)*

  ```powershell
  ln -s svgs-folder/default/arrow-bottom.svg svgs-folder/mondossier/arrow-bottom.svg
  ```

  *cf: se positionner dans le dossier de destination puis copier en ciblant l'élément cible*

  ```powershell
  ln -s ../default/bubble-checked.svg
  ```

**Utilisation :**
  ```html
  <!-- [HTML] --> 
  <span class="patch-title">
      Nouveau
      <span class="icon-item title-ambiances">
          <svg role="img" class="icon title-ambiances"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/mdm-static/app/images/svgs-def/catalogue-outdoor-defs.svg#shape-title-ambiances"></use></svg>
      </span>
  </span>
  ```

  ```css
  /* [CSS] */
  .patch-title {
    display: inline-block;
    line-height: 0; //warning on mobile there's line-height: 1 !important in theme-normal.css
    margin-top: 28px;
    outline: 1px solid red;
  }

  .icon-item {
    display: inline-block; /* Important =>  dont forget */
    height: 10px;
    width: 90%;

    .title-ambiances {
      fill: $beige-indiankhaki;
      height: 100%;
      width: 100%;
    }
  }
  ```

  **Images call:**
  - data-bgset
  - px units

 
  ```html
  <div class="lazyload" 
  data-bgset="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw== [(max-width: 767px)] | /mdm-static/app/images/catalogues/collection-junior/chambre-ado/large/bg-head-teenager.png [(min-width: 768px)]" 
  data-sizes="auto">
  ```

  - w units
  ```html
  <header class="lazyload" data-optimumx="1.5" 
    data-sizes="auto" 
    data-bgset="/mdm-static/app/images/prm/landing/small/header-bg.jpg 768w, /mdm-static/app/images/prm/landing/medium/header-bg.jpg 1024w, /mdm-static/app/images/prm/landing/large/header-bg.jpg 1280w">&nbsp;</header>
  ```

  - data-srcset
  - multi
  ```html
  <img alt="" data-sizes="auto"
    data-srcset="/mdm-static/app/images/sales/hiver-2017/small/linge-maison.jpg 768w,
    /mdm-static/app/images/sales/hiver-2017/medium/linge-maison.jpg 1024w,
    /mdm-static/app/images/sales/hiver-2017/large/linge-maison.jpg 1280w"
    data-optimumx="1.5"
    class="lazyload img-responsive">
  ```

  - ratio
  ```html
  <img alt=""
    data-sizes="auto"
    data-srcset="/mdm-static/app/images/catalogues/collection-junior/home/small/chambre-bebe.jpg 768w,
    /mdm-static/app/images/catalogues/collection-junior/home/large/@x2/chambre-bebe.jpg 2560w"
    data-optimumx="1.5"
    class="lazyload img-responsive">
  ```

  - unique
  ```html
  <div class="col-xs-12 col-sm-5 bg lazyload" data-bgset="/mdm-static/app/images/catalogues/collection-junior/home/large/catalogue.png" data-sizes="auto"></div>
  ```

  **isMobile :**

  [MDN - Cross-browser testing Feature detection](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection)
    
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

  **Bootstrap :**  
  Screens breakpoints :
  ```scss
  // Extra small screen / phone [foundation: < 767px = @include breakpoint(small)]
  col-xs => $screen-xs: 480px !default;
  @media (min-width: $screen-xs-min)

  // Small screen / tablet [foundation: 768px <> 1023px = @include breakpoint(medium)]
  col-sm => $screen-sm: 768px !default;
  @media (min-width: $screen-sm-min)

  // Medium screen / desktop [foundation = MIX @include breakpoint(medium) && (large)]
  col-md => $screen-md: 992px !default;
  @media (min-width: $screen-md-min)

  // Large screen / wide desktop [foundation: 1280px <> 1439px = @include breakpoint(xlarge)]
  col-lg => $screen-lg: 1200px !default;
  @media (min-width: $screen-lg-min)

  // Extra Large screen / wide desktop [foundation: 1440px > = @include breakpoint(xlarge)]
  col-xl => $screen-xl: 1440px !default;
  @media (min-width: $screen-xl-min)
  ```

Storybook: http://storybook.web.xm/

Sample page: http://www.mdm.local/mdm-static/app/pages/sample/sample.html

  - update with master
  - npm install
  - gulp
  - gulp scripts-vendor

  if not local version
    -> sudo npm config set prefix /usr/local
    -> sudo npm install -g gulp (||npm install --save-dev gulp-install)

    if plugins error
    -> npm install


  