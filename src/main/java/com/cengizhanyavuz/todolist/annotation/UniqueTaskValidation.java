package com.cengizhanyavuz.todolist.annotation;

import com.cengizhanyavuz.todolist.data.repository.ITaskRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

// LOMBOK
@RequiredArgsConstructor

// Annotation
public class UniqueTaskValidation implements ConstraintValidator<UniqueTaskName,String> {
    // Injection
    private final ITaskRepository iTaskRepository;
    @Override
    public boolean isValid(String taskName, ConstraintValidatorContext constraintValidatorContext) {
        boolean isOtherCategoryName=iTaskRepository.findByTaskName(taskName).isPresent();
        return !isOtherCategoryName;
    }
}