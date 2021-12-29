package com.haven.muffinserver.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embedded;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Details {
    private String code;
    private String name;
    private String shortName;
    private String category;
    private String fundHouse;
    private String fundName;
    private String shortCode;
    private String detailInfo;
    @JsonProperty("isin")
    private String ISIN;
    private int taxPeriod;
    @Embedded
    private Nav nav;
    @Embedded
    private Nav lastNav;
    private double jan31Nav;
    private String startDate;
    private String fundType;
    private String fundCategory;
    private String plan;
    private double expenseRatio;
    private String expenseRatioDate;
    private String fundManager;

}
