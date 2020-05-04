# SNIPPETS & Various

  ## Bookmarklet :
  ### Edit cookie : 
  ```javascript
  javascript:document.cookie=prompt('Input%20%22name=value%22');
  (Safari console => document.cookie = "MDM_USER_VERSION=v_2";)
  ```

  **Firebug lite :**
  ```javascript
  javascript:(function(F,i,r,e,b,u,g,L,I,T,E){if(F.getElementById(b))return;E=F[i+'NS']&&F.documentElement.namespaceURI;E=E?F[i+'NS'](E,'script'):F[i]('script');E[r]('id',b);E[r]('src',I+g+T);E[r](b,u);(F[e]('head')[0]||F[e]('body')[0]).appendChild(E);E=new%20Image;E[r]('src',I+L);})(document,'createElement','setAttribute','getElementsByTagName','FirebugLite','4','firebug-lite.js','releases/lite/latest/skin/xp/sprite.png','https://getfirebug.com/','#startOpened');
  ```