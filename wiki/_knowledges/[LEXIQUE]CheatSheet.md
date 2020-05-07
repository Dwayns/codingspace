# LEXIQUE - DEV

 ## Vocabulaire
 - **Parser/Parsage (Parsing) :**  
 L'analyse syntaxique => Convertir une chaîne de caractère en objet natif.  
*(Le contraire de la stringification)*
```javascript
var stringChar = '{"name": "Chris", "age": "38"}';
var myObjectJSON = JSON.parse(stringChar);
myObjectJSON;

// Expected output : Object { name: "Chris", age: "38" }
```

 - **Stringifier/stringification (Stringify) :**  
 La linéarisation => Convertir un objet natif en une chaîne de caractère.  
 *(Le contraire du parsage)*
```javascript
var objectJSON = { "name": "Chris", "age": "38" };
myString = JSON.stringify(myJSON)
myString;

// Expected output : "{\"name\":\"Chris\",\"age\":\"38\"}"
```
 - *
 - *
 - *

