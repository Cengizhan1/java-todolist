package com.cengizhanyavuz.todolist.controller;


import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ITaskApi <D> {

    // C R U D
    // CREATE
    public ResponseEntity<?>  taskApiCreate(D d);

    // LIST
    public ResponseEntity<List<D>>  taskApiList();

    // FIND BY
    public ResponseEntity<?>  taskApiFindById(Long id);

    // UPDATE
    public ResponseEntity<?>  taskApiUpdate(Long id,D d);

    // DELETE
    public ResponseEntity<?>  taskApiDeleteById(Long id);

    //////////////////////////////////////
    // ALL DELETE
    public ResponseEntity<?> taskApiAllDelete();

    //////////////////////////////////////
    // ALL DELETE
    public ResponseEntity<?> taskApiDoneDelete();

    // SPEED DATA
    public ResponseEntity<List<D>> taskApiSpeedData(Long key);
}