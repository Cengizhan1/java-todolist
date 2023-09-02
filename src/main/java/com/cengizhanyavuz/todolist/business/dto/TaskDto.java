package com.cengizhanyavuz.todolist.business.dto;

import com.cengizhanyavuz.todolist.annotation.UniqueTaskName;
import com.cengizhanyavuz.todolist.auditing.AuditingAwareBaseDto;
import com.cengizhanyavuz.todolist.enums.PriorityLevel;
import com.cengizhanyavuz.todolist.enums.TaskState;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.io.Serializable;
import java.util.Date;

// LOMBOK
@Data
@AllArgsConstructor
@NoArgsConstructor
@Log4j2
@Builder
// Validation

// CategoryDto(1) - BlogDto(N)
public class TaskDto extends AuditingAwareBaseDto implements Serializable {

    public static final Long serialVersionUID=1L;

    @UniqueTaskName
    @NotEmpty(message = "{task.name.validation.constraints.NotNull.message}")
    @Size(min=2,message = "{task.name.least.validation.constraints.NotNull.message}")
    private String taskName;
    @NotEmpty
    private String taskDescription;
    private TaskState taskState;
    private PriorityLevel priorityLevel;
    private Date dueDate;
    private String tags;
}