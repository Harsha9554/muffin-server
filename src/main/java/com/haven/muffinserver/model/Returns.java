package com.haven.muffinserver.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Returns {
    private double oneY;
    private double threeY;
    private double fiveY;
    private Date date;
}
