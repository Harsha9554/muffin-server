package com.haven.muffinserver.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embedded;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MutualFund {
    private String name;
    private String code;
    @Embedded
    private Returns returns;
    private double volatility;
    private String categoryMentioned;
    private String category;
    private String subCategory;
}
