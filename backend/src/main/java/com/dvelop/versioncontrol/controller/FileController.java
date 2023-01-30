package com.dvelop.versioncontrol.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public ResponseEntity<File> GetFile(@PathVariable("repositoryid") String repositoryId, @PathVariable("fileid") String fileId) {
        File file = fileService.getById(repositoryId, fileId);

        if(file != null) {
            return new ResponseEntity<File>(file, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    @PostMapping("/api/files/{repositoryid}")
    public ResponseEntity<String> NewFile(@PathVariable("repositoryid") String repositoryId, @RequestParam("file") MultipartFile dto) {
        boolean success = fileService.create(repositoryId, dto);

        if(!success) {
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/api/files/{fileid}/lock")
    public ResponseEntity<Boolean> LockFile(@PathVariable("fileid") String fileid, @RequestBody boolean lock) {
        boolean success = fileService.lockFile(fileid);

        if(!success) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("api/files/{fileid}")
    public ResponseEntity<Boolean> DeleteFile(@PathVariable("fileid") String fileid) {
        boolean success = fileService.deleteFile(fileid);

        if(!success) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
