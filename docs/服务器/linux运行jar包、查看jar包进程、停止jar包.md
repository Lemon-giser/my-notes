# LINUX运行JAR包、查看JAR包进程、停止JAR包

## 运行jar包

要运行java的项目需要先将项目打包成war包或者jar包，打包成war包需要将war包部署到tomcat服务器上才能运行。而打包成jar包可以直接使用java命令执行。在linux系统中运行jar包主要有以下四种方式。

一、java -jar XXX.jar

这是最基本的jar包执行方式，但是当我们用ctrl+c中断或者关闭窗口时，程序也会中断执行。

二、java -jar XXX.jar &

&代表在后台运行，使用ctrl+c不会中断程序的运行，但是关闭窗口会中断程序的运行。

三、nohup java -jar XXX.jar &

使用这种方式运行的程序日志会输出到当前目录下的nohup.out文件，使用ctrl+c中断或者关闭窗口都不会中断程序的执行。

三、nohup java -jar XXX.jar >temp.log &

    >temp.out的意思是将日志输出重定向到temp.log文件，使用ctrl+c中断或者关闭窗口都不会中断程序的执行。
## 查看jar包进程、关闭命令

查看jar包进程：

```
ps aux|grep getCimiss-surf.jar
```

```
ps -ef | grep java
```

将会看到此jar的进程信息

```bash
data 5796 0.0 0.0 112656 996 pts/1 S+ 09:11 0:00 grep --color=auto getCimiss-surf.jar

data 30768 6.3 0.4 35468508 576800 ? Sl 09:09 0:08 java -jar getCimiss-surf.jar
```

其中30768则为此jar的pid，杀掉命令为

kill -9 30768
————————————————
版权声明：本文为CSDN博主「-过期罐头」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/lys1220/article/details/90719314