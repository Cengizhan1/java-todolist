package com.cengizhanyavuz.todolist.data.repository;

import com.cengizhanyavuz.todolist.data.entity.TaskEntity;
import com.cengizhanyavuz.todolist.enums.State;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ITaskRepository extends CrudRepository<TaskEntity,Long> {

    Optional<TaskEntity> findByTaskName(String taskName);
    List<TaskEntity> findByRelationProjectEntityProjectId(Long projectId);

    void deleteByState(State state);

}