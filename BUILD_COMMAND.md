// command to solve any problem related to android folder
npx expo prebuild --clean 


// command to prebuild in android and IOS
npx expo prebuild


// command to build APK for android  
npx eas build -p android --profile preview    
// command to build APK for ios 
npx eas build -p ios --profile preview



----------------

if you dont see ios folder when building do this =>

npm install -g eas-cli : instaling 

npx eas build:configure   : it creates eas.json


npx eas build --platform all    :   to create a single apk for both 
