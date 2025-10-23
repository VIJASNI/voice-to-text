export default function handler(req, res) {
  res.status(200).json({ transcribedText: 'Hello from your backend!' });
}
