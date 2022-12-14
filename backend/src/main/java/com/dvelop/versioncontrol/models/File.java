package com.dvelop.versioncontrol.models;

import java.util.HashMap;
import java.util.Map;
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
    public boolean locked;
    public Map<String, FileData> versions;
    public File() {
    }

    public File(String repositoryId, MultipartFile file) {
        id = UUID.randomUUID().toString();
        this.repositoryId = repositoryId;
        name = file.getOriginalFilename();
        versions = new HashMap<String, FileData>();

        FileData version= new FileData(file);
        version.id = "v" + versions.size();
        versions.put(version.id, version);
        head = version;
        locked = false;
    }
}
