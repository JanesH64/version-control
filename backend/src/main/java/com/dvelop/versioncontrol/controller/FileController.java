package com.dvelop.versioncontrol.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/api/files/{repositoryid}/{fileid}")
    public File GetFile(@PathVariable("repositoryid") String repositoryId, @PathVariable("fileid") String fileId) {
        return fileService.getById(repositoryId, fileId);
    }
    
    @PostMapping("/api/files/{repositoryid}")
    public ResponseEntity<String> NewFile(@PathVariable("repositoryid") String repositoryId, @RequestParam("file") MultipartFile dto) {
        boolean success = fileService.create(repositoryId, dto);

        if(!success) {
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
