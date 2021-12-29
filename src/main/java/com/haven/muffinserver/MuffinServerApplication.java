package com.haven.muffinserver;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.haven.muffinserver.model.MutualFund;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.File;
import java.util.List;

@SpringBootApplication
public class MuffinServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(MuffinServerApplication.class, args);
    }

    @Bean
    CommandLineRunner runner() {
        return args -> {
            ObjectMapper mapper = new ObjectMapper();
            List<MutualFund> mutualFundList = mapper.readValue(new File("src/muffin-data-js/src/resources/muffin-data.json"), new TypeReference<List<MutualFund>>() {});
            System.out.println(mutualFundList.get(0));
            System.out.println(mutualFundList.size());
        };
    }
}
