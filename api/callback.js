export default async function handler(req, res) {
    const { code } = req.query;
  
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.OAUTH_CLIENT_ID,
        client_secret: process.env.OAUTH_CLIENT_SECRET,
        code,
      }),
    });
  
    const data = await response.json();
    const token = data.access_token;
  
    if (!token) {
      res.status(401).send("Auth failed - no token returned");
      return;
    }
  
    res.setHeader("Content-Type", "text/html");
    res.send(`
      <!DOCTYPE html>
      <html>
      <body>
      <script>
        window.opener.postMessage(
          'authorization:github:${token}',
          window.location.origin
        );
        window.close();
      </script>
      </body>
      </html>
    `);
  }