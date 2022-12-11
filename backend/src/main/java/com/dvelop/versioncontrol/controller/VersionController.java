package com.dvelop.versioncontrol.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.dvelop.versioncontrol.models.File;
import com.dvelop.versioncontrol.models.FileData;
import com.dvelop.versioncontrol.repository.FileRepository;

@RestController
public class VersionController {

    @Autowired
    FileRepository fileStore;

    @GetMapping("/api/files/{fileId}/version/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable String fileId, @PathVariable String id) {
        File file = fileStore.getById(fileId);
        if(file == null) {
            return ResponseEntity.badRequest().body(null);
        }

        FileData version = file.versions.get(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.name + "\"")
                .body(version.data);
    }
}
