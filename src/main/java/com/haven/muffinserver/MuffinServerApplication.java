package com.haven.muffinserver;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.haven.muffinserver.model.MutualFund;
import com.haven.muffinserver.service.MutualFundService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Random;

@SpringBootApplication
public class MuffinServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(MuffinServerApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(MutualFundService mutualFundService) {
        return args -> {
            ObjectMapper mapper = new ObjectMapper();
            try {
                Random rand = new Random();
                List<MutualFund> mutualFundList = mapper.readValue(new File("src/muffin-data-js/src/resources/muffin-data.json"), new TypeReference<List<MutualFund>>() {});
                try {
                    for(int i=0; i<500; i++) {
                        MutualFund m = mutualFundList.get(rand.nextInt(mutualFundList.size()));
                        mutualFundService.save(m);
                    }

                } catch (Exception e) {
                    System.out.println("nice");
                }

                System.out.println("FUNDS TO DB!");

            } catch (IOException e) {
                System.out.println("Can't : "+e.getMessage());
            }


        };
    }
}
