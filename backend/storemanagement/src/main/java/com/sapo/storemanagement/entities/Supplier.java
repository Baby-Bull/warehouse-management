package com.sapo.storemanagement.entities;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "suppliers")
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "code", nullable = false, unique = true, length = 16)
    @NotNull(message = "Mã nhà cung cấp không được null")
    @Size(max = 16, message = "Độ dài mã nhà cung cấp không được vượt quá {max} kí tự")
    private String code;

    @Column(name = "name", nullable = false, length = 64)
    @NotBlank(message = "Không được bỏ trống tên nhà cung cấp")
    @Size(max = 64, message = "Độ dài tên nhà cung cấp không được vượt qúa {max} kí tự")
    private String name;

    @Column(name = "address", nullable = false, length = 128)
    @NotBlank(message = "Không được bỏ trống địa chỉ nhà cung cấp")
    @Size(max = 128, message = "Độ dài địa chỉ nhà cung cấp không được vượt quá {max} kí tự")
    private String address;

    @Column(name = "phone", length = 11)
    @NotNull(message = "Điện thoại nhà cung cấp không được null")
    @Size(max = 11, message = "Độ dài điện thọai nhà cung cấp không được vượt quá {max} kí tự")
    private String phone = "";

    @Column(name = "email", length = 128)
    @NotNull(message = "Email của nhà cung cấp không được null")
    @Size(max = 128, message = "Độ dài email nhà cung cấp không được vượt quá {max} kí tự")
    private String email = "";

    @Column(name = "website", length = 128)
    @NotNull(message = "Website nhà cung cấp không được null")
    @Size(max = 128, message = "Độ dài website không được vượt quá {max} kí tự")
    private String website = "";

    @Column(name = "description")
    @NotNull(message = "Mô tả nhà cung cấp không được null")
    @Size(max = 255, message = "Độ dài của mô tả nhà cung cấp không được vượt quá {max} kí tự")
    private String description = "";

    @Column(name = "fax", length = 32)
    @NotNull(message = "Fax của nhà cung cấp không được null")
    @Size(max = 32, message = "Độ dài fax của nhà cung cấp không được vượt quá {max} kí tự")
    private String fax = "";

    @Column(name = "debt")
    private Double debt = 0.0;

    @Column(name = "activity_status", length = 32)
    private SupplierStatus activityStatus = SupplierStatus.COOPERATIVE;

    @Column(name = "record_status", length = 32)
    private RecordStatus recordStatus = RecordStatus.ACTIVE;

    public Supplier() {
    }

    public Supplier(String code, String name, String address) {
        this.code = code;
        this.name = name;
        this.address = address;
    }

    public Supplier(String code, String name, String address,
                    String phone, String email, String website,
                    String description, String fax, Double debt) {
        this.code = code;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.website = website;
        this.description = description;
        this.fax = fax;
        this.debt = debt;
    }

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public Double getDebt() {
        return debt;
    }

    public void setDebt(Double debt) {
        this.debt = debt;
    }

    public String getActivityStatus() {
        return activityStatus.getStatus();
    }

    public void setActivityStatus(SupplierStatus activityStatus) {
        this.activityStatus = activityStatus;
    }

    public String getRecordStatus() {
        return recordStatus.getStatus();
    }

    public void setRecordStatus(RecordStatus recordStatus) {
        this.recordStatus = recordStatus;
    }
}