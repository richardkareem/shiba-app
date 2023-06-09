package com.main.Service;

import com.main.Repository.ShibaRepository;
import com.main.model.dao.Dog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class DogService {


    @Autowired
    private ShibaRepository shibaRepository;

    public Iterable<Dog> findusingPage (Pageable pageable){
        return shibaRepository.findAll(pageable);
    }
}
