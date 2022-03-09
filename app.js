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

router.post('/add-nft', async (req, res) => {
  const nft = await NFT.create({
    imageUrl:
      'https://lh3.googleusercontent.com/W_Qm1jEp6LZHm19CSJOKi-P-kZoPXb3nnyAOQsKsblU0D345ZuURZQRvn0hb9PvmrsMZ1Nrot_tCMiF_acFpiQtgmiz9a7GIyYH0',
    name: 'Ninja Mfer #4175',
    collectionName: 'Ninja mfers Official',
    openseaLink: 'https://opensea.io/assets/0xfb3cf61a46a565fb1622ec5f9d42d98ff7f762aa/4175',
    traits: JSON.stringify([
      {
        type: 'Background',
        value: 'Blue',
        count: 626,
      },
      {
        type: 'Face',
        value: 'Foolish',
        count: 58,
      },
      {
        type: 'Gender',
        value: 'Female',
        count: 427,
      },
      {
        type: 'Weapon',
        value: 'Wings',
        count: 427,
      },
      {
        type: 'Body',
        value: 'Coveralls',
        count: 59,
      },
      {
        type: 'Hat',
        value: 'Bird Nest',
        count: 64,
      },
    ]),
    collectionSupply: 4444,
  });
  return res.status(200).json({ nft });
});

app.use('/api', router);

module.exports = app;
