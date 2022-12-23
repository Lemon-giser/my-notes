## 链接

https://juejin.cn/post/7014115562595254285

## Linux nohup 命令详解

`nohup`是英语 no hangup 的缩写，是不挂断的意思，也就是指程序不退出，用在系统后台不挂断地运行命令，退出终端不会影响程序的运行。



## 命令语法

```shell
nohup 命令 参数
nohup 选项
复制代码
```

选项说明：

```shell
--help     # 显示此帮助信息并退出
--version  # 显示版本信息并退出
复制代码
```

## 示例

下面是一个`test.py`程序，程序每隔2秒会输出"hello nohup!"：

```python
import time 


while True:
    print("hello nohup!")
    time.sleep(2)
    
复制代码
```

然后使用`nohup python3 test.py`运行。

 ![img](https://raw.githubusercontent.com/Lemon-giser/myImages/main/img/021346e6ffbe4f5c831636b59fd481e4%7Etplv-k3u1fbpfcp-zoom-in-crop-mark%3A3024%3A0%3A0%3A0.awebp)

注意：使用nohup命令时，程序的输出会默认重定向到一个nohup.out文件下。如果我们想要输出到指定文件，可另外指定输出文件： `nohup python3 test.py > out.txt`

其实到现在，**还没有真正的做到程序在后台运行，终端关闭不受影响！**

如果想让程序真正的在后台运行，可以加上`&`符号。

```shell
nohup python3 test.py > out.txt & 
复制代码
```

关闭终端，重新打开，使用`ps`命令查一下进程，就会发现程序还在运行。

```shell
psh@deepin-pc:~/Desktop/test$ ps -aux | grep python
psh       36313  0.0  0.2  17768  8120 ?        S    16:25   0:00 python3 test.py
复制代码
```

这里如果想要把标准错误和标准输出都重定向到指定的out.txt文件中，可以使用`2>&1`符号，`2>&1`符号的意思是将将标准错误 2 重定向到标准输出 &1。

- 0 stdin (standard input，标准输入)
- 1 stdout (standard output，标准输出)
- 2 stderr (standard error，标准错误输出)

```shell
nohup python3 test.py > out.txt 2>&1 & 
```

`nohup`命令结合`&`符号可以使进程在后台运行，即使关闭了终端依然不受影响。

这时，如果想要终止这个进程，要怎么操作呢? 这个可以查看之前分享的文章：[Linux下kill掉一个进程的几种方式](https://juejin.cn/post/7013518352744185869)。


作者：tigeriaf
链接：https://juejin.cn/post/7014115562595254285
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。