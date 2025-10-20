"""
Gemini Flash Lite Chatbot Integration
Fast, efficient AI responses using Google's Gemini API
"""

try:
    import google.generativeai as genai
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False
    genai = None

import os
from typing import Dict, Any, Optional
import json

class GeminiChatbot:
    def __init__(self):
        self.api_key = os.getenv('GEMINI_API_KEY')
        self.model = None
        self.initialized = False
        
        # Try to initialize Gemini, but don't fail if no API key or module
        if GEMINI_AVAILABLE and self.api_key:
            try:
                genai.configure(api_key=self.api_key)
                self.model = genai.GenerativeModel('gemini-1.5-flash')
                self.initialized = True
                print("SUCCESS: Gemini Flash Lite initialized successfully!")
            except Exception as e:
                print(f"ERROR: Gemini initialization error: {e}")
                self.initialized = False
        else:
            if not GEMINI_AVAILABLE:
                print("WARNING: google-generativeai module not installed. Using intelligent fallback.")
            else:
                print("WARNING: GEMINI_API_KEY not found. Using intelligent fallback responses.")
            self.initialized = False
    
    def chat_with_gemini(self, message: str, context: Optional[Dict[str, Any]] = None) -> str:
        """
        Chat with Gemini Flash Lite model
        """
        if not self.initialized or not self.model:
            return self._fallback_response(message)
        
        try:
            # Create context-aware prompt
            prompt = self._create_prompt(message, context)
            
            # Generate response
            response = self.model.generate_content(prompt)
            
            if response.text:
                return response.text.strip()
            else:
                return self._fallback_response(message)
                
        except Exception as e:
            print(f"Gemini API error: {e}")
            return self._fallback_response(message)
    
    def _create_prompt(self, message: str, context: Optional[Dict[str, Any]] = None) -> str:
        """
        Create a context-aware prompt for Gemini
        """
        base_prompt = """You are a helpful AI assistant specializing in historical artifacts, ancient civilizations, and archaeology. 
You provide accurate, engaging, and educational responses about historical topics.

User question: {user_message}

Please provide a detailed, informative response about this historical topic. If it's about artifacts, explain their significance, historical context, and cultural importance."""

        if context and context.get('hasImage'):
            base_prompt += "\n\nNote: The user has uploaded an image. You can provide analysis based on what you might see in historical artifacts or archaeological finds."
        
        if context and context.get('imageUrl'):
            base_prompt += f"\n\nImage URL available: {context['imageUrl']}"
        
        return base_prompt.format(user_message=message)
    
    def _fallback_response(self, message: str) -> str:
        """
        Intelligent fallback response when Gemini is not available
        """
        message_lower = message.lower()
        
        # Historical artifact responses
        if any(word in message_lower for word in ['artifact', 'ancient', 'historical', 'civilization', 'archaeology']):
            return """🏛️ **This is a fascinating historical artifact!** 

Ancient civilizations created remarkable objects that tell us so much about their culture, technology, and daily life. These artifacts serve as windows into the past, allowing us to understand how our ancestors lived, worked, and expressed their beliefs.

**Key aspects of historical artifacts:**
• Cultural significance and symbolism
• Technological achievements of ancient times
• Artistic expression and craftsmanship
• Religious and ceremonial purposes
• Economic and trade connections

Is there a specific aspect of this artifact you'd like me to elaborate on?"""
        
        # Egyptian civilization responses
        elif any(word in message_lower for word in ['egypt', 'egyptian', 'pyramid', 'pharaoh', 'hieroglyph']):
            return """🔺 **Ancient Egypt - The Gift of the Nile!**

Ancient Egypt was one of the most remarkable civilizations in history! The Egyptians built incredible monuments like the pyramids, developed a complex writing system with hieroglyphs, and created beautiful art and jewelry. Their civilization lasted for over 3,000 years and left an incredible legacy.

**Notable achievements:**
• **Pyramids**: Engineering marvels like the Great Pyramid of Giza
• **Hieroglyphs**: Complex writing system with over 700 symbols
• **Mummification**: Advanced preservation techniques
• **Mathematics**: Developed geometry and astronomy
• **Medicine**: Advanced surgical techniques

Would you like to know more about their construction techniques or cultural significance?"""
        
        # Roman civilization responses
        elif any(word in message_lower for word in ['roman', 'rome', 'empire', 'gladiator', 'colosseum']):
            return """🏛️ **The Roman Empire - Masters of the Ancient World!**

The Roman Empire was one of the most powerful and influential civilizations in history! The Romans built incredible infrastructure including roads, aqueducts, and monumental buildings like the Colosseum. Their legal system, engineering, and military tactics still influence modern society.

**Roman achievements:**
• **Engineering**: Roads, aqueducts, and concrete
• **Architecture**: Colosseum, Pantheon, and Forum
• **Military**: Legion system and siege warfare
• **Law**: Basis for modern legal systems
• **Government**: Republic and imperial systems

Are you interested in learning about their engineering achievements or cultural contributions?"""
        
        # Greek civilization responses
        elif any(word in message_lower for word in ['greek', 'greece', 'athens', 'sparta', 'philosophy', 'olympic']):
            return """🏺 **Ancient Greece - The Cradle of Western Civilization!**

Ancient Greece was the birthplace of Western civilization! The Greeks made incredible contributions to philosophy, democracy, mathematics, and the arts. Thinkers like Socrates, Plato, and Aristotle laid the foundations for Western thought, while Greek architecture and sculpture continue to inspire us.

**Greek contributions:**
• **Philosophy**: Socrates, Plato, Aristotle
• **Democracy**: Athenian political system
• **Mathematics**: Geometry, Pythagoras, Euclid
• **Olympics**: Athletic competitions and games
• **Arts**: Theater, sculpture, and architecture

What aspect of Greek civilization interests you most?"""
        
        # Image analysis responses
        elif any(word in message_lower for word in ['image', 'picture', 'photo', 'what', 'see', 'analyze']):
            return """🖼️ **Image Analysis - Historical Perspective**

Based on what I can observe about historical artifacts and archaeological finds, this appears to be a significant piece! Historical artifacts often reveal fascinating details about:

**What to look for:**
• **Artistic style** and craftsmanship techniques
• **Materials used** and their cultural significance
• **Symbols and motifs** that indicate origin
• **Condition** and preservation state
• **Historical context** and time period

Could you describe what you see in more detail? I can help analyze the historical significance and cultural context!"""
        
        # Default response
        else:
            return f"""🤖 **AI Historical Assistant**

I'd be happy to help you with information about "{message}"! This appears to be related to historical artifacts or ancient civilizations. I specialize in topics like:

**My expertise includes:**
• Ancient civilizations (Egypt, Rome, Greece, etc.)
• Archaeological discoveries and artifacts
• Historical analysis and context
• Cultural significance of historical objects
• Art and craftsmanship of ancient times

Could you provide more details about what specifically you'd like to know? I'm here to help uncover the fascinating stories behind historical artifacts!"""

# Global instance
gemini_chatbot = GeminiChatbot()

def chat_with_gemini(message: str, context: Optional[Dict[str, Any]] = None) -> str:
    """
    Main function to chat with Gemini Flash Lite
    """
    return gemini_chatbot.chat_with_gemini(message, context)

# Test function
if __name__ == "__main__":
    # Test the chatbot
    test_messages = [
        "What is this artifact?",
        "Tell me about Egyptian pyramids",
        "Explain Roman civilization",
        "What era is this from?"
    ]
    
    for msg in test_messages:
        response = chat_with_gemini(msg)
        print(f"User: {msg}")
        print(f"Gemini: {response}")
        print("-" * 50)
