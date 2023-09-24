package com.cengizhanyavuz.todolist.controller.impl;

import com.cengizhanyavuz.todolist.assist.FrontendUrl;
import com.cengizhanyavuz.todolist.business.dto.TaskDto;
import com.cengizhanyavuz.todolist.business.services.ITaskServices;
import com.cengizhanyavuz.todolist.controller.ITaskApi;
import jakarta.validation.Valid;
import lombok.Getter;
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
@RequestMapping("/task/api/v1")
public class TaskApiImpl implements ITaskApi<TaskDto> {

    // Injection
    private final ITaskServices iTaskServices;

    // CREATE
    // http://localhost:4444/ task/api/v1/create
    @Override
    @PostMapping("/create")
    public ResponseEntity<?> taskApiCreate(@Valid @RequestBody TaskDto taskDto) {
        return ResponseEntity.ok(iTaskServices.taskServiceCreate(taskDto));
    }

    // LIST
    // http://localhost:4444/ task/api/v1/list
    @Override
    @GetMapping(value = "/list")
    public ResponseEntity<List<TaskDto>> taskApiList() {
        return ResponseEntity.status(HttpStatus.OK).body(iTaskServices.taskServiceList());
    }

    // FIND
    // http://localhost:4444/ task/api/v1/find/1
    @Override
    @GetMapping(value = "/find/{id}")
    public ResponseEntity<?>  taskApiFindById(@PathVariable(name = "id") Long id) {
        return ResponseEntity.status(200).body(iTaskServices.taskServiceFindById(id));
    }

    // UPDATE
    // http://localhost:4444/ task/api/v1/update/1
    @Override
    @PutMapping(value = "/update/{id}")
    public ResponseEntity<?> taskApiUpdate(@PathVariable(name = "id") Long id, @Valid @RequestBody TaskDto taskDto) {
        return ResponseEntity.ok().body(iTaskServices.taskServiceUpdate(id, taskDto));
    }

    // DELETE BY ID
    // http://localhost:4444/ task/api/v1/delete/1
    @Override
    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> taskApiDeleteById(@PathVariable(name = "id") Long id) {
        return new ResponseEntity<>(iTaskServices.taskServiceDeleteById(id), HttpStatus.OK);
    }

    ///////////////////////////////////////////////////////
    // ALL DELETE
    // http://localhost:4444/ task/api/v1/all/delete
    @Override
    @PostMapping(value = "/all/delete")
    public ResponseEntity<?> taskApiAllDelete() {
        return new ResponseEntity<>(iTaskServices.taskServiceDeleteAll(), HttpStatus.OK);
    }

    ///////////////////////////////////////////////////////
    // ALL DELETE
    // http://localhost:4444/ task/api/v1/done/delete
    @Override
    @PostMapping(value = "/done/delete")
    public ResponseEntity<?> taskApiDoneDelete() {
        return new ResponseEntity<>(iTaskServices.taskServiceDeleteDone(), HttpStatus.OK);
    }

    // SPEED DATA
    @Override
    public ResponseEntity<List<TaskDto>> taskApiSpeedData(Long key) {
        return null;
    }

}