package com.cengizhanyavuz.todolist.bean;

import com.cengizhanyavuz.todolist.business.services.ITaskServices;
import com.cengizhanyavuz.todolist.data.entity.TaskEntity;
import com.cengizhanyavuz.todolist.data.repository.ITaskRepository;
import com.cengizhanyavuz.todolist.enums.PriorityLevel;
import com.cengizhanyavuz.todolist.enums.TaskState;
import jakarta.validation.constraints.NotEmpty;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

// Lombok
@RequiredArgsConstructor

@Configuration
@Log4j2
@Component
public class CommandLineRunnerBean {
    // Injection
    private final ITaskRepository iTaskRepository;

    public void dummyTask() {
        for (int i = 0; i < 5; i++) {
            TaskEntity taskEntity = new TaskEntity();
            taskEntity.setTaskName("task" + i);
            taskEntity.setTaskDescription("task" + i);
            taskEntity.setTaskState(TaskState.TODO);
            taskEntity.setPriorityLevel(PriorityLevel.MEDIUM);
            taskEntity.setDueDate(new Date());
            taskEntity.setTags("tag" + i);
            iTaskRepository.save(taskEntity);
        }
    }


    @Bean
    public CommandLineRunner blogCommandLineRunnerMethod() {
        return args -> {
            System.out.println("CommandLineRunner Çalıştı");
            log.info("CommandLineRunner Çalıştı");
            if (iTaskRepository.count() == 0) {
                dummyTask();
            }
//            blogCreate(0);
        };
    }
}