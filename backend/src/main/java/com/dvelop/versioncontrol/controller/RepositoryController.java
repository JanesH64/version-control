package com.dvelop.versioncontrol.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dvelop.versioncontrol.models.Repository;
import com.dvelop.versioncontrol.repository.RepositoryRepository;

@RestController
public class RepositoryController {

	@Autowired
  	private RepositoryRepository repositoryStore;

	@GetMapping("api/repositories")
	public List<Repository> GetRepositories() {
		List<Repository> repos = repositoryStore.findAll();
		return repos;
	}

	@PostMapping("api/repositories")
	public void CreateRepository(@RequestBody String name) {
		//Validate

		Repository repository = new Repository(name);
		repositoryStore.save(repository);
	}

	@GetMapping("api/repositories/{id}")
	public Repository GetRepositories(@PathVariable String id) {
		return repositoryStore.getById(id);
	}

	@DeleteMapping("api/repositories/{id}")
	public void DeleteRepositories(@PathVariable String id) {
		Repository repository = repositoryStore.getById(id);
		repositoryStore.delete(repository);
	}
}
