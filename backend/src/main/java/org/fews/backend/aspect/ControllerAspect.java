package org.fews.backend.aspect;

import jakarta.persistence.EntityNotFoundException;
import lombok.Data;
import lombok.NonNull;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Aspect
@Component
@Order(0)
public class ControllerAspect {
    @Data
    private static class ResponseMessage {
        @NonNull
        private String message;
    }

    @Around("Pointcuts.allControllers() && Pointcuts.allRequestMappings()")
    public Object handleControllerError(ProceedingJoinPoint joinPoint) {
        try {
            return joinPoint.proceed();
        } catch (Throwable throwable) {
            System.out.println(throwable.getMessage());
            if (throwable instanceof EntityNotFoundException) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseMessage(throwable.getMessage()));
            } else if (throwable instanceof RuntimeException) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(throwable.getMessage()));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseMessage(throwable.getMessage()));
            }
        }
    }

    @Around("Pointcuts.allControllers() && Pointcuts.allRequestMappings()")
    public Object handleMissingBodyParameters(ProceedingJoinPoint joinPoint) throws Throwable{
        BindingResult bindingResult = null;
        for (Object arg : joinPoint.getArgs()) {
            if (arg instanceof BindingResult) {
                bindingResult = (BindingResult) arg;
                break;
            }
        }
        if (bindingResult != null && bindingResult.hasErrors()) {
            List<String> errorFields = new ArrayList<>();
            bindingResult.getFieldErrors().forEach(error -> errorFields.add(error.getField()));
            Collections.sort(errorFields);
            String errorMessage = "Missing required body parameters: [" + String.join(", ",errorFields) + "]";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(errorMessage));
        }
        return joinPoint.proceed();
    }

}
