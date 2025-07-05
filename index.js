import express from "express"
import bodyParser from "body-parser"
import { startSession, answerSession, cancelAnswer } from "./akinator/api.js"

const app = express()
app.use(bodyParser.json())

app.post("/start", async (req, res) => {
  const { uid } = req.body
  if (!uid) return res.status(400).json({ error: "يرجى إرسال uid" })

  try {
    const aki = await startSession(uid)
    res.json({ السؤال: aki.question })
  } catch (err) {
    res.status(500).json({ خطأ: err.message })
  }
})

app.post("/answer", async (req, res) => {
  const { uid, answer } = req.body
  try {
    const aki = await answerSession(uid, answer)
    if (aki.isWin) {
      res.json({
        فوز: true,
        الاسم: aki.suggestion.name,
        الوصف: aki.suggestion.description,
        الصورة: aki.suggestion.photo
      })
    } else {
      res.json({
        فوز: false,
        السؤال: aki.question,
        المرحلة: aki.step,
        التقدم: aki.progress
      })
    }
  } catch (err) {
    res.status(500).json({ خطأ: err.message })
  }
})

app.post("/cancel", async (req, res) => {
  const { uid } = req.body
  try {
    const aki = await cancelAnswer(uid)
    res.json({ السؤال: aki.question })
  } catch (err) {
    res.status(500).json({ خطأ: err.message })
  }
})

app.get("/", (req, res) => {
  res.send("🚀 واجهة أكيناتور API العربية تعمل الآن!")
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`🚀 API تعمل على المنفذ ${port}`)
})