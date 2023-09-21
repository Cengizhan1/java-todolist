package com.cengizhanyavuz.todolist.business.services.impl;

import com.cengizhanyavuz.todolist.bean.ModelMapperBean;
import com.cengizhanyavuz.todolist.business.dto.ProjectDto;
import com.cengizhanyavuz.todolist.business.dto.TaskDto;
import com.cengizhanyavuz.todolist.business.services.IProjectServices;
import com.cengizhanyavuz.todolist.business.services.ITaskServices;
import com.cengizhanyavuz.todolist.data.entity.ProjectEntity;
import com.cengizhanyavuz.todolist.data.entity.TaskEntity;
import com.cengizhanyavuz.todolist.data.repository.IProjectRepository;
import com.cengizhanyavuz.todolist.data.repository.ITaskRepository;
import com.cengizhanyavuz.todolist.enums.State;
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
public class ProjectServicesImpl implements IProjectServices<ProjectDto, ProjectEntity> {

    private final IProjectRepository iProjectRepository;
    private final ModelMapperBean modelMapperBean;


    // MODEL MAPPER
    @Override
    public ProjectDto entityToDto(ProjectEntity projectEntity) {
        return modelMapperBean.modelMapperMethod().map(projectEntity,ProjectDto.class);
    }

    @Override
    public ProjectEntity dtoToEntity(ProjectDto projectDto) {
        return  modelMapperBean.modelMapperMethod().map(projectDto,ProjectEntity.class);
    }

    // CREATE
    @Override
    @Transactional // create, delete, update
    public ProjectDto projectServiceCreate(ProjectDto projectDto) {
        if(projectDto!=null){
            ProjectEntity projectEntity=dtoToEntity(projectDto);
            iProjectRepository.save(projectEntity);
            projectDto.setId(projectEntity.getProjectId());
//            projectDto.setSystemDate(projectEntity.getSystemDate());
        }else{
            throw  new NullPointerException( " ProjectDto null veri");
        }
        return projectDto;
    }

    // LIST
    @Override
    public List<ProjectDto> projectServiceList() {
        Iterable<ProjectEntity> entityIterable=  iProjectRepository.findAll();
        List<ProjectDto> projectDtoList=new ArrayList<>();
        for (ProjectEntity entity:  entityIterable) {
            ProjectDto projectDto=entityToDto(entity);
            projectDtoList.add(projectDto);
        }
        log.info("Liste Sayısı: "+projectDtoList.size());
        return projectDtoList;
    }

    // FIND
    @Override
    public ProjectDto projectServiceFindById(Long id) {
        ProjectEntity findProjectEntity=  null;
        if(id!=null){
            findProjectEntity=  iProjectRepository.findById(id)
                    .orElseThrow(()->new ResourceNotFoundException(id+" nolu id yoktur"));
        }else {
            throw new CustomException("İd null olarak geldi");
        }
        return entityToDto(findProjectEntity);
    }

    // UPDATE
    @Override
    @Transactional // create, delete, update
    public ProjectDto projectServiceUpdate(Long id, ProjectDto projectDto) {
        // Önce Bul
        ProjectDto projectFindDto= projectServiceFindById(id);
        if(projectFindDto!=null){
            ProjectEntity projectEntity=dtoToEntity(projectFindDto);
            projectEntity.setProjectName(projectDto.getProjectName());
            projectEntity.setProjectDescription(projectDto.getProjectDescription());
            projectEntity.setProjectState(projectDto.getState());
            projectEntity.setDueDate(projectDto.getDueDate());
            iProjectRepository.save(projectEntity);
            // Dönüştede ID ve Date Set et
        }
        return projectDto;
    }

    // DELETE
    @Override
    @Transactional // create, delete, update
    public ProjectDto projectServiceDeleteById(Long id) {
        // Önce Bul
        ProjectDto projectFindDto=projectServiceFindById(id);
        if(projectFindDto!=null){
            iProjectRepository.deleteById(id);
            // Dönüştede ID ve Date Set et
        }
        return projectFindDto;
    }

    @Override
    @Transactional // create, delete, update
    public ProjectDto projectServiceDeleteAll() {
            iProjectRepository.deleteAll();
        return null;
    }
    @Override
    @Transactional // create, delete, update
    public ProjectDto projectServiceDeleteDone() {
        iProjectRepository.deleteByProjectState(State.DONE);
        return null;
    }

}