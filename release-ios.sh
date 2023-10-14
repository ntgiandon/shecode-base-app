cd ios \
&& xcodebuild -scheme appbase -workspace appbase.xcworkspace -sdk iphoneos -configuration Release clean archive -archivePath $PWD/ios-archrive/appbase.xcarchive \
&& xcodebuild -exportArchive -archivePath $PWD/ios-archrive/appbase.xcarchive -exportPath $PWD/ios-build -exportOptionsPlist $PWD/ios-archrive/appbase.xcarchive/Info.plist