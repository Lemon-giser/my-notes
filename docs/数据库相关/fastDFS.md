## 1. 配置环境

Cent OS 7  ssh://192.168.111.128:22

账号 root

## 2. 需要两个包

libfastcommon

fastdfs

安装教程在INSTALL里面。

```
# step 1. download libfastcommon source codes and install it,
#   github address:  https://github.com/happyfish100/libfastcommon.git
#   gitee address:   https://gitee.com/fastdfs100/libfastcommon.git
# command lines as:

   git clone https://github.com/happyfish100/libfastcommon.git
   cd libfastcommon; git checkout V1.0.43
   ./make.sh clean && ./make.sh && ./make.sh install


# step 2. download fastdfs source codes and install it, 
#   github address:  https://github.com/happyfish100/fastdfs.git
#   gitee address:   https://gitee.com/fastdfs100/fastdfs.git
# command lines as:

   git clone https://github.com/happyfish100/fastdfs.git
   cd fastdfs; git checkout V6.06
   ./make.sh clean && ./make.sh && ./make.sh install

```

```
# ln -s /usr/lib64/libfastcommon.so /usr/local/lib/libfastcommon.so
# ln -s /usr/lib64/libfastcommon.so /usr/lib/libfastcommon.so
# ln -s /usr/lib64/libfdfsclient.so /usr/local/lib/libfdfsclient.so
# ln -s /usr/lib64/libfdfsclient.so /usr/lib/libfdfsclient.so 
```

　　A、服务脚本：

```
/etc/init.d/fdfs_storaged
/etc/init.d/fdfs_tracker
```

　　B、配置文件（这三个是作者给的样例配置文件） :

```
/etc/fdfs/client.conf.sample
/etc/fdfs/storage.conf.sample
/etc/fdfs/tracker.conf.sample
```

　　C、命令工具在 /usr/bin/ 目录下：

```
fdfs_appender_test
fdfs_appender_test1
fdfs_append_file
fdfs_crc32
fdfs_delete_file
fdfs_download_file
fdfs_file_info
fdfs_monitor
fdfs_storaged
fdfs_test
fdfs_test1
fdfs_trackerd
fdfs_upload_appender
fdfs_upload_file
stop.sh
restart.sh 
```

FastDFS 服务脚本设置的 bin 目录是 /usr/local/bin， 但实际命令安装在 /usr/bin/ 下。

```
# ln -s /usr/bin/fdfs_trackerd   /usr/local/bin
# ln -s /usr/bin/fdfs_storaged   /usr/local/bin
# ln -s /usr/bin/stop.sh         /usr/local/bin
# ln -s /usr/bin/restart.sh      /usr/local/bin
```

## 3. 配置

/etc/fdfs

### 1. 跟踪器 tracker.conf

port = 22122 提供服务的端口
base_path = /home/lemon/fastdfs/tracker 手动创建这个目录
http.server_port = **8080** 访问端口

防火墙开启端口的方法：需要安装iptables

```
# vim /etc/sysconfig/iptables
添加如下端口行：
-A INPUT -m state --state NEW -m tcp -p tcp --dport 22122 -j ACCEPT
重启防火墙：
# service iptables restart
```

启动：

```
可以用这种方式启动
# /etc/init.d/fdfs_trackerd start

也可以用这种方式启动，前提是上面创建了软链接，后面都用这种方式
# service fdfs_trackerd start
```

```
# netstat -unltp|grep fdfs 查看是否成功
```

```
# service fdfs_trackerd stop 关闭
```

```
# chkconfig fdfs_trackerd on 开机启动
```

### 2. 存储器 storage.conf

port = 23000 提供服务的端口 

base_path = /home/lemon/fastdfs/storage

store_path0 = /home/lemon/fastdfs/file

tracker_server = 192.168.111.128:22122 

http.server_port = **8888** 访问端口

防火墙打开 23000 端口，

启动

```
可以用这种方式启动
# /etc/init.d/fdfs_storaged start

也可以用这种方式，后面都用这种
# service fdfs_storaged start

关闭
# service fdfs_storaged stop

开机自启
# chkconfig fdfs_storaged on
```

查看Storage和Tracker是否在通信：

```
这条命令可以看tracker、group的信息。
/usr/bin/fdfs_monitor /etc/fdfs/storage.conf
```

<img src="fastDFS.assets/image-20220102171002955.png" alt="image-20220102171002955" style="zoom:80%;" />

### 3. 客户端配置 client.conf

base_path = /home/lemon/fastdfs/client

tracker_server = 192.168.111.128:22122

## 4. 上传测试

```
上传命令
# /usr/bin/fdfs_upload_file /etc/fdfs/client.conf namei.jpeg
```

上传成功后返回文件ID号

<img src="https://images2017.cnblogs.com/blog/856154/201710/856154-20171011151728965-914197096.png" alt="img" style="zoom:80%;" />

## 5. nginx安装

使用默认配置

```
# ./configure
```

编译、安装

```
# make
# make install
```

启动nginx

```
# cd /usr/local/nginx/sbin/
# ./nginx 

其它命令
# ./nginx -s stop
# ./nginx -s quit
# ./nginx -s reload
```

设置开机启动

```
# vim /etc/rc.local

添加一行：
/usr/local/nginx/sbin/nginx# 设置执行权限# chmod 755 rc.local
```



配置

```
user  root; 防止403
```

```
location /group1/M00 {
    alias /home/lemon/fastdfs/file/data;
}
```
