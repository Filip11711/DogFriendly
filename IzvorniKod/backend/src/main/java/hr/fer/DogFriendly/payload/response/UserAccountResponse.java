package hr.fer.DogFriendly.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;

@Getter
@Setter
@AllArgsConstructor
public class UserAccountResponse {
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String bio;
}
