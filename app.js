const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}`, { useNewUrlParser: true }, () =>
  console.log('CONNECTED TO DB'),
);

const PostSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    slug: String,
    banner: String,
  },
  { timestamps: true, versionKey: false },
);

const NFTSchema = new mongoose.Schema(
  {
    name: String,
    imageUrl: String,
    collectionName: String,
    collectionSupply: Number,
    openseaLink: String,
    traits: String,
  },
  { timestamps: true, versionKey: false },
);

const Post = mongoose.model('Post', PostSchema);
const NFT = mongoose.model('NFT', NFTSchema);

const router = express.Router();
router.post('/post', async (req, res) => {
  const post = await Post.create(req.body);
  return res.status(200).json({ post });
});

router.get('/post', async (req, res) => {
  const post = await Post.findOne({ slug: req.query.slug });
  return res.status(200).json({ post });
});

router.get('/posts', async (req, res) => {
  const posts = await Post.find();
  return res.status(200).json({ posts });
});

router.get('/nfts', async (req, res) => {
  const nfts = await NFT.find();
  return res.status(200).json({ nfts });
});

app.use('/api', router);

module.exports = app;
