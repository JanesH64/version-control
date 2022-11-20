package com.dvelop.versioncontrol.services.Files;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dvelop.versioncontrol.models.File;

public interface IFileService {
    public List<File> getAll();
    public List<File> getAll(String repositoryId);
    public boolean create(String repositoryId, MultipartFile dto);
    public boolean update(String repositoryId, String fileId, MultipartFile dto);
}
