package com.dvelop.versioncontrol.models;

import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
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
    public FileData head;
    public List<FileData> versions;
    public File() {
    }

    public File(String repositoryId, MultipartFile file) {
        id = UUID.randomUUID().toString();
        this.repositoryId = repositoryId;
        name = file.getOriginalFilename();
        versions = new ArrayList<FileData>();

        FileData version= new FileData(file);
        versions.add(version);
        head = version;
    }
}
