package com.cengizhanyavuz.todolist.error;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Date;
import java.util.Map;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResult {

    private String path;
    private Map<String,String> validationErrors;
    private String message;
    private String error;
    private int status;
    private Date systemDate;

    public ApiResult() {
    }

    public ApiResult(String path, String message, int status) {
        this.path = path;
        this.message = message;
        this.status = status;
    }
}