"""
OpenAI-Powered Historical AI Chatbot
"""

import os

try:
    from openai import OpenAI
    OPENAI_AVAILABLE = True
except ImportError:
    OPENAI_AVAILABLE = False

class HistoricalAIChatbot:
    """Professional AI Chatbot powered by OpenAI"""
    
    def __init__(self):
        self.api_key = os.getenv('OPENAI_API_KEY')
        self.client = None
        
        if OPENAI_AVAILABLE and self.api_key:
            try:
                self.client = OpenAI(api_key=self.api_key)
                self.initialized = True
                print("[OK] OpenAI Chatbot initialized successfully")
            except Exception as e:
                self.initialized = False
                print(f"[WARN] OpenAI initialization failed: {e}")
        else:
            self.initialized = False
            
        self.system_prompt = """You are an expert archaeological AI assistant for Heri-Science, specialized in analyzing artifacts and ancient history."""
    
    def chat(self, user_message, artifact_context=None, conversation_history=None):
        """Chat with the user"""
        if not self.initialized:
            return self._fallback_response(user_message, artifact_context)
        
        try:
            messages = [{"role": "system", "content": self.system_prompt}]
            
            if artifact_context:
                context_msg = f"Artifact context: {artifact_context}"
                messages.append({"role": "system", "content": context_msg})
            
            messages.append({"role": "user", "content": user_message})
            
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages,
                max_tokens=800,
                temperature=0.7
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            print(f"OpenAI error: {e}")
            return self._fallback_response(user_message, artifact_context)
    
    def _fallback_response(self, user_message, artifact_context=None):
        """Advanced fallback with built-in knowledge"""
        msg = user_message.lower()
        
        # Greeting responses
        if any(word in msg for word in ['hi', 'hello', 'hey', 'greetings']):
            return f"""Hello! 👋 I'm your archaeological AI assistant at Heri-Science.

I can help you with:
- 🏺 **Artifact Analysis** - Identify and analyze historical objects
- 📚 **Historical Information** - Ancient civilizations, periods, and cultures
- 🎨 **Creative Inspiration** - Story ideas for sci-fi writers based on real history
- 🔍 **Expert Consultation** - Archaeological methods and preservation

**What would you like to explore?** Upload an artifact image or ask me about ancient history!"""

        # Artifact-specific responses
        if artifact_context:
            civ = artifact_context.get('civilization', 'Unknown civilization')
            period = artifact_context.get('period', 'Ancient period')
            artifact_type = artifact_context.get('artifact_type', 'artifact')
            
            if any(word in msg for word in ['what', 'tell', 'about', 'describe', 'explain']):
                return f"""**Historical Analysis of Your Artifact**

Based on the analysis, this appears to be **{artifact_type}** from **{civ}** civilization, dating to **{period}**.

**Historical Context:**
{civ} civilization was known for their advanced craftsmanship and cultural achievements. Artifacts like this {artifact_type.lower()} provide valuable insights into their daily life, religious practices, and technological capabilities.

**Significance:**
This type of artifact was typically used for ceremonial, practical, or decorative purposes. The materials and construction methods reflect the technological knowledge and artistic sensibilities of the era.

**Cultural Value:**
Such artifacts help us understand:
- Social structures and hierarchies
- Religious beliefs and practices
- Trade networks and cultural exchange
- Technological advancement and innovation

**What would you like to know more about?**
- The civilization's history and culture
- Manufacturing techniques and materials
- Similar artifacts in museums
- Symbolism and meaning
- Sci-fi story ideas inspired by this artifact"""

        # General knowledge responses
        if any(word in msg for word in ['civilization', 'ancient', 'history']):
            return """**Ancient Civilizations Overview**

Major ancient civilizations include:

🏛️ **Egyptian** (3100-332 BCE)
- Known for: Pyramids, hieroglyphics, mummification
- Achievements: Architecture, mathematics, medicine

🏺 **Greek** (800-146 BCE)  
- Known for: Philosophy, democracy, art
- Achievements: Science, theater, athletics

🏟️ **Roman** (753 BCE-476 CE)
- Known for: Engineering, law, military
- Achievements: Aqueducts, roads, governance

🗿 **Maya** (2000 BCE-1500 CE)
- Known for: Astronomy, mathematics, writing
- Achievements: Calendars, pyramids, glyphs

🏯 **Chinese** (1600 BCE-present)
- Known for: Porcelain, silk, philosophy
- Achievements: Paper, gunpowder, compass

**Want to know more about any specific civilization?**"""

        # Sci-fi writer mode
        if any(word in msg for word in ['story', 'scifi', 'sci-fi', 'creative', 'write', 'narrative']):
            return """✨ **SCI-FI WRITER MODE ACTIVATED**

I can help you blend ancient history with science fiction!

**Creative Possibilities:**

🚀 **Time Travel Scenarios**
- Archaeologist discovers artifact that's actually from the future
- Ancient monument is a time capsule or portal
- Historical "myths" were actually recorded observations of time travelers

⚡ **Ancient Advanced Technology**
- "Magic" artifacts were actually advanced tech
- Ancient civilizations had lost knowledge/science
- Pyramids, megaliths were power generators or computers

🌌 **Alternate History**
- What if ancient civilizations had modern technology?
- What if aliens influenced ancient cultures?
- What if historical events happened differently?

💎 **Artifact as Plot Device**
- Ancient object contains AI/consciousness
- Artifact is key to unlocking hidden knowledge
- Symbol/writing is actually a code or map

**Upload an artifact and ask for "story ideas" for specific inspiration!**"""

        # Default comprehensive response
        return f"""**I'd be happy to help with: "{user_message}"**

As your archaeological AI assistant, I can provide information about:

📚 **Historical Knowledge:**
- Ancient civilizations and their artifacts
- Dating and authentication methods
- Cultural significance and symbolism
- Archaeological discoveries and methods

🔬 **Technical Analysis:**
- Material identification
- Construction techniques
- Preservation methods
- Conservation practices

✨ **For Sci-Fi Writers:**
- Creative story concepts based on artifacts
- "What if" scenarios mixing history and fiction
- Ancient technology reimagined
- Plot ideas and world-building

🎯 **Best Results:**
- Upload an artifact image for specific analysis
- Ask detailed questions about civilizations or artifacts
- Request creative narratives for story writing
- Compare different historical periods or cultures

**What specific aspect would you like to explore?**"""

chatbot = HistoricalAIChatbot()

def chat_with_ai(message, artifact_context=None, history=None):
    return chatbot.chat(message, artifact_context, history)

