package com.hti.safety.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "children")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Child {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String dob;
    private Integer age;
    private String school;
    private String medicalInfo;
    private String homeLocation;
    private String deviceId;
    private Double lastLat;
    private Double lastLng;
}
