case "$ENV" in
    "production")
     echo "Switching to Firebase production environment."
     yes | cp -rf "firebase/production/google-services.json" android/app
     yes | cp -rf "firebase/production/noti_sound.mp3" android/app/src/main/res/raw
     yes | cp -rf "firebase/production/GoogleService-Info.plist" ios
     ;;
     "staging")
    echo "Switching to Firebase staging environment."
    yes | cp -rf "firebase/staging/google-services.json" android/app
    yes | cp -rf "firebase/staging/noti_sound.mp3" android/app/src/main/res/raw
    yes | cp -rf "firebase/staging/GoogleService-Info.plist" ios
    ;;
     "development")
     echo "Switching to Firebase development environment."
     yes | cp -rf "firebase/development/google-services.json" android/app
     yes | cp -rf "firebase/development/noti_sound.mp3" android/app/src/main/res/raw
     yes | cp -rf "firebase/development/GoogleService-Info.plist" ios
     ;;
esac