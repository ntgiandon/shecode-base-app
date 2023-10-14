
cd ios \

APPLE_ID=linhh.phv@gmail.com \
APP_PASSWORD=vnef-owyd-xmwi-iopj \
IPA_PATH=$PWD/ios-build \
ARCHRIVE_PATH=$PWD/ios-archrive/appbase.xcarchive \
EXPORT_OPTIONS=$PWD/ExportOptions.plist \


echo "pvlinh02 -> Prepare to release ipa to app store."
echo "APPLE_ID: $APPLE_ID"
echo "APP_PASSWORD: $APP_PASSWORD"
echo "IPA_PATH: $IPA_PATH"
echo "ARCHRIVE_PATH: $ARCHRIVE_PATH"


xcodebuild -workspace appbase.xcworkspace -scheme appbase -sdk iphoneos -configuration Release clean archive -archivePath $ARCHRIVE_PATH \
&& xcodebuild -exportArchive -archivePath $ARCHRIVE_PATH -exportPath $IPA_PATH -exportOptionsPlist $EXPORT_OPTIONS \
&& xcrun altool --upload-app --type ios --file $IPA_PATH/appbase.ipa --username $APPLE_ID --password $APP_PASSWORD
