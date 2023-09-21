package com.cengizhanyavuz.todolist.controller;


import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IProjectApi<D> {

    // C R U D
    // CREATE
    public ResponseEntity<?>  projectApiCreate(D d);

    // LIST
    public ResponseEntity<List<D>>  projectApiList();

    // FIND BY
    public ResponseEntity<?>  projectApiFindById(Long id);

    // UPDATE
    public ResponseEntity<?>  projectApiUpdate(Long id,D d);

    // DELETE
    public ResponseEntity<?>  projectApiDeleteById(Long id);

    //////////////////////////////////////
    // ALL DELETE
    public ResponseEntity<?> projectApiAllDelete();

    //////////////////////////////////////
    // ALL DELETE
    public ResponseEntity<?> projectApiDoneDelete();

    // SPEED DATA
    public ResponseEntity<List<D>> projectApiSpeedData(Long key);
}