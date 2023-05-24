package hr.fer.DogFriendly.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class JwtResponse {
    private String token;

	private Long accountId;

	private String email;

    private String type = "Bearer";
}
