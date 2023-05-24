package hr.fer.DogFriendly.web;

import hr.fer.DogFriendly.model.Location;
import hr.fer.DogFriendly.payload.request.LocationAddRequest;
import hr.fer.DogFriendly.service.LocationService;
import hr.fer.DogFriendly.service.LocationTypeService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@AllArgsConstructor
public class LocationController {

    private final LocationService locationService;
    private final LocationTypeService locationTypeService;

    @CrossOrigin(origins = "*")
    @GetMapping("api/locations")
    ResponseEntity<?> getLocations() {
        List<Location> locations = locationService.findAll();
        return ResponseEntity.ok(locations);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("api/location/{id}")
    ResponseEntity<?> getLocationInfo(@PathVariable Long locationId) {
        Location location = locationService.findByLocationId(locationId);
        return ResponseEntity.ok(location);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("api/location")
    ResponseEntity<?> addLocation(@Valid @RequestBody LocationAddRequest locationAddRequest) {
        Location location = new Location();
        location.setLongitude(locationAddRequest.getLongitude());
        location.setLatitude(locationAddRequest.getLatitude());
        location.setLocationName(locationAddRequest.getLocationName());
        location.setLocationDescription(location.getLocationDescription());
        location.setPromoted(locationAddRequest.getPromoted());
        location.setDogFriendly(locationAddRequest.getDogFriendly());
        location.setAccount(locationService.findByAccountId(locationAddRequest.getAccountId()));
        location.setLocationType(locationTypeService.findByLocationTypeId(locationAddRequest.getLocationTypeId()).orElse(null));

        locationService.save(location);

        return ResponseEntity.ok("Ok");
    }
}
