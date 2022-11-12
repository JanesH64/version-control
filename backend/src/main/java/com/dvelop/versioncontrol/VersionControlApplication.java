package com.dvelop.versioncontrol;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.dvelop.versioncontrol.models.TestModel;

@SpringBootApplication
@RestController
public class VersionControlApplication {

	public static void main(String[] args) {
		SpringApplication.run(VersionControlApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {

		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("*");
			}
		};
	}

	@GetMapping("/test")
	public TestModel hello(@RequestParam(value = "name", defaultValue = "World") String name) {
		TestModel test = new TestModel();
		test.Test1 = "Thorben ist komisch";

		return test;
	}
}
