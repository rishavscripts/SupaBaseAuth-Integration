package com.example.backend.controller;

import com.example.backend.dto.StudentRecordRequest;
import com.example.backend.entity.StudentRecord;
import com.example.backend.repository.StudentRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/teacher/records")
@RequiredArgsConstructor
public class TeacherController {
    private final StudentRecordRepository recordRepository;

    @GetMapping
    public List<StudentRecord> getAllRecords() {
        return recordRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<StudentRecord> addRecord(@RequestBody StudentRecordRequest req) {
        StudentRecord record = StudentRecord.builder()
                .fullName(req.getFullName())
                .rollNumber(req.getRollNumber())
                .department(req.getDepartment())
                .mathMarks(req.getMathMarks())
                .scienceMarks(req.getScienceMarks())
                .englishMarks(req.getEnglishMarks())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(recordRepository.save(record));
    }

    @PutMapping("/{id}")
    public StudentRecord updateRecord(@PathVariable Long id, @RequestBody StudentRecordRequest req) {
        StudentRecord existing = recordRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Record not found"));

        existing.setFullName(req.getFullName());
        existing.setRollNumber(req.getRollNumber());
        existing.setDepartment(req.getDepartment());
        existing.setMathMarks(req.getMathMarks());
        existing.setScienceMarks(req.getScienceMarks());
        existing.setEnglishMarks(req.getEnglishMarks());

        return recordRepository.save(existing);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRecord(@PathVariable Long id) {
        if (!recordRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Record not found");
        }
        recordRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
