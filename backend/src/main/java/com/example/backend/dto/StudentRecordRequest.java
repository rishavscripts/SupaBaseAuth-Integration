package com.example.backend.dto;

import lombok.Data;

@Data
public class StudentRecordRequest {
    private String fullName;
    private String rollNumber;
    private String department;
    private Integer mathMarks;
    private Integer scienceMarks;
    private Integer englishMarks;
}
