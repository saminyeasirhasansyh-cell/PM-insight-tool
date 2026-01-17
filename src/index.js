// PM Insight Engine: Analyzes 100 mock DX issues across 3 JTBD clusters with sentiment, rival benchmarks, dependency resolution.

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // API Routes
    if (pathname === '/api/issues') {
      const cluster = url.searchParams.get('cluster');
      
      let query = 'SELECT * FROM issues';
      const params = [];
      
      if (cluster) {
        query += ' WHERE cluster = ?';
        params.push(cluster);
      }
      
      query += ' ORDER BY id';
      
      try {
        if (!env.ISSUE_DB) {
          throw new Error('Database binding not available');
        }
        
        const { results } = await env.ISSUE_DB.prepare(query).bind(...params).all();
        
        if (!results || results.length === 0) {
          return new Response(JSON.stringify([]), {
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
        
        // Transform results to match frontend format
        const issues = results.map(row => ({
          id: row.id,
          title: row.title,
          cluster: row.cluster,
          rc: row.rc,
          sentiment: row.sentiment,
          impact: row.impact,
          rival: row.rival,
          metrics: {
            cloudflare: {
              dx: row.metrics_cloudflare_dx,
              reliability: row.metrics_cloudflare_reliability,
              ecosystem: row.metrics_cloudflare_ecosystem
            },
            rival: {
              dx: row.metrics_rival_dx,
              reliability: row.metrics_rival_reliability,
              ecosystem: row.metrics_rival_ecosystem
            }
          },
          dependsOn: JSON.parse(row.depends_on || '[]')
        }));
        
        return new Response(JSON.stringify(issues), {
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }
    
    if (pathname === '/api/summary') {
      try {
        // Get all issues for AI analysis
        if (!env.ISSUE_DB) {
          throw new Error('Database binding not available');
        }
        
        const { results } = await env.ISSUE_DB.prepare('SELECT * FROM issues').all();
        
        if (!results || results.length === 0) {
          return new Response(JSON.stringify({
            globalSentiment: '0% Critical',
            topPain: 'No issues found',
            liftPotential: 0
          }), {
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
        
        // Count sentiment distribution
        const sentimentCounts = { 'Critical/Angry': 0, 'Frustrated': 0, 'Annoyed': 0 };
        results.forEach(row => {
          const sentiment = row.sentiment;
          if (sentimentCounts[sentiment] !== undefined) {
            sentimentCounts[sentiment]++;
          }
        });
        
        const total = results.length;
        const criticalPercent = ((sentimentCounts['Critical/Angry'] / total) * 100).toFixed(0);
        
        // Prepare issues text for AI analysis
        const issuesText = results.slice(0, 50).map(row => 
          `${row.title} (${row.sentiment}, ${row.impact})`
        ).join('\n');
        
        // Use Workers AI to analyze issues and generate insights
        const prompt = `Analyze these developer experience (DX) issues from a product management perspective. Consider sentiment distribution, impact severity, and potential improvements. Output ONLY valid JSON with no markdown or code blocks. Format: {"globalSentiment": "string describing overall sentiment", "topPain": "string describing the most impactful pain point", "liftPotential": number between 0-100 representing potential sentiment improvement if top issues are resolved}`;
        
        try {
          if (!env.AI) {
            throw new Error('Workers AI binding not available');
          }
          
          console.log('Calling Workers AI for sentiment analysis...');
          const aiResponse = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
            messages: [
              {
                role: 'system',
                content: 'You are a product manager analyzing developer experience issues. Always respond with valid JSON only, no markdown, no code blocks. Format your response as: {"globalSentiment": "string", "topPain": "string", "liftPotential": number}'
              },
              {
                role: 'user',
                content: prompt + '\n\nSample issues:\n' + issuesText + `\n\nSentiment distribution: Critical/Angry: ${sentimentCounts['Critical/Angry']}, Frustrated: ${sentimentCounts['Frustrated']}, Annoyed: ${sentimentCounts['Annoyed']}`
              }
            ]
          });
          
          console.log('Workers AI response received');
          
          let aiJson;
          if (typeof aiResponse.response === 'string') {
            // Try to extract JSON from response
            const jsonMatch = aiResponse.response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              aiJson = JSON.parse(jsonMatch[0]);
            } else {
              aiJson = JSON.parse(aiResponse.response);
            }
          } else {
            aiJson = aiResponse.response;
          }
          
          // Ensure required fields with fallbacks
          const summary = {
            globalSentiment: aiJson.globalSentiment || `${criticalPercent}% Critical`,
            topPain: aiJson.topPain || 'Multiple DX friction points identified',
            liftPotential: typeof aiJson.liftPotential === 'number' ? aiJson.liftPotential : Math.round(100 - criticalPercent)
          };
          
          return new Response(JSON.stringify(summary), {
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        } catch (aiError) {
          console.error('AI Error:', aiError);
          // Fallback if AI fails - use calculated values
          const topImpact = results.filter(r => r.impact === 'Wall').length;
          const topPain = topImpact > total / 2 
            ? 'Critical blocking issues (Walls) preventing developer productivity'
            : 'Mixed friction points with some blocking issues';
          
          // Calculate lift potential based on resolving critical issues
          const criticalIssues = results.filter(r => r.sentiment === 'Critical/Angry').length;
          const calculatedLift = Math.round((criticalIssues / total) * 100);
          
          return new Response(JSON.stringify({
            globalSentiment: `${criticalPercent}% Critical`,
            topPain: topPain,
            liftPotential: calculatedLift
          }), {
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          });
        }
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }
    
    // Serve static assets via ASSETS binding
    // GET / → returns public/index.html
    // GET /* → serves public/ files
    return env.ASSETS.fetch(request);
  },
};
