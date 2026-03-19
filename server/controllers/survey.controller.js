const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST /api/survey — Submit survey response
async function submitSurvey(req, res) {
  try {
    const { q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, comment, gender, ageRange } = req.body;

    // Validate all questions are 1-5
    const questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10];
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i] || questions[i] < 1 || questions[i] > 5) {
        return res.status(400).json({ error: `กรุณาให้คะแนนข้อ ${i + 1} (1-5 ดาว)` });
      }
    }

    const response = await prisma.surveyResponse.create({
      data: {
        q1: parseInt(q1), q2: parseInt(q2), q3: parseInt(q3),
        q4: parseInt(q4), q5: parseInt(q5), q6: parseInt(q6),
        q7: parseInt(q7), q8: parseInt(q8), q9: parseInt(q9),
        q10: parseInt(q10),
        comment: comment || null,
        gender: gender || null,
        ageRange: ageRange || null,
        ipAddress: req.ip,
      },
    });

    res.status(201).json({ message: 'ขอบคุณสำหรับความคิดเห็น!', id: response.id });
  } catch (err) {
    console.error('Survey submit error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

// GET /api/survey/results — Get survey results (for admin/research)
async function getSurveyResults(req, res) {
  try {
    const responses = await prisma.surveyResponse.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const total = responses.length;
    if (total === 0) {
      return res.json({ total: 0, averages: {}, responses: [] });
    }

    // Calculate averages
    const sums = { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0, q6: 0, q7: 0, q8: 0, q9: 0, q10: 0 };
    responses.forEach(r => {
      for (let i = 1; i <= 10; i++) sums['q' + i] += r['q' + i];
    });

    const averages = {};
    for (let i = 1; i <= 10; i++) {
      averages['q' + i] = +(sums['q' + i] / total).toFixed(2);
    }

    const overallAvg = +(Object.values(averages).reduce((a, b) => a + b, 0) / 10).toFixed(2);

    // Gender distribution
    const genderDist = {};
    responses.forEach(r => {
      const g = r.gender || 'ไม่ระบุ';
      genderDist[g] = (genderDist[g] || 0) + 1;
    });

    // Age distribution
    const ageDist = {};
    responses.forEach(r => {
      const a = r.ageRange || 'ไม่ระบุ';
      ageDist[a] = (ageDist[a] || 0) + 1;
    });

    res.json({
      total,
      overallAvg,
      averages,
      genderDist,
      ageDist,
      responses: responses.map(r => ({
        ...r,
        ipAddress: undefined, // hide IP
      })),
    });
  } catch (err) {
    console.error('Survey results error:', err);
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
}

module.exports = { submitSurvey, getSurveyResults };
