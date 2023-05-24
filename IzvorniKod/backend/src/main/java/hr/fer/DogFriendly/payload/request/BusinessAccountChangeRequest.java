package hr.fer.DogFriendly.payload.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class BusinessAccountChangeRequest {
    private String businessName;
    private String password;
    private String bio;
    private String phoneNumber;
    private Long businessType;
}
