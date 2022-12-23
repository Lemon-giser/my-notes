## Spring核心概念

1. IOC 控制反转

   ```
   不要自己去写new来创建对象，由spring的IOC容器处理。
   这样能够实现解耦
   ```

   ```java
   class BookService{
       // BookDao bookDao = new BookDao();
       BookDao bookDao;
   }
   ```

2. Bean

   ```
   IOC容器中的对象称为Bean
   ```

3. IOC 容器

    ```
    管理所有Bean的容器
    ```

4. DI 依赖注入

    ```
    IOC容器中的对象有依赖关系，spring将依赖绑定，称为依赖注入。
    比如 service对象中有dao对象， 则在IOC容器中做依赖注入
    ```

    

## 示例-原本写法

![image-20220930222120582](https://raw.githubusercontent.com/Lemon-giser/myImages/main/img/image-20220930222120582.png)

![image-20220930222151669](https://raw.githubusercontent.com/Lemon-giser/myImages/main/img/image-20220930222151669.png)

![image-20220930222048956](https://raw.githubusercontent.com/Lemon-giser/myImages/main/img/image-20220930222048956.png)

## 示例 配置 spring-context

1. mevan

```
    <dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.3.23</version>
        </dependency>
    </dependencies>
```

2. applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--1. 导入 spring-context-->
    <!--2. 配置 bean-->
    <bean id="bookDao" class="com.tichang.dao.impl.BookDaoImpl"/>
    <bean id="bookService" class="com.tichang.service.impl.BookServiceImpl"/>
</beans>
```

3. 获取IoC容器

![image-20220930222643212](https://raw.githubusercontent.com/Lemon-giser/myImages/main/img/image-20220930222643212.png)

## 依赖注入

上部分并没有解决解耦问题（仍然使用了new）
