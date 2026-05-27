package com.ecom.productcatalog.chat.model;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ChatMessage {
    private String id;
    private String sender;
    private String receiver;
    private String content;
    private String timestamp = LocalDateTime.now().toString();
    private String status = "ONLINE"; // status indicator
}
