package com.haven.muffinserver.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Embeddable
public class Returns {
    @JsonProperty("1")
    private double oneY;
    @JsonProperty("3")
    private double threeY;
    @JsonProperty("5")
    private double fiveY;
    private double inception;
    private String date;
}
