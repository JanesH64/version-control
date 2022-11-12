package com.dvelop.versioncontrol.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RepositoryController {
    
    @GetMapping("api/repositories")
	public String hello() {
		String test = "Test";
		return test;
	}
}
