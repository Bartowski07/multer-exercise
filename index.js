const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const PORT = 8080;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("public/index.html");
});

app.post("/upload-profile-pic", upload.single("profile_pic"), (req, res) => {
  console.log(req.file);
  res.send("Image Uploaded");

  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "No file received" });
  }

  res.status(200).json({ message: "File uploaded successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
