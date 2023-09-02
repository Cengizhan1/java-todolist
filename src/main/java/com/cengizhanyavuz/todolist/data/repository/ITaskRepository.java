package com.cengizhanyavuz.todolist.data.repository;

import com.cengizhanyavuz.todolist.data.entity.TaskEntity;
import com.cengizhanyavuz.todolist.enums.TaskState;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ITaskRepository extends CrudRepository<TaskEntity,Long> {

    Optional<TaskEntity> findByTaskName(String taskName);
    void deleteByTaskState(TaskState taskState);

}