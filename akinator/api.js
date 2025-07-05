import Akinator from "@aqul/akinator-api"
const sessions = new Map()

export const startSession = async (uid) => {
  const aki = new Akinator("ar") // اللغة العربية
  await aki.start()
  sessions.set(uid, aki)
  return aki
}

export const answerSession = async (uid, answerIndex) => {
  const aki = sessions.get(uid)
  if (!aki) throw new Error("الجلسة غير موجودة")
  await aki.answer(answerIndex)
  return aki
}

export const cancelAnswer = async (uid) => {
  const aki = sessions.get(uid)
  if (!aki) throw new Error("الجلسة غير موجودة")
  await aki.back()
  return aki
}