# TWIG - CHEATSHEET

  ## **BEST-PRACTICES**
  ### Templating:
  ```twig
  {% block title %}{% endblock %}
  {% block stylesheets %}{% endblock %}
  {% block javascripts %}{% endblock %}
  ```

  **Extend parent:**  
  ```twig
  {% extends 'parent/skeleton file' %}

  <!-- ex: --> 
  {% extends 'MdmOrderBundle:Layouts:layout.html.twig' %}
  ```

  **Heritage from parent:**  
  ```twig
  {% block tag %}
    <!-- Content to overide from parent with the same block tag -->
  {% endblock %}

  <!-- ex: -->
  <!-- #1 -->
  {% block header %}
    <h1 class="logo">logo<div> 
  {% endblock %}
  
  <!-- parent function: -->
  <!-- #2 -->
  {% block header %}
    <h1 class="logo">logo<div>  

  {{ parent() }} <!-- preserve parent content -->
  {% endblock %}
  ```

  **Include TPL:**
  ```twig
  {% include 'path template' %}

  <!-- ex: --> 
  {% include 'MdmOrderBundle:Header:header.html.twig' %}
  ```

  **Syntax :**
  ```twig
  <link rel="stylesheet" href="{{ static_css('main.css') }}">

  <script type="text/javascript" src="{{ static_js('vendor.js') }}"></script>

  <!-- *static_css and static_js are defined in app/config/mdm/static.yml -->
  ```
