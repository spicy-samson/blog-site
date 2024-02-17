// server.js
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_API_KEY);

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Example route to fetch blog posts
app.get('/blog_posts', async (req, res) => {
  try {
    const { data, error } = await supabase.from('posts').select('*');

    if (error) {
      console.error('Error fetching data:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
;
