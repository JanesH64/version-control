package com.dvelop.versioncontrol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dvelop.versioncontrol.models.File;
import com.dvelop.versioncontrol.models.FileData;
import com.dvelop.versioncontrol.repository.FileRepository;
import com.dvelop.versioncontrol.services.Files.IFileService;

@RestController
public class VersionController {

    @Autowired
    FileRepository fileStore;

    @Autowired
    IFileService fileService;

    @GetMapping("/api/files/{fileId}/versions/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String fileId, @PathVariable String id) {
        File file = fileStore.getById(fileId);
        if (file == null) {
            return ResponseEntity.badRequest().body(null);
        }

        FileData version = file.versions.get(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.name + "\"")
                .body(version.data);
    }

    @PostMapping("/api/files/{fileid}/versions")
    public ResponseEntity<String> NewVersion(@PathVariable("fileid") String fileId, @RequestParam("file") MultipartFile dto) {
        boolean success = fileService.createNewVersion(fileId, dto);

        if(!success) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/api/files/{fileid}/versions/{id}/restore")
    public ResponseEntity<String> RestoreVersion(@PathVariable("fileid") String fileId, @PathVariable("id") String versionId) {
        boolean success = fileService.restoreVersion(fileId, versionId);

        if(!success) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
