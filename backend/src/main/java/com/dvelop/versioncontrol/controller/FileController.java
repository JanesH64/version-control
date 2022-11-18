package com.dvelop.versioncontrol.controller;

import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dvelop.versioncontrol.models.File;
import com.dvelop.versioncontrol.repository.FileRepository;

@RestController
public class FileController {

    @Autowired
    private FileRepository fileStore;

    Logger logger = LoggerFactory.getLogger(FileController.class);

    @GetMapping("/api/files")
    public List<File> GetAll() {
        return fileStore.findAll();
    }
    
    @PostMapping("/api/files")
    public void Upload(@RequestParam("file") MultipartFile dto) {
        //Vaidation

        File file = new File(dto);
        fileStore.insert(file);
    }
}
