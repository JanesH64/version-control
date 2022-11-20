package com.dvelop.versioncontrol.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dvelop.versioncontrol.models.File;

public interface FileRepository extends MongoRepository<File, String> {
    File getById(String id);
    List<File> getByRepositoryId(String repositoryId);
    boolean existsByRepositoryIdAndName(String repositoryId, String name);
    List<File> findByName(String name);
}
