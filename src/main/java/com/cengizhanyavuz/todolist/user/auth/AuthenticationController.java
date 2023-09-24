package com.cengizhanyavuz.todolist.user.auth;

import com.cengizhanyavuz.todolist.assist.FrontendUrl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = FrontendUrl.REACT_URL)
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;
  private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);


  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(
      @RequestBody RegisterRequest request
  ) {
    try {
      return ResponseEntity.ok(service.register(request));
    } catch (Exception e) {
      logger.error("register method threw an exception", e);
      throw e;
    }
  }
  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    try {
      return ResponseEntity.ok(service.authenticate(request));
    } catch (Exception e) {
      logger.error("authenticate method threw an exception", e);
      throw e;
    }
  }


  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }


}
