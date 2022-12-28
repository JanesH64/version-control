package com.dvelop.versioncontrol.services.Files;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.dvelop.versioncontrol.models.File;
import com.dvelop.versioncontrol.models.FileData;

public interface IFileService {
    public List<File> getAll();
    public List<File> getAll(String repositoryId);
    public File getById(String repositoryId, String fileId);
    public boolean create(String repositoryId, MultipartFile dto);
    public boolean createNewVersion(String fileId, MultipartFile dto);
    public boolean restoreVersion(String fileId, String versionId);
    public boolean update(String repositoryId, String fileId, MultipartFile dto);
    public boolean lockFile(String fileId);
    public boolean updateVersion(String fileId, String versionId, FileData version);
}
