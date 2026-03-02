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
      res.status(401).send("Auth failed");
      return;
    }
  
    const content = JSON.stringify({ token, provider: "github" });
  
    res.setHeader("Content-Type", "text/html");
    res.send(`
      <!DOCTYPE html>
      <html>
      <body>
      <script>
        (function() {
          function receiveMessage(e) {
            console.log("receiveMessage %o", e);
          }
          window.addEventListener("message", receiveMessage, false);
          window.opener.postMessage(
            'authorization:github:success:${content}',
            '*'
          );
          setTimeout(function() {
            window.close();
          }, 1000);
        })();
      </script>
      </body>
      </html>
    `);
  }