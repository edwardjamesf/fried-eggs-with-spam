package org.fews.backend.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class Pointcuts {
    @Pointcut("execution(* org.fews.backend..*.*(..))")
    public void allPackages() {
    }

    @Pointcut("execution(* org.fews.backend.controller..*(..))")
    public void allControllers() {
    }

    @Pointcut("@within(org.springframework.web.bind.annotation.RequestMapping)")
    public void allRequestMappings() {
    }

    @Pointcut("execution(* org.fews.backend.SwaggerConfig..*(..))")
    public void swaggerConfig() {
    }

}
