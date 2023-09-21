package com.cengizhanyavuz.todolist.controller.impl;

import com.cengizhanyavuz.todolist.assist.FrontendUrl;
import com.cengizhanyavuz.todolist.business.dto.ProjectDto;
import com.cengizhanyavuz.todolist.business.dto.TaskDto;
import com.cengizhanyavuz.todolist.business.services.IProjectServices;
import com.cengizhanyavuz.todolist.business.services.ITaskServices;
import com.cengizhanyavuz.todolist.controller.IProjectApi;
import com.cengizhanyavuz.todolist.controller.ITaskApi;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// LOMBOK
@RequiredArgsConstructor
@Log4j2

// API
@RestController
@CrossOrigin(origins = FrontendUrl.REACT_URL) // http://localhost:3000
@RequestMapping("/project/api/v1")
public class ProjectApiImpl implements IProjectApi<ProjectDto> {

    // Injection
    private final IProjectServices iProjectServices;

    // CREATE
    // http://localhost:4444/ project/api/v1/create
    @Override
    @PostMapping("/create")
    public ResponseEntity<?> projectApiCreate(@Valid @RequestBody ProjectDto projectDto) {
        return ResponseEntity.ok(iProjectServices.projectServiceCreate(projectDto));
    }

    // LIST
    // http://localhost:4444/ project/api/v1/list
    @Override
    @GetMapping(value = "/list")
    public ResponseEntity<List<ProjectDto>> projectApiList() {
        return ResponseEntity.status(HttpStatus.OK).body(iProjectServices.projectServiceList());
    }

    // FIND
    // http://localhost:4444/ project/api/v1/find/1
    @Override
    @GetMapping(value = "/find/{id}")
    public ResponseEntity<?>  projectApiFindById(@PathVariable(name = "id") Long id) {
        return ResponseEntity.status(200).body(iProjectServices.projectServiceFindById(id));
    }

    // UPDATE
    // http://localhost:4444/ project/api/v1/update/1
    @Override
    @PutMapping(value = "/update/{id}")
    public ResponseEntity<?> projectApiUpdate(@PathVariable(name = "id") Long id, @Valid @RequestBody ProjectDto projectDto) {
        return ResponseEntity.ok().body(iProjectServices.projectServiceUpdate(id, projectDto));
    }

    // DELETE BY ID
    // http://localhost:4444/ project/api/v1/delete/1
    @Override
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> projectApiDeleteById(@PathVariable(name = "id") Long id) {
        return new ResponseEntity<>(iProjectServices.projectServiceDeleteById(id), HttpStatus.OK);
    }

    ///////////////////////////////////////////////////////
    // ALL DELETE
    // http://localhost:4444/ project/api/v1/all/delete
    @Override
    @PostMapping(value = "/all/delete")
    public ResponseEntity<?> projectApiAllDelete() {
        return new ResponseEntity<>(iProjectServices.projectServiceDeleteAll(), HttpStatus.OK);
    }

    ///////////////////////////////////////////////////////
    // ALL DELETE
    // http://localhost:4444/ project/api/v1/done/delete
    @Override
    @PostMapping(value = "/done/delete")
    public ResponseEntity<?> projectApiDoneDelete() {
        return new ResponseEntity<>(iProjectServices.projectServiceDeleteDone(), HttpStatus.OK);
    }

    // SPEED DATA
    @Override
    public ResponseEntity<List<ProjectDto>> projectApiSpeedData(Long key) {
        return null;
    }

}