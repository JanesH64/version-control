package com.dvelop.versioncontrol.services.Files;

import java.nio.file.Files;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dvelop.versioncontrol.models.File;
import com.dvelop.versioncontrol.models.FileData;
import com.dvelop.versioncontrol.repository.FileRepository;

@Service
public class FileService implements IFileService {

    private static final Logger LOGGER = LoggerFactory.getLogger("FileService");

    @Autowired
    private FileRepository fileStore;

    @Override
    public List<File> getAll() {
        return fileStore.findAll();
    }

    @Override
    public List<File> getAll(String repositoryId) {
        LOGGER.info("Retrieving all files from repository...");
        LOGGER.debug("RepositoryId: " + repositoryId);
        return fileStore.getByRepositoryId(repositoryId);
    }

    @Override
    public File getById(String repositoryId, String fileId) {
        LOGGER.info("Retrieving file from repository...");
        LOGGER.debug("RepositoryId: " + repositoryId);
        LOGGER.debug("FileId: " + fileId);
        return fileStore.getById(fileId);
    }

    @Override
    public boolean create(String repositoryId, MultipartFile dto) {
        LOGGER.info("Trying to store file in repository...");
        if (repositoryId == null || repositoryId.trim().isEmpty()) {
            LOGGER.error("File cannot be stored, because no repositoryId was provided.");
            return false;
        }

        if (dto == null) {
            LOGGER.error("File cannot be stored, because no file was provided.");
            return false;
        }

        File file = new File(repositoryId, dto);
        if (isDuplicateName(file)) {
            LOGGER.warn("File cannot be stored, because a file with the same name already exists.");
            return false;
        }

        fileStore.insert(file);
        LOGGER.info("File stored successfully.");

        return true;
    }

    @Override
    public boolean createNewVersion(String fileId, MultipartFile dto) {
        LOGGER.info("Trying to store a new version...");
        LOGGER.debug("FileId: " + fileId);
        if (fileId == null || fileId.trim().isEmpty()) {
            LOGGER.error("Version cannot be stored, because no fileId was provided.");
            return false;
        }

        FileData version = new FileData(dto);
        File file = fileStore.getById(fileId);

        if (file == null) {
            LOGGER.error("Version cannot be stored, because no the specified file was not found.");
            return false;
        }

        LOGGER.info("Resetting head status of other versions...");

        Integer currentVersionNumber = 0;

        for (FileData v : file.versions.values()) {
            LOGGER.debug("Resetting head status of version: " + v.id);
            v.head = false;

            currentVersionNumber = getVersionNumber(v.id);
        }

        Integer newVersionNumber = ++currentVersionNumber;
        version.id = "v" + newVersionNumber;
        file.versions.put(version.id, version);
        file.head = version;
        file.locked = false;

        fileStore.save(file);
        LOGGER.info("Version " + version.id + " was stored successfully.");
        return true;
    }

    @Override
    public boolean lockFile(String fileId) {
        LOGGER.info("Requesting lock for file...");
        LOGGER.debug("FileId: " + fileId);

        File file = fileStore.getById(fileId);
        if (file.locked) {
            LOGGER.warn("File is already locked. Lock request could not be fullfilled.");
            return false;
        }

        file.locked = true;
        fileStore.save(file);
        LOGGER.info("File is now locked.");

        return true;
    }

    @Override
    public boolean restoreVersion(String fileId, String versionId) {
        LOGGER.info("Trying to restore version: " + versionId);
        File file = fileStore.getById(fileId);

        if (file == null) {
            LOGGER.error("Could not find file.");
            LOGGER.debug("FileId: " + fileId);
            return false;
        }

        FileData version = file.versions.get(versionId);
        if (version == null) {
            LOGGER.error("Could not find specified version.");
            return false;
        }

        LOGGER.info("Resetting head status of other versions...");

        for (FileData v : file.versions.values()) {
            LOGGER.debug("Resetting head status of version: " + v.id);
            v.head = false;
        }

        version.head = true;
        version.lastUpdate = getCurrentTime();
        file.head = version;

        fileStore.save(file);

        LOGGER.info("New version " + versionId + " was saved successfully.");

        return true;
    }

    @Override
    public boolean updateVersion(String fileId, String versionId, FileData version) {
        LOGGER.info("Updating version...");
        LOGGER.debug("FileId: " + fileId);
        LOGGER.debug("VersionId: " + versionId);

        File file = fileStore.getById(fileId);

        if (file == null) {
            LOGGER.error("Could not find file.");
            LOGGER.debug("FileId: " + fileId);

            return false;
        }

        if (version == null) {
            LOGGER.error("Could not find specified version.");

            return false;
        }

        version.lastUpdate = getCurrentTime();
        file.versions.replace(versionId, version);

        fileStore.save(file);

        LOGGER.info("Version was updated successfully.");

        return true;
    }

    @Override
    public boolean deleteFile(String fileId) {
        LOGGER.info("Trying to delete file...");
        LOGGER.debug("FileId: " + fileId);

        File file = fileStore.getById(fileId);

        if (file == null) {
            LOGGER.error("Could not find file.");
            LOGGER.debug("FileId: " + fileId);

            return false;
        }

        fileStore.delete(file);
        LOGGER.info("File was deleted successfully.");

        return true;
    }

    @Override
    public boolean deleteVersion(String fileId, String versionId) {
        LOGGER.info("Trying to delete version...");
        LOGGER.debug("FileId: " + fileId);
        LOGGER.debug("VersionId: " + versionId);

        File file = fileStore.getById(fileId);

        if (file == null) {
            LOGGER.error("Could not find file.");
            return false;
        }

        FileData version = file.versions.get(versionId);

        if (version == null) {
            LOGGER.error("Could not find version.");
            return false;
        }

        if(version.head == true) {
            LOGGER.error("Cannot delete version that is the current head of a file.");
            return false;
        }

        file.versions.remove(versionId);
        fileStore.save(file);
        LOGGER.info("Version was deleted successfully.");

        return true;
    }

    private boolean isDuplicateName(File file) {
        List<File> filesInRepository = fileStore.getByRepositoryId(file.repositoryId);
        LOGGER.info("Checking if file already exists...");
        for (File repoFile : filesInRepository) {
            if (repoFile.name.equals(file.name)) {
                LOGGER.warn("File already exists.");
                return true;
            }
        }

        LOGGER.info("File does not exist.");

        return false;
    }

    private String getCurrentTime() {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        return df.format(Calendar.getInstance().getTime());
    }

    private Integer getVersionNumber(String versionId) {
        String versionNumberString = versionId.replace("v", "");
        Integer versionNumber = Integer.parseInt(versionNumberString);
        
        return versionNumber;
    }
}
