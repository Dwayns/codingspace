# YARN 
> (Package manager for your code. Yarn does this quickly, securely, and reliably so you don’t ever have to worry.)

---
---
- [YARN](#yarn)
  - [[Adding a Development Dependency to a Project]](#adding-a-development-dependency-to-a-project)
  - [[Adding a Production Dependency to a Project]](#adding-a-production-dependency-to-a-project)
  - [[Installing a Package Globally]](#installing-a-package-globally)
  - [[Removing a Dependency From a Project]](#removing-a-dependency-from-a-project)
  - [[Uninstalling a Package Globally]](#uninstalling-a-package-globally)
  - [[Clean cache]](#clean-cache)
  - [[Upgrade package]](#upgrade-package)
  - [[Check version]](#check-version)
  - [**Install process :**](#install-process)

---
---

/////////// **NPM VS YARN CLI COMMANDS COMPARISON** ///////////  
```
npm (v5) 	                                    Yarn  
npm install 	                                yarn add 
(N/A) 	                                        yarn add --flat  
(N/A) 	                                        yarn add --har  
npm install --no-package-lock 	                yarn add --no-lockfile  
(N/A) 	                                        yarn add --pure-lockfile
```

## [Adding a Development Dependency to a Project]
```powershell
npm install [package] --save-dev 	            yarn add [package] --dev    
##Shorthand version  
npm i -D [package]                              yarn add -D [package]  
```
## [Adding a Production Dependency to a Project]  
```powershell
npm install [package] --save 	                yarn add [package]    
##Shorthand version  
npm i -P [package]                              ""  

(N/A) 	                                        yarn add [package] --peer
npm install [package] --save-optional 	        yarn add [package] --optional
npm install [package] --save-exact 	            yarn add [package] --exact
(N/A) 	                                        yarn add [package] --tilde  
```

## [Installing a Package Globally]  
```powershell
npm install [package] --global 	                yarn global add [package]  
##Shorthand version  
npm i -g [package]                              ""
```

## [Removing a Dependency From a Project]  
```powershell
npm uninstall [package] 	                    yarn remove [package]  
##Shorthand version  
npm r [package]                                 ""  
```

## [Uninstalling a Package Globally]  
```powershell
npm uninstall --global [package]                yarn global remove [package]  
##Shorthand version  
$ npm r -g [package]                            ""  
```

## [Clean cache]  
```powershell
npm cache clean 	                            yarn cache clean [package]  
```

## [Upgrade package]  
```powershell
npm upgrade                          	          yarn upgrade
rm -rf node_modules && npm install

npm update --global                   	          yarn global upgrade                    
npm rebuild 	                                  yarn add --force  
```

## [Check version]  
```powershell
npm version major                     	        yarn version --major                  
npm version minor                     	        yarn version --minor                  
npm version patch                     	        yarn version --patch  
```


/////////////////////////// *** ///////////////////////////
## **Install process :**
  - Installing all the dependencies of project  
  `yarn` or `yarn install`

  - Starting a new project  
  `yarn init`

  - Adding a dependency  
  `yarn add [package]` or (`[package]@[version], [package]@[tag]`)

  - Upgrading a dependency  
  `yarn upgrade [package]` or (`[package]@[version], [package]@[tag]`)

  - Removing a dependency  
  `yarn remove [package]`


---
```powershell
### PATH WARNING MESSAGE
### icu4c is keg-only, which means it was not symlinked into /usr/local,
### because macOS provides libicucore.dylib (but nothing else).

### If you need to have icu4c first in your PATH run:
  ### echo 'export PATH="/usr/local/opt/icu4c/bin:$PATH"' >> ~/.zshrc
  ### echo 'export PATH="/usr/local/opt/icu4c/sbin:$PATH"' >> ~/.zshrc
```