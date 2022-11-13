package com.dvelop.versioncontrol.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class FileController {

    Logger logger = LoggerFactory.getLogger(FileController.class);
    
    @PostMapping("/api/file")
    public void UploadFile(@RequestParam("file") MultipartFile file) {
        logger.info("--------------------------");
        logger.info(file.getOriginalFilename());
    }
}
