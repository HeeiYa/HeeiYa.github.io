---
title: "Late-Stage Summary of My 2024 OSPP KDE Project"
description: "Finishing the QML port of Blinken and working through KF6, Craft, Android, and CI integration issues."
publishedAt: 2024-08-17
tags:
  - OSPP
  - KDE
  - QML
  - Android
sourceUrl: "https://github.com/HeeiYa/KDEBlog/blob/master/docs/posts/2024OSPP%20KDE%E9%A1%B9%E7%9B%AE%E6%9C%AB%E6%9C%9F%E6%80%BB%E7%BB%93.md"
---
It's been more than three weeks since the midterm summary, and the project is now nearing completion.

Currently, all the original features of Blinken have been fully implemented in the QML version. The remaining tasks involve UI adjustments, testing, and fixing potential bugs.

Over the past few weeks, I’ve been working on the following:

## Integrating Blinken's Logic

The game logic of Blinken is handled by the `BlinkenGame` class from the original Blinken. The original code design is quite good, with most of the game logic encapsulated in this one class. The separation between the logic and the UI rendering is well done, so all I needed to do was connect the signals from this class in QML. 

As for the audio playback in Blinken, the original code used the Phonon library, which is also open-source but does not support Android. Therefore, I replaced it with the `QtMultimedia` library, which provides cross-platform audio playback functionality.

## Android Build for KF6 Applications

Some features of Blinken rely on libraries provided by the KF6 framework, such as `KF6I18n` and `KF6Config`. When cross-compiling to the Android platform, it's necessary to use the aarch64-linux versions of these libraries. If these libraries are not available on your system, you will encounter the following errors during compilation:

```shell
ld.lld: error: /usr/lib64/libKF6XmlGui.so.6.4.0 is incompatible with aarch64linux ld.lld: error: /usr/lib64/libKF6ConfigWidgets.so.6.4.0 is incompatible with aarch64linux 
……
```

However, the package manager on my Fedora distribution does not provide these versions. Compiling and installing them one by one from source is too cumbersome. On the advice of the community, I used **Craft** to handle cross-compilation.

For reference, here is the Craft tutorial: [Craft - KDE Community Wiki](https://community.kde.org/Craft)

Important note: If you encounter installation failures, make sure to clear all contents under `craft-kde-android` before trying again, as leftover files may cause the installation to fail.

When installing, choose the `Arm64` target architecture. If there are remnants from a previous failed installation, it may prevent the option to select the `ARM64` architecture.

If you encounter issues like "Permission denied," you’ll need to disable SELinux:

```bash
sudo apt-get install selinux-utils 
sudo setenforce 0
```

Additionally, note that in the virtual machine `invent-registry.kde.org/sysadmin/ci-images/android-qt67` provided by the community, the Java version is outdated, preventing the use of Gradle 8.6. You can either manually update the Java version in the docker or use an older version of Gradle.

To use Craft for building applications, you need to write a script called a **Blueprint**, which describes the libraries your application depends on. These scripts are relatively easy to write, and you can quickly get started by following the community documentation: [Craft/Blueprints - KDE Community Wiki](https://community.kde.org/Craft/Blueprints).

## Using KF6 Framework Libraries

Some of the libraries originally used by Blinken are compatible with the Android platform, while others are not. By referring to the [API Documentation](https://api.kde.org/frameworks/index.html),  you can check which libraries are supported on Android. In Blinken, the following libraries are Android-compatible:

- CoreAddons
- GuiAddons
- I18n
- XmlGui

I needed to use these libraries in the QML version of Blinken.

The KF6 framework provides a convenient internationalization API, and the usage in QML is almost the same as in QWidget, which allowed me to directly reuse Blinken’s original multi-language support, saving a lot of time.

KConfig is used in Blinken to store high score information and settings. For the high scores, I needed to extract the `HighScoreManager` class from the original `HighScoreDialog` file, make some modifications, and then create a new high score interface in QML that connects the signals and slots of `HighScoreManager`. For the settings functionality, it’s as simple as registering a KConfig singleton in QML : 

```cpp
`qmlRegisterSingletonInstance<blinkenSettings>("org.kde.blinken", 1, 0, "BlinkenSettings", blinkenSettings::self());
```

KF6XmlGui was used in the original Blinken to create the About Blinken Page, About KDE Page, and Handbook Page. Although this library is Android-compatible, it is based on QWidget, while the main interface of Blinken is built with QML. Bringing in QWidget just for these pages didn't seem like a good idea. Luckily, for the Android platform, `kirigami-addons` provides this functionality. By incorporating it, I also brought in `Kirigami`, which helps optimize the UI.

After adding new dependencies, it’s important to modify the `.kde-ci.yml` file to support CI/CD. For more information: [Infrastructure/Continuous Integration System - KDE Community Wiki](https://community.kde.org/Infrastructure/Continuous_Integration_System).

---

During the build process, there was an error that troubled me for a long time:

```shell
Cannot find application binary in build dir /home/user/CraftRoot/build/kde/applications/blinken/work/build/src/android-build//libs/arm64-v8a/libappBlinkenQML_[arm64-v8a.so](http://arm64-v8a.so/). ninja: build stopped: subcommand failed.
```

After asking the community, someone pointed out the issue.

In my original `CMakeLists.txt` file, I used `qml_add_executable` to create the program object, but this method likely modified the generated `.so` file's name, causing a conflict with the method provided by the ECM toolchain and preventing the APK from being generated. 

The solution was to replace `qml_add_executable` with `add_executable`.

This blog post discusses how to port KF6 applications to Android: [Porting KDE Android apps to Qt6/KF6](https://www.volkerkrause.eu/2023/11/11/kf6-porting-android-apps.html), and it mentions this issue. The toolchain provided by ECM can conflict with the one provided by Qt6. The post also provides a few examples of using KF6 code, which were really helpful for me.

## Next Steps

The project is almost complete. I just need to adjust Blinken's UI for the Android platform. After testing and fixing any bugs, I can attempt to merge it with the original code.
