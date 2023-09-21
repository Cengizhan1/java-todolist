package com.cengizhanyavuz.todolist.business.services;
import java.util.List;

// D: Dto
// E: Entity
public interface IProjectServices<D, E> {

    // Model Mapper
    public D entityToDto(E e);

    public E dtoToEntity(D d);

    // C R U D
    // CREATE
    public D projectServiceCreate(D d);

    // LIST
    public List<D> projectServiceList();

    // FIND BY
    public D projectServiceFindById(Long id);

    // UPDATE
    public D projectServiceUpdate(Long id,D d);

    // DELETE
    public D projectServiceDeleteById(Long id);

    // All DELETE
    public D projectServiceDeleteAll();

    // Done DELETE
    public D projectServiceDeleteDone();
}