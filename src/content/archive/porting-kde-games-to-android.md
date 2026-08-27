---
title: "Porting KDE Games to Android: My 2024 OSPP Project"
description: "An introduction to my 2024 OSPP project with KDE and the plan for porting a KDE game to Android."
publishedAt: 2024-07-03
tags:
  - OSPP
  - KDE
  - Android
sourceUrl: "https://github.com/HeeiYa/KDEBlog/blob/master/docs/posts/2024OSPP%20KDE%E7%A4%BE%E5%8C%BA%E9%A1%B9%E7%9B%AE%EF%BC%9APorting%20KDE%20Games%20to%20Android%20platform.md"
---
During the 2024 Open Source Promotion Plan (OSPP) event, I had the honor of being selected for the KDE community project: Porting KDE Games to the Android platform. This is KDE community's first participation in OSPP, and it is their first and only project.



<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/KDE_logo.svg/330px-KDE_logo.svg.png">

About the KDE Community: [What is KDE - KDE UserBase Wiki](https://userbase.kde.org/What_is_KDE/zh-cn)

> KDE is a large **community** of programmers, translators, contributors, artists, authors, distributors, and users from around the world, dedicated to creating the best free software for desktops. Users and fans of KDE software are also spread globally, helping each other, spreading community news, or just enjoying this wonderful experience.

[KDE community](https://kde.org/zh-cn/)


<img src="https://summer-ospp.ac.cn/help/assets/logo.svg">

About OSPP (Open Source Promotion Plan):

> The Open Source Promotion Plan is a summer open source event initiated and long-term supported by the "**Open Source Software Supply Chain Lighting Plan**". It aims to encourage students to actively participate in the development and maintenance of open source software, promote the vigorous development of outstanding open source software communities, and cultivate and discover more excellent developers. The event collaborates with major open source communities at home and abroad, providing project tasks for the development and maintenance of important open source software and is open to global college students for registration. [Open Source Software Supply Chain Lighting Plan - OSPP 2024](https://summer-ospp.ac.cn/?lang=en)


## Project Introduction

The description of the KDE project: [Porting KDE Games to Android platform](https://summer-ospp.ac.cn/org/prodetail/24b5c0531?list=org&navpage=org) is as follows:

> KDE Games and educational games are integral parts of the KDE Gear suite. Very few applications are currently operational on platforms other than Linux, such as Android. The supported applications can be viewed at [https://apps.kde.org/platforms/android](https://apps.kde.org/platforms/android). Consequently, we plan to port some of these games to Android, specifically supporting architectures like arm64-v8a, x86, and x86_64. The ultimate goal is to distribute their Android versions through apps.kde.org, F-Droid, Google Store, etc.
> 
> Candidates for porting include Kajongg, KMahjongg, KShisen, Kigo, Blinken, Klickety, Skladnik, Kbounce, Kollision, KSudoku, KTurtle, Picmi, and Klines. You can learn about their features and code at apps.kde.org or invent.kde.org.
> 
> Finally, you will port one or more of these games to Android and facilitate community efforts to distribute them through software stores.

In simple terms, the project involves porting some KDE games to the Android platform, as these games are currently only available on the Linux platform. If you use Ubuntu, you can install and run a game with the following commands:

1. sudo apt install Kollision
2. kollision

Available games include Kajongg, KMahjongg, KShisen, Kigo, Blinken, Klickety, Skladnik, Kbounce, Kollision, KSudoku, KTurtle, Picmi, and Klines. However, for the completion of the project, porting just one game is sufficient.

## My Application Experience

When I first saw this project, it was quite late, with less than a week before the application deadline. Before that, I had already written an application for another project. However, after seeing this project, I felt it was more appealing to me. Unfortunately, at that time, I was preparing for an exam, so I had only two days left to write the application.

After pulling an all-nighter, I submitted my application and listed this project as my first choice. Finally, on June 26, I received an email confirming that my application had been accepted.

## Reason for Applying

Since my primary programming language is C++, I chose this project from the list of C++ projects. Compared to other projects, I found this one more interesting.

Initially, I did not know that this was KDE community's first participation in OSPP, nor did I know it was their first and only project. I also wasn't familiar with the KDE community. After learning about the KDE community, I discovered that I really liked their philosophy. The mentor was also very enthusiastic and emphasized the importance of communication multiple times during the application process, providing me with a lot of help.

## Project Development Plan

The project uses QML to port the applications to Android. In simple terms, the process is divided into the following steps:

1. Configure the development environment.
2. Create a QtQuick project and start the migration:
    1. Implement the UI.
    2. Port the logic code.
3. Package, deploy, and test.

Currently, I have roughly completed the work of configuring the environment.

Since I only have a Windows machine at the moment, my solution is to run a Fedora Workstation 40 virtual machine using VirtualBox. In the virtual machine, I use podman and distrobox to set up the KDE development environment with the KDE kdesrc-build tool.
