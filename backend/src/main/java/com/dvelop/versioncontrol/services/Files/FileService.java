package com.dvelop.versioncontrol.services.Files;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
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

    Logger logger = LoggerFactory.getLogger(FileService.class);

    @Autowired
    private FileRepository fileStore;

    @Override
    public List<File> getAll() {
        return fileStore.findAll();
    }

    @Override
    public List<File> getAll(String repositoryId) {
        return fileStore.getByRepositoryId(repositoryId);
    }

    @Override
    public File getById(String repositoryId, String fileId) {
        return fileStore.getById(fileId);
    }

    @Override
    public boolean create(String repositoryId, MultipartFile dto) {
        if(repositoryId == null || repositoryId.trim().isEmpty()) {
            return false;
        }
        
        File file = new File(repositoryId, dto);
        if(isDuplicateName(file)) {
            return false;
        }

        fileStore.insert(file);
        return true;
    }

    @Override
    public boolean createNewVersion(String fileId, MultipartFile dto) {
        if(fileId == null || fileId.trim().isEmpty()) {
            return false;
        }
        
        FileData version = new FileData(dto);
        File file = fileStore.getById(fileId);

        if(file != null) {
            version.id = "v" + file.versions.size();
            file.versions.put(version.id, version);
            file.head = version;
            file.locked = false;
        }

        fileStore.save(file);
        return true;
    }

    @Override
    public boolean update(String repositoryId, String fileId, MultipartFile file) {
        return true;
    }

    @Override
    public boolean lockFile(String fileId) {
        File file = fileStore.getById(fileId);
        if(file.locked) {
            return false;
        }

        file.locked = true;
        fileStore.save(file);
        return true;
    }

    private boolean isDuplicateName(File file) {
        List<File> filesInRepository = fileStore.getByRepositoryId(file.repositoryId);
        logger.info(""+filesInRepository.size());
        for (File repoFile : filesInRepository) {
            if(repoFile.name.equals(file.name)) {
                return true;
            }
        }

        return false;
    }

    private File renameDuplicate(File file) {
        List<File> duplicates = fileStore.findByName(file.name);
        int duplicateNumber = 1;
        String fileNameRoot = file.name;

        for (File duplicate : duplicates) {
            int newDuplicateNumber = getDuplicateNumber(duplicate.name);
            
            if(newDuplicateNumber > duplicateNumber) {
                duplicateNumber = newDuplicateNumber;
            }
        }

        int fileDuplicateNumber = getDuplicateNumber(file.name);
        if(fileDuplicateNumber != -1) {
            int index = file.name.indexOf(fileDuplicateNumber);
            fileNameRoot = file.name.substring(0, index -1);
        }

        file.name = fileNameRoot + "(" + duplicateNumber + ")";
        return file;
    }

    private int getDuplicateNumber(String name) {
        Pattern findDuplicateNumberPattern = Pattern.compile("(.*)([(])(\\d)([)])");
        Matcher matcher = findDuplicateNumberPattern.matcher(name);
        if(matcher.matches()) {
            String numberString = matcher.group(3);
            try{
                logger.info(numberString);
                return Integer.parseInt(numberString) + 1;
            }
            catch (NumberFormatException ex){
                //Todo
                return -1;
            }
        }

        return -1;
    }
}
