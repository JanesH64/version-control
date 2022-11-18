package com.dvelop.versioncontrol.models;

import java.util.UUID;

import org.springframework.data.annotation.Id;

public class Repository {
    @Id
    public String id;
    public String name;
    public String[] files;

    public Repository(String name) {
        this.name = name;
        this.id = UUID.randomUUID().toString();
    }
}
