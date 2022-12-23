## Lambda 要求

1. 函数式接口（只有一个方法体的接口）
```java
interface Test {

	void test();

	default void test2() {};

	static void test3() {};

	String toString();

}


```


2. 注解


```java
@FunctionalInterface

interface Test1 {

	void test1();

}

```

## 一、基础语法

1. 定义不同参数、不同返回值的接口

```java
@FunctionalInterface
public interface NoneReturnMultiParam {
    void test(int a, int b);
}
@FunctionalInterface
public interface NoneReturnNoneParam {
    void test();
}
@FunctionalInterface
public interface NoneReturnSingleParam {
    void test(int a);
}
@FunctionalInterface
public interface SingleReturnMultiParam {
    int test(int a, int b);
}
@FunctionalInterface
public interface SingleReturnNoneParam {
    int test();
}
@FunctionalInterface
public interface SingleReturnSingleParam {
    int test(int a);
}

```

2. 调用方法

```java
public class BasicSyntax {
    public static void main(String[] args) {
        // 1 无参数无返回值
        NoneReturnNoneParam lambda1 = () -> System.out.println("这是一个无参数无返回值的接口");
        lambda1.test();
        // 2 一个参数无返回值
        NoneReturnSingleParam lambda2 = a -> System.out.println("这是一个一个参数无返回值的接口" + a);;
        lambda2.test(10);

        // 3 多个个参数无返回值
        NoneReturnMultiParam lambda3 = (a, b) -> System.out.println("这是一个多个个参数无返回值的接口" + a + ", " + b);
        lambda3.test(20, 30);

        // 4 无参数，有返回值
        SingleReturnNoneParam lambda4 = () -> 666;
        lambda4.test();

        // 5 一个参数，有返回值
        SingleReturnSingleParam lambda5 = a -> a;
        lambda5.test(300);

        // 6 多个参数，有返回值
        SingleReturnMultiParam lambda6 = (a, b) -> a + b + 1;
        System.out.println(lambda6.test(8848, 250));

    }
}

```

## 二、函数引用

### 静态函数引用

 语法：
     类::静态方法
 要求：
     引用的方法的参数、返回值，要和接口中定义的一致

### 非静态函数引用

语法：
    对象::非静态方法
要求：
    引用的方法的参数、返回值，要和接口中定义的一致

```java
public class Lambda2 {
    public interface Calculate {
        int calculate(int a, int b);
    }

    public static void main(String[] args) {
        /*
        * 一、 静态函数引用
        *   语法：
        *       类::静态方法
        *   要求：
        *       引用的方法的参数、返回值，要和接口中定义的一致
        * */
        // 1
        Calculate calc1 = (x, y) -> x * y;
        System.out.println(calc1.calculate(10, 20));

        // 2 调用一段代码
        Calculate calc2 = (x, y) -> Calculate(x, y);
        System.out.println(calc2.calculate(20, 40));

        // 3 函数引用
        Calculate calc3 = Lambda2::Calculate;
        System.out.println(calc3.calculate(20, 40));


        /*
        * 二、 非静态方法引用
        *   语法：
        *       对象::非静态方法
        *   要求：
        *       引用的方法的参数、返回值，要和接口中定义的一致
        * */
        Calculate calc4 = new Lambda2()::Calc2;
        System.out.println(calc4.calculate(10, 20));

    }

    public static int Calculate(int x, int y) {
        if (x > y) {
            return x - y;
        } else if (x < y) {
            return 100;
        }
        return x + y;
    }

    public int Calc2(int a, int b) {
        if (a == b) {
            return a + b;
        }
        return a - b;
    }


}

```

### 构造函数引用

使用场景：
    如果某一个函数式接口定义的方法，仅仅是为了得到一个类的对象。此时我们就可以使用构造函数的引用来实现
语法
    类名::new
注意
    可以通过接口中的方法的参数，区分引用不同的构造方法。

```java
public class Lambda3 {
    public static class Person {
        String name;
        int age;

        public Person() {
            System.out.println("无参构造方法执行了");
        }

        public Person(String name) {
            this.name = name;
            System.out.println("有参构造方法执行了");
        }

        public Person(String name, int age) {
            this.name = name;
            this.age = age;
            System.out.println("两个参数的构造方法执行了");
        }
    }

    @FunctionalInterface
    interface GetPerson {
        Person get();
    }

    @FunctionalInterface
    interface GetPersonSingleParam {
        Person get(String name);
    }

    @FunctionalInterface
    interface GetPersonMultiParam {
        Person get(String name, int age);
    }
    public static void main(String[] args) {
        /*
        * 二、构造函数引用
        *   使用场景：
        *       如果某一个函数式接口定义的方法，仅仅是为了得到一个类的对象。此时我们就可以使用构造函数的引用来实现
        *   语法
        *       类名::new
        *   注意
        *       可以通过接口中的方法的参数，区分引用不同的构造方法。
        * */
        // 使用lambda表达式，实现GetPerson接口

        // 1
        GetPerson getPerson = () -> new Person();
        System.out.println(getPerson.get());

        // 2
        GetPerson getPerson1 = Person::new;
        getPerson1.get();

        // 3
        GetPersonSingleParam getPerson3 = Person::new;
        getPerson3.get("");

        // 4
        GetPersonMultiParam getPerson4 = Person::new;
        getPerson4.get("", 18);

    }
}
```

### 对象方法的特殊引用

语法
      类名::方法名

```java
public class Lambda4 {
    static class Person {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }

    interface MyInterface {
        String get(Person person);
    }

    interface MyInterface2 {
        void setName(Person person, String name);
    }
    public static void main(String[] args) {
        /*
        * 对象方法的特殊引用
        * 语法
        *       类名::方法名
        *
        * */

        // 1
        MyInterface lambda = x -> x.getName();
        Person p1 = new Person();
        p1.setName("小明");
        System.out.println(lambda.get(p1));

        // 2
        MyInterface lambda2 = Person::getName;
        Person p2 = new Person();
        p2.setName("小红");
        System.out.println(lambda2.get(p2));

        // 3
        // MyInterface2 lambda3 = (x, n) -> x.setName(n);
        MyInterface2 lambda3 = Person::setName;
        lambda3.setName(p1, "张三");
        System.out.println(p1.getName());
    }
}

```

