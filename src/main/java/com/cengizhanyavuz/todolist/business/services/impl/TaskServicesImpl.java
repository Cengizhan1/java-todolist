package com.cengizhanyavuz.todolist.business.services.impl;

import com.cengizhanyavuz.todolist.bean.ModelMapperBean;
import com.cengizhanyavuz.todolist.business.dto.TaskDto;
import com.cengizhanyavuz.todolist.business.services.ITaskServices;
import com.cengizhanyavuz.todolist.data.entity.TaskEntity;
import com.cengizhanyavuz.todolist.data.repository.ITaskRepository;
import com.cengizhanyavuz.todolist.enums.TaskState;
import com.cengizhanyavuz.todolist.exception.CustomException;
import com.cengizhanyavuz.todolist.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

// LOMBOK
@RequiredArgsConstructor
@Log4j2

// SERVICES
@Service
public class TaskServicesImpl implements ITaskServices<TaskDto, TaskEntity> {

    private final ITaskRepository iTaskRepository;
    private final ModelMapperBean modelMapperBean;


    // MODEL MAPPER
    @Override
    public TaskDto entityToDto(TaskEntity taskEntity) {
        return modelMapperBean.modelMapperMethod().map(taskEntity,TaskDto.class);
    }

    @Override
    public TaskEntity dtoToEntity(TaskDto taskDto) {
        return  modelMapperBean.modelMapperMethod().map(taskDto,TaskEntity.class);
    }

    // CREATE
    @Override
    @Transactional // create, delete, update
    public TaskDto taskServiceCreate(TaskDto taskDto) {
        if(taskDto!=null){
            TaskEntity taskEntity=dtoToEntity(taskDto);
            iTaskRepository.save(taskEntity);
            taskDto.setId(taskEntity.getTaskId());
            taskDto.setSystemDate(taskEntity.getSystemDate());
        }else{
            throw  new NullPointerException( " TaskDto null veri");
        }
        return taskDto;
    }

    // LIST
    @Override
    public List<TaskDto> taskServiceList() {
        Iterable<TaskEntity> entityIterable=  iTaskRepository.findAll();
        List<TaskDto> taskDtoList=new ArrayList<>();
        for (TaskEntity entity:  entityIterable) {
            TaskDto taskDto=entityToDto(entity);
            taskDtoList.add(taskDto);
        }
        log.info("Liste Sayısı: "+taskDtoList.size());
        return taskDtoList;
    }

    // FIND
    @Override
    public TaskDto taskServiceFindById(Long id) {
        TaskEntity findTaskEntity=  null;
        if(id!=null){
            findTaskEntity=  iTaskRepository.findById(id)
                    .orElseThrow(()->new ResourceNotFoundException(id+" nolu id yoktur"));
        }else {
            throw new CustomException("İd null olarak geldi");
        }
        return entityToDto(findTaskEntity);
    }

    // UPDATE
    @Override
    @Transactional // create, delete, update
    public TaskDto taskServiceUpdate(Long id, TaskDto taskDto) {
        // Önce Bul
        TaskDto taskFindDto= taskServiceFindById(id);
        if(taskFindDto!=null){
            TaskEntity taskEntity=dtoToEntity(taskFindDto);
            taskEntity.setTaskName(taskDto.getTaskName());
            taskEntity.setTaskDescription(taskDto.getTaskDescription());
            taskEntity.setTaskState(taskDto.getTaskState());
            taskEntity.setPriorityLevel(taskDto.getPriorityLevel());
            taskEntity.setDueDate(taskDto.getDueDate());
            taskEntity.setTags(taskDto.getTags());
            iTaskRepository.save(taskEntity);
            // Dönüştede ID ve Date Set et
        }
        return taskDto;
    }

    // DELETE
    @Override
    @Transactional // create, delete, update
    public TaskDto taskServiceDeleteById(Long id) {
        // Önce Bul
        TaskDto taskFindDto=taskServiceFindById(id);
        if(taskFindDto!=null){
            iTaskRepository.deleteById(id);
            // Dönüştede ID ve Date Set et
        }
        return taskFindDto;
    }

    @Override
    @Transactional // create, delete, update
    public TaskDto taskServiceDeleteAll() {
            iTaskRepository.deleteAll();
        return null;
    }
    @Override
    @Transactional // create, delete, update
    public TaskDto taskServiceDeleteDone() {
        iTaskRepository.deleteByTaskState(TaskState.DONE);
        return null;
    }

}