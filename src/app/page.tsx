

"use client"

import type React from "react"
import ReactMarkdown from "react-markdown";
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  Hash,
  AtSign,
  Send,
  Github,
  Globe,
  Mail,
  Share2,
  Rss,
} from "lucide-react"

const TONE_OPTIONS = [
  "Professional",
  "Casual",
  "Friendly",
  "Humorous",
  "Inspirational",
  "Formal",
  "Educational",
] as const

type ToneOption = (typeof TONE_OPTIONS)[number]

const FloatingIcon = ({
  children,
  delay = 0,
  duration = 20,
  startX = 0,
  startY = 0,
  moveX = 50,
  moveY = 100,
  color = "text-blue-400",
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  startX?: number
  startY?: number
  moveX?: number
  moveY?: number
  color?: string
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{
      opacity: [0.2, 0.35, 0.2],
      y: [startY, startY - moveY, startY + moveY / 2, startY],
      x: [startX, startX + moveX, startX - moveX / 2, startX],
      rotate: [0, 15, -10, 0],
    }}
    transition={{
      duration,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeInOut",
    }}
    className={`absolute ${color}`}
  >
    {children}
  </motion.div>
)

export default function Page() {
  const [mounted, setMounted] = useState(false)
  const [description, setDescription] = useState("")
  const [platform, setPlatform] = useState("instagram")
  const [tone, setTone] = useState<ToneOption>("Friendly")
  const [wordLimit, setWordLimit] = useState(50)
  const [includeHashtags, setIncludeHashtags] = useState(true)
  const [includeEmoji, setIncludeEmoji] = useState(true)
  const [generatedContent, setGeneratedContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description && !image && platform !== "blog") {
      alert("Please provide a description or upload an image.")
      return
    }

    setLoading(true)
    setGeneratedContent("")

    let imageBase64 = null
    if (image) {
      const reader = new FileReader()
      const base64Promise = new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string)
      })
      reader.readAsDataURL(image)
      imageBase64 = await base64Promise
    }

    const res = await fetch("/api/generate-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description,
        platform,
        tone,
        wordLimit,
        includeHashtags,
        includeEmoji,
        imageBase64,
        cleanOutput: true,
      }),
    })

    const data = await res.json()
    const cleanText = data.content
      .replace(/\n{3,}/g, "\n\n")
      .trim()

    setGeneratedContent(cleanText)
    setLoading(false)
  }

  const handleCopy = async () => {
    if (contentRef.current) {
      const htmlContent = contentRef.current.innerHTML;
      const plainText = contentRef.current.innerText;

      // Use Clipboard API to copy both HTML & plain text
      navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([htmlContent], { type: "text/html" }),
          "text/plain": new Blob([plainText], { type: "text/plain" }),
        }),
      ]);
    // await navigator.clipboard.writeText(generatedContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  } 
  const isImagePlatform =
    platform === "instagram" || platform === "facebook" || platform === "twitter" || platform === "linkedin"
  const isBlogPlatform = platform === "blog"

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-12 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Left side icons */}
      <FloatingIcon delay={0} duration={25} startX={50} startY={100} moveX={150} moveY={120} color="text-pink-500">
        <Instagram className="w-20 h-20" />
      </FloatingIcon>

      <FloatingIcon delay={3} duration={22} startX={80} startY={300} moveX={-120} moveY={100} color="text-[#1877F2]">
        <Facebook className="w-18 h-18" />
      </FloatingIcon>

      <FloatingIcon delay={1.5} duration={28} startX={30} startY={500} moveX={140} moveY={90} color="text-slate-900">
        <Twitter className="w-24 h-24" />
      </FloatingIcon>

      <FloatingIcon delay={4} duration={24} startX={60} startY={200} moveX={-110} moveY={110} color="text-[#0A66C2]">
        <Linkedin className="w-16 h-16" />
      </FloatingIcon>

      <FloatingIcon delay={2} duration={26} startX={40} startY={600} moveX={160} moveY={80} color="text-red-600">
        <Youtube className="w-28 h-28" />
      </FloatingIcon>

      <FloatingIcon delay={5} duration={23} startX={70} startY={400} moveX={-130} moveY={95} color="text-green-500">
        <MessageCircle className="w-18 h-18" />
      </FloatingIcon>

      <FloatingIcon delay={3.5} duration={27} startX={90} startY={150} moveX={120} moveY={105} color="text-blue-500">
        <Hash className="w-22 h-22" />
      </FloatingIcon>

      <FloatingIcon delay={1} duration={29} startX={50} startY={700} moveX={-140} moveY={85} color="text-purple-500">
        <AtSign className="w-18 h-18" />
      </FloatingIcon>

      <FloatingIcon delay={4.5} duration={24} startX={100} startY={350} moveX={135} moveY={100} color="text-[#0088cc]">
        <Send className="w-16 h-16" />
      </FloatingIcon>

      <FloatingIcon delay={2.5} duration={26} startX={45} startY={250} moveX={-125} moveY={115} color="text-slate-800">
        <Github className="w-20 h-20" />
      </FloatingIcon>

      {/* Center-left icons */}
      <FloatingIcon
        delay={1.8}
        duration={25}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.25 : 300}
        startY={120}
        moveX={140}
        moveY={110}
        color="text-pink-500"
      >
        <Instagram className="w-22 h-22" />
      </FloatingIcon>

      <FloatingIcon
        delay={3.2}
        duration={27}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.25 : 300}
        startY={320}
        moveX={-130}
        moveY={95}
        color="text-[#1877F2]"
      >
        <Facebook className="w-20 h-20" />
      </FloatingIcon>

      <FloatingIcon
        delay={0.8}
        duration={24}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.25 : 300}
        startY={520}
        moveX={125}
        moveY={100}
        color="text-red-600"
      >
        <Youtube className="w-26 h-26" />
      </FloatingIcon>

      <FloatingIcon
        delay={4.8}
        duration={28}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.25 : 300}
        startY={220}
        moveX={-145}
        moveY={105}
        color="text-[#0A66C2]"
      >
        <Linkedin className="w-18 h-18" />
      </FloatingIcon>

      <FloatingIcon
        delay={2.3}
        duration={26}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.25 : 300}
        startY={620}
        moveX={135}
        moveY={90}
        color="text-blue-400"
      >
        <Globe className="w-24 h-24" />
      </FloatingIcon>

      <FloatingIcon
        delay={5.3}
        duration={23}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.25 : 300}
        startY={420}
        moveX={-120}
        moveY={115}
        color="text-orange-500"
      >
        <Rss className="w-20 h-20" />
      </FloatingIcon>

      {/* Center icons */}
      <FloatingIcon
        delay={1.2}
        duration={29}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.5 : 600}
        startY={180}
        moveX={-150}
        moveY={100}
        color="text-slate-900"
      >
        <Twitter className="w-28 h-28" />
      </FloatingIcon>

      <FloatingIcon
        delay={3.8}
        duration={25}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.5 : 600}
        startY={380}
        moveX={140}
        moveY={110}
        color="text-green-500"
      >
        <MessageCircle className="w-22 h-22" />
      </FloatingIcon>

      <FloatingIcon
        delay={0.5}
        duration={27}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.5 : 600}
        startY={580}
        moveX={-135}
        moveY={95}
        color="text-purple-500"
      >
        <AtSign className="w-20 h-20" />
      </FloatingIcon>

      <FloatingIcon
        delay={4.2}
        duration={24}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.5 : 600}
        startY={280}
        moveX={145}
        moveY={105}
        color="text-blue-500"
      >
        <Hash className="w-24 h-24" />
      </FloatingIcon>

      <FloatingIcon
        delay={2.8}
        duration={26}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.5 : 600}
        startY={680}
        moveX={-125}
        moveY={90}
        color="text-red-500"
      >
        <Mail className="w-18 h-18" />
      </FloatingIcon>

      <FloatingIcon
        delay={5.8}
        duration={28}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.5 : 600}
        startY={480}
        moveX={130}
        moveY={115}
        color="text-[#0088cc]"
      >
        <Send className="w-20 h-20" />
      </FloatingIcon>

      {/* Center-right icons */}
      <FloatingIcon
        delay={1.5}
        duration={26}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.75 : 900}
        startY={140}
        moveX={-140}
        moveY={105}
        color="text-pink-500"
      >
        <Instagram className="w-24 h-24" />
      </FloatingIcon>

      <FloatingIcon
        delay={3.5}
        duration={24}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.75 : 900}
        startY={340}
        moveX={130}
        moveY={100}
        color="text-[#1877F2]"
      >
        <Facebook className="w-22 h-22" />
      </FloatingIcon>

      <FloatingIcon
        delay={0.3}
        duration={28}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.75 : 900}
        startY={540}
        moveX={-125}
        moveY={95}
        color="text-[#0A66C2]"
      >
        <Linkedin className="w-20 h-20" />
      </FloatingIcon>

      <FloatingIcon
        delay={4.3}
        duration={25}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.75 : 900}
        startY={240}
        moveX={135}
        moveY={110}
        color="text-red-600"
      >
        <Youtube className="w-26 h-26" />
      </FloatingIcon>

      <FloatingIcon
        delay={2.1}
        duration={27}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.75 : 900}
        startY={640}
        moveX={-145}
        moveY={90}
        color="text-slate-800"
      >
        <Github className="w-22 h-22" />
      </FloatingIcon>

      <FloatingIcon
        delay={5.1}
        duration={23}
        startX={typeof window !== "undefined" ? window.innerWidth * 0.75 : 900}
        startY={440}
        moveX={120}
        moveY={115}
        color="text-teal-500"
      >
        <Share2 className="w-18 h-18" />
      </FloatingIcon>

      {/* Right side icons */}
      <FloatingIcon
        delay={0.5}
        duration={26}
        startX={typeof window !== "undefined" ? window.innerWidth - 100 : 1200}
        startY={150}
        moveX={-150}
        moveY={120}
        color="text-pink-500"
      >
        <Instagram className="w-22 h-22" />
      </FloatingIcon>

      <FloatingIcon
        delay={3.5}
        duration={23}
        startX={typeof window !== "undefined" ? window.innerWidth - 120 : 1200}
        startY={350}
        moveX={120}
        moveY={100}
        color="text-[#1877F2]"
      >
        <Facebook className="w-20 h-20" />
      </FloatingIcon>

      <FloatingIcon
        delay={2}
        duration={27}
        startX={typeof window !== "undefined" ? window.innerWidth - 80 : 1200}
        startY={550}
        moveX={-140}
        moveY={90}
        color="text-slate-900"
      >
        <Twitter className="w-26 h-26" />
      </FloatingIcon>

      <FloatingIcon
        delay={4.5}
        duration={25}
        startX={typeof window !== "undefined" ? window.innerWidth - 110 : 1200}
        startY={250}
        moveX={110}
        moveY={110}
        color="text-[#0A66C2]"
      >
        <Linkedin className="w-18 h-18" />
      </FloatingIcon>

      <FloatingIcon
        delay={2.5}
        duration={24}
        startX={typeof window !== "undefined" ? window.innerWidth - 90 : 1200}
        startY={650}
        moveX={-160}
        moveY={80}
        color="text-red-600"
      >
        <Youtube className="w-30 h-30" />
      </FloatingIcon>

      <FloatingIcon
        delay={5.5}
        duration={28}
        startX={typeof window !== "undefined" ? window.innerWidth - 130 : 1200}
        startY={450}
        moveX={130}
        moveY={95}
        color="text-green-500"
      >
        <MessageCircle className="w-20 h-20" />
      </FloatingIcon>

      <FloatingIcon
        delay={4}
        duration={26}
        startX={typeof window !== "undefined" ? window.innerWidth - 100 : 1200}
        startY={200}
        moveX={-120}
        moveY={105}
        color="text-blue-500"
      >
        <Hash className="w-24 h-24" />
      </FloatingIcon>

      <FloatingIcon
        delay={1.5}
        duration={30}
        startX={typeof window !== "undefined" ? window.innerWidth - 70 : 1200}
        startY={750}
        moveX={140}
        moveY={85}
        color="text-purple-500"
      >
        <AtSign className="w-20 h-20" />
      </FloatingIcon>

      <FloatingIcon
        delay={5}
        duration={25}
        startX={typeof window !== "undefined" ? window.innerWidth - 140 : 1200}
        startY={400}
        moveX={-135}
        moveY={100}
        color="text-[#0088cc]"
      >
        <Send className="w-18 h-18" />
      </FloatingIcon>

      <FloatingIcon
        delay={3}
        duration={27}
        startX={typeof window !== "undefined" ? window.innerWidth - 95 : 1200}
        startY={300}
        moveX={125}
        moveY={115}
        color="text-slate-800"
      >
        <Github className="w-22 h-22" />
      </FloatingIcon>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mb-12 relative z-10"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">
          Social Media Post Generator
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Generate AI-powered captions, blogs, or posts with intelligent image analysis 🎨
        </p>
      </motion.div>

      {/* Main Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 p-10 space-y-8 relative z-10"
      >
        {/* Platform Select */}
        <div>
          <label className="text-sm font-semibold mb-3 block text-slate-700 uppercase tracking-wide">Platform</label>
          <select
            value={platform}
            onChange={(e) => {
              setPlatform(e.target.value)
              setDescription("")
              // setImage(null)
              // setImagePreview(null)
              setGeneratedContent("")
              setWordLimit(e.target.value === "blog" ? 1000 :e.target.value === "instagram" ||e.target.value === "facebook"?50:150);
            }}
            className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none text-slate-900 font-medium"
          >
            <option value="instagram">Instagram</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">X (Twitter)</option>
            <option value="linkedin">LinkedIn</option>
            <option value="blog">Blog</option>
          </select>
        </div>

        {/* Image Upload Section */}
        <AnimatePresence>
          {isImagePlatform && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <label className="text-sm font-semibold mb-3 block text-slate-700 uppercase tracking-wide">
                Upload Image <span className="text-slate-400 normal-case">(optional)</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-4 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-medium file:cursor-pointer hover:file:bg-blue-700"
                />
              </div>
              {imagePreview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6"
                >
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Preview"
                    className="rounded-2xl shadow-lg w-full max-h-96 object-cover border-4 border-slate-100"
                  />
                </motion.div>
              )}
              <p className="text-sm text-slate-500 mt-3 leading-relaxed">
                💡 The AI will analyze this image to generate an accurate caption.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Description Textarea */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <label className="text-sm font-semibold mb-3 block text-slate-700 uppercase tracking-wide">
            {isBlogPlatform ? "Blog Topic or Description" : "Post Description"}
            {!isBlogPlatform && <span className="text-slate-400 normal-case"> (optional if image provided)</span>}
          </label>
          <textarea
            placeholder={
              isBlogPlatform
                ? "Enter your blog topic or idea..."
                : "Describe your post or leave blank if you uploaded an image."
            }
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none resize-none text-slate-900 placeholder:text-slate-400"
          />
        </motion.div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tone Select */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <label className="text-sm font-semibold mb-3 block text-slate-700 uppercase tracking-wide">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as ToneOption)}
              className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none text-slate-900 font-medium"
            >
              {TONE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Word Limit Input */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <label className="text-sm font-semibold mb-3 block text-slate-700 uppercase tracking-wide">
              {isBlogPlatform ? "Target Word Count" : "Word Limit"}
            </label>
            <input
              type="number"
              value={wordLimit}
              onChange={(e) => setWordLimit(Number(e.target.value))}
              min={isBlogPlatform ? 1000 : 20}
              max={isBlogPlatform ? 2500 : 250}
              className="w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 focus:bg-white transition-all outline-none text-slate-900 font-medium"
            />
          </motion.div>
        </div>

        {/* Toggles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-8 pt-2"
        >
          <label className="flex items-center gap-3 text-slate-700 font-medium cursor-pointer group">
            <input
              type="checkbox"
              checked={includeHashtags}
              onChange={(e) => setIncludeHashtags(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-slate-300 text-blue-600 focus:ring-4 focus:ring-blue-100 cursor-pointer"
            />
            <span className="group-hover:text-blue-600 transition-colors">Include Hashtags</span>
          </label>

          <label className="flex items-center gap-3 text-slate-700 font-medium cursor-pointer group">
            <input
              type="checkbox"
              checked={includeEmoji}
              onChange={(e) => setIncludeEmoji(e.target.checked)}
              className="w-5 h-5 rounded border-2 border-slate-300 text-blue-600 focus:ring-4 focus:ring-blue-100 cursor-pointer"
            />
            <span className="group-hover:text-blue-600 transition-colors">Include Emojis</span>
          </label>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-5 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Generating...
            </span>
          ) : (
            "Generate Content"
          )}
        </motion.button>
      </motion.form>

      {/* Generated Content Display */}
      
      <AnimatePresence>
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="mt-12 w-full max-w-4xl bg-white shadow-2xl border border-slate-200 rounded-3xl p-8 relative z-10"
          >
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-200">
              <h2 className="font-bold text-xl text-slate-900">Generated Content</h2>
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                  copied
                    ? "bg-green-100 text-green-700 border-2 border-green-300"
                    : "bg-blue-600 text-white hover:bg-blue-700 border-2 border-blue-600"
                }`}
              >
                {copied ? "✓ Copied!" : "Copy"}
              </motion.button>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-slate max-w-none"
            ><div ref={contentRef}>
              <ReactMarkdown >{generatedContent}</ReactMarkdown>
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  
    </main>
  )
}


