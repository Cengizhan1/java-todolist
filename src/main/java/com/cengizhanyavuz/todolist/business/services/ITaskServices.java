package com.cengizhanyavuz.todolist.business.services;
import java.util.List;

// D: Dto
// E: Entity
public interface ITaskServices<D, E> {

    // Model Mapper
    public D entityToDto(E e);

    public E dtoToEntity(D d);

    // C R U D
    // CREATE
    public D taskServiceCreate(D d);

    // LIST
    public List<D> taskServiceList();

    // FIND BY
    public D taskServiceFindById(Long id);

    // UPDATE
    public D taskServiceUpdate(Long id,D d);

    // DELETE
    public D taskServiceDeleteById(Long id);

    // All DELETE
    public D taskServiceDeleteAll();

    // Done DELETE
    public D taskServiceDeleteDone();
}