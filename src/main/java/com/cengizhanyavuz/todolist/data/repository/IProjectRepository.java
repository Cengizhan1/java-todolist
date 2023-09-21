package com.cengizhanyavuz.todolist.data.repository;

import com.cengizhanyavuz.todolist.data.entity.ProjectEntity;
import com.cengizhanyavuz.todolist.enums.State;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IProjectRepository extends CrudRepository<ProjectEntity,Long> {

    Optional<ProjectEntity> findByProjectName(String projectName);
    void deleteByProjectState(State state);

}