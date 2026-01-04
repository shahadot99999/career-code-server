
// const express = require('express')
// const cors = require('cors')
// const app = express();
// const jwt = require('jsonwebtoken');
// const cookieParser= require('cookie-parser');



// const port = process.env.PORT || 3000;
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require('dotenv').config()

// //middleware
// //app.use(cors());


// // app.use(cors({
// //   origin: 'http://localhost:5173', // or whatever your frontend port is
// //   credentials: true
// // }));

// // Middleware - Update CORS for Vercel
// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'https://career-code-client.vercel.app', // Add your frontend Vercel URL
//     // Add other origins as needed
//   ],
//   credentials: true
// }));

// app.use(express.json());
// app.use(cookieParser());

// //admin site
// // var admin = require("firebase-admin");
// // var serviceAccount = require("../firebase-admin-key.json");
// // admin.initializeApp({
// //   credential: admin.credential.cert(serviceAccount)
// // });

// var admin = require("firebase-admin");
// // Try both approaches - Vercel environment variables AND file
// let serviceAccount;

// // Approach 1: Try environment variables first (for Vercel)
// if (process.env.FIREBASE_PRIVATE_KEY) {
//   console.log("Using Firebase environment variables (Vercel)");
//   serviceAccount = {
//     type: process.env.FIREBASE_TYPE || "service_account",
//     project_id: process.env.FIREBASE_PROJECT_ID,
//     private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//     private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     client_id: process.env.FIREBASE_CLIENT_ID,
//     auth_uri: process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
//     token_uri: process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
//     auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
//     client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
//     universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN || "googleapis.com"
//   };
// } 
// // Approach 2: Fallback to JSON file (for local development)
// else {
//   try {
//     console.log("Using Firebase JSON file (local)");
//     serviceAccount = require("../firebase-admin-key.json");
//   } catch (error) {
//     console.warn("Firebase Admin SDK not initialized - missing credentials");
//     serviceAccount = null;
//   }
// }

// // Initialize only if we have credentials
// if (serviceAccount && serviceAccount.private_key) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });
//   console.log("Firebase Admin SDK initialized successfully");
// }




// const logger = (req, res, next)=>{
//   //console.log('Inside the logger middleware');
//   next();
// }

// const verifyToken = (req, res, next)=>{
//   const token = req?.cookies?.token;
//   //console.log('cookie in the middleware', token);

//   if(!token){
//     return res.status(401).send({message: 'unauthorized access'})
//   }

//   //verfiy token
//   jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded)=>{
//     if(err){
//       return res.status(401).send({message: 'unauthorized access'})
//     }
//     req.decoded= decoded;
//     next();
//     //console.log(decoded);
//   })
  
  
// }


// const verifyFirebaseToken = async(req, res, next)=>{
//   // const authHeader = req.headers?.authorization;
//   // const token = authHeader.split(' ')[1];
//   // if(!token){
//   //   return res.status(401).send({message: 'unauthorized access'})
//   // }
//   // const userInfo = await admin.auth().verifyIdToken(token)
//   // //console.log('Inside the token', userInfo);
//   // req.tokenEmail = userInfo.email;
//   // next();
//   const authHeader = req.headers?.authorization;
//   if(!authHeader || !authHeader.startsWith('Bearer')){
//     return res.status(401).send({message: 'unauthorized access'})
//   }
//   const token = authHeader.split(' ')[1];
  
//   try{
//      const decoded = await admin.auth().verifyIdToken(token);
//      //console.log('decoded token', decoded);
//      req.decoded= decoded;
//      next();
//   }
//   catch(error){
//     return res.status(401).send({ message: 'unauthorized access'})
//   }
  
  
// }


// //Mongodb
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wr5mswb.mongodb.net/?appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// const verifyTokenEmail=(req, res, next)=>{
//    if(req.query.email !== req.decoded.email){
//         return res.status(403).send({message: 'forbidden access'})
//       }
//       next();

// }

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     const jobsCollection = client.db('careerCode').collection('jobs');

//     const applicationsCollection = client.db('careerCode').collection('applications');
    
//     //jwt token related api
//     app.post('/jwt', async(req, res)=>{
//       // const { email } = req.body;
//       // const user = { email };
//       const userData = req.body;
//       //const token = jwt.sign(user, 'secret', { expiresIn: '1h'});
//        const token = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d'});

//        //set token in the cookies
//        res.cookie('token', token,{
//         httpOnly: true,
//         secure: false
//        })
//       //res.send({token})
//       res.send({success : true})
//     })

   
    

//     //jobs api
//     // app.get('/jobs', async (req, res)=>{

//     //   const email = req.query.email;
//     //   const query = {};
//     //   if(email){
//     //     query.hr_email = email;
//     //   }

//     //   const cursor = jobsCollection.find(query);
//     //   const result = await cursor.toArray();
//     //   res.send(result);
//     // })
//     // Add this route - it should go with your other job routes
//     app.get('/jobs', async (req, res) => {
      
      
//       try {
//         const email = req.query.email;
//         const query = {};

//         if (email) {
//           query.hr_email = email;
//         }

//         const cursor = jobsCollection.find(query);
//         const result = await cursor.toArray();
//         res.send(result);
//       } catch (error) {
//         console.error('Error fetching jobs:', error);
//         res.status(500).send({ error: 'Failed to fetch jobs' });
//       }
//     });

//     app.get('/jobs/applications', verifyFirebaseToken, verifyTokenEmail, async(req, res)=>{
//       const email = req.query.email;

//       //something add
//       // if(req.tokenEmail !=email){
//       //   return res.status(403).send({message: 'forbidden access'})
//       // }

//       //something new add
//       // if(email !== req.decoded.email){
//       //   return res.status(403).send({message: 'forbidden access'})
//       // }

//       const query= { hr_email: email };
//       const jobs = await jobsCollection.find(query).toArray();

//       //should use aggregate to have optimum data fetching
//       for(const job of jobs){
//         const applicationQuery = { jobId: job._id.toString() }
//         const application_count = await applicationsCollection.countDocuments(applicationQuery)
//         job.application_count = application_count;

//       }
//       res.send(jobs);

//     })

//     //jobs particular id
//     app.get('/jobs/:id', async (req, res)=>{
//       const id = req.params.id;
//       const query = {_id: new ObjectId(id)}
//       const result = await jobsCollection.findOne(query);
//       res.send(result);
//     })

//     //hr post any data to show in data base
//     app.post('/jobs', async(req, res)=>{
//       const newJob = req.body;
//       const result = await jobsCollection.insertOne(newJob);
//       res.send(result);
//     })

    

//     //could be done
//     // app.get('/jobsByEmailAddress', async(req, res)=>{
//     //   const email = req.query.email;
//     //   const query = {hr_email: email}
//     // })

//     //job applicant item show..how many items apply
//     //app.get('/applications', logger, verifyToken, verifyFirebaseToken, verifyTokenEmail, async(req, res)=>{
//     app.get('/applications', logger,  verifyFirebaseToken, verifyTokenEmail, async(req, res)=>{
//       const email = req.query.email;    
      
//       //console.log('req headers', req.headers);

//       //console.log('inside applications api', req.cookies);
//       // if(req.tokenEmail !=email){
//       //   return res.status(403).send({message: 'forbidden access'})
//       // }

//       // if(email !== req.decoded.email){
//       //   return res.status(403).send({message: 'forbidden access'})
//       // }
      
//       const query={
//         applicant: email
//       }
//       const result = await applicationsCollection.find(query).toArray()

//       //bad way to aggregate data
//       for(const application of result){
//         const jobId = application.jobId;
//         const jobQuery = {_id: new ObjectId(jobId)}
//         const job = await jobsCollection.findOne(jobQuery);
//         application.company = job.company
//         application.title = job.title
//         application.company_logo = job.company_logo
//       }
      
//       res.send(result);
//     })

//     //application data are show
//     app.get('/applications/job/:job_id', async (req, res) => {
//       const job_id = req.params.job_id;
//       const query = { jobId: job_id }
//       const result = await applicationsCollection.find(query).toArray();
//       res.send(result);
//     })
   



//     //job applications related appi
//     app.post('/applications', async(req, res)=>{
//       const application = req.body;
//       console.log('Received:', application); // add this line
//       const result = await applicationsCollection.insertOne(application);
//       res.send(result);
//     })

//     app.patch('/applications/:id', async(req, res)=>{
//       const id = req.params.id;
//       const filter = {_id: new ObjectId(id)}
//       const updatedDoc = {
//         $set:{
//           status: req.body.status
//         }
//       }
//       const result = await applicationsCollection.updateOne(filter, updatedDoc)
//       res.send(result);
//     })



//     // Send a ping to confirm a successful connection
//     //await client.db("admin").command({ ping: 1 });
//     //console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     //await client.close();
//   }
// }
// run().catch(console.dir);


// app.get('/', (req, res) => {
//   res.send('Career Code is Cooking')
// })

// // Health check route - should work on Vercel
// app.get('/health', (req, res) => {
//   res.json({ status: 'ok', time: new Date().toISOString() });
// });

// // Test route to verify routing
// app.get('/test', (req, res) => {
//   res.json({ message: 'Test route works!' });
// });

// //just hide for few times.
// // app.listen(port, () => {
// //   console.log(`Career Code Server is running on port ${port}`)
// // })

// // ========== IMPORTANT: For Vercel deployment ==========
// // Export the app for Vercel
// module.exports = app;

// // For local development
// if (require.main === module) {
//   app.listen(port, () => {
//     console.log(`Career Code Server is running on port ${port}`);
//   });
// }




const express = require('express')
const cors = require('cors')
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

// Middleware - Update CORS for Vercel
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://career-code-client.vercel.app',
    'https://career-code-client.vercel.app/',
    // Add other origins as needed
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(express.json());
app.use(cookieParser());

// Firebase Admin SDK initialization
let admin;
try {
  admin = require("firebase-admin");
  
  // For Vercel - use environment variables
  if (process.env.FIREBASE_PRIVATE_KEY) {
    console.log("Using Firebase environment variables for Vercel");
    
    const serviceAccount = {
      type: process.env.FIREBASE_TYPE || "service_account",
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
      token_uri: process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
      universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN || "googleapis.com"
    };

    // Check if all required fields are present
    if (serviceAccount.private_key && serviceAccount.client_email) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      console.log("Firebase Admin SDK initialized successfully on Vercel");
    } else {
      console.warn("Firebase Admin SDK: Missing required environment variables");
    }
  }
} catch (error) {
  console.warn("Firebase Admin SDK not available:", error.message);
}

const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
}

const verifyToken = (req, res, next) => {
  const token = req?.cookies?.token;
  
  if(!token){
    return res.status(401).json({message: 'unauthorized access - no token'})
  }

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
    if(err){
      return res.status(401).json({message: 'unauthorized access - invalid token'})
    }
    req.decoded = decoded;
    next();
  })
}

const verifyFirebaseToken = async(req, res, next) => {
  if (!admin) {
    return res.status(500).json({ message: 'Firebase Admin SDK not initialized' });
  }
  
  const authHeader = req.headers?.authorization;
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({message: 'unauthorized access - no bearer token'})
  }
  
  const token = authHeader.split(' ')[1];
  
  try{
    const decoded = await admin.auth().verifyIdToken(token);
    req.decoded = decoded;
    next();
  }
  catch(error){
    console.error('Firebase token verification error:', error.message);
    return res.status(401).json({ message: 'unauthorized access - invalid token' })
  }
}

const verifyTokenEmail = (req, res, next) => {
  if(!req.decoded || !req.decoded.email){
    return res.status(401).json({message: 'No email in decoded token'})
  }
  
  if(req.query.email !== req.decoded.email){
    return res.status(403).json({message: 'forbidden access - email mismatch'})
  }
  next();
}

// MongoDB Connection
let client;
let isConnected = false;

async function connectToMongoDB() {
  if (isConnected && client) {
    return client;
  }
  
  const uri = process.env.MONGODB_URI || `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wr5mswb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    
    await client.connect();
    isConnected = true;
    console.log("Successfully connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    isConnected = false;
    throw error;
  }
}

// Initialize MongoDB connection
let db;
let jobsCollection;
let applicationsCollection;

async function initializeDB() {
  try {
    const mongoClient = await connectToMongoDB();
    db = mongoClient.db('careerCode');
    jobsCollection = db.collection('jobs');
    applicationsCollection = db.collection('applications');
    console.log("Database collections initialized");
  } catch (error) {
    console.error("Failed to initialize database:", error);
  }
}

// Initialize database on startup
initializeDB().catch(console.error);

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Career Code Server is Running',
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/health', async (req, res) => {
  try {
    const dbStatus = isConnected ? 'connected' : 'disconnected';
    res.json({ 
      status: 'ok', 
      database: dbStatus,
      time: new Date().toISOString(),
      firebase: admin ? 'initialized' : 'not-initialized'
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error: error.message });
  }
});

// Test route
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Test route works!',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// JWT Token API
app.post('/jwt', async (req, res) => {
  try {
    const userData = req.body;
    const token = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });

    // Set token in cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    });
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Jobs API
app.get('/jobs', async (req, res) => {
  try {
    const email = req.query.email;
    const query = {};

    if (email) {
      query.hr_email = email;
    }

    const cursor = jobsCollection.find(query);
    const result = await cursor.toArray();
    res.json(result);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs', details: error.message });
  }
});

// Jobs by ID
app.get('/jobs/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const result = await jobsCollection.findOne(query);
    
    if (!result) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Failed to fetch job', details: error.message });
  }
});

// Post a new job
app.post('/jobs', async (req, res) => {
  try {
    const newJob = req.body;
    const result = await jobsCollection.insertOne(newJob);
    res.json(result);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Failed to create job', details: error.message });
  }
});

// Applications API
app.get('/applications', logger, verifyFirebaseToken, verifyTokenEmail, async (req, res) => {
  try {
    const email = req.query.email;    
    const query = { applicant: email };
    
    const result = await applicationsCollection.find(query).toArray();

    // Fetch job details for each application
    for(const application of result){
      try {
        const jobId = application.jobId;
        const jobQuery = {_id: new ObjectId(jobId)};
        const job = await jobsCollection.findOne(jobQuery);
        
        if(job) {
          application.company = job.company;
          application.title = job.title;
          application.company_logo = job.company_logo;
        }
      } catch (jobError) {
        console.error(`Error fetching job ${application.jobId}:`, jobError);
      }
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications', details: error.message });
  }
});

// Post application
app.post('/applications', async (req, res) => {
  try {
    const application = req.body;
    const result = await applicationsCollection.insertOne(application);
    res.json(result);
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ error: 'Failed to create application', details: error.message });
  }
});

// Update application status
app.patch('/applications/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)};
    const updatedDoc = {
      $set: { status: req.body.status }
    };
    const result = await applicationsCollection.updateOne(filter, updatedDoc);
    res.json(result);
  } catch (error) {
    console.error('Error updating application:', error);
    res.status(500).json({ error: 'Failed to update application', details: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`
  });
});

// For Vercel deployment
module.exports = app;

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Career Code Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}





