import OpenAI from "openai";

// Ambil API key dari .ENV
const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY;

// Setup client OpenAI buat Deepseek
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: apiKey,
  dangerouslyAllowBrowser: true // Ini diperlukan buat di browser
});

/**
 * Dapetin rekomendasi album berdasarkan preferensi user
 * @param {Object} preferences Preferensi yang dipilih user
 * @param {Array} albums Data album yang tersedia
 * @returns {Promise<Array>} Array berisi album rekomendasi dengan alasannya
 */
export const getRecommendations = async (preferences, albums) => {
  try {
    // Saring preferensi yang beneran dipilih aja
    const filteredPreferences = {};
    Object.entries(preferences).forEach(([key, values]) => {
      if (values.length > 0) {
        filteredPreferences[key] = values;
      }
    });
    
    // Bikin data album jadi lebih simpel untuk prompt
    const albumsForPrompt = albums.map(album => ({
      id: album.id,
      title: album.title,
      artist: album.artist,
      genre: album.genre,
      year: album.release_year
    }));
    
    // Format preferensi jadi teks yang mudah dibaca
    const preferencesText = Object.entries(filteredPreferences)
      .map(([category, values]) => `${category}: ${values.join(', ')}`)
      .join('\n');
    
    // Bikin prompt buat AI
    const prompt = `Given a user's music preferences and available albums, suggest the most suitable albums.

User preferences:
${preferencesText}

Available albums:
${albumsForPrompt.map(album => `ID: ${album.id} - "${album.title}" by ${album.artist} (${album.year}, ${album.genre})`).join('\n')}

Return a JSON object with this exact structure:
{
  "recommendations": [
    {
      "album_id": 1,
      "reason": "Brief explanation for recommending this album"
    }
  ]
}
Do not include any other text in your response, only the JSON.`;

    console.log("Kirim ke Deepseek API", { prompt });
    
    // Cek apakah API key ada
    if (!apiKey) {
      throw new Error("API key Deepseek nggak ketemu. Pastikan udah diatur di file .env sebagai VITE_DEEPSEEK_API_KEY.");
    }
    
    try {
      // Kirim request ke Deepseek pakai OpenAI SDK
      const completion = await openai.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: "Kamu adalah asisten rekomendasi musik. Jawab hanya dengan format JSON yang diminta." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });
      
      // Ambil JSON dari responsenya
      let aiResponseText = completion.choices[0].message.content.trim();
      
      // Kalo responsenya dibungkus code block, ambil JSONnya aja
      if (aiResponseText.startsWith("```json")) {
        aiResponseText = aiResponseText.replace(/```json\n/, "").replace(/\n```$/, "");
      } else if (aiResponseText.startsWith("```")) {
        aiResponseText = aiResponseText.replace(/```\n/, "").replace(/\n```$/, "");
      }
      
      // Parse responsenya jadi object
      const aiResponse = JSON.parse(aiResponseText);
      console.log("Response AI:", aiResponse);
      
      // Proses response AI dan gabungkan dengan data album lengkap
      const recommendedAlbums = aiResponse.recommendations.map(rec => {
        // Cari album lengkapnya dari ID
        const album = albums.find(a => a.id === rec.album_id);
        if (!album) return null;
        
        // Gabungkan data album dengan alasan rekomendasinya
        return {
          ...album,
          reason: rec.reason
        };
      }).filter(Boolean); // Buang yang null atau undefined
      
      return recommendedAlbums;
    } catch (apiError) {
      console.error("Request API gagal:", apiError);
      throw apiError;
    }
  } catch (error) {
    console.error("Error di service rekomendasi:", error);
    
    // Kalo gagal, pakai rekomendasi default
    console.log("Pakai rekomendasi default");
    
    // Cari album dari array untuk rekomendasi default
    const mockRecommendationIds = [2, 13]; // Dark Side of the Moon dan In Rainbows
    
    const mockRecommendations = mockRecommendationIds
      .map(id => {
        const album = albums.find(a => a.id === id);
        if (!album) return null;
        
        return {
          ...album,
          reason: id === 2 
            ? "Album ini diakui secara universal dan disukai banyak pendengar."
            : "Album ini punya berbagai macam suara yang menarik untuk didengarkan."
        };
      })
      .filter(Boolean);
    
    return mockRecommendations.length > 0 
      ? mockRecommendations 
      : [
          {
            id: 1,
            title: "Thriller",
            artist: "Michael Jackson",
            genre: "Pop",
            release_year: 1982,
            reason: "Album populer yang punya sesuatu untuk semua orang."
          }
        ];
  }
};