
interface Env {
    AI: any;
    DB: any;
    ASSETS: any;
}

export default {
    async fetch(request: Request, env: Env) {
        const url = new URL(request.url);

        // API Handling
        if (url.pathname.startsWith('/api/')) {
            try {
                if (request.method === 'POST' && url.pathname === '/api/blind-spot') {
                    const body: any = await request.json();
                    const { text } = body;

                    if (!env.AI) {
                        return Response.json({ response: "AI binding not found. Mock response: Consider if you are over-indexing on power users?" });
                    }

                    const response = await env.AI.run('@cf/meta/llama-2-7b-chat-int8', {
                        messages: [
                            { role: 'system', content: 'You are a critical product leader. Find blind spots in the user\'s thinking.' },
                            { role: 'user', content: text }
                        ]
                    });

                    return Response.json(response);
                }

                if (url.pathname === '/api/intel') {
                    // Mock data for now, real implementation would fetch from DB or external source
                    return Response.json({
                        competitors: [
                            { name: "Acme Corp", update: "Released a new feature similar to our roadmap item #4", sentiment: "negative" },
                            { name: "BetaInc", update: "Pivot to enterprise", sentiment: "neutral" }
                        ]
                    });
                }
            } catch (e: any) {
                return new Response(JSON.stringify({ error: e.message }), { status: 500 });
            }

            return new Response('API Not Found', { status: 404 });
        }

        // Asset Serving (for SPA)
        // If it's not an API call, serve the index.html for all routes to let React Router handle it
        // But we need to serve actual assets (js, css, etc) if they exist.

        if (env.ASSETS) {
            // Attempt to serve the asset
            const response = await env.ASSETS.fetch(request);
            if (response.status !== 404) {
                return response;
            }

            // If 404 and it's a navigation request (no extension), serve index.html
            if (!url.pathname.includes('.')) {
                const indexRequest = new Request(new URL('/index.html', request.url), request);
                return await env.ASSETS.fetch(indexRequest);
            }

            return response;
        }

        return new Response('Assets binding not found', { status: 500 });
    }
};
