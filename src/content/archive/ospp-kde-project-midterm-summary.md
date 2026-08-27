---
title: "Mid-Term Summary of My 2024 OSPP KDE Project"
description: "The first three weeks of porting Blinken to Android with QML, C++, and KDE tooling."
publishedAt: 2024-07-21
tags:
  - OSPP
  - KDE
  - QML
sourceUrl: "https://github.com/HeeiYa/KDEBlog/blob/master/docs/posts/2024OSPP%20KDE%E9%A1%B9%E7%9B%AE%E4%B8%AD%E6%9C%9F%E6%80%BB%E7%BB%93.md"
---
It has been three weeks since the start of the OSPP project, during which my project has made some progress.

## Week 1, July 1st to July 7th 

In the first week of the project, with the help of my mentor, I first set up a suitable development environment and identified Blinken as the first application to be migrated for the project. In addition to this, I also set up this project's blog, which has now been included in KDE Planet.

Currently, I am using a development environment on a VirtualBox virtual machine running Fedora Workstation 40. With this setup, I can compile and build KDE applications and perform Qt development.

For building the KDE development environment, it is recommended to use [kdesrc-build](https://develop.kde.org/docs/getting-started/building/kdesrc-build-setup/) provided by KDE official, and it is also recommended to develop under KDE Neon system, which can be done using [docker](https://community.kde.org/Get_Involved/development/More#Develop_in_a_Linux_container) or [virtual machines](https://community.kde.org/Get_Involved/development/Developing_in_a_virtual_machine)

A straightforward method for setting up Qt Android development environment is to use [Qt Online Installer](https://doc.qt.io/qt-6/get-and-install-qt.html#using-qt-maintenance-tool) and Qt Creator. After installing Qt Creator, navigate to Editing -> Preferences -> Devices -> Android to select the necessary development kit. Qt Creator will automatically download the required SDK and NDK.



## Week 2, July 8th to July 14th

Upon my mentor's suggestion, I developed a simple Tic-Tac-Toe QML game as a practice exercise. This game uses QML to create a simple interface and employs a C++ class to handle game logic, which will also be the architecture for the upcoming game migration.

The current features implemented in the game are:

1. Multilingual localization support
2. Unit testing capability
3. Cross-platform compatibility

The Tic-Tac-Toe game is openly developed on KDE Invent: [hanyang zhang / TicTacToe · GitLab](https://invent.kde.org/zhy/tictactoe)

Supporting localization for QML applications requires the use of Qt's localization tools such as lupdate and lrelease. However, since the project is built with CMake, Qt also provides corresponding CMake methods: [qt_add_translations | Qt Linguist Manual](https://doc.qt.io/qt-6/qtlinguist-cmake-qt-add-translations.html)

Additionally, I encountered some difficulties while building QML Android applications, as described here: 
[Building and Running QML Android Applications | Blog](/archive/building-running-qml-android-applications/)



## Week 3, July 15th to July 21st

During this week, I officially began the migration work for Blinken.

After studying Blinken's source code, I found that the interface of Blinken is drawn by a class named Blinken, which spans over 1000 lines. The drawing logic involves manipulating elements from Blinken.svg and using QPainter for direct drawing.

Unfortunately, QML does not provide built-in support for manipulating SVG images like QtWidgets. Therefore, I split the SVG images into separate files and assembled these elements using QML with Adobe Illustrator and Inkscape.

!![Blinken interface draft](/archive/kde/blinken-draft.jpg)

Modifying the UI took longer than I anticipated. However, after a week, I have nearly completed the interface drawing for Blinken. Next steps involve refining some page details and migrating Blinken's logic over.

It's worth mentioning that QML does not provide a non-rectangular MouseArea for use, requiring the creation of a custom class to achieve this functionality. Fortunately, an example for this existed in earlier versions of the documentation: [maskedmousearea example](https://code.qt.io/cgit/qt/qtdeclarative.git/tree/examples/quick/customitems/maskedmousearea?h=6.2). Although this example seems to have been removed in the latest version, it should still be feasible to implement based on reference.
