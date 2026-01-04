
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




// api/index.js - SIMPLIFIED WORKING VERSION
const express = require('express')
const cors = require('cors')
const app = express()

// Basic middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://career-code-client.vercel.app'],
  credentials: true
}))
app.use(express.json())

// IMPORTANT: Remove Firebase and complex auth for now
// We'll get basic routes working first

// SIMPLE TEST ROUTES
app.get('/', (req, res) => {
  res.json({ 
    message: 'Career Code Server is RUNNING!',
    status: 'active',
    timestamp: new Date().toISOString()
  })
})

app.get('/test', (req, res) => {
  res.json({ 
    message: 'Test route works! ✅',
    success: true,
    time: new Date().toISOString()
  })
})

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    server: 'running',
    database: 'not-connected-yet',
    timestamp: new Date().toISOString()
  })
})

// Simple jobs route (mock data - no database)
app.get('/jobs', (req, res) => {
  const mockJobs = [
    {
      _id: '1',
      title: 'Full Stack Developer',
      company: 'Tech Corp',
      location: 'Remote'
    },
    {
      _id: '2', 
      title: 'Frontend Developer',
      company: 'Web Solutions',
      location: 'Dhaka'
    }
  ]
  
  res.json({
    success: true,
    message: 'Using mock data',
    count: mockJobs.length,
    jobs: mockJobs
  })
})

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ error: 'Server error', details: err.message })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.path,
    method: req.method 
  })
})

// Export for Vercel
module.exports = app








