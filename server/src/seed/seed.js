// src/seed/seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Topic = require("../models/Topic");
const User = require("../models/User");

async function seed() {
  const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/aiConcepts";
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("✔ Connected to MongoDB");

  // ===== Clear existing data =====
  console.log("🗑 Deleting old topics and users...");
  await Topic.deleteMany({});
  await User.deleteMany({});
  console.log("✔ Old data removed");

  // ===== Helper: Unsplash "source" queries (keeps images varied & permissive) =====
  // These URLs return a suitable photo for the given keyword.
  const img = (q, w = 1200, h = 675) => `https://source.unsplash.com/${w}x${h}/?${encodeURIComponent(q)}`;

  // ===== Four friendly beginner topics (each 400-500 words approx combined across text blocks) =====
const topics = [
  // 1. What Is Artificial Intelligence?
  {
    title: "What Is Artificial Intelligence?",
    image: "https://axenehp.com/wp-content/uploads/2019/02/20190225_header-1200x764.jpg",
    content: [
      {
        type: "text",
        value: `Artificial Intelligence (AI) may sound complicated, but the idea is simple: it's technology that learns from experience, a bit like people do. AI pays attention to patterns, remembers them, and uses that knowledge to help you.` 
      },
      {
        type: "text",
        value: `Think about your phone suggesting the next word while you type. It doesn't “know” what you're thinking—it has simply noticed that certain words often follow others. It learns your habits quietly in the background.` 
      },
      {
        type: "image",
        value: "https://assets.st-note.com/production/uploads/images/146405990/rectangle_large_type_2_6ded4e638eeae9f0bd3ce590d0e673a0.png?width=1280"
      },
      {
        type: "text",
        value: `Imagine AI as a friendly helper at the supermarket. After seeing what you usually buy, the helper might say, “Hey, you often get apples—want some today?” AI works the same way by noticing patterns and offering helpful suggestions.` 
      },
      {
        type: "text",
        value: `AI is not a robot that thinks like a person. It's more like a super-fast pattern spotter. It helps doctors notice problems early, it helps drivers with smart maps, and it even helps block spam messages from reaching your inbox.` 
      },
      {
        type: "image",
        value: "https://opencv.org/wp-content/uploads/2023/09/AI-Application-1920x1080-01.jpg"
      },
      {
        type: "text",
        value: `As long as you think of AI as a tool that learns from examples, it becomes much less mysterious. It’s simply technology that tries to help by learning from the past.` 
      }
    ],
    questions: [
      { text: "AI is mostly about:", options: ["Spotting patterns", "Magic tricks", "Human emotions"], answer: 0 },
      { text: "Your phone suggesting words while typing is an example of:", options: ["AI", "Cooking", "Weather"], answer: 0 },
      { text: "AI becomes helpful by:", options: ["Learning from examples", "Sleeping", "Guessing randomly"], answer: 0 }
    ]
  },

  // 2. Understanding Machine Learning
  {
    title: "Understanding Machine Learning",
    image: "https://miro.medium.com/v2/resize:fit:1358/1*cG6U1qstYDijh9bPL42e-Q.jpeg",
    content: [
      {
        type: "text",
        value: `Machine Learning is a simple idea: instead of giving a computer strict instructions, we show it lots of examples and let it learn from them—just like teaching someone using pictures instead of words.` 
      },
      {
        type: "text",
        value: `Imagine teaching a child the difference between a cat and a dog. You don’t explain every detail. You simply show many photos. Over time, the child starts recognizing them. Machine Learning learns in the same friendly, example-based way.` 
      },
      {
        type: "image",
        value: "https://blog.pooripadhai.com/wp-content/uploads/2021/01/Artificial-Intelligence-1024x576.png"
      },
      {
        type: "text",
        value: `Here’s a simple story: A bakery owner wants a machine to spot which cupcakes are perfectly baked. Instead of writing rules, she takes many pictures—some labeled “ready,” some labeled “not ready.” The machine studies the photos and learns the difference. Soon, it helps her staff save time.` 
      },
      {
        type: "text",
        value: `Machine Learning is behind things like predicting delivery times, suggesting music, or spotting unusual payments on a card. Anytime technology learns from examples, Machine Learning is at work.` 
      },
      {
        type: "image",
        value: "https://cdn.educba.com/academy/wp-content/uploads/2019/10/Applications-of-Machine-Learning-2.jpg"
      }
    ],
    questions: [
      { text: "Machine Learning learns from:", options: ["Examples", "Magic", "Daydreaming"], answer: 0 },
      { text: "A real-life use of ML is:", options: ["Recommending songs", "Boiling pasta", "Folding clothes"], answer: 0 },
      { text: "Teaching a machine with pictures is similar to teaching a:", options: ["Child", "Tree", "Clock"], answer: 0 }
    ]
  },

  // 3. Neural Networks Made Simple
  {
    title: "Neural Networks Made Simple",
    image: "https://wallpapercave.com/wp/wp6691041.jpg",
    content: [
      {
        type: "text",
        value: `A neural network is a way for a computer to learn by combining many small, simple decisions. Instead of one big brain, imagine a group of tiny helpers working together.` 
      },
      {
        type: "text",
        value: `Picture you and your friends trying to guess an object. One friend focuses on color, another on shape, another on size. You combine all your clues and figure out the answer. A neural network works in this friendly group style.` 
      },
      {
        type: "image",
        value: "https://ambolt.io/wp-content/uploads/classification-object-detection.png"
      },
      {
        type: "text",
        value: `Neural networks are great at recognizing things—like faces in photos, handwriting on paper, or spoken words on your phone. They don’t “understand” like humans do—they simply learn from many examples until they get good at spotting patterns.` 
      },
      {
        type: "text",
        value: `Think of them as layers of tiny helpers. The first layer notices simple details, the next layer combines them, and deeper layers understand more complete things. It’s teamwork that builds up to a smart result.` 
      },
      {
        type: "image",
        value: "https://www.researchgate.net/publication/325831461/figure/fig2/AS:639036561567745@1529369597778/A-3-layer-neural-network-with-three-inputs-two-hidden-layers-consisting-of-four-neurons.png"
      }
    ],
    questions: [
      { text: "Neural networks work like:", options: ["A team helping each other", "A single giant brain", "A calculator"], answer: 0 },
      { text: "They are great at:", options: ["Recognizing patterns", "Washing dishes", "Running fast"], answer: 0 },
      { text: "Neural networks improve by:", options: ["Looking at many examples", "Guessing wildly", "Sleeping"], answer: 0 }
    ]
  },

  // 4. Deep Learning Explained Simply
  {
    title: "Deep Learning Explained Simply",
    image: "https://miro.medium.com/v2/resize:fit:1018/1*I5O6NX_DIKYI1VBuLfX77Q.jpeg",
    content: [
      {
        type: "text",
        value: `Deep Learning is like a bigger, more powerful version of the neural networks you just learned about. It uses many layers of helpers, each learning tiny pieces of information until the whole picture becomes clear.` 
      },
      {
        type: "text",
        value: `Imagine showing a system thousands of animal photos. Early layers notice simple things like edges. Middle layers notice shapes like ears or tails. The deepest layers recognize the entire animal—even if the lighting is bad or the angle is unusual.` 
      },
      {
        type: "image",
        value: "https://nearlearn.com/blog/wp-content/uploads/2019/11/Deep-Learning-Training.png"
      },
      {
        type: "text",
        value: `Deep Learning powers everyday tools: voice assistants, photo apps that group people, and translation apps that help you read signs in other languages. It’s not magic—it’s just many small steps stacked together.` 
      },
      {
        type: "text",
        value: `Deep Learning works best with lots of examples. The more it sees, the better it gets. That’s why it’s widely used in areas like health, transportation, and communication.` 
      },
      {
        type: "image",
        value: "https://1.bp.blogspot.com/-sjURiPRd9Bk/YTXG2k8In1I/AAAAAAAAATQ/g3e3_pvGc2wHNsQL--2mbCfIjlOrYNWSQCLcBGAsYHQ/w1200-h630-p-k-no-nu/thumb-22.png"
      }
    ],
    questions: [
      { text: "Deep Learning uses:", options: ["Many layers of learning", "One tiny step", "Random guessing"], answer: 0 },
      { text: "It is great at recognizing:", options: ["Complex patterns", "Food flavors", "Furniture prices"], answer: 0 },
      { text: "A common Deep Learning tool is:", options: ["Voice assistants", "Brooms", "Old radios"], answer: 0 }
    ]
  }
];




  // ===== Insert topics =====
  console.log("📥 Inserting new topics...");
  await Topic.insertMany(topics);
  console.log("✔ Topics inserted");

  // ===== Create a demo user (hashed password) =====
  const demoEmail = "test@gmail.com";
  const plainPassword = "test123";
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(plainPassword, salt);
const passwordHash = await bcrypt.hash(plainPassword, 10);
  const demoUser = new User({
    email: demoEmail,
    passwordHash,
    completed: []
  });

  await demoUser.save();
  console.log(`✔ Demo user created: ${demoEmail} / ${plainPassword}`);

  console.log("🎉 Seed completed successfully!");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => {
  console.error("Seed error", err);
  process.exit(1);
});
