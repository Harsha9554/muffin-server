package com.haven.muffinserver.model;

import lombok.*;

import javax.persistence.Embedded;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MutualFund {
    private String name;
    private String code;
    @Embedded
    private Returns returns;
    private double volatility;
    private String categoryMentioned;
    private String category;
    private String subCategory;
    @Embedded
    private Details details;
}
