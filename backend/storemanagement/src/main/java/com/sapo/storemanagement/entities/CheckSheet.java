package com.sapo.storemanagement.entities;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "check_sheets")
public class CheckSheet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "code", nullable = false, unique = true, length = 8)
    private String code;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @ManyToOne(optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Column(name = "note")
    private String note = "";

    public CheckSheet() {
    }

    public CheckSheet(String code, User createdBy) {
        this.code = code;
        this.createdBy = createdBy;
    }

    public CheckSheet(String code, User createdBy, String note) {
        this.code = code;
        this.createdBy = createdBy;
        this.note = note;
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    private void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
        this.setCreatedAt(LocalDateTime.now());
    }
}