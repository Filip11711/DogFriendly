package hr.fer.DogFriendly.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import hr.fer.DogFriendly.model.Location;

@Repository
public interface LocationRepository extends CrudRepository<Location, Long> {
    Location findByLocationId(Long locationId);

    List<Location> findAll();
}
