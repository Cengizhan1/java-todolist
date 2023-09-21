package com.cengizhanyavuz.todolist.data.entity;

import com.cengizhanyavuz.todolist.auditing.AuditingAwareBaseEntity;
import com.cengizhanyavuz.todolist.enums.State;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
@Log4j2
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "projects")
public class ProjectEntity  extends AuditingAwareBaseEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="project_id",unique = true,nullable = false,insertable = true,updatable = false)
    private Long projectId;

    @Column(name = "project_name")
    private String projectName;

    @Column(name = "project_description")
    private String projectDescription;

    @Enumerated(EnumType.STRING)
    @Column(name = "project_state")
    private State projectState;

    @Column(name = "due_date")
    private Date dueDate;

    @OneToMany(mappedBy = "relationProjectTaks",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    List<TaskEntity> relationProjectTaks;
}
