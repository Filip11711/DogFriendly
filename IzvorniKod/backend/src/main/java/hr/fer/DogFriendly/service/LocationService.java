package hr.fer.DogFriendly.service;

import hr.fer.DogFriendly.model.Account;
import hr.fer.DogFriendly.model.Location;
import hr.fer.DogFriendly.repository.LocationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;
    private final AccountService accountService;

    public Location findByLocationId(Long locationId) {
        return locationRepository.findByLocationId(locationId);
    }

    public Location save(Location location) {
        return locationRepository.save(location);
    }

    public List<Location> findAll() {
        return locationRepository.findAll();
    }

    public Account findByAccountId(Long accountId) {
        return accountService.findByAccountId(accountId);
    }
}
