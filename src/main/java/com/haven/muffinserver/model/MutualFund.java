package com.haven.muffinserver.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MutualFund {
    private String name;
    private String code;
    private Returns returns;
    private double volatility;
    private String categoryMentioned;
    private String category;
    private String subCategory;
}
