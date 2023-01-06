package com.dvelop.versioncontrol.services.Files;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.util.Assert;
import org.springframework.web.multipart.MultipartFile;

import com.dvelop.versioncontrol.models.File;
import com.dvelop.versioncontrol.repository.FileRepository;

@SpringBootTest
class FileServiceTests {

    @MockBean
    private FileRepository fileRepository;

    @Autowired
    private FileService fileService;

    private byte[] fileContent;
    private MultipartFile testMultipartFile;
    private String repositoryId;

    private List<File> repositoryFiles;
    private File testFile;

    @BeforeEach
    public void InitTests() {
        fileContent = null;
        testMultipartFile = new MockMultipartFile("Test.txt", "Test.txt", "text/plain", fileContent);
        repositoryId = "12345-678-910";

        repositoryFiles = new ArrayList<>();
        testFile = new File(repositoryId, testMultipartFile);
        repositoryFiles.add(testFile);
    }

    @Test
	void getAllWithNoResults() {
        when(fileRepository.findAll()).thenReturn(null);

        List<File> files = fileService.getAll();

        Assert.isNull(files, "Files should be null.");
	}

    @Test
    void getAllWithOneResult() {
        List<File> mockFiles = new ArrayList<>();
        mockFiles.add(new File());
        when(fileRepository.findAll()).thenReturn(
                mockFiles);

        List<File> files = fileService.getAll();

        assertEquals(files, mockFiles);
    }

    @Test
    void whenCreateNewFileWithEmptyRepositoryIdThenShouldReturnFalse() {
        assertFalse(fileService.create(null, testMultipartFile));
    }

    @Test
    void whenCreateNewFileWithFileThenShouldReturnFalse() {
        assertFalse(fileService.create(repositoryId, null));
    }

    @Test
	void whenCreateNewFileWithFileWithDuplicateNameThenShouldReturnFalse() {
        when(fileRepository.getByRepositoryId(repositoryId)).thenReturn(repositoryFiles);
        assertFalse(fileService.create(repositoryId, testMultipartFile));
	}

    @Test
	void whenCreateNewFileWithFileWithValidDataThenShouldReturnTrue() {
        when(fileRepository.getByRepositoryId(repositoryId)).thenReturn(new ArrayList<>());
        assertTrue(fileService.create(repositoryId, testMultipartFile));
	}

    @Test
	void whenCreateNewFileWithFileWithValidDataThenShouldInsertFileIntoDb() {
        when(fileRepository.getByRepositoryId(repositoryId)).thenReturn(new ArrayList<>());
        fileService.create(repositoryId, testMultipartFile);
        verify(fileRepository, times(1)).insert(any(File.class));
	}
}