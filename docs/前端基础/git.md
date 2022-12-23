
## 指令：Linux通用的格式

		指令主体  [选项]  [操作对象]
	一个指令只能包含一个主体，可以包含多个选项
	操作对象可以是多个

## Linux基础指令
	1. ls  指令（list）
			(1). ls
				列出文件和文件夹的名称	
			(2). ls  路径
			(3). ls  选项  路径
				3.1 ls -l  路径
					以详细列表展示
				3.2 ls -la  路径
					显示所有文件和文件夹，包含隐藏文件
			(4). ls -lh  路径
				列出所有文件、文件夹的详细列表，以可读性较高的进行排序
				文件列表：
				-rw-r--r--.  1 root root 10033 3月 23 15:32 install.log
				drwxr-xr-x.  2  root root 4096 3月  23 15:32  图片
				第一列表示文档的类型，-表示该行对应的文件类型为文件，d表示文件夹
				蓝色表示文件夹，黑色表示文件，绿色表示权限为拥有所有权限
	2. pwd命令
			用法：pwd			(print working directory)
			打印当前路径（绝对路径）
	3. cd 命令
			用法：cd 路径		(change directory)
			切换路径（绝对或相对）
			【补充】 ~ 表示家目录  cd ~
	4. mkdir命令
			用法：mkdir  路径
			创建目录
			用法2： mkdir -p 路径
			实现多层文件夹创建
			用法3： mkdir  路径1  路径2  路径3 ...
			一次性创建多个目录
	5. touch命令
			创建文件
			语法：touch 文件路径1 文件路径2
			路径可以是文件名也可以是路径加文件名
				touch linux.txt	
	6. cp命令 (copy)
			复制文件、文件夹到指定位置
			用法： cp 被复制的文档路径  文档复制到的路径
					可以在复制时重命名
			用法2：cp -r 被复制的文档路径  文档复制到的路径
					-r表示递归复制
					用来复制文件夹
	7. mv命令（move）
			移动文件、文件夹
			用法：mv 需要移动的文件  移动到的路径
			原地移动视为重命名
	8. rm命令
			移除、删除文档
			语法：rm  选项  需要移除的文档路径
			选项：
					-f  （force强制）
					-r
			案例1：删除文件
					rm 新文件
					可以加-f忽略提示
			案例2：删除文件夹
					rm -r /henniux/
					rm -rf /henniux/
			案例3：删除多个文档
					rm -rf a linux.txt
			案例4：删除有公共特性的文档
					rm -rf linux*
	9. vim命令
			文本编辑器
			语法：vim 文件的路径
			打开一个文件
			退出：按下:q
	10. 输出重定向
			将输出结果保存到文件
			>:覆盖输出
			>>:追加输出
			语法：原始命令 >/>> 文件的路径
				文件可以不存在，会创建
	11. cat命令
			作用1：直接打开一个文件
					cat 文件的路径
			作用2：对文件进行合并
					cat 待合并的文件路径1   待合并的文件路径2  >  合并之后的文件路径


## 设置签名
	形式：
		用户名
		邮箱
	作用：
		区分不同开发人员的身份
	命令： 
		项目级别
		    git config user.name tom_pro
		    git config user.email goodMorning_pro@atguigu.com
		    存储位置：项目/.git/config
		    cat 命令
		系统用户级别
			git config --global user.name tom_glb
			git config --global user.email goodMorning_glb@atguigu.com
			存储位置：用户名/.gitconfig
## 添加一个文件
	1. 提交暂存文件
		git add good.txt
	2. 撤销
		git rm --cached good.txt
	3. 提交
		git commit good.txt
		进入vim编辑器
		按i进入编辑
		按esc  :wq退出
	4. 修改
		vim good.txt
		esc :wq
		git add good.txt
		git commit -m "My second commit,modify good.txt" good.txt
## 基本操作
	1. 状态查看
		git status
	2. 添加到暂存区
		git add [filename]
	3. 提交
		git commit -m "commit message" [filename]
	修改时，可以先add再commit，也可以直接commit，但是不能撤销
	4. 查看日志
		git log
			多屏显示控制：
				空格 向下翻页
				b 向上翻页
				q 退出
		git log --pretty=oneline
		git log --oneline
		git reflog	能显示指针以及回退需要的步数
			HEAD@{移动到当前版本需要的步数}

## 前进后退版本
	第一种方式：基于索引值操作【推荐】
	第二种方式：^符号		只能后退
	第三种方式：~符号		只能后退
### 第一种方式：基于索引值操作
	git reset --hard 索引值
### 第二种方式：基于^操作
	git reset --hard HEAD^
	git reset --hard HEAD^^^^
### 第三种方式：基于~操作
	git reset --hard HEAD~3

### reset三种参数对比
	--soft:
		仅仅在本地库移动指针
	--mixed:
		在本地库移动HEAD指针
		重置暂存区
	--hard:
		在本地库移动HEAD指针
		重置暂存区
		重置工作区

## 添加到暂存区的删除文件找回
	1. 删除文件 
	rm apple.txt
	2. 提交删除文件
	git add apple.txt
	3. 此时暂存区存在删除的文件
	4. 找回文件
	git reset --hard HEAD
	5. 此时文件被找回，暂存区不存在删除文件

## 比较
	git diff [文件名]
		工作区和暂存区进行比较
	git diff [本地库中历史版本] [文件名]
		工作区文件和本地库进行比较
	git diff
		工作区和暂存区比较多个文件

## 分支
	1. 创建分支
	git branch [分支名]
	2. 查看分支
	git branch -v
	3. 切换分支
	git checkout [分支名]
	4. 合并分支
		4.1 
		第一步：切换到接受修改的分支
			git checkout [分支名]
			git checkout master
		第二步：执行merge命令
			git merge [分支名]
			git merge hot_fix
		4.2	合并冲突
			冲突的解决
				第一步：编辑文件，删除特殊符号
				第二步：修改文件
				第三步：git add [文件名]
				第四步：git commit -m "日志"
						注意commit后面不能加文件名
	5. 解决冲突
分支冲突的表现：

![image-20210418184310664](C:\Users\Lemon\OneDrive\笔记\图片\git\image-20210418184310664.png)



## Git基本原理

### 哈希

用来校验数据一致

### 分支

Git保存的都是指针，这样的效率很高

## 查找帮助

	git help
	git help reset
## GitHub操作

### 初始化

```
第一步：在本地创建本地库
	git init
第二步：在GitHub上创建仓库
第三步：为远程库设置别名
	1. 
	git remote -v
	2. 设置别名
	git remote add origin https://github.com/Lemon-giser/huashan.git


```

### 推送

```
git push origin master
```

### 克隆

```
git clone https://github.com/Lemon-giser/huashan.git
效果：
	1. 完整的把远程库下载到本地
	2. 创建origin远程地址别名
	3. 初始化本地库
```

### 邀请加入团队

```
邀请加入团队
	Setting-->Manage access
	输入被邀请人的GitHub账号
被邀请人：
	打开链接
	https://github.com/Lemon-giser/huashan/invitations
	git push origin master
```

### 拉取

```
pull
	等于fetch 加 merge
fetch操作：
    git fetch origin master //拉取远程分支
    git checkout origin/master  //切换到远程分支
    git checkout master	//切换回去
merge操作：
	git merge origin/master
两步分开操作可以先不修改master分支的文件。
```

### 解决冲突

```
第一步：git push origin master
提示冲突无法提交
第二步：git pull origin master
第三步：修改文件
第四步：git add huashanjianfa.txt
第五步：git commit -m "resolve conflict"
		注意不带文件名
第六步：git push origin master
完成。
```

### 跨团队操作

```
团队外成员：
第一步：进入GitHub项目地址
第二步：点击folk
第三步：clone到本地
第四步：修改并commit
第五步：push到自己的GitHub
第六步：Pull requests
第七步：等待对方回复
团队成员：
第一步：点击Pull requests
第二步：查看代码，与对方交流
第三步：确认代码无误后，点击merge pull request
第四步：在本地pull
```

### 配置ssh

```
1. 到用户家目录
cd ~
2. 删除.ssh文件夹
rm -rvf .ssh
3. 生成.ssh目录
ssh-keygen -t rsa -C 1501731393@qq.com
4. 打开.ssh/id_rsa.pub文件
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDXl4GVfIlv/oD57BcvRehEOch/LH6BY8VRF7owN4cLOGrW7G6A75/2lL+GQbYGPQZSSTxq3qE+mXIUsSJUSA52r4xBiKY9fMlib3ak5kSTRXYfu69GYXelSfdcp+MKs+3qJ65pm+OOld7Y/PqPUMQGUUgJKZv9SlikRcIj+herqfknjx/y/9AEvJIKRwVyZcSwlccKcT+E/JitMUcTmisYTnKHkY9IskqN6Adyct16c9v2X9vesFDL7CAGG6avsSF1+QPczZ4PsJnPdI/YBYZe+ETGG6b7NllgoJPt+htue7069JbbAHDP+IUeKJmGGE6lucyOzAO+4++TSveClDBoQPkcqsk1JIsgYILcgAguiXKZOYGyxrPyn0TD8L/zGPZ7cfQztGs6+sKSxPguE9Q4TmZMfbDRthhMgYE6Ds0UqrblikJkoBJBPX6s1GELhtm6WV8aaccaU+6LeLsllKGvJw9vBLsnJOMn+WTB85sso2yWfxMmIfKQl0UJbmILJIE= 1501731393@qq.com
5. 将文件内容配置到GitHub中，头像->setting
6. 回到Git bash创建远程地址别名
git remote add origin_ssh 
7. 推送
git push origin_ssh master
```

## Git工作流

![image-20210419234342501](C:\Users\Lemon\OneDrive\笔记\图片\git\image-20210419234342501.png)