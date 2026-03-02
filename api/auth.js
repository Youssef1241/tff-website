export default function handler(req, res) {
    const params = new URLSearchParams({
      client_id: process.env.OAUTH_CLIENT_ID,
      redirect_uri: `https://${req.headers.host}/api/callback`,
      scope: "repo,user",
      state: Math.random().toString(36).slice(2),
    });
  
    res.redirect(`https://github.com/login/oauth/authorize?${params}`);
  }