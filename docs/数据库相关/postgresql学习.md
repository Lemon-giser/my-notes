## 创建一个数据库

```
createdb mydb
dropdb mydb
```

## 访问数据库

启动psql

```
mydb=> SELECT version();

```

```
mydb=> \h 查看命令
mydb=> \q 退出

```

## 2.3 创建一个新表

```sql
-- http://www.postgres.cn/docs/13/index.html
-- 2.3
create table weather (
	city varchar(80),
	temp_lo int, --最低温度
	temp_hi int, --最高温度
	prcp    real, --湿度 real 单精度浮点数
	date    date
);

create table cities (
	name varchar(80),
	location point
);

drop table weather;
drop view myview;
```

## 2.4 在表中增加行

```sql
-- http://www.postgres.cn/docs/13/index.html
--2.4
insert into weather values('San Francisco', 46, 50, 0.25, '1994-11-27');
insert into cities values('San Francisco', '(-194.0, 53.0)');

insert into weather (city, temp_lo, temp_hi, prcp, date)
values ('San Francisco', 43, 57, 0.0, '1994-11-29');

insert into weather (date, city, temp_hi,temp_lo )
values ('1994-11-29', 'Hayward', 54, 37 );
-- 你还可以使用COPY从文本文件中装载大量数据。这种方式通常更快，因为COPY命令就是为这类应用优化的， 只是比 INSERT少一些灵活性。比如：
-- COPY weather FROM '/home/user/weather.txt';


```

## 2.5 查询一个表

```sql
-- http://www.postgres.cn/docs/13/index.html

--2.5 查询
-- 基础查询
SELECT * FROM weather;
select * from cities;
SELECT city, temp_lo, temp_hi, prcp, date FROM weather;
-- 运算
SELECT city, (temp_hi + temp_lo)/2 as temp_avg, date from weather;
-- 条件
SELECT * FROM weather where city = 'San Francisco' and prcp > 0.0;
-- 排序
SELECT * FROM weather
    ORDER BY city;

SELECT * FROM weather
ORDER BY city, temp_lo;
-- 消除重复的行 DISTINCT
SELECT DISTINCT city
    FROM weather;

SELECT DISTINCT city
    FROM weather
    ORDER BY city;

```

## 2.6 在表之间连接

```sql
-- http://www.postgres.cn/docs/13/index.html

-- 2.6 在表之间连接
select * from weather, cities where city = name;
-- 有两个列显示了城市的名字，所以不用*查询
SELECT city, temp_lo, temp_hi, prcp, date, location
    FROM weather, cities
    WHERE city = name;
-- 省略where子句
SELECT city, temp_lo, temp_hi, prcp, date, location
    FROM weather, cities;
-- 如果两个表中有重复的列名，应该限定列名
SELECT weather.city, weather.temp_lo, weather.temp_hi,
       weather.prcp, weather.date, cities.location
    FROM weather, cities
    WHERE cities.name = weather.city;
-- 另一种连接查询的语法
select * from  weather inner join cities on (weather.city = cities.name);

-- 扫描weather表， 并且对每一行都找出匹配的cities表行。
-- 如果我们没有找到匹配的行，那么我们需要一些“空值”代替cities表的列。
-- 这种查询叫 外连接
select * from weather left outer join cities on (weather.city = cities.name);
-- 这个查询是一个左外连接， 因为在连接操作符左部的表中的行在输出中至少要出现一次，
-- 而在右部的表的行只有在能找到匹配的左部表行时才被输出。
-- 如果输出的左部表的行没有对应匹配的右部表的行，那么右部表行的列将填充空值（null）。

-- 右外连接、全外连接
select * from weather right outer join cities on (weather.city = cities.name);
select * from weather full outer join cities on (weather.city = cities.name);

-- 自连接
-- 假设我们想找出那些在其它天气记录的温度范围之外的天气记录。
-- 这样我们就需要拿 weather表里每行的temp_lo和temp_hi列与weather表里其它行的temp_lo和temp_hi列进行比较。
select W1.city, W1.temp_lo as low, W1.temp_hi as high,
W2.city , W2.temp_lo as low , W2.temp_hi as high
from weather W1, weather W2
where W1.temp_lo < W2.temp_lo
and W1.temp_hi > W2.temp_hi

```

## 2.7 聚集函数

```sql
--http://www.postgres.cn/docs/13/tutorial-agg.html

-- 2.7 聚集函数
/*
一个聚集函数从多个输入行中计算出一个结果。
比如，我们有在一个行集合上计算count（计数）、sum（和）、avg（均值）、max（最大值）和min（最小值）的函数。
*/
-- 找出所有记录中最低温度中的最高温度
select max(temp_lo)
from weather;

-- 找出这个温度对应的城市
-- select city from weather where temp_lo = max(temp_lo); -- 错误 此处不允许聚合调用
/*
不过这个方法不能运转，因为聚集max不能被用于WHERE子句中（存在这个限制是因为WHERE子句决定哪些行可以被聚集计算包括；
因此显然它必需在聚集函数之前被计算）。
不过，我们通常都可以用其它方法实现我们的目的；这里我们就可以使用子查询：
*/
-- 子查询 找出所有记录中最低温度中的最高温度, 并找出这个温度对应的城市
select city, temp_lo
from weather
where temp_lo = (select max(temp_lo)
                 from weather);

-- 聚集同样也常用于和GROUP BY子句组合。比如，我们可以获取每个城市观测到的最低温度的最高值：
select city, max(temp_lo) from weather group by city;

-- 我们可以用HAVING 过滤这些被分组的行：(所有temp_lo值曾都低于 40的城市)
select city, max(temp_lo) from weather group by city having max(temp_lo) < 40;

-- 只关心那些名字以“S”开头的城市
select city, max(temp_lo)
from weather
where city like 'S%' -- like 模式匹配
group by city
having max(temp_lo) < 40;

/*
WHERE和HAVING的基本区别如下：WHERE在分组和聚集计算之前选取输入行（因此，它控制哪些行进入聚集计算），
而HAVING在分组和聚集之后选取分组行。因此，WHERE子句不能包含聚集函数；
因为试图用聚集函数判断哪些行应输入给聚集运算是没有意义的。
相反，HAVING子句总是包含聚集函数（严格说来，你可以写不使用聚集的HAVING子句， 但这样做很少有用。
同样的条件用在WHERE阶段会更有效）。
*/
```

## 2.8 更新

```sql
-- http://www.postgres.cn/docs/13/tutorial-update.html
-- 2.8 更新

select * from  weather;
/*
假设你发现所有 11 月 28 日以后的温度读数都低了两度，那么你就可以用下面的方式改正数据：
*/
update weather set temp_hi = temp_hi - 2, temp_lo = temp_lo - 2 where  date> '1994-11-28';
```

## 2.9 删除

```sql
-- http://www.postgres.cn/docs/13/tutorial-delete.html

-- 2.9删除

/*
假设你对Hayward的天气不再感兴趣，那么你可以用下面的方法把那些行从表中删除
*/
delete
from weather
where city = 'Hayward';

select * from weather;

/*
我们用下面形式的语句的时候一定要小心
DELETE FROM tablename;
如果没有一个限制，DELETE将从指定表中删除所有行，把它清空。做这些之前系统不会请求你确认！

*/
```

## 3.2 视图

```sql
/*
假设天气记录和城市位置的组合列表对我们的应用有用，但我们又不想每次需要使用它时都敲入整个查询。
我们可以在该查询上创建一个视图，这会给该查询一个名字，我们可以像使用一个普通表一样来使用它：
*/
create view myview as
select city, temp_lo, temp_hi, prcp, date, location from weather, cities where city = name;
select * from myview;

/*
对视图的使用是成就一个好的SQL数据库设计的关键方面。
视图允许用户通过始终如一的接口封装表的结构细节，这样可以避免表结构随着应用的进化而改变。

视图几乎可以用在任何可以使用表的地方。在其他视图基础上创建视图也并不少见。

*/
```

## 3.3 外键

```sql
/*
我们希望确保在cities表中有相应项之前任何人都不能在weather表中插入行。
这叫做维持数据的引用完整性。
在过分简化的数据库系统中，可以通过先检查cities表中是否有匹配的记录存在，然后决定应该接受还是拒绝即将插入weather表的行。
这种方法有一些问题且并不方便，于是PostgreSQL可以为我们来解决：

*/
create table cities (
    city varchar(80) primary key ,
    location point
);

create table weather (
    city varchar(80) references cities(city),
    temp_lo int,
    temp_hi int,
    prcp real,
    date date
);

-- 现在尝试插入一个非法的记录：
insert into weather values ('Berkeley', 45, 53, 0.0, '1994-11-28');
/*
[2022-10-07 11:20:14] [23503] 错误: 插入或更新表 "weather" 违反外键约束 "weather_city_fkey"
[2022-10-07 11:20:14] 详细：键值对(city)=(Berkeley)没有在表"cities"中出现.
*/
```

## 3.4 事务

```sql
/*
事务是所有数据库系统的基础概念。
事务最重要的一点是它将多个步骤捆绑成了一个单一的、要么全完成要么全不完成的操作。
步骤之间的中间状态对于其他并发事务是不可见的，并且如果有某些错误发生导致事务不能完成，则其中任何一个步骤都不会对数据库造成影响。
*/

/*
一个事务型数据库保证一个事务在被报告为完成之前它所做的所有更新都被记录在持久存储（即磁盘）。
*/

/*
事务型数据库的另一个重要性质与原子更新的概念紧密相关：当多个事务并发运行时，每一个都不能看到其他事务未完成的修改。
*/


/*
开启一个事务需要将SQL命令用BEGIN和COMMIT命令包围起来

BEGIN;
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
-- etc etc
COMMIT;

如果，在事务执行中我们并不想提交（或许是我们注意到Alice的余额不足），
我们可以发出ROLLBACK命令而不是COMMIT命令，这样所有目前的更新将会被取消。

PostgreSQL实际上将每一个SQL语句都作为一个事务来执行。
如果我们没有发出BEGIN命令，则每个独立的语句都会被加上一个隐式的BEGIN以及（如果成功）COMMIT来包围它。
一组被BEGIN和COMMIT包围的语句也被称为一个事务块。
*/

/*
也可以利用保存点来以更细的粒度来控制一个事务中的语句。
保存点允许我们有选择性地放弃事务的一部分而提交剩下的部分。
在使用SAVEPOINT定义一个保存点后，我们可以在必要时利用ROLLBACK TO回滚到该保存点。
该事务中位于保存点和回滚点之间的数据库修改都会被放弃，但是早于该保存点的修改则会被保存。

BEGIN;
UPDATE accounts SET balance = balance - 100.00
    WHERE name = 'Alice';
SAVEPOINT my_savepoint;
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Bob';
-- oops ... forget that and use Wally's account
ROLLBACK TO my_savepoint;
UPDATE accounts SET balance = balance + 100.00
    WHERE name = 'Wally';
COMMIT;

*/
```

## 3.5 窗口函数

```sql
/*
https://zhuanlan.zhihu.com/p/92654574
<窗口函数> over (partition by <用于分组的列名>
                order by <用于排序的列名>)
*/

/*
一个窗口函数在一系列与当前行有某种关联的表行上执行一种计算。
这与一个聚集函数所完成的计算有可比之处。
但是窗口函数并不会使多行被聚集成一个单独的输出行，这与通常的非窗口聚集函数不同。
取而代之，行保留它们独立的标识。在这些现象背后，窗口函数可以访问的不仅仅是查询结果的当前行。
*/
CREATE TEMPORARY TABLE empsalary
(
    depname     varchar,
    empno       bigint,
    salary      int,
    enroll_date date
);
INSERT INTO empsalary
VALUES ('develop', 10, 5200, '2007-08-01'),
       ('sales', 1, 5000, '2006-10-01'),
       ('personnel', 5, 3500, '2007-12-10'),
       ('sales', 4, 4800, '2007-08-08'),
       ('personnel', 2, 3900, '2006-12-23'),
       ('develop', 7, 4200, '2008-01-01'),
       ('develop', 9, 4500, '2008-01-01'),
       ('sales', 3, 4800, '2007-08-01'),
       ('develop', 8, 6000, '2006-10-01'),
       ('develop', 11, 5200, '2007-08-15');
select *
from empsalary;
-- 下面是一个例子用于展示如何将每一个员工的薪水与他/她所在部门的平均薪水进行比较：
SELECT depname, empno, salary, avg(salary) OVER (PARTITION BY depname)
FROM empsalary;
/*
最开始的三个输出列直接来自于表empsalary，并且表中每一行都有一个输出行。
第四列表示对与当前行具有相同depname值的所有表行取得平均值
（这实际和非窗口avg聚集函数是相同的函数，但是OVER子句使得它被当做一个窗口函数处理并在一个合适的窗口帧上计算。）。
*/

/*
一个窗口函数调用总是包含一个直接跟在窗口函数名及其参数之后的OVER子句。
这使得它从句法上和一个普通函数或非窗口函数区分开来。
OVER子句决定究竟查询中的哪些行被分离出来由窗口函数处理。
OVER子句中的PARTITION BY子句指定了将具有相同PARTITION BY表达式值的行分到组或者分区。
对于每一行，窗口函数都会在当前行同一分区的行上进行计算。

*/

-- 我们可以通过OVER上的ORDER BY控制窗口函数处理行的顺序（窗口的ORDER BY并不一定要符合行输出的顺序。）。下面是一个例子：
select depname,
       empno,
       salary,
       rank() over ( partition by depname order by salary desc )
from empsalary;
/*
如上所示，rank函数在当前行的分区内按照ORDER BY子句的顺序为每一个可区分的ORDER BY值产生了一个数字等级。
rank不需要显式的参数，因为它的行为完全决定于OVER子句。
*/

/*
一个窗口函数所考虑的行属于那些通过查询的FROM子句产生并通过WHERE、GROUP BY、HAVING过滤的“虚拟表”。
例如，一个由于不满足WHERE条件被删除的行是不会被任何窗口函数所见的。
在一个查询中可以包含多个窗口函数，每个窗口函数都可以用不同的OVER子句来按不同方式划分数据，但是它们都作用在由虚拟表定义的同一个行集上。

我们已经看到如果行的顺序不重要时ORDER BY可以忽略。PARTITION BY同样也可以被忽略，在这种情况下会产生一个包含所有行的分区。

这里有一个与窗口函数相关的重要概念：对于每一行，在它的分区中的行集被称为它的**窗口帧**。
一些窗口函数只作用在窗口帧中的行上，而不是整个分区。
默认情况下，如果使用ORDER BY，则帧包括从分区开始到当前行的所有行，以及后续任何与当前行在ORDER BY子句上相等的行。
如果ORDER BY被忽略，则默认帧包含整个分区中所有的行。 [4] 下面是使用sum的例子：
*/
select salary, sum(salary) over ()
from empsalary;
/*
如上所示，由于在OVER子句中没有ORDER BY，窗口帧和分区一样，而如果缺少PARTITION BY则和整个表一样。
换句话说，每个合计都会在整个表上进行，这样我们为每一个输出行得到的都是相同的结果。
但是如果我们加上一个ORDER BY子句，我们会得到非常不同的结果：
*/
select salary, sum(salary) over (order by salary)
from empsalary;
/*
这里的合计是从第一个（最低的）薪水一直到当前行，包括任何与当前行相同的行（注意相同薪水行的结果）。
*/

-- 窗口计算执行后过滤或分组，可以使用子查询
select depname,
       empno,
       salary,
       enroll_date,
       rank() over (partition by depname order by salary desc) as pos
from empsalary;

select depname, empno, salary, enroll_date, pos
from (select depname,
             empno,
             salary,
             enroll_date,
             rank() over (partition by depname order by salary desc) as pos
      from empsalary) as ss
where pos < 3;


/*

当一个查询涉及到多个窗口函数时，可以将每一个分别写在一个独立的OVER子句中。
但如果多个函数要求同一个窗口行为时，这种做法是冗余的而且容易出错的。
替代方案是，每一个窗口行为可以被放在一个命名的WINDOW子句中，然后在OVER中引用它。例如：
*/
select sum(salary) over w, avg(salary) over w
from empsalary
window w as (partition by depname order by salary desc);
```

## 3.6 继承

```sql
-- 继承是面向对象数据库中的概念。它展示了数据库设计的新的可能性。

-- 让我们创建两个表：表cities和表capitals。
-- 自然地，首都也是城市，所以我们需要有某种方式能够在列举所有城市的时候也隐式地包含首都。
CREATE TABLE cities (
	name		text,
	population	float8,
	elevation	int		-- (in ft)
);

CREATE TABLE capitals (
	state		char(2)
) INHERITS (cities);

-- Now, let's populate the tables.
INSERT INTO cities VALUES ('San Francisco', 7.24E+5, 63);
INSERT INTO cities VALUES ('Las Vegas', 2.583E+5, 2174);
INSERT INTO cities VALUES ('Mariposa', 1200, 1953);

INSERT INTO capitals VALUES ('Sacramento', 3.694E+5, 30, 'CA');
INSERT INTO capitals VALUES ('Madison', 1.913E+5, 845, 'WI');

SELECT * FROM cities;
SELECT * FROM capitals;
/*
在这种情况下，一个capitals的行从它的父亲cities继承了所有列（name、population和elevation）。
列name的类型是text，一种用于变长字符串的本地PostgreSQL类型。 capitals表有一个附加列，state，用于显示他们的州缩写。
在PostgreSQL中，一个表可以从0个或者多个表继承。
*/

-- 寻找所有海拔500尺以上的城市名称，包括州首都
select name, elevation from cities where elevation > 500;
-- 查找所有海拔高于500尺且不是州首府的城市
select name, elevation from only cities where elevation > 500;

/*
其中cities之前的ONLY用于指示查询只在cities表上进行而不会涉及到继承层次中位于cities之下的其他表。
很多我们已经讨论过的命令 — SELECT、UPDATE 和DELETE — 都支持这个ONLY记号。
尽管继承很有用，但是它还未与唯一约束或外键集成，这也限制了它的可用性。
*/
```

