package com.dvelop.versioncontrol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dvelop.versioncontrol.repository.FileRepository;

@RestController
public class TestController {
    
    @Autowired
    private FileRepository fileStore;

    @GetMapping("/test/clearDb")
    public void Clear() {
        fileStore.deleteAll();
    }
}
