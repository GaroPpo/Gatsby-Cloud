---
date: '2017-10-25'
title: 'MySQL Backup & Restore Using VB.Net and MySQLDump'
slug: 'mysql-backup-restore-using-vbnet-and-mysqldump'
categories: ["How-to"]
tags: ["VB.NET", "MySQL"]
thumbnail: '../images/Network-Wallpaper.webp'
template: post
---
MySQL is the world’s most popular open-source database. With its proven performance, reliability, and ease-of-use, MySQL has become the leading database choice for web-based applications, used by high profile web properties including [Facebook](https://en.wikipedia.org/wiki/Facebook), [Twitter](https://en.wikipedia.org/wiki/Twitter), [YouTube](https://en.wikipedia.org/wiki/YouTube), [Yahoo!](https://en.wikipedia.org/wiki/Yahoo!) and many more.

[Oracle](https://www.oracle.com/) drives MySQL innovation, delivering new capabilities to power next-generation web, cloud, mobile, and embedded applications.

Recently I’ve been working on Point of Sales application with [Visual Basic .NET](https://en.wikipedia.org/wiki/Visual_Basic_.NET), and as always I use MySQL for the database. Sometimes my client wants to backup and restores the database so he didn’t have to input twice on the other PC.

And I’ve been struggling for days to add this feature to the project, so the client can easily backup and restore the database. Because it’s complicated for the client to do it from [phpmyadmin](https://www.phpmyadmin.net/).

After days of searching and trial, finally I find the code to do backup and restore. So I decided to share it with everyone, maybe all of you have met this kind of situation as I am, so you won’t struggle to google anymore. So let’s start it.

First of all, what we gonna used here to backup is [MySQLDump](https://dev.mysql.com/doc/refman/5.7/en/mysqldump.html). It-dumps one or more MySQL databases for backup or transfer to another SQL server. The mysqldump command can also generate output in CSV (_comma-separated values_), other delimited text, or XML format.

```vb
Process.Start("\[MySQL Dump File Location\]", "--column-statistics=0 -u \[USERNAME\] -p\[YOUR PASSWORD\] \[DATABASE THAT YOU WANT TO BACKUP\] -r ""\[OUTPUT LOCATION INCLUDE .SQL EXTENSION\]""")
```

Code above used for backup the selected database using MySQLDump, and I’m gonna give an example code below.

```vb
Process.Start("C:\\wamp64\\bin\\mysql\\mysql5.7.14\\bin\\mysqldump.exe", "-u root -ppassword skripsi -r """ & BackupPath & "" & DatabaseName & ".sql""")
```

You can change MySQL Dump File Location based on what are you use, XAMPP or WAMP. Next is a code to Restore the database back to Server.

```vb
Dim myProcess As New Process()
myProcess.StartInfo.FileName = "cmd.exe"
myProcess.StartInfo.UseShellExecute = False
myProcess.StartInfo.WorkingDirectory = "\[MYSQL BIN PATH LOCATION\]"
myProcess.StartInfo.RedirectStandardInput = True
myProcess.StartInfo.RedirectStandardOutput = True
myProcess.Start()

Dim myStreamerWriter As StreamWriter = myProcess.StandardInput
Dim myStreamerReader As StreamReader = myProcess.StandardOutput
myStreamerWriter.WriteLine("mysql -u \[USERNAME\] -p \[YOUR PASSWORD\] \[DATABASE NAME\] < \[BACKUP DATABASE LOCATION\]")
myStreamerWriter.Close()
myProcess.WaitForExit()
myProcess.Close()
```

And the example would be like below.

```vb
Dim myProcess As New Process()
myProcess.StartInfo.FileName = "cmd.exe"
myProcess.StartInfo.UseShellExecute = False
myProcess.StartInfo.WorkingDirectory = "C:\\wamp64\\bin\\mysql\\mysql5.7.14\\bin"
myProcess.StartInfo.RedirectStandardInput = True
myProcess.StartInfo.RedirectStandardOutput = True
myProcess.Start()

Dim myStreamerWriter As StreamWriter = myProcess.StandardInput
Dim myStreamerReader As StreamReader = myProcess.StandardOutput
myStreamerWriter.WriteLine("mysql -u root skripsi < C:\\Backup\\Database.sql")
myStreamerWriter.Close()
myProcess.WaitForExit()
myProcess.Close()
```

You can change the MySQLDump and MySQL Bin Folder depends on what app you used. XAMPP or WAMP has a different path. WAMP MySQLDump can be copied from the example above, and don’t forget to change the version depends on what version you have. For XAMP MySQLDump can be accessed from “**C:\\xampp\\mysql\\bin\\mysqldump.exe**“.

For Bin folder still have the same path from the example above for the WAMP user. And for XAMPP users, you can use this path “**C:\\xampp\\mysql\\bin\\**“.

### **Update:**

* **4 June 2021**: Add **_–column-statistics=0_** to the script for users that use MySQL 8.0 or above. By default, since MySQL 8.0, Column-Statistics is enabled by default.

That’s all you need to backup and restore your database using Visual Basic .NET. For more detail’s you can download the project [Here](https://github.com/GaroPpo/Backup-Restore-MySQL-Using-VB.Net).