package com.dvelop.versioncontrol.models;

import java.util.UUID;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.multipart.MultipartFile;

@Document(collection = "files")
public class File {
    @Id
    public String id;
    public String name;
    public String creationDate;
    public String lastUpdate;
    public String[] tags;
    public boolean head;
    public Binary data;

    public File() {
    }

    public File(MultipartFile file) {
        id = UUID.randomUUID().toString();
        name = file.getOriginalFilename();
        data = toBinary(file);
    }

    private Binary toBinary(MultipartFile file) {
        try {
            return new Binary(BsonBinarySubType.BINARY, file.getBytes());
        } catch (Exception e) {
            return null;
        }
    }
}
