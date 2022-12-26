package com.dvelop.versioncontrol.models;

import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

public class FileData {
    public String id;
    public String creationDate;
    public String lastUpdate;
    public String[] tags;
    public boolean head;
    public byte[] data;
    public String content;

    public FileData() {}
    public FileData(MultipartFile file) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        creationDate = df.format(Calendar.getInstance().getTime());
        lastUpdate = df.format(Calendar.getInstance().getTime());
        head = true;
        try {
            data = file.getBytes();
            content = new String(file.getBytes(), StandardCharsets.UTF_8);
        } catch (Exception e) {
        }
    }
}
