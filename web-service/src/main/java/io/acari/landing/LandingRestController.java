package io.acari.landing;


import io.acari.landing.auth.ApplicationUser;
import io.acari.landing.auth.TokenHandler;
import io.acari.landing.model.BaseProject;
import io.acari.landing.model.ResponseProject;
import io.acari.landing.project.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.*;
import reactor.core.publisher.Mono;

@Component
public class LandingRestController {
    private static final Logger LOGGER = LoggerFactory.getLogger(LandingRestController.class);

    private final ImageHandler imageHandler;
    private final AllProjectHandler allProjectHandler;
    private final ProjectCreationHandler projectCreationHandler;
    private final ProjectUpdateHandler projectUpdateHandler;
    private final ProjectRemovalHandler projectRemovalHandler;
    private final TokenHandler tokenHandler;

    @Autowired
    public LandingRestController(ImageHandler imageHandler,
                                 AllProjectHandler allProjectHandler,
                                 ProjectCreationHandler projectCreationHandler,
                                 ProjectUpdateHandler projectUpdateHandler,
                                 ProjectRemovalHandler projectRemovalHandler,
                                 TokenHandler tokenHandler) {
        this.imageHandler = imageHandler;
        this.allProjectHandler = allProjectHandler;
        this.projectCreationHandler = projectCreationHandler;
        this.projectUpdateHandler = projectUpdateHandler;
        this.projectRemovalHandler = projectRemovalHandler;
        this.tokenHandler = tokenHandler;
    }

    @Bean
    public RouterFunction<?> landingRouterFunction() {
        return RouterFunctions.nest(RequestPredicates.path("/api"),
                RouterFunctions.route(RequestPredicates.GET("/projects"),
                        request -> ServerResponse.ok()
                                .contentType(MediaType.APPLICATION_JSON)
                                .body(allProjectHandler.findAll(), ResponseProject.class))
                        .andRoute(RequestPredicates.POST("/token"),
                                this::handleToken)
                        .andRoute(RequestPredicates.POST("/image/save"),
                                this::handleImageSave)
                        .andRoute(RequestPredicates.POST("/project/update"),
                                this::handleProjectUpdate)
                        .andRoute(RequestPredicates.POST("/project/create"),
                                this::handleProjectCreation)
                        .andRoute(RequestPredicates.GET("/image/get/{id}"),
                                this::handleGetImage)
                        .andRoute(RequestPredicates.DELETE("/project/delete/{id}"),
                                this::handleDeleteProject)
        ).andOther(RouterFunctions.resources("/**", new ClassPathResource("static/")));
    }

    private Mono<ServerResponse> handleToken(ServerRequest request) {
        return ServerResponse.ok()
                .contentType(MediaType.TEXT_PLAIN)
                .body(this.tokenHandler.handleUser(request.bodyToMono(ApplicationUser.class)), String.class);
    }

    private Mono<ServerResponse> handleImageSave(ServerRequest request) {
        return ServerResponse.ok()
                .body(imageHandler.saveImage(request.bodyToFlux(Part.class)), String.class);
    }

    private Mono<ServerResponse> handleProjectUpdate(ServerRequest request) {
        return ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(projectUpdateHandler.updateProject(request.bodyToMono(ResponseProject.class)), ResponseProject.class);
    }

    private Mono<ServerResponse> handleProjectCreation(ServerRequest request) {
        return ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(projectCreationHandler.create(request.bodyToMono(BaseProject.class)), ResponseProject.class);
    }

    private Mono<ServerResponse> handleGetImage(ServerRequest request) {
        return ServerResponse.ok()
                .body(imageHandler.fetchImage(request.pathVariable("id")), byte[].class);
    }

    private Mono<ServerResponse> handleDeleteProject(ServerRequest request) {
        return ServerResponse.ok()
                .body(projectRemovalHandler.removeProject(Mono.just(request.pathVariable("id"))), String.class);
    }
}
