package com.cengizhanyavuz.todolist.controller.impl;

import com.cengizhanyavuz.todolist.assist.FrontendUrl;
import com.cengizhanyavuz.todolist.auth.AuthenticationRequest;
import com.cengizhanyavuz.todolist.auth.AuthenticationResponse;
import com.cengizhanyavuz.todolist.business.services.impl.AuthenticationService;
import com.cengizhanyavuz.todolist.auth.RegisterRequest;
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
public class AuthenticationApi {

  private final AuthenticationService service;
  private static final Logger logger = LoggerFactory.getLogger(AuthenticationApi.class);


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
