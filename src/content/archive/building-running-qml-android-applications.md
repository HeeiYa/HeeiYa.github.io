---
title: "Building and Running QML Android Applications"
description: "Notes on updating Android Gradle Plugin and Gradle versions when building QML applications for Android."
publishedAt: 2024-07-23
tags:
  - Android
  - QML
  - Qt
sourceUrl: "https://github.com/HeeiYa/KDEBlog/blob/master/docs/posts/QML%20%E5%AE%89%E5%8D%93%E5%BA%94%E7%94%A8%E6%9E%84%E5%BB%BA%E4%B8%8E%E8%BF%90%E8%A1%8C.md"
---
## Building QML Android Applications

Qt Creator uses Gradle for project building. Once your project code is ready, select the Android kit for building in Qt Creator. Click build, and Qt Creator will generate Gradle configuration files for you. However, you may encounter errors such as:

>Execution failed for task ':processDebugResources'.
> A failure occurred while executing com.android.build.gradle.internal.res.LinkApplicationAndroidResourcesTask$TaskAction
   > Android resource linking failed
     aapt2 E 07-23 15:59:44 51907 51907 LoadedArsc.cpp:94] RES_TABLE_TYPE_TYPE entry offsets overlap actual entry data.
     aapt2 E 07-23 15:59:44 51907 51907 ApkAssets.cpp:149] Failed to load resources table in APK '/home/zhy/Android/Sdk/platforms/android-35/android.jar'.

This is because the current Gradle plugin version does not support android-35. See [How to fix "Execution failed for task ':app:processDebugResources'. > Android resource linking failed"[Android/Flutter] - Stack Overflow](https://stackoverflow.com/questions/54152209/how-to-fix-execution-failed-for-task-appprocessdebugresources-android-re)

To resolve this issue, you need to modify the Gradle configuration.

Navigate to the `/build/Qt_6_7_2_Clang_arm64_v8a-Debug/android-build` folder in your project.

Open the `build.gradle` file and locate the `dependencies` block:

```
dependencies {
        classpath 'com.android.tools.build:gradle:7.4.1'
    }

```

`com.android.tools.build:gradle:7.4.1` refers to the Android Gradle Plugin (AGP). This default version is from 2022 and is quite outdated.

You can find the latest version here: [Maven Repository: com.android.tools.build » gradle](https://mvnrepository.com/artifact/com.android.tools.build/gradle?repo=google)

Update the plugin version to a newer one, for example:

```
    dependencies {
        classpath 'com.android.tools.build:gradle:8.4.1'
    }
```

Additionally, when upgrading the plugin version, ensure compatibility with the [Gradle version](https://gradle.org/releases/).

Check the relationship between the Gradle and AGP versions here: [Android Gradle plugin 8.5 release notes | Android Studio | Android Developers](https://developer.android.com/build/releases/gradle-plugin#updating-gradle)

> Reference: [Could not find com.android.tools.build:gradle:7.3.3. error found in build.gradle file - Stack Overflow](https://stackoverflow.com/questions/70545646/could-not-find-com-android-tools-buildgradle7-3-3-error-found-in-build-gradle)

Therefore, you should use at least Gradle version 8.6 to support this plugin.

Navigate to the `./gradle/wrapper` folder and open the `gradle-wrapper.properties` file. This file defines the Gradle version used by the project.

Find the line:
`distributionUrl=https\://services.gradle.org/distributions/gradle-8.3-bin.zip`

Change it to:

`distributionUrl=https\://services.gradle.org/distributions/gradle-8.6-bin.zip`

This update specifies that the project will use Gradle version 8.6.

After making these changes, click on build. It will automatically download the specified version of Gradle and then download the necessary Gradle plugins.

If successful, you can find the built APK at `./build/outputs/apk/debug`.

## Running and Installing APK

In a Linux environment, you can use the adb command to install the APK on your Android device. Alternatively, you can use Qt Creator for one-click deployment.

After connecting your Android device via USB, use the adb command to install the APK:

```shell
adb install android-build-debug.apk
```

Make sure that your Android device has Developer Mode enabled. You can find specific instructions on how to enable Developer Mode based on your device model through an online search.

If you want to share the screen on your phone on PC, you can use scrcpy: [Genymobile/scrcpy: Display and control your Android device](https://github.com/Genymobile/scrcpy)
