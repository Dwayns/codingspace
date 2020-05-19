# Terminal - Commandes

- [Terminal - Commandes](#terminal---commandes)
  - [Babun :](#babun)
  - [Terminal](#terminal)
    - [Search file :](#search-file)
      - [GREP command :](#grep-command)
    - [List files](#list-files)
    - [Show file content (no edit) :](#show-file-content-no-edit)
    - [GLOBAL :](#global)
      - [Host (Win):](#host-win)
      - [Host (MAC):](#host-mac)
      - [Droits écriture :](#droits-%c3%a9criture)
    - [Cache :](#cache)
      - [Forcer ecriture :](#forcer-ecriture)
      - [Vider cache :](#vider-cache)
    - [Logs :](#logs)
      - [Afficher logs :](#afficher-logs)
    - [ERRORS :](#errors)
      - [Forcer ecriture repertoire :](#forcer-ecriture-repertoire)
    - [Serveur/Moteur :](#serveurmoteur)
      - [Redemarrage :](#redemarrage)
      - [Kill Linux process :](#kill-linux-process)
      - [Memory/CPU :](#memorycpu)

---
---

  ## Babun :  
  Log to ssh  
  ```powershell
  ssh dev@www.mdm.local
  ```

  ## Terminal
  Change language :
  ```powershell
  chsh -s /bin/bash
  
  chsh -s /bin/zsh
  ```

  Check language :
  ```powershell
  echo $SHELL
  ```

  Edit file bashrc/zshrc :
  ```powershell
  ~ vim .bashrc

  ~ vim .zshrc
  ```

  relaunch file bashrc/zshrc :
  ```powershell
  ~ source .bashrc

  ~ source .zshrc
  ```

  ### Search file :
  ```powershell
  find ~/ -type f -name "filename"

  # This need to generate database
  locate "filename"
  ```
  #### GREP command :
  ```powershell
  # recherche "192" dans le fichier hosts
  grep "192" /etc/hosts

  # recherche du terme ip dans le répertoire de configuration de apache2
  grep "ip" /etc/apache2/conf.d/*

  # recherche des lignes d'erreurs dans des fichiers de logs
  grep "ERROR" ./tomcat/log/*.log
  ```

  Grep options :
  ```powershell
  # –color : un indispensable, permettra de faire ressortir le terme recherché en couleur dans les résultats
  # -r : recherche récursive dans tous les fichiers et dossiers du répertoire en paramètre
  # -i : permet d’ignorer la casse
  # -c : retourne le nombre d’occurrences de la recherche par fichier

  # recherche la configuration des workers (loadblancing) dans apache, récursivement
  grep -r "worker" /etc/apache2/

  # la même chose en couleur
  grep -r --color "worker" /etc/apache2

  # on complète en affichant les numéros de ligne concernés
  grep -rn --color "worker" /etc/apache2

  ##------------------------------------

  # recherche des termes ERROR et CRITICAL dans les logs
  grep  "ERROR\|CRITICAL" /opt/tomcat/log/*.log
  ```
  [Wodric - Commande grep](https://wodric.com/commande-grep/)

  ### List files
  **List all files in folder**
  ```powershell
  ls
  ```

  **List every files and folder**
  ```powershell
  ls -a

  ls --all
  ```

  **List every files with display more detailed output**
  ```powershell
  #Show the permissions, number of inodes, the owner and the group, the file size, the last accessed date, and time and file name.

  ls -l
  ```

  **List every files and folders with display more detailed output**
  ```powershell
  ls -la
  ```

  **Sort list**
  ```powershell
  ls --sort=none
  ls --sort=size
  ls --sort=time
  ls --sort=version 
  ```

  ### Show file content (no edit) :
  ```powershell
  cat filename
  ```

---

  ### GLOBAL :
  #### Host (Win): 
  ```powershell
  C:\Windows\System32\drivers\etc\hosts
  ```

  #### Host (MAC): 
  ```powershell
  vim /private/etc/hosts
  ```
  [Edit Mac Host](https://macpaw.com/how-to/edit-mac-hosts-file)  
  [Edit Win Host](http://techgenix.com/tips-and-tricks-using-windows-hosts-file/)

  **Users :**  
  passage de dev à root => `sudo su`  
  passer commande en tant que dev => `sudo + cmd`

  #### Droits écriture :
  ```powershell
  chmod -R 777 + directory
  ```

  **Changer droit** (cf: old mode 100644  new mode 100755) : 
  ```powershell
  chmod -x file
  ```
  [stackoverflow-file-mode : git config remove file mode](https://stackoverflow.com/questions/1257592/how-do-i-remove-files-saying-old-mode-100755-new-mode-100644-from-unstaged-cha)  
  [stackoverflow-file-mode : git config core.filemode false](https://stackoverflow.com/questions/1580596/how-do-i-make-git-ignore-file-mode-chmod-changes)

---

  ### Cache :
  #### Forcer ecriture :
  ```powershell
  HTTPDUSER=`ps axo user,comm | grep -E '[a]pache|[h]ttpd|[_]www|[w]ww-data|[n]ginx' | grep -v root | head -1 | cut -d\  -f1`  
  ```
  ```powershell
  sudo setfacl -R -m u:"$HTTPDUSER":rwX -m u:`whoami`:rwX app/cache app/logs  
  ```
  ```powershell
  sudo setfacl -dR -m u:"$HTTPDUSER":rwX -m u:`whoami`:rwX app/cache app/logs  
  ```
  ```powershell
  sudo setfacl -R -m u:"www-data":rwX -m u:`whoami`:rwX app/cache app/logs  
  ```
  ```powershell
  sudo setfacl -dR -m u:"www-data":rwX -m u:`whoami`:rwX app/cache app/logs  
  ```

  #### Vider cache :
  ```powershell
  rm -rf cache/*
  rm -rf app/cache/*
  rm -rf vendor/*
  ```

  (Symfony 2 command)
  ```powershell
  php symfony cc // ./symfony cc
  php app/console cache:clear
  ```

---

  ### Logs :
  #### Afficher logs :
  ```powershell 
  sudo tail -f /var/log/nginx/[serverName]_*  

  sudo tail -f /var/log/nginx/[serverName]_* | ccze 
  ```

  EX : 
  ```powershell
  sudo tail -f /var/log/nginx/mdm.error.log
  ```
  ```powershell
  sudo tail -f /var/log/php-fpm/[serverName].error.log
  ```
  ```powershell
  tail -f log/frontend_prod.log

  tail -f log/standardized/frontend_dev.log

  tail -f log/frontend_*.log | grep "[err]"
  ```
  => grep = filtrer (ex: grep "[err]" = filtrer les fichiers commençant par "err")

---

  ### ERRORS :
  #### Forcer ecriture repertoire :
  ```powershell
  sudo chmod -Rf 777 Repertory (cf: web/images/)
  ```
  ```powershell
  sudo setfacl -dR -m u:"www-data":rwX -m u:`whoami`:rwX app/cache

  sudo setfacl -R -m u:"www-data":rwX -m u:`whoami`:rwX app/cache

  sudo setfacl -R -m u:"www-data":rwX -m u:`whoami`:rwX app/logs

  sudo setfacl -dR -m u:"www-data":rwX -m u:`whoami`:rwX app/logs
  ```

  **PB droits ecriture sass :**  
  ```powershell
  sudo setfacl -R u:dev:rwX .
  sudo setfacl -dR u:dev:rwX .
  ```

---

  ### Serveur/Moteur :
  #### Redemarrage :  
  ```powershell
  sudo service nginx restart // /etc/init.d/nginx restart

  sudo service php5-fpm restart // /etc/init.d/php5-fpm restart
  ```

  #### Kill Linux process :
  ```powershell
  sudo killall appliname
  ```
  ex: `sudo killall phpstorm` 

  ```powershell
  ps -ax | grep appliname
  # [look id number => ex: 3407 ?]

  sudo kill -9 3407
  ```

  OR 

  `alt+f2` => type `xkill` and hit enter => click on the program you would like to force quit

---

  #### Memory/CPU :
  ```powershell
  df -h
  ```



