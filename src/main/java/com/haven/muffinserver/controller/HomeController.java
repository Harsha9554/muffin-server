package com.haven.muffinserver.controller;

import com.haven.muffinserver.model.MutualFund;
import com.haven.muffinserver.service.MutualFundService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/home")
public class HomeController {

    private MutualFundService mutualFundService;

    public HomeController(MutualFundService mutualFundService) {
        this.mutualFundService = mutualFundService;
    }

    @GetMapping("/list")
    public Iterable<MutualFund> list() {
        return mutualFundService.list();
    }
}
