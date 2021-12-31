package com.haven.muffinserver.service;

import com.haven.muffinserver.model.MutualFund;
import com.haven.muffinserver.repository.MutualFundRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MutualFundService {

    private MutualFundRepository mutualFundRepository;

    public MutualFundService(MutualFundRepository mutualFundRepository) {
        this.mutualFundRepository = mutualFundRepository;
    }

    public Iterable<MutualFund> list() {
        return mutualFundRepository.findAll();
    }

    public MutualFund save(MutualFund fund) {
        return mutualFundRepository.save(fund);
    }

    public void save(List<MutualFund> funds) {
        mutualFundRepository.saveAll(funds);
    }
}
