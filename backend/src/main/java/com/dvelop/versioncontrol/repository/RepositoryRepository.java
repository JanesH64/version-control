package com.dvelop.versioncontrol.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.dvelop.versioncontrol.models.Repository;

public interface RepositoryRepository extends MongoRepository<Repository, String> {
    public Repository getById(String repositoryId);
    // public boolean StoreRepository(String repositoryId);
    // public boolean UpdateRepository(String repositoryId);
}
