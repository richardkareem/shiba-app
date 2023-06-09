package com.main.Repository;

import com.main.model.dao.Dog;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShibaRepository extends PagingAndSortingRepository<Dog, Long> {



}
