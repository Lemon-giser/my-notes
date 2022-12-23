## Java-基本语法

### 1. 变量、变量类型、类型转换

```java
    public static void main(String[] args) {
        /*
        变量类型
        8种基本类型  byte、short、int、long、float、double、char、boolean
        引用类型 String 只能用 + 做运算
        * */
        byte b1 = 11;
        short short1 = 111;
        int num = 12345;
        long num2 = 123456;
        float fl1 = 2.3F;
        double db1 = 10.1D;
        char ch1 = 'a';
        boolean hasSleep = false;
        String str1 = "Hello";
        str1 += hasSleep;
        System.out.println(str1); // Hellofalse
        /*
        * 类型转换: 自动类型提升
        * byte short char => int => long => float => boolean
        * */
        int t1 = b1 + short1;
        int t2 = b1;
        long t3 = num + num2;
        System.out.println("t1 is " + t1); // t1 is 122
        System.out.println("t2 is " + t2); // t2 is 11
        System.out.println("t3 is " + t3); // t3 is 135801
        /*
        * 类型转换：强制类型转换
        *         int t4 = (int) fl1;
         * */
        int t4 = (int) fl1;
        System.out.println("t4 is " + t4); // t4 is 2
    }
```

### 2. 运算符

```java
    public static void main(String[] args) {
        /*
        * 运算符
        * 判断实例 instanceof
        * 逻辑运算符
        *   &   |  !
        *   && ||  ^
        *  && || 会进行截断
        *  异或 左右相同为false 左右不同为true
        *
        * 三元运算符 a > b ? <式1> : <式2>
        * */
        boolean a = true;
        boolean b = false;
        System.out.println(a^b); // true
        System.out.println("Hello" instanceof String); // true
    }
```

### 3. 逻辑操作

条件判断： if……else……

```java
    /*
    * 输入学生成绩，判断等级并输出
    * */
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入成绩：");
        int score = scanner.nextInt();
        String str = "你的成绩是：";
        if (score >= 90 && score <= 100) {
            System.out.println(str + "优秀");
        } else if (score >= 80) {
            System.out.println(str + "好");
        } else if (score >= 70) {
            System.out.println(str + "良");
        } else if (score >= 60) {
            System.out.println(str + "及格");
        } else if (score >= 0){
            System.out.println(str + "不及格");
        } else {
            System.out.println("输入的成绩不合法");
        }
    }
```

循环：for循环、while循环、do…… while……循环

```java
    public static void main(String[] args) {
        // 输出 0 - 9 之间的整数
        for (int i = 0; i < 10; i++) {
            System.out.println(i);
        }
    }
```



### 4. 获取用户输入

Scanner类

```java
    public static void main(String[] args) {
        /*
        * 键盘录入两个数据，输出最大值
        * */
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入第一个值：");
        int integer1 = scanner.nextInt();
        System.out.println("请输入第二个值：");
        int integer2 = scanner.nextInt();
        int max = Math.max(integer1, integer2);
        System.out.println("最大值为：" + max);
    }
```

输出结果：

```bash
请输入第一个值：
20
请输入第二个值：
30
最大值为：30
```



### 5. 数组

```java
    public static void main(String[] args) {
        /*
         * 数组
         *  初始化后长度确定
         * */
        // 声明的几种方式
        // 1. 初始化并赋值
        int[] ids;
        ids = new int[]{100, 200, 300};
        // 2. 初始化不赋值
        String[] names = new String[10];
        names[0] = "ass";
        names[2] = "你好";
        System.out.println(names.length);
        // 3. 初始化 类型推断
        int[] numberArr = {1, 2, 3, 4};
        // 初始化的默认值
        int[] numbers = new int[2];
        String[] strings = new String[2];
        boolean[] booleans = new boolean[2];
        char[] chars = new char[2];
//        for (int i = 0; i < numbers.length; i++) {
//            System.out.println(numbers[i]); // 0
//        }
//        for (int i = 0; i < strings.length; i++) {
//            System.out.println(strings[i]); // null
//        }
//        for (int i = 0; i < booleans.length; i++) {
//            System.out.println(booleans[i]); // false
//        }
//        for (int i = 0; i < chars.length; i++) {
//            System.out.println(chars[i]); // 0
//        }
        // 4. 多维数组
        int[][] arr2 = new int[][]{{1, 2, 3}, {4, 5}, {6, 7}};
        int[][] arr = {{1, 2, 3}, {4, 5}, {6, 7}}; // 类型推断
        int[][] arr3 = new int[3][2];
        int[][] arr4 = new int[2][];
    }
```



## Java-面向对象基础

### 1. 类和类的实例化

修改一个数组的值

```java
package com.tichang.oop;

import java.util.Arrays;

public class Index {
    public void test(int[] arr) {
        arr[0] = 1;
    }

    public static void main(String[] args) {
//        String uuid = myUtils.getUuid();
//        System.out.println(uuid);
        Index index = new Index();
        int[] array = {3, 4, 5};
        index.test(array);
        System.out.println(Arrays.toString(array)); // [1, 4, 5]
    }
}
```

### 2. 面向对象

编写一个Student类，包含学号、班级、分数，自我介绍的函数

实例化20个学生，通过随机数赋值信息。

```java
package com.tichang.oop;

import java.text.MessageFormat;

public class PersonTest {
    public static void main(String[] args) {
        Student[] students = new Student[20];
        for (int i = 0; i < students.length; i++) {
            Student student;
            student = new Student();
            student.number = i + 1;
            student.score = (int) (Math.random() * 101);
            student.state = (int) (Math.random() * 3 + 1);
            students[i] = student;
        }
        for (Student student : students) {
            student.sayInfo();
        }
    }
}

class Student {
    int number;
    int state;
    int score;
    public void sayInfo() {
        String message = MessageFormat.format("学号：{0}， 班级：{1}， 分数：{2}", number, state, score);
        System.out.println(message);
    }
}
```

输出结果：

```bash
学号：1， 班级：1， 分数：34
学号：2， 班级：3， 分数：46
学号：3， 班级：2， 分数：93
学号：4， 班级：1， 分数：57
学号：5， 班级：1， 分数：85
学号：6， 班级：1， 分数：55
学号：7， 班级：3， 分数：1
学号：8， 班级：1， 分数：78
学号：9， 班级：2， 分数：52
学号：10， 班级：2， 分数：92
学号：11， 班级：3， 分数：19
学号：12， 班级：1， 分数：34
学号：13， 班级：3， 分数：91
学号：14， 班级：3， 分数：31
学号：15， 班级：1， 分数：46
学号：16， 班级：2， 分数：91
学号：17， 班级：3， 分数：23
学号：18， 班级：2， 分数：59
学号：19， 班级：2， 分数：91
学号：20， 班级：2， 分数：51

进程已结束,退出代码0

```

## Java-继承、多态、包装类

### 1. 继承、重写

编写Person类，成员包含name, age, getInfo()

编写Student类，继承自Person类，成员包含school，重写getInfo()

```java
package com.tichang.supertest;

class Person {
    protected String name = "张三";
    protected int age;
    public String getInfo () {
        return "Name" + name + "\n" + "age:" + age;
    }

}

class Student extends Person {
    protected String name = "李四";
    public String school;

    public String getInfo() {
        return super.getInfo() + "\nschool:" + school;
    }
}


public class StudentTest {
    public static void main(String[] args) {
        Student s = new Student();
        s.name = "Bob";
        s.school = "school";
        s.age = 20;
        System.out.println(s.getInfo());
    }
}

```

输出结果：

```bash
Name张三
age:20
school:school
```

### 2. 多态

```java
package com.tichang.polymorphism;

/*
* 多态性 练习
* */

class Person {
    protected String name = "张三";
    protected int age;
    public String getInfo () {
        return "Name" + name + "\n" + "age:" + age;
    }

}

class Student extends Person {
    protected String name = "李四";
    public String school;

    public String getInfo() {
        return super.getInfo() + "\nschool:" + school;
    }
}


public class StudentTest {
    public void method(Person e) {
        System.out.println(e.getInfo());
    }
    public static void main(String[] args) {

        // 父类类型的引用指向子类的对象：向上转型
        Person p = new Student();
        // 不能再访问子类的属性和方法
        // p.school = "sch"; // 报错
        Object o = new Person();
        o = new Student();

        /*
        * 方法声明的形参类型为父类类型，可以使用子类的对象作为实参调用该方法
        * */
        StudentTest studentTest = new StudentTest();
        studentTest.method(p);
        //Name张三
        //age:0
        //school:null

        System.out.println("p instanceof Person " + (p instanceof Person)); // true
        System.out.println("p instanceof Student " + (p instanceof Student)); // true
    }
}
```

### 3. 包装类、装箱、拆箱

```java
package com.tichang.wrapper;

public class WrapperTest {
    public static void main(String[] args) {

        /*
        基本数据类型   包装类
        byte         Byte
        short        Short
        int          Integer
        long         Long
        float        Float
        double       Double
        boolean      Boolean
        char         Character
        * */

        /*
             基本数据类型包装成包装类的实例 ---装箱
             通过包装类的构造器实现：
            int i = 500; Integer t = new Integer(i);
             还可以通过字符串参数构造包装类对象：
            Float f = new Float(“4.56”);
            Long l = new Long(“asdf”); //NumberFormatException
             获得包装类对象中包装的基本类型变量 ---拆箱
             调用包装类的.xxxValue()方法：
            boolean b = bObj.booleanValue();
             JDK1.5之后，支持自动装箱，自动拆箱。但类型必须匹配。
        * */
        // 字符串转换成基本数据类型
        Float f = Float.parseFloat("11.1");
        // 基本数据类型转换成字符串
        String fstr = String.valueOf(2.2f);
        System.out.println(fstr); // 2.2

        // 方式二
        String intStr = 5 + "";

    }
}

```



## Java-修饰符、抽象、接口、内部类

### 1. static修饰符

```java
package T1_static_block;
/*
1. static 关键字
2. 代码块
 代码块(或初始化块)的作用：
 对Java类或对象进行初始化
 代码块(或初始化块)的分类：
 一个类中代码块若有修饰符，则只能被static修饰，称为静态代码块
(static block)，没有使用static修饰的，为非静态代码块。
 static代码块通常用于初始化static的属性
    class T1_static_block.Person {
    public static int total;
    static {
        total = 100;//为total赋初值
    }
    …… //其它属性或方法声明
}

 静态代码块：用static 修饰的代码块
不可以调用非静态的属性和方法。
静态代码块随着类的加载而加载，且只执行一次

 非静态代码块：没有static修饰的代码块
可以对类的属性、类的声明进行初始化操作。
除了调用非静态的结构外，还可以调用静态的变量或方法。
每次创建对象的时候，都会执行一次。且先于构造器执行。

* */

class Person {
    public static int total;
    static {
        total = 100;
        // 下面这行只会输出一次。
        System.out.println("in static block");
    }
}

public class T1_static_block {
    public static void main(String[] args) {
        System.out.println("total = " + Person.total);
        System.out.println("total = " + Person.total);
    }
}

```

输出结果

```
in static block
total = 100
total = 100
```

### 2. final 修饰符

```java
package T2_final;
/*
在Java中声明类、变量和方法时，可使用关键字final来修饰,表示“最终的”。
    final标记的类不能被继承。提高安全性，提高程序的可读性。
        String类、System类、StringBuffer类
    final标记的方法不能被子类重写。
        比如：Object类中的getClass()。
    final标记的变量(成员变量或局部变量)即称为常量。名称大写，且只能被赋值一次。
        final标记的成员变量必须在声明时或在每个构造器中或代码块中显式赋
    值，然后才能使用。
        final double MY_PI = 3.14;

*/

// 此类不能被继承
/*
    final class T2_final.A {

    }

* */

/*

    class T2_final.A {
        // 此方法不能被重写.
        public final void print () {
            System.out.println("T2_final.A");
        }
    }

    class B extends T2_final.A {
        // 报错。
        public void print(){}
    }

* */


class A {
    // 定义一个常量,不可以被修改
    private final String INFO = "tichang";

    // 全局常量
    static final String INFO2 = "INFO2";

    private final String INFO3;
    public A () {
        // 可以在构造器中定义常量.但之后不可以修改.
        INFO3 = "INFO_3";
    }
    public void print () {
        // 报错.
        // INFO = "233";
    }
}


```

### 3. abstract 修饰符

```java
package T3_abstract_class;
/*
     用abstract关键字来修饰一个类，这个类叫做抽象类。
     用abstract来修饰一个方法，该方法叫做抽象方法。
        抽象方法：只有方法的声明，没有方法的实现。以分号结束：
        比如：public abstract void talk();
     含有抽象方法的类必须被声明为抽象类。
     抽象类不能被实例化。抽象类是用来被继承的，抽象类的子类必须重
    写父类的抽象方法，并提供方法体。若没有重写全部的抽象方法，仍
    为抽象类。
     不能用abstract修饰变量、代码块、构造器；
     不能用abstract修饰私有方法、静态方法、final的方法、final的类。


* */

abstract class A {
    abstract void m1();
    public void m2 () {
        System.out.println("A类中定义的m2方法");
    }
}

class B extends A {
    void m1() {
        System.out.println("B类中定义的m1方法");
    }
}

public class T3_abstract_class {
    public static void main(String[] args) {
        A a = new B();
        a.m1(); // B类中定义的m1方法
        a.m2(); // A类中定义的m2方法
    }
}

```

### 4. 多态的应用：模板方法设计模式

```java
package T4_template_method;
/*
    多态的应用：模板方法设计模式(TemplateMethod)

    解决的问题：
     当功能内部一部分实现是确定的，一部分实现是不确定的。这时可以
    把不确定的部分暴露出去，让子类去实现。
     换句话说，在软件开发中实现一个算法时，整体步骤很固定、通用，
    这些步骤已经在父类中写好了。但是某些部分易变，易变部分可以抽
    象出来，供不同子类实现。这就是一种模板模式。
* */
abstract class Template {
    public final void getTime () {
        long start = System.currentTimeMillis();
        code();
        long end = System.currentTimeMillis();
        System.out.println("执行时间是:" + (end - start));
    }

    public abstract void code();
}

class SubTemplate extends Template {
    public void code() {
        for (int i = 0; i < 10000; i++) {
            System.out.println(i);
        }
    }
}

public class T4_template_method {
    public static void main(String[] args) {
        SubTemplate subTemplate = new SubTemplate();
        subTemplate.getTime();
    }
}

```

输出：

```
执行时间是:60
```

### 5. 接口和实现

类可以继承类，同时实现接口

```java
package T7_interface3;

import static T7_interface3.A.x;

interface A {
    int x = 0;
}

class B {
    int x = 1;
}

class C extends B implements A {
    public void pX() {
        System.out.println(A.x);
    }
}
public class T7_interface {
    public static void main(String[] args) {
        C c = new C();
        c.pX(); // 0
    }
}

```

### 6. 内部类

```java
package T8_inner_class;


public class Test {
    public Test() {
        Inner s1 = new Inner();
        s1.a = 10;
        Inner s2 = new Inner();
        s2.a = 20;
        Test.Inner s3 = new Test.Inner();
        System.out.println(s3.a);
    }
    class Inner {
        public int a = 5;
    }
    public static void main(String[] args) {
        Test t = new Test();
        Inner r = t.new Inner();
        System.out.println(r.a);
    }
}


```

输出：

```
5
5
```

## Java-异常处理

### 1. 读写文件 IOException

使用try...catch...finally...处理异常。

在catch中指明异常的类型。

```java
package T1_IOException;

import java.io.*;

public class Test {
    public static void main(String[] args) {
        try {
            FileInputStream inputStream = new FileInputStream("atguigushk.txt");
            int b;
            b = inputStream.read();
            while (b != -1) {
                System.out.println((char) b);
                b = inputStream.read();
            }
            inputStream.close();
        } catch (IOException e) {
            System.out.println(e);
        } finally {
            System.out.println("It's ok");
        }
    }
}

```

正常输出结果：

```
2
3
3
It's ok
```

异常输出结果：

```
java.io.FileNotFoundException: atguigushk1.txt (系统找不到指定的文件。)
It's ok
```

### 2. 自定义异常

自定义异常，需要继承Exception

```java
package T2_customException;

public class MyException extends Exception{
    static final long serialVersionUID = 134565656L;
    private int idNumber;
    public MyException(String message, int id) {
        super(message);
        this.idNumber = id;
    }

    public int getId() {
        return idNumber;
    }
}

```

然后在自己的程序中引用

```java
package T2_customException;

public class MyExpTest {
    public void register(int num) throws MyException {
        if (num < 0) {
            throw new MyException("人数为负值", 3);
        } else {
            System.out.print("登记人数" + num);
        }
    }

    public void manager() {
        try {
            this.register(1);
        } catch (MyException e) {
            System.out.print("登记失败, 出错种类" + e.getId());
        }
        System.out.print("本次登记操作结束");
    }

    public static void main(String[] args) {
        MyExpTest t = new MyExpTest();
        t.manager();
    }
}

```

