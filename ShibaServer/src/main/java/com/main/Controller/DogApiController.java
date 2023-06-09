package com.main.Controller;

import com.main.model.dao.Dog;
import com.main.Repository.ShibaRepository;
import com.main.Service.DogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/movies")
public class DogApiController {

    @Autowired
    private ShibaRepository shibaRepository;
    @Autowired
    DogService movieService;

    public static final Logger logger = LoggerFactory.getLogger(DogApiController.class);

    /** ================================== Create ====================================== */
    @RequestMapping( method = RequestMethod.POST, produces = "application/json")
    //value = "/create",
    public ResponseEntity<?> createLink (@RequestBody Dog dogs) throws SQLException, ClassNotFoundException {
        logger.info("Creating Movie Link : {}", dogs);

        if( dogs.getId() == 0){
            return  new ResponseEntity<>("ID Tidak Boleh Kosong", HttpStatus.FORBIDDEN);
        }else{
            shibaRepository.save(dogs);
            return new ResponseEntity<>(dogs, HttpStatus.CREATED);
        }


    }

    /** ================================== Get  =====================m /';,nkikiiknnhmk================= */
    @RequestMapping(  method = RequestMethod.GET, produces="application/json")

    public ResponseEntity<List<Dog>> listAllbooks() {

        List<Dog> dogs = (List<Dog>) shibaRepository.findAll();


        return new ResponseEntity<>(dogs, HttpStatus.OK);
    }

    /** ================================== Delete Books By ID ====================================== */
    @RequestMapping(value ="{id}", method = RequestMethod.DELETE, produces = "application/json")
    public ResponseEntity<?> deleteBooks (@PathVariable("id")long id){
        logger.info("Deleting Links with id: {}", id);

        Dog dogs = shibaRepository.findById(id).orElse(null);
        shibaRepository.deleteById(id);

        return new ResponseEntity<>("Berhasil Menghapus", HttpStatus.OK);
    }
}
