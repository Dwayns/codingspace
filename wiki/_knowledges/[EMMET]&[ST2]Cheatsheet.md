[EMMET - SHORTCUTS]  
  **Child: > :**  
  `nav>ul>li`  
  ```html
  <nav>
    <ul>
      <li></li>
    </ul>
  </nav>
  ```

  **Sibling: + :**  
  `div+p+bq`  
  ```
    <div></div>
      <p></p>
    <blockquote></blockquote>
  ```

  **Climb-up: ^ :**  
  `div+div>p>span+em^bq`  
  ```html
  <div></div>
      <div>
      <p><span></span><em></em></p>
      <blockquote></blockquote>
  </div> 
  ```

  **Grouping: () :**  
  `div>(header>ul>li*2>a)+footer>p` 
  ```html 
  <div>
    <header>
      <ul>
        <li><a href=""></a></li>
        <li><a href=""></a></li>
      </ul>
    </header>
    <footer>
      <p></p>
    </footer>
  </div>
  ```

  `(div>dl>(dt+dd)*3)+footer>p`  
  ```html
  <div>
    <dl>
      <dt></dt>
      <dd></dd>
      <dt></dt>
      <dd></dd>
      <dt></dt>
      <dd></dd>
    </dl>
  </div>
  <footer>
    <p></p>
  </footer> 
  ```

  **Multiplication: * :**  
  `ul>li*3`  
  ```html
  <ul>
    <li></li>
    <li></li>
    <li></li>
  </ul> 
  ```

  **Item numbering: $ :**  
  `ul>li.item$*3`  
  ```html
  <ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
  </ul> 
  ```

  `ul>li.item$$$*3`  
  ```html
  <ul>
    <li class="item001"></li>
    <li class="item002"></li>
    <li class="item003"></li>
  </ul> 
  ```

  `h$[title=item$]{header $}*3`  
  ```html
  <h1 title="item">header 1</h1>
  <h2 title="item">header 2</h2>
  <h3 title="item">header 3</h3> 
  ```

---
---

[ST2 - SHORTCUTS]  
  ### GENERAL :  
  **Keypress Command :**  
  `Ctrl + Shift + P`  - Command pallette  
  `Ctrl + / Toggle ` - comment  
  `Ctrl + Shift + /` - Toggle block comment  
  `Ctrl + Space    ` - Show completions  

  ### FILE NAVIGATION :
    Ctrl + P                 Goto Anything
    Ctrl + G                 Goto Line
    Ctrl + R                 Goto symbol (function name, table, etc.)
    Ctrl + Pageup/Pagedown   Goto next/prev file
    Ctrl + K, C             Goto current selection
    Ctrl + Up/Down           Scroll up/down one line (doesn't move cursor)
    Ctrl + F2                Set Bookmark
    Alt + Ctrl + P           Switch Project
    Ctrl+Shift + F2         Clear all bookmarks
    F2 Goto next             bookmark

  ### LINE MANIPULATION :
    Ctrl + ], [     Indent/outdent
    Ctrl + Shift +   Up/Down Swap Line Up/Down
    Ctrl + Shift +   D Duplicate Line 
    Ctrl + Shift +   K Delete line
    Ctrl + J         Join Lines
    Ctrl + X         Cut Line
    Ctrl + V         Paste cut/copied line above
    Ctrl +           Enter Insert line after
    Ctrl +           Shift + Enter Insert Line Before
    F9               Sort Lines
    Ctrl + F9       Sort lines (case-sensitive)

  ### WORD MANIPULATION :
    Ctrl + Delete/Backspace   Delete word forward/backward
    Ctrl + K, K               Delete to end of line
    Ctrl + K, Backspace       Delete to beginning of line
    Ctrl + T                   Transpose (switch characters surrounding cursor)
    Alt + .                   Close Tag
    Ctrl + K,U                Convert to upper
    Ctrl + K,L                 Convert to lower case

  ### SELECTION :
    Ctrl + D              Quick select (repeat to add next)
    Ctrl + U              Undo quick select
    Ctrl + K, D          Skip and quick add next
    Ctrl + Shift + L      Split into lines (adds cursor to each line of current selection)
    Alt + Ctrl + Up/Down Add previous/next line
    Ctrl + L              Expand selection to line
    Ctrl + Shift + Space Expand selection to scope
    Ctrl + Shift + M      Expand selection to brackets
    Ctrl + Shift + J      Expand selection to indentation
    Ctrl + Shift + A      Expand selection to tag

  ### FIND :
    Ctrl + F           Find
    F3                 Find Next
    Ctrl + F3         Find previous
    Ctrl + I           Incremental find
    Ctrl + H           Replace
    Ctrl + Shift + H  Replace next
    Ctrl + F3         Quick Find (find current word)
    Alt + F3           Quick find all
    Ctrl + E           Use selection for find
    Ctrl + Shift + E   Use selection for replace
    Ctrl + Shift + F   Find in files
    F4                 Next result (find in files)
    Shift + F4         Previous result (find in files)

--- ✄ -----------------------
--- ✄ -----------------------