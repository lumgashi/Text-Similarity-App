<body>
    <h1>Text Similarity App</h1>
    <p>An AI-based application to compute text similarity using embeddings, built with React, Node.js, FastAPI, and MongoDB.</p>
    <h2>Overview</h2>
    <p>This project calculates the similarity between two text inputs using FastText embeddings (or GloVe for faster inference). It features:</p>
    <ul>
        <li><b>Frontend</b>: React app for user input and result display.</li>
        <li><b>Node.js Backend</b>: Handles requests, stores results in MongoDB, and communicates with the Python backend.</li>
        <li><b>Python Backend</b>: Computes similarity scores using FastText or GloVe embeddings.</li>
        <li><b>MongoDB</b>: Stores comparison history.</li>
    </ul>
    <h2>Project Structure</h2>
    <h2>Prerequisites</h2>
    <ul>
        <li><a href="https://docker.com">Docker</a> and <a href="https://docs.docker.com/compose/">Docker Compose</a></li>
         <li>
   FastText model, a pre-trained model (<code>cc.en.300.bin</code>), make sure
   to have such file and place in the root of the python-backend, in case your
   pre-trained model has been named diffrently from <code>cc.en.300.bin</code>,
   then make sure to rename the model inside the main.py{" "}
   <code>model = fasttext.load_model('your-pre-trained-model-name')</code>{" "}
 </li>
        <li><b>IMPORTANT : it might take 1-2 minutes for the pre-model to load after the container is built/started, so if a request is made within these minutes, it wont go through</b></li>
    </ul>
    <h2>Setup</h2>
    <h3>1. Clone the Repository</h3>
    <pre><code>git clone https://github.com/lumgashi/Text-Similarity-App.git
cd Text-Similarity-App</code></pre>
  <h3>2. Prepare the Model</h3>
    <p>Get FastText model:</p>
    <pre><code>https://www.kaggle.com/datasets/sanyatargrenkin/cc-en-300-bin</code></pre>
    <h3>3. Start Backend Services</h3>
    <pre><code>docker-compose up --build</code></pre>
    <p>This starts <code>backend-node</code> (port 3001), <code>backend-python</code> (port 8000), and <code>mongo</code> (port 27017).</p>
 <h3>4. Run the Frontend</h3>
    <pre><code>cd client
npm install
npm start</code></pre>
    <p>Opens at <code>http://localhost:3000</code>.</p>
    <h2>Usage</h2>
    <ol>
        <li>Open <code>http://localhost:3000</code> in your browser.</li>
        <li>Enter two text inputs (e.g., "Hello world" and "Hi globe").</li>
        <li>Click "Compare" to see the similarity score.</li>
    </ol>
    <p>Alternatively, use an API call:</p>
    <pre><code>curl -X POST "http://localhost:3001/compare" \
-H "Content-Type: application/json" \
-d '{"text1": "Hello world", "text2": "Hi globe"}'</code></pre>
    <p>Expected response: <code>{"similarityScore": 0.85}</code></p>
    <h2>Deployment</h2>
    <h3>Local Docker Deployment</h3>
    <p>Already achieved with <code>docker-compose up --build</code>. Services are deployed locally and accessible via localhost.</p>
</body>
    <p>Feel free to fork this project, submit issues, or send pull requests!</p>

    <h2>License</h2>
    <p>MIT License - see <a href="#">LICENSE</a> file (add if needed).</p>
</body>
