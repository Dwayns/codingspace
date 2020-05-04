[[[[[[[[[[ **JS FUNCTIONS - INFOS** ]]]]]]]]]]

- [Syntaxes](#syntaxes)
  - [Resume : Constructeur, déclaration, expression](#resume--constructeur-d%c3%a9claration-expression)
  - [**Déclaration de fonction (Instruction de fonction)**](#d%c3%a9claration-de-fonction-instruction-de-fonction)
  - [**Expression de fonction (Expression function)**](#expression-de-fonction-expression-function)
  - [Named function expressions demystified](#named-function-expressions-demystified)
    - [**Fonction nommée**](#fonction-nomm%c3%a9e)
    - [**Fonction anonyme**](#fonction-anonyme)
    - [**Fonction immédiatement invoquée**](#fonction-imm%c3%a9diatement-invoqu%c3%a9e)
  - [**Fonction fléché**](#fonction-fl%c3%a9ch%c3%a9)
  - [Référence d'objet](#r%c3%a9f%c3%a9rence-dobjet)
  - [Récursion](#r%c3%a9cursion)
  - [Fonctions imbriquées et fermetures (closures)](#fonctions-imbriqu%c3%a9es-et-fermetures-closures)
  - [Imbrication multiple de fonctions](#imbrication-multiple-de-fonctions)

---
---

# Syntaxes
## Resume : Constructeur, déclaration, expression
 ```javascript
 // CONSTRUCTEUR : une fonction définie grâce au constructeur Function assignée à la variable multiplier

 var multiplier = new Function("x", "y", "return x * y;");

// DÉCLARATION : une déclaration de fonction d'une fonction appelée multiplier
 function multiplier(x, y) {
    return x * y;
 }

// EXPRESSION : une expression de fonction d'une fonction anonyme assignée à la variable multiplier

 var multiplier = function(x, y) {
    return x * y;
 };

// EXPRESSION NOMMÉE : une expression de fonction d'une fonction nommée fonction_nom assignée à la variable multiplier
// Permet d'identifier plus facilement la fonction dans les appels tracés par un éventuel débogueur
 var multiplier = function function_nom(x, y) {
    return x * y;
 };

 /* DÉCLARATION VS EXPRESSION : Contrairement une expression de fonction, une déclaration de fonction permet d'accéder à la fonction grâce à son nom au sein de la portée dans laquelle elle a été définie :  */
 var y = function x() {}; // EXPRESSION
 console.log(x); // renvoie une erreur
 ------------------- VS -------------------
 function x() {} // DÉCLARATION
 console.log(x); // undefined (pas une erreur)
 ```

 ## **Déclaration de fonction (Instruction de fonction)**
 > la déclaration d'une fonction (instruction de fonction) est hissée en haut du contexte d'exécution. Ainsi, il peut être invoqué avant d'être créé.

 ```javascript
 function nom([param[, param[, ... param]]]) {
  /* instructions */
 }

 Ex :
 function multiplier(x, y) {
  return x * y;
 }
 ```

---

  ## **Expression de fonction (Expression function)**
  > Dans une expression de fonction, vous affectez une fonction à une variable. Une expression de fonction peut également être créée comme anonyme sans nom.

  > Les expressions de fonction sont pratiques lorsqu'il s'agit de passer une fonction comme argument d'une autre fonction.

  ```javascript
  function [nom*]([param[, param[, ... param]]]) { //*optional
  /* instructions */
  }

  var nom = function ([param] [, param] [..., param]) { /* instructions */ };

  Ex :
  var multiplier = function(x, y) {
   return x * y;
  };
  ```
 [6-ways-to-declare-javascript-functions](https://dmitripavlutin.com/6-ways-to-declare-javascript-functions/)  
 [Named function expressions demystified](https://kangax.github.io/nfe/)
---

   ### **Fonction nommée**

   ```javascript
   var maFonction = function fonctionNommée(){
    /* instructions */
   }

   Ex :
   var multiplier = function function_nom(x, y) {
    return x * y;
   };
   ```

   ### **Fonction anonyme**

   ```javascript
   var maFonction = function() {
    /* instructions */
   }
   ```

   ### **Fonction immédiatement invoquée**  
   > IIFE (Immediately Invokable Function)

   ```javascript
   (function() {
    /* instruction */
   })();
   ```

  ## **Fonction fléché**
  > Expression de fonction fléchée (Arrow function)

  ```javascript
  ([param[, param]]) => {
     instructions
  }
     
  param => expression
  ```

---

## Référence d'objet 
Ex :  
```javascript
function myLovCar(arg){ // "arg" is a reference objet
  arg.marque = "toyota";
}

var car = {
  marque: "H", // "arg" will change the value of this property
  modele : "WW",
  annee: 1998
};

console.log(car.marque);
myLovCar(car);
console.log(car.marque);
```

## Récursion
> La fonction fait référence à elle-même et s'appelle elle même.

```javascript
var truc = function toto() {
   // instructions
};

// 3 façons de l'appeler
toto(); // via fonction nommée
arguments.callee(); // via argument
truc(); // via fonction déclarée
```

> Une récursion est semblable à une boucle.

```javascript
function boucle(x) {
   // "x >= 10" est la condition de sortie 
   // (et équivaut à "!(x < 10)")
   if (x >= 10)
      return;
   // faire des choses
   boucle(x + 1); // l'appel récursif
}
boucle(0);
```
## Fonctions imbriquées et fermetures (closures)
> La fonction imbriquée (interne) est privée par rapport à la fonction (externe) qui la contient. Cela forme ce qu'on appelle une fermeture (closure)
>> Une closure est une expression (généralement une fonction) possédant des variables libres ainsi qu'un environnement qui lie ces variable (autrement dit qui « ferme » l'expression).
>
>>Étant donné qu'une fonction imbriquée est une closure, cela signifie que la fonction imbriquée peut « hériter » des arguments et des variables de la fonction qui la contient. En d'autres termes, la fonction interne contient la portée de la fonction externe.
>
>> - on ne peut accéder à la fonction interne seulement avec des instructions contenues dans la fonction externe,
>> - la fonction interne est une fermeture : la fonction interne peut utiliser des arguments et des variables de la fonction externe alors que la fonction externe ne peut pas utiliser de variables et d'arguments de la fonction interne.

```javascript
/* Exemple suivant, montre le cas de fonctions imbriquées */

function ajouteCarres(a,b) { // Fonction externe (Publique)
   function carre(x) { //Fonction interne (Privée)
      return x * x;
   }
   return carre(a) + carre(b);
}
var a = ajouteCarres(2,3); // renvoie 13
var b = ajouteCarres(3,4); // renvoie 25
var c = ajouteCarres(4,5); // renvoie 41
```

```javascript
/* Étant donné que la fonction interne est une closure, il est possible d'appeler la fonction externe et de définir des arguments pour la fonction externe mais aussi pour la fonction interne */

function externe(x) {
   function interne(y) {
      return x + y;
   }
   return interne;
}
var fn_interne = externe(3); 
var resultat = fn_interne(5); // renvoie 8

var resultat1 = externe(3)(5); // renvoie 8
```

## Imbrication multiple de fonctions
> On peut imbriquer plusieurs fonctions : une fonction (A) contien une fonction (B) qui contient une fonction (C). [...] On voit donc que les fermetures peuvent contenir différentes portées. Elles peuvent, récursivement, contenir la portée des fonctions qui la contiennent. Ce mécanisme est appelé « chaînage de portée » (scope chaining en anglais)

```javascript
function A(x) {
   function B(y) {
      function C(z) {
         console.log(x + y + z);
      }
      C(3);
   }
   B(2);
}
A(1); // crée un message d'alerte avec 6 (= 1 + 2 + 3)

/* Dans cet exemple, C accède à la variable y de B et à la variable x de A. Cela est possible parce que :

    B est une fermeture qui contient A, autrement dit B peut accéder aux arguments et aux variables de A

    C est une fermeture qui contient B

    Étant donné que la fermeture de B contient A et que celle de C contient B, C peut accéder à la fois aux arguments et variables de B et A. Autrement dit, C enchaîne les portées de  B et A dans cet ordre.

La réciproque n'est pas vraie. A ne peut avoir accès à C, parce que A ne peut accéder ni aux variables ni aux arguments de B, or C est une variable de B. C est donc privé et seulement pour B. */
```