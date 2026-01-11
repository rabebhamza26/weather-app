# React Native Weather App

## Description

Application mobile React Native (TypeScript) avec :
1) Écran de connexion
- Authentification par e-mail/mot de passe à l'aide de Firebase Authentication.
- Option de connexion Google.
- Une fois la connexion établie, accédez à l'écran principal.
2) Écran de recherche météo
- Champ de recherche en haut pour rechercher des villes.
- Afficher les résultats sous forme de liste. Chaque élément doit pouvoir être développé/réduit
d'un simple clic.
- Afficher les informations météorologiques de base lorsque la liste est réduite (ville, température,
icône météo).
- Afficher les informations météorologiques détaillées lorsque la liste est développée (humidité,
vent, pression, etc.).
- Inclure des animations de chargement pendant les appels API.
- Gérer les états d'erreur de manière appropriée.

##Configuration
  
npm install -g expo-cli 

npx create-react-native-app weatherApp --template with-typescript

cd weatherApp

npm install firebase axios @react-navigation/native @react-navigation/native-stack

npm install react-native-gesture-handler react-native-screens

npm install -D @types/react @types/react-native

npm install react-native-reanimated
npm install react-native-dotenv

npm install

- Lancer l'application :  npx expo start

![87299d3e-5df1-4590-961c-e91f7901a0a5 (1) (1)](https://github.com/user-attachments/assets/f1ece1ef-d1b9-4320-a29c-0b78fe76658d)

![87299d3e-5df1-4590-961c-e91f7901a0a5 (1) (1)](https://github.com/user-attachments/assets/063526d2-2f59-4613-857a-208750c0426b)
  

