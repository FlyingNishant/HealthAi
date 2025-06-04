package com.hpd.prediction;


import com.hpd.prediction.controller.PredictController;
import com.hpd.prediction.service.PredictionService;
import jakarta.ws.rs.core.MediaType;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class PredictControllerTest {

    @Mock
    private PredictionService predictionService;

    @InjectMocks
    private PredictController predictController;

    //To test the controller layer without starting the entire Spring context.
    private MockMvc mockMvc;

    static String PREDICT_URL = "/predict/{id}";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        mockMvc = MockMvcBuilders.standaloneSetup(predictController).build(); // sets up the controller for testing.
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void predict() throws Exception {
        Long id = 1L;
        String expectedPrediction = "Prediction result";

        // Mock the behavior of the service
        when(predictionService.predict(id)).thenReturn(expectedPrediction);

        // Perform the POST request and verify
        mockMvc.perform(post(PREDICT_URL, id)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string(expectedPrediction));

        // Verify the interaction with the service
        verify(predictionService, times(1)).predict(id);
    }

    @Test
    void testPredict_Failure() throws Exception {
        Long id = 1L;
        String errorMessage = "Something went wrong";

        // Mock the behavior of the service to throw an exception
        when(predictionService.predict(id)).thenThrow(new RuntimeException(errorMessage));

        // Perform the POST request and verify
        mockMvc.perform(post(PREDICT_URL, id)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isInternalServerError())
                .andExpect(content().string("Error: " + errorMessage));

        // Verify the interaction with the service
        verify(predictionService, times(1)).predict(id);
    }
}

