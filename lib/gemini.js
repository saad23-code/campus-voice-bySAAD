// ============================================
// GEMINI AI - PRIORITY CALCULATOR WITH FALLBACK
// ============================================

import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

/**
 * STRATEGY: 
 * 1. Check for "Critical Keywords" first (Instant URGENT)
 * 2. Try Gemini AI (If tokens available)
 * 3. Use "Maintenance Keywords" (NORMAL)
 * 4. Default to LOW
 */
export async function calculatePriority(issueDescription, location) {
  const text = (issueDescription + " " + location).toLowerCase();

  // 1. HARDCODED URGENT (Safety & Security)
  // These words trigger URGENT immediately to save AI tokens
  const urgentWords = [
    'fire', 'smoke', 'shock', 'short circuit', 'spark', 'wire', 
    'blood', 'injury', 'hurt', 'accident', 'faint', 'medical', 
    'gun', 'weapon', 'fight', 'harassment', 'theft', 'thief',
    'stuck', 'lift', 'flood', 'burst pipe', 'collapsed'
  ];

  if (urgentWords.some(word => text.includes(word))) {
    return 'URGENT';
  }

  // 2. TRY GEMINI AI
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    const prompt = `
      Classify this campus issue as URGENT, NORMAL, or LOW.
      Issue: "${issueDescription}" at "${location}"
      Reply with ONLY one word.
    `
    const result = await model.generateContent(prompt)
    const response = await result.response
    const priorityText = response.text().trim().toUpperCase()

    if (['URGENT', 'NORMAL', 'LOW'].includes(priorityText)) {
      return priorityText;
    }
  } catch (error) {
    console.error('Gemini AI failed, using fallback logic...');
  }

  // 3. FALLBACK LOGIC (When AI fails or isn't triggered)
  
  // NORMAL Keywords (Daily Maintenance)
  const normalWords = [
    'wifi', 'internet', 'network', 'router', 'connection', 'login',
    'water', 'cooler', 'drinking', 'filter', 'tap',
    'light', 'bulb', 'fan', 'ac', 'cooler', 'electricity', 'power',
    'washroom', 'toilet', 'flush', 'leak', 'plumbing',
    'food', 'mess', 'canteen', 'insect', 'cockroach','ac','air conditioner'
  ];

  // LOW Keywords (Cosmetic/Suggestions)
  const lowWords = [
    'paint', 'dust', 'clean', 'sweep', 'grass', 'garden', 
    'chair', 'table', 'furniture', 'suggestion', 'feedback', 'wall'
  ];

  if (normalWords.some(word => text.includes(word))) {
    return 'NORMAL';
  }
  
  if (lowWords.some(word => text.includes(word))) {
    return 'LOW';
  }

  // Ultimate Default
  return 'LOW';
}