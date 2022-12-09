package com.dvelop.versioncontrol.models;

import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.springframework.web.multipart.MultipartFile;

public class FileData {
    public String creationDate;
    public String[] tags;
    public boolean head;
    public byte[] data;
    public String content;

    public FileData() {}
    public FileData(MultipartFile file) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        creationDate = formatter.format(Calendar.getInstance().getTime());
        head = true;
        try {
            data = file.getBytes();
            content = new String(file.getBytes(), StandardCharsets.UTF_8);
        } catch (Exception e) {
        }
    }
}
