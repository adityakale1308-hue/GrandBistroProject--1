import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class DownloadTokenManager {
    
    // Maps temporary unique token identifiers to private resource file destinations
    private Map<String, String> activeSecureTokens = new HashMap<>();

    /**
     * Triggers automatically when transaction callbacks verify success status codes
     */
    public String generateDownloadLink(String paymentStatus, String purchasedItem) {
        
        // Validation Block: Halt instantly if transaction did not clear
        if (!"SUCCESS".equalsIgnoreCase(paymentStatus)) {
            return "Error: Internal transaction authorization pending or declined.";
        }

        // Generate cryptographically unique alphanumeric download token strings
        String secureToken = UUID.randomUUID().toString().substring(0, 8);
        
        // Cache token matching values in server memory maps
        activeSecureTokens.put(secureToken, purchasedItem);
        
        return "https://edukit.com" + secureToken;
    }

    /**
     * Validates input parameters when a student triggers the dynamic download file link
     */
    public boolean validateTokenAccess(String inputToken) {
        if (activeSecureTokens.containsKey(inputToken)) {
            // Self-Destruct Routine: Erase entry mapping instantly upon access to avoid multi-sharing loops
            activeSecureTokens.remove(inputToken);
            return true;
        }
        return false;
    }
}
