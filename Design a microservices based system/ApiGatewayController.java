package com.example.frontend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/gateway")
@CrossOrigin(origins = "*")
public class ApiGatewayController {
    
    @Autowired
    private RestTemplate restTemplate;
    
    private final String USER_SERVICE_URL = "http://localhost:8081/api/users";
    private final String ORDER_SERVICE_URL = "http://localhost:8082/api/orders";
    
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return restTemplate.getForEntity(USER_SERVICE_URL, Object.class);
    }
    
    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody Map<String, Object> user) {
        return restTemplate.postForEntity(USER_SERVICE_URL, user, Object.class);
    }
    
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        return restTemplate.getForEntity(USER_SERVICE_URL + "/" + id, Object.class);
    }
    
    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody Map<String, Object> user) {
        restTemplate.put(USER_SERVICE_URL + "/" + id, user);
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        restTemplate.delete(USER_SERVICE_URL + "/" + id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/orders")
    public ResponseEntity<?> getAllOrders() {
        return restTemplate.getForEntity(ORDER_SERVICE_URL, Object.class);
    }
    
    @GetMapping("/orders/user/{userId}")
    public ResponseEntity<?> getOrdersByUserId(@PathVariable Long userId) {
        return restTemplate.getForEntity(ORDER_SERVICE_URL + "/user/" + userId, Object.class);
    }
    
    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> order) {
        return restTemplate.postForEntity(ORDER_SERVICE_URL, order, Object.class);
    }
    
    @PutMapping("/orders/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> status) {
        restTemplate.put(ORDER_SERVICE_URL + "/" + id + "/status", status.get("status"));
        return ResponseEntity.ok().build();
    }
    
    @DeleteMapping("/orders/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        restTemplate.delete(ORDER_SERVICE_URL + "/" + id);
        return ResponseEntity.ok().build();
    }
}