package com.cengizhanyavuz.todolist.data.entity;

import com.cengizhanyavuz.todolist.auditing.AuditingAwareBaseEntity;
import com.cengizhanyavuz.todolist.enums.PriorityLevel;
import com.cengizhanyavuz.todolist.enums.TaskState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.hibernate.annotations.CreationTimestamp;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

// LOMBOK
@Data
@Log4j2
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tasks")
public class TaskEntity extends AuditingAwareBaseEntity implements Serializable {

    public static final Long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="task_id",unique = true,nullable = false,insertable = true,updatable = false)
    private Long taskId;

    @Column(name = "task_name")
    private String taskName;

    @Column(name = "task_description")
    private String taskDescription;

    @Enumerated(EnumType.STRING)
    @Column(name = "task_state")
    private TaskState taskState;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority_level")
    private PriorityLevel priorityLevel;

    @Column(name = "due_date")
    private Date dueDate;

    @Column(name = "tags")
    private String tags;


    // DATE
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Date systemDate;
}