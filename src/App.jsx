import { useState } from 'react'
import { createClient } from "@supabase/supabase-js";
import { Configuration, OpenAIApi } from "openai";

const supabaseClient = createClient("https://mnwtchciiuyswkitrcwd.supabase.co", "")

async function generateEmbeddings() {
    const configuration = new Configuration({ apiKey: "" })
    const ai = new OpenAIApi(configuration);
    const documents = [
        "Peppa pig is a popular show",
        "peppa pig likes carrotes",
        "Peppa Pig is british"
    ];

    for (const document of documents) {
        const input = document.replace(/\n/g,'');

        const embeddingResponse = await ai.createEmbedding({
            model: "text-embedding-ada-002",
            input
        });

        const [{ embedding }] = embeddingResponse.data.data;

        await supabaseClient.from('documents').insert({
            content: document,
            embedding
        });
    }
}