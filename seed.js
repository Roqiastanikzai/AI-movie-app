import  { supabase, oprnrouter } from './src/lib/config.js';
import{ movies} from './src/data/content.js';
// Helper to chunk long descriptions into sentences for more precise vector search matches
function chunkText(text, maxWords = 40) {
    const words = text.split('');
    const chunks = [];
    for (let i = 0; i < words.length; i +=maxWords) {
        chunks.push(words.slice(i, i + maxWords).join(''));

    }
    return chunks;
}
async function generateEmbedding(text) {
    try {
        const response = await openrouter.embedding.create({
            model:'text-embedding-3-small',
            input:text,
        });
        return response.data[0]?.embedding || response.data?.embedding;

    }catch (error) {
        console.error('Error creating embedding:',error);
        return null;
    }
}
async function seedDatabase() {
    console.log(`Starting to send and chunk ${movies.length} movies...`);
    for (let i = 0; i< movies.length;i ++) {
        const movies = movies[i];
        console.log(`Processing [${i + 1}/${movies.length}]: ${movies.title}`);
        // Break text down to chunks to satisfy strech Goal 2
        const descriptionChunks  = chunkText(movies.content, 40); 
        for(let j =0; j < descriptionChunks.length; j++) {
            const chunkTextContent = descriptionChunks[j];
            const embedding = await generateEmbedding(chunkTextContent);
            if (!embedding) continue;
            const {error} = await supabase.from('movies').insert({
                title: movies.title,
                release_year:parseInt(movies.releaseYear),
                description:movie.content, // Saves the full description for display
                embedding: embedding
            });
            if (error) {
                console.error(`Failed to insert chunk for ${movie.title}:`,error.message);
            }
        }
        console.log(`Successfully saved ${movie.title}!`);
    }
    console.log('Seeding process complete!');
}
seedDatabase();