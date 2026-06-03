import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// In-memory data store for the session to prevent complex setups
const leads: any[] = [];
const searchHistories: Record<string, string[]> = {};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Endpoint: Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // API Endpoint: Get search history for a user session
  app.get('/api/search-history', (req, res) => {
    const userEmail = (req.query.email as string) || 'anonymous';
    const history = searchHistories[userEmail] || [];
    res.json({ history });
  });

  // API Endpoint: Add search history
  app.post('/api/search-history', (req, res) => {
    const { email, term } = req.body;
    const userEmail = email || 'anonymous';
    if (!term || term.trim() === '') {
      res.status(400).json({ error: 'Term is required' });
      return;
    }

    if (!searchHistories[userEmail]) {
      searchHistories[userEmail] = [];
    }

    // De-duplicate and keep current searches limited to top 10
    searchHistories[userEmail] = [
      term,
      ...searchHistories[userEmail].filter(t => t !== term)
    ].slice(0, 10);

    res.json({ success: true, history: searchHistories[userEmail] });
  });

  // API Endpoint: Clear search history
  app.post('/api/search-history/clear', (req, res) => {
    const userEmail = (req.body.email as string) || 'anonymous';
    searchHistories[userEmail] = [];
    res.json({ success: true, history: [] });
  });

  // API Endpoint: Capture Lead and Simulate Email Notification Trigger
  app.post('/api/inquiries', (req, res) => {
    const { name, email, phone, projectSlug, message } = req.body;

    // Strict Validation
    if (!name || name.trim().length === 0) {
      res.status(400).json({ error: 'Full Name is required and cannot be empty.' });
      return;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      res.status(400).json({ error: 'A valid email address is required.' });
      return;
    }
    if (!phone || phone.trim().length < 10) {
      res.status(400).json({ error: 'A valid 10-digit phone number is required.' });
      return;
    }
    if (!projectSlug) {
      res.status(400).json({ error: 'Target project selection is required.' });
      return;
    }

    const newInquiry = {
      id: `lead_${Date.now()}`,
      name,
      email,
      phone,
      projectSlug,
      message: message || 'Interested in booking a premium site visit.',
      dateCreated: new Date().toISOString()
    };

    leads.push(newInquiry);

    // Simulated Automated Email Notification Logging
    const simulatedEmailUser = `
=============================================
4 PILLARS REALTY - AUTOMATED EMAIL NOTIFICATION
To: ${email}
Subject: Confirmed: Site Visit Request - 4 Pillars Realty, Nagpur
Body:
Dear ${name},

Thank you for choosing 4 Pillars Realty, Nagpur. We are excited to support your property ownership journey!

We have successfully registered your inquiry regarding: "${projectSlug.toUpperCase().replace(/-/g, ' ')}".

Core Inquiry Summary:
- Project: ${projectSlug}
- Contact Phone: ${phone}
- Message Submitted: "${message || 'Interested in booking a premium site visit.'}"

Our Senior Advisor Group will call you within 2 hours to coordinate VIP private transport directly to the site location from our Besa Round Office.

Warm Regards,
Inquiry Desk,
4 Pillars Realty, Nagpur
Plot No. 52-71, Gouri Meadows II, Besa
=============================================
`;

    const simulatedEmailAdmin = `
=============================================
4 PILLARS REALTY - SALES DISPATCH RECORD
To: sales@4pillarsrealty.com
Subject: NEW HIGH-CONVERTING LEAD - ${name} is interested in ${projectSlug}
Body:
Attention Sales Group,

A new verified lead has been captured online and logged into the Lead Engine:
- Prospect Name: ${name}
- Email: ${email}
- Contact Phone: ${phone}
- Target Project: ${projectSlug}
- Personal Note: ${message || 'Standard site visit request.'}

Please assign an executive within the Besa Corporate office immediately.
=============================================
`;

    console.log(simulatedEmailUser);
    console.log(simulatedEmailAdmin);

    res.status(201).json({
      success: true,
      message: 'Inquiry compiled successfully. An automated confirmation email has been dispatched.',
      inquiry: newInquiry,
      debugNotificationSms: `SMS alert fired to +91 ${phone}`,
      simulatedEmailUserText: simulatedEmailUser,
    });
  });

  // OAuth Mock Flow Trigger Endpoint
  app.get('/auth/popup', (req, res) => {
    const provider = req.query.provider || 'Google';
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Secure Identity Provider SSO - 4 Pillars</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: #0f172a;
              color: white;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              text-align: center;
            }
            .card {
              background: #1e293b;
              padding: 40px;
              border-radius: 12px;
              border: 1px solid #334155;
              box-shadow: 0 10px 25px rgba(0,0,0,0.5);
              width: 320px;
            }
            .logo {
              font-weight: bold;
              font-size: 24px;
              color: #38bdf8;
              margin-bottom: 20px;
            }
            .button {
              background: #003B72;
              color: white;
              border: none;
              padding: 12px 24px;
              font-size: 14px;
              font-weight: 600;
              border-radius: 6px;
              cursor: pointer;
              transition: all 0.2s;
              width: 100%;
              margin-top: 15px;
            }
            .button:hover {
              background: #1a67a4;
            }
            .indicator {
              font-size: 12px;
              color: #94a3b8;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="logo">4 Pillars Portal</div>
            <h2>Verify Account</h2>
            <p style="font-size: 14px; color: #cbd5e1;">Sign in with absolute safety using ${provider} authentication context</p>
            <button class="button" onclick="login()">Approve ${provider} Credentials</button>
            <div class="indicator">OAuth token matches secured AI Studio frame callbacks</div>
          </div>

          <script>
            function login() {
              // Simulating successful identity validation session
              const successData = {
                type: 'OAUTH_AUTH_SUCCESS',
                user: {
                  name: 'Verified Guest Customer',
                  email: 'guest@aistudio-client.com',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                  isLoggedIn: true
                }
              };
              if (window.opener) {
                window.opener.postMessage(successData, '*');
                window.close();
              } else {
                document.body.innerHTML = '<h2>Success! This box can now be dismissed</h2>';
              }
            }
          </script>
        </body>
      </html>
    `);
  });

  // Vite middleware setup or asset routing
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Express Backend] Listening exclusively on PORT ${PORT}`);
  });
}

startServer();
