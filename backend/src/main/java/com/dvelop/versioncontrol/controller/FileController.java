package com.dvelop.versioncontrol.controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dvelop.versioncontrol.models.File;
import com.dvelop.versioncontrol.services.Files.IFileService;

@RestController
public class FileController {

    @Autowired
    IFileService fileService;

    @GetMapping("/api/files/{repositoryid}")
    public List<File> GetAll(@PathVariable("repositoryid") String repositoryId) {
        return fileService.getAll(repositoryId);
    }
    
    @PostMapping("/api/files/{repositoryid}")
    public void Upload(@PathVariable("repositoryid") String repositoryId, @RequestParam("file") MultipartFile dto) {
        fileService.create(repositoryId, dto);
    }
}
