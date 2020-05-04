# NODEJS/NPM  
> Javascript server environnement / Package manager for developpement in general 

## Node command :
  ```powershell
  #check Node version
  node -v

  #Acces node command
  node

  #Execute node "directives"
  node app 

  #Quit node command
  CTRL + C
  ```

## NPM command :
  ```powershell
  #check npm version
  npm -v 

  #check npm package version
  npm -v package-name

  #start npm
  npm start
  ```

  ```powershell
  #install "node_modules" and dependencies
  npm install

  #Make sure you’ve got the very most recent version of npm using npm itself
  npm install npm -g

  #Install the package globally - [-g for indicate a global installation]
  npm install package-name -g  

  #Install a package specific version
  npm install package-name@0.0.0

  #Install globally the last package version
  npm install package-name@latest -g

  #options :
    #Package will appear in your dependencies.
    -S, --save: 
    #Package will appear in your devDependencies.
    -D, --save-dev: 
    #Package will appear in your optionalDependencies.
    -O, --save-optional: 

  #uninstall "node_modules" and dependencies
  npm uninstall

  #unInstall the package globally
  npm uninstall package-name -g
  ```
  [npm install](https://docs.npmjs.com/cli/install)  
  [npm dependencies](http://zhiye.li/2014-06-23-npm-dependencies-and-devDependencies.html)


  ```powershell
  #Cloning a module from Github
  npm link

  #Unlinking a npm package from an application
  npm unlink package-name

  #Unlinking a npm package from your system
  npm unlink
  ```
  ```powershell
  #Create a new npm package
  npm init
  ```

  ```powershell
  #show locally all installed packages and related versions
  npm list

  #show gloabally all installed packages and related versions
  npm list -g

  #show locally all installed packages and related versions without dependencies
  npm list -g --depth=0

  #show latest version of package
  npm show package-name version
  ```

---

## INSTALL PROCESS IN NODE.JS:
  1. Download the package on nodejs.org  
    [For Linux/Debian](https://github.com/nodesource/distributions#debinstall)  
      - `sudo su` (If administrator rights need)
      - `curl -sL https://deb.nodesource.com/setup_5.x | bash` (Go to url et execute/setup the bash)
      - `apt-get install -y nodejs` (Install the package)
 
  2. Check if you can see the version => well done..
        node -v

## Create a node server :
  **Creation :**  
    ```php
    var http = require('http');
    http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
    }).listen(port, 'ip'); 
    console.log('Serveur accessible via http://ip:port/');
    ```  

  **Execution :**
  ```powershell
  node start
  ```

  Serveur accessible via http://ip:port/ 

## PROCESS IN NODE.JS  
### **Task:** 
  - Create Todolist:  
    - Create new list for new user session
    - Add tasks via form
    - Remove tasks via cross button
    - Store list tasks via user session

### **Process:**
  - 1. Create our project directory
  - 2. Configure modules via package.json file
    - A. List needed modules
    - B. Create package.json file (cf: configuration)
  - 3. Install dependencies in project directory
    -> `npm install`
  - 4. Configure directives & app.js file (cf: directives)
      // Load frameworks and middlewraes
      var variableName = require('middlewareName'); => cf: var express = require('express');
    - A. List routes of applications (cf: urls by functionalties)
    - B. Create routes:
      // For receive datas
      .get('/url', function(req, res) { ... });
      // For send datas
      .post('/url/', function(req, res) { ... });
    - C. List middlewares needed (middleware = short software that links/helps programs)
    -> Create middlewares in app.js file :
      - Middleware for users sessions => cookie-session
      - Middleware for users sessions =>  body-parser

---
---

  ## EXPRESS Framework methods/properties/events :
  - app.get(name) | app.get(path, callback [, callback ...]) => returns value or returns (receive) HTTP GET requests to the specified path 
  - app.post(path, callback [, callback ...]) => returns (send) HTTP GET requests to the specified path
  - app.set(name, value) => assigns setting name to value
  - app.use([path,] function [, function...]) => mounts the middleware function(s) at the path
  - .listen => binds and listens for connections on the specified host and port

  Response methods/properties/events :
  - res.end => ends the response process without any data. If you need to respond with data, instead use methods such as res.send() and res.json()
  - res.json => sends a JSON response
  - res.render => renders a view and sends the rendered HTML string to the client
  - res.send => sends the HTTP response
  - res.setHeader => return header informations



/////////////////////////// *** ///////////////////////////
Install process :
  - Install node package
  - install express package (in tmp directory)

Write with node (in terminal) :
  (Acces node command)
  - node 
  (Quit node command)
  - Quit node
  - console.log("Hello world")

Install NPM (locally) in directory :
  (configure dependencies..etc)
  [name : Name of application, version: version of application, dependecies: needed modules for application]
  (
    version: "0.1.0" = "major-version.minor-version.patch-number"
    "~0.1.0" = updates the most recent minor version (ex: 0 1.x) but not 0.2.0 [Reasonably]
    "^0.1.0" = updates the most recent major version (ex: 0.x.x) but not 1.0.0 [Compatible]
    )
  - configure package.json 
  (install "node_modules" and dependencies)
  - npm install
  (file for manage server. We use javascript here for everything)
  - touch app.js 

Statics routes :
  - Create the target directory
  - install npm
  - create app.js file
  - configure app.js file (with "app.use")
  - create directory for static files
  - commnand "node app" to execute node directives (No need to execute command for css and html changes. For app.js changes, needs execute command)

Express (dynamic) routes :
  - configure app.js file (with "app.get" / res.send)

View / View engine with EJS/Jade :
  - add EJS/jade in dependencies
  - npm install
  - add "views" directory
  (file.ejs, is a html file with dynamic js/html includes => "<% JS exceute %>", "<%= Dynamic HTML render %>")
  - add file.ejs/jade in "views" directory
  - configure views in app.js (with "app.get" / res.render)
  - node app

