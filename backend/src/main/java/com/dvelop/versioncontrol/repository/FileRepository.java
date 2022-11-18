package com.dvelop.versioncontrol.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dvelop.versioncontrol.models.File;

public interface FileRepository extends MongoRepository<File, String> {
    File getById(String id);
}
