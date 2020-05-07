# [GIT - SHORTCUTS/PROCESS]

---
---
- [[GIT - SHORTCUTS/PROCESS]](#git---shortcutsprocess)
  - [.bashrc / .zshrc [in home(~) directory]](#bashrc--zshrc-in-home-directory)
  - [GIT ALIAS](#git-alias)
  - [Structure :](#structure)
    - [**Convention nommage MDM :**](#convention-nommage-mdm)
    - [**Commit guidelines [cf: Angular.js] :**](#commit-guidelines-cf-angularjs)
  - [CREATE A GIT FORK IN FOLDER](#create-a-git-fork-in-folder)
    - [MISES A JOUR](#mises-a-jour)
    - [LIST & MISE A JOUR BRANCHE](#list--mise-a-jour-branche)
      - [Renommer branch local](#renommer-branch-local)
  - [CREATION/DUPLICATION BRANCHE](#creationduplication-branche)
      - [4 - Dupliquer la branche local sur source :](#4---dupliquer-la-branche-local-sur-source)
    - [ADD/COMMIT/PR](#addcommitpr)
      - [6B - Renommer précédent commit (PAS encore poussé en PR)](#6b---renommer-pr%c3%a9c%c3%a9dent-commit-pas-encore-pouss%c3%a9-en-pr)
      - [Supprimer fichier d'un commit :](#supprimer-fichier-dun-commit)
    - [BRANCHE EXISTANTE](#branche-existante)
      - [3B - Renommer branch local et origin :](#3b---renommer-branch-local-et-origin)
    - [MERGER BRANCHES](#merger-branches)
    - [REBASE & SQUASH](#rebase--squash)
    - [SAUVERGADER&SWITCH BRANCHE](#sauvergaderswitch-branche)
    - [SUPPRESSION BRANCHE EXISTANTE](#suppression-branche-existante)
      - [Supprimer une branche distante :](#supprimer-une-branche-distante)
    - [REMOTE DISTANT](#remote-distant)
    - [CLÔNE REMOTE DISTANT](#cl%c3%94ne-remote-distant)
    - [CONFLITS / HISTORY](#conflits--history)
      - [Remonter niveau commit :](#remonter-niveau-commit)
    - [PB BRANCHE INCOMPLETE](#pb-branche-incomplete)
    - [PB PUSH ORIGIN](#pb-push-origin)
    - [Divers](#divers)

---
---

## .bashrc / .zshrc [in home(~) directory]

  ## GIT ALIAS
  ```powershell
  alias gs='git status'

  alias ga='git add'
  alias gap='git add -p'

  alias gb='git branch'

  alias gck='git checkout'
  alias gckb='git checkout -b'

  alias gc='git commit'
  alias gcm='git commit -m'
  alias gca='git commit -a'

  alias gl='git log'

  alias gd='git diff'
  alias gdh='git diff HEAD'

  alias gf='git fetch'
  alias gfa='git fetch --all'

  alias gpl='git pull'
  alias gplo='git pull origin'
  alias gplom='git pull origin master'

  alias gp='git push'
  alias gpom='git push origin master'
  alias gpof='git push -f origin'
  alias gpfw='git push --force-with-lease'

  alias gm='git merge'
  alias grom='git rebase origin/master'

  alias gsh='git stash'
  alias gsc='git stash clear'
  alias gsd='git stash drop'
  alias gsl='git stash list'
  alias gsp='git stash pop'
  ``` 

---

  **.gitconfig**  
  ```powershell
  amend           = git commit --amend -C HEAD
  br              = git branch -v
  bra             = git branch -v -a
  cat             = git cat-file -p
  cc              = git shortlog -sn
  ci              = git commit -v
  cia             = git commit --amend -C HEAD
  cim             = git commit -m '--'
  co              = git checkout
  d               = git diff
  ds              = git diff --staged
  last            = git log -1 HEAD
  lg              = git log --graph --pretty=tformat:'%Cred%h%Creset -%C(cyan)%d %Creset%s %Cgreen(%an %Creset' --abbrev-commit --  date=relative
  lga             = git log --graph --pretty=tformat:'%Cred%h%Creset -%C(cyan)%d %Creset%s %Cgreen(%an %Creset' --abbrev-commit --  date=relative --all
  logfull         = git log --pretty=fuller --graph --stat -p
  rebc            = git rebase --continue
  rebs            = git rebase --skip
  rebt            = git rebase --abort
  st              = git status
  standup         = git log --since '1 day ago' --oneline --author jcolin@maisonsdumonde.com
  uncommit        = git reset --soft HEAD^
  uncommithard    = git reset --hard HEAD^
  unstage         = git reset HEAD
  gfa = git fetch --all
  gpo = git push origin
  gps = git push source
  gpsm = git push source master
  gpls = git pull source
  gplsm = git pull source master
  ```

---

## Structure :  
  Remote : origin / source  
  Local : master / local

### **Convention nommage MDM :**  
  Nommage branche = feature/Numéro demande => [feature/BR-00]  
  Commentaire commit = "[<branch>] Modif réalisée"

### **Commit guidelines [cf: Angular.js] :**  
  **feat**: A new feature  
  **fix**: A bug fix  
  **docs**: Documentation only changes  
  **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)  
  **refactor**: A code change that neither fixes a bug nor adds a feature  
  **perf**: A code change that improves performance  
  **test**: Adding missing tests  
  **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation  
Scope

## CREATE A GIT FORK IN FOLDER  
**Intialiser un projet git :**  
  1. `git init`
  2. `git remote add origin [ssh url]`
  3. `add / commit / push modifications`  
  4. (`composer install ?`)

### MISES A JOUR   

  1 - Mettre à jour la source (et origin) :  
  `git fetch --all`  
  ou  
  `git pull <remote> <branch>`
  
  2 - Mettre à jour le master depuis la source :  
  `git pull source master`
  
  2B - Mettre à jour branche depuis la source :  
  `git pull source feature/[brancamend = commit --amend -C HEADhe]`
    
  3 -  la branche local:source  
  `git checkout source/master -b <branch>`  


### LIST & MISE A JOUR BRANCHE

  Lister toutes les branches (Local et distant) :  
  `git branch -a`
  
  Lister toutes les branches distantes :  
  `git branch -r`
  
  Mise à jour branche :  
  `git co <branch>`  
  `git push origin/source <branch>`  

  #### Renommer branch local  
  `git branch -m <oldname>` (Actuelle)  
  `git branch -m <oldname> <newname>`
  
---

## CREATION/DUPLICATION BRANCHE

  3 - Créer la branche local:  
    `git branch <branch>`
  
  3B - Créer la branche local à partir copie branche distante:  
    `git branch <branch> source/<branch>`
  
  #### 4 - Dupliquer la branche local sur source :  
    `git push source <branch>`  
    ou  
    `git push source master:<branch>`  
    (Push une branche en la renommant => je push dans "source" ma branche "master" que je renomme "<    branch>")
  

### ADD/COMMIT/PR

  5 - Ajouter toutes les modifs au commit :
    `git add .`
  
  6 - Committer les modifs :
    `git commit -m "[FEATURE/KB-3558] Images changed"`
    
  #### 6B - Renommer précédent commit (PAS encore poussé en PR)  
  `git commit --amend`  
  `git push -f origin feature/[branche]`  
  (Force la réécriture du commit) 

  `git push --force-with-lease origin feature/[branche]`  
  (Force la réécriture du commit sans écraser les modifs d'autres devs)
  
  7 - Pusher modifs sur origin :  
    `git push origin` 
  
  8 - Pull request  
  Création pull request depuis Stash.

  #### Supprimer fichier d'un commit :  
  `git reset --soft HEAD~1`  

  (reset le fichier non voulu et le sortir du commit)  
  `git reset HEAD path/to/unwanted_file`  

  (committer une nouvelle fois en reutilisant le message du précédent commit)  
  `git commit -c ORIG_HEAD`


### BRANCHE EXISTANTE  

  Travailler depuis une branche existance  
  1 - Mettre à jour la source (et origin) :  
  `git fetch --all`
  
  2 - Créer la branche distante en local (Creation d'une branche à partir d'une autre) :  
  `git co source/feature-name -b feature-name`
  
  3 - Renommer branch local (en cours) :  
  `git branch -m new_name`
  
  #### 3B - Renommer branch local et origin :  
   `git branch -m old_name new_name`  
   (Delete remote br)  
   `git push origin :old_name`  
   (`git push --set upstream origin new_branch`)  
   `git push origin new_name`
  

### MERGER BRANCHES 

  1 - Vérifier les dernières mises à jour :  
    `fetch all` -> (verifier que la branche à merger est présente sur le master => git co)  
  
  2 - Merger les branches :  
    `git merge  feature/[branche à merger]`
  
  2B - Merger les branches :  
    `git merge  source/[branche à merger]` -> (Merger branche depuis source sur master)


### REBASE & SQUASH 

  1 - Process :  
    - A partir de la task :  
    Besoin de clean les commits => `git rebase -i feature/...`  
    OU  
    `origin/master` => remplacer "`pick`" par "`s`" (voir "f") sur le commit désiré => dans le message de confirmation commenter le/les messages non désirés => `git push origin --force-with-lease`

  Ex: *laisser pick sur le commit désiré*  
  ```  
  pick message commit#1  
  pick message commit#2  
  pick message commit#3
  ```

  **WARNING** => Pas besoin d'attendre la PR pour clean => Clean avant PR

  `git rebase -i` => se mettre à jour de storie/master sans "réécrire/casser" l'historique
  `git push origin --force-with-lease` => push force sans écraser les différences


### SAUVERGADER&SWITCH BRANCHE 

  1 - Sauvegarder les modifications en cours sur la branche :  
    `git stash` => Backup
  
  2 - Récupérer les modifications en cours sur la branche :  
    `git stash pop` = > Backup recovery  
    *Si exécution de plusieurs `git stash` => `git stash list`  
    `git stash apply`  
    `git stash apply stash@{2}`


### SUPPRESSION BRANCHE EXISTANTE

  Supprimer une branche local:  
  `git branch -d <branch>`
  
  #### Supprimer une branche distante :  
  (`git branch -dr source/<branch>`) = KO  
  `git push source --delete <branch>`  
  `git push source :<branch>`
  
  
  ### REMOTE DISTANT

  Récupérer remote distant d'un user :  
    1 - [STASH] Demander autorisation de lecture au User (Stash -> Afficher profil -> Paramètres -> Autorisations/Dépôt -> Add user)  
    2 - [STASH] Récupérer adresse SSH du remote  
    3 - [TERMINAL] `git remote -v` (Liste les dépots autorisés)  
    4 - [TERMINAL] `git remote set-url [Nom dépôt] [adresse dépôt]` (cf: set-url hamid http://git@git.dev.web.xm:7999/~hhennouni/web-forked  .git)  
    5 - [TERMINAL] `git fetch [Nom dépôt] <branch>`  
    6 - [TERMINAL] `git FETCH_HEAD -b <branch>` (Création de branche à partir du dépot)  
    7 - [TERMINAL] `git merge FETCH_HEAD <branch>` (Merge du dépôt dans la branche actuelle)  

  PS : `git remote` / `git remote show origin` OR `source`
  

### CLÔNE REMOTE DISTANT 

  Clôner :
    1- aller sur Stash/chemin vers le projet  
    2- bufircation (nom-forked) (décoche la case)  
    3- clone puis clt+c récupérer l'url  
    4- se positionner dans le dossier du projet via terminal  
    5- git clone clt+v  
    6- aller sur Stash/chemin vers le projet  
    7- clone  
    8- clt+c récupérer l'url  
    9- git remote add source clt+v

### CONFLITS / HISTORY 

  #### Remonter niveau commit :  
  (`git reset --hard HEAD`)  
  `git reset HEAD~1`


### PB BRANCHE INCOMPLETE

  Si récupération de la branche incomplète... voir :  
    (Liste les remotes)  
    `git remote -v`
    `git remote add [prenom utilisateur ssh de la branche]`  
    *(Prendre les infos via ticket Jira)*  
    `git pull [prenom utilisateur ssh de la branche]`


### PB PUSH ORIGIN

  Si PB push sur origin :  
    1 - Mettre à jour source et origin  
    `git pull source <branch>`  
    *git fetch source <branch> (Met seulement l'en-tête à jour)*  
    `git merge FETCH_HEAD`
    
  Avant mise à jour branche local depuis source, penser à pull source distant sur source et origin.

### Divers

  Nettoyer les fichiers non-répertoriés :  
    `git clean -df`  
    `git clean -d <path>`
