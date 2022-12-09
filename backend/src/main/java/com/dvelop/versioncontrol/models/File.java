package com.dvelop.versioncontrol.models;

import java.nio.charset.StandardCharsets;
import java.util.UUID;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

@Document(collection = "files")
public class File {
    @Id
    public String id;
    public String repositoryId;
    public String name;
    public String creationDate;
    public String lastUpdate;
    public String[] tags;
    public boolean head;
    public byte[] data;
    public String content;

    public File() {
    }

    public File(String repositoryId, MultipartFile file) {
        id = UUID.randomUUID().toString();
        this.repositoryId = repositoryId;
        name = file.getOriginalFilename();
        try {
            content = new String(file.getBytes(), StandardCharsets.UTF_8);
        } catch (Exception e) {
        }
    }
}
