package com.example.demo;

import javax.sql.DataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

//@Configuration
//사용자 정의 클래스도 ApplicationContext나 BeanFactory의 관리를 받을 수 있다.
//의존성 주입
//application.properties-Maven
//application.yml-gradle-반복코드 없음-json포맷이라서. 요즘은 yml주로씀
//resource-mapper->member.xml, board.xml, order.xml
//static -CND
//static에 css, js, images를 넣어야 한다. 배포위지!!!왜? 정적이니까...?
//static안에는 정적인 문서를 넣어준다.
@Configuration
@PropertySource("classpath:/application.properties") // class Path->resource->log4j.properties 보안문제...
// @PropertySource("classpath:/application.yml")//그레이들 방식class
// Path->resource->log4j.properties 보안문제...
//@PropertySource("classpath:/application.yml")
//@MapperScan(basePackages = "com.example.demo.mapper")
public class DatabaseConfiguration {
	private static final Logger logger = LogManager.getLogger(DatabaseConfiguration.class);
//Configuration으로 선언된 클래스에서만 사용가능한 어노테이션임-@Bean

	@Bean
	@ConfigurationProperties(prefix = "spring.datasource.hikari") // application.properties의 접두어 ""안에를 맞춰줘야한다.
	public HikariConfig hikariConfig() {// 인스턴스화
		return new HikariConfig();// 생성자 호출 - 메모리에 로딩이 된다.-변수와 메소드를 누릴 수 있다.
	}

//물리적으로 떨어져 있는 오라클(application.properties)서버와 연결통로 확보
//POJO에서는 마이바티스Config.xml <- hikariCongfig()
	@Bean // 내가 주입해준다.
	public DataSource dataSource() {
		// 인터페이스=구현체클래스(new HikariConfig()) - application.properties

		DataSource dataSource = new HikariDataSource(hikariConfig());
		logger.info("datasource : {}", dataSource);
		return dataSource;
	}

	@Autowired
	private ApplicationContext applicationContext;// 빈관리. 이른 인스턴스화로 관리. 빈팩토리의 자손 클래스이다. 기능이 더 많다.

	/*
	 * POJO방식 spring-data.xml 에서는 아래의 코드로 되어있다. <bean id="sqlSessionFactory"
	 * class="org.mybatis.spring.SqlSessionFactoryBean"><!--
	 * 마이바티스-spring.1.3.0.jar에서 제공. 연결담당. --> <property name="configLocation"
	 * value="WEB-INF/mybatis-config.xml"/><!-- mybatis-config.xml을 주입한다. -->
	 * <property name="dataSource" ref="data-source-target"/> </bean>
	 */

	@Bean
	public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
		sqlSessionFactoryBean.setDataSource(dataSource);
		sqlSessionFactoryBean.setMapperLocations(applicationContext.getResources("classpath:/mapper/**/*.xml"));
		return sqlSessionFactoryBean.getObject();
	}

	@Bean
	public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
		return new SqlSessionTemplate(sqlSessionFactory);
	}
}