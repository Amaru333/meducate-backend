const QuestionModel = require("./models/questionModel");
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
const insertData = async () => {
  await connectDB();

  const newQuestions = [
    {
      question: "Which organ produces insulin in the human body?",
      options: ["Pancreas", "Liver", "Kidneys", "Stomach"],
      answer: "Pancreas",
    },
    {
      question: "What is the medical term for a heart attack?",
      options: ["Myocardial infarction", "Cardiac arrest", "Heart failure", "Angina"],
      answer: "Myocardial infarction",
    },
    {
      question: "Which vitamin is synthesized in the skin upon exposure to sunlight?",
      options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
      answer: "Vitamin D",
    },
    {
      question: "What is the medical term for the condition characterized by difficulty swallowing?",
      options: ["Dysphagia", "Dysphasia", "Aphasia", "Anorexia"],
      answer: "Dysphagia",
    },
    {
      question: "Which of the following is a bacterial infection that causes inflammation of the throat?",
      options: ["Strep throat", "Tonsillitis", "Laryngitis", "Pharyngitis"],
      answer: "Strep throat",
    },
    {
      question: "What is the medical term for a sudden loss of consciousness and muscle strength?",
      options: ["Syncope", "Epilepsy", "Coma", "Narcolepsy"],
      answer: "Syncope",
    },
    {
      question: "Which part of the brain controls balance and coordination?",
      options: ["Cerebrum", "Cerebellum", "Brain stem", "Thalamus"],
      answer: "Cerebellum",
    },
    {
      question: "What is the medical term for the build-up of fatty deposits in the arteries?",
      options: ["Atherosclerosis", "Arteriosclerosis", "Thrombosis", "Embolism"],
      answer: "Atherosclerosis",
    },
    {
      question: "Which of the following is a hormone produced by the adrenal glands?",
      options: ["Insulin", "Cortisol", "Thyroxine", "Melatonin"],
      answer: "Cortisol",
    },
    {
      question: "What is the medical term for the inflammation of the joints?",
      options: ["Arthritis", "Osteoporosis", "Bursitis", "Tendonitis"],
      answer: "Arthritis",
    },
    {
      question: "Which type of diabetes requires insulin therapy for management?",
      options: ["Type 1 diabetes", "Type 2 diabetes", "Gestational diabetes", "Pre-diabetes"],
      answer: "Type 1 diabetes",
    },
    {
      question: "What is the medical term for a blood clot that forms in a deep vein, usually in the leg?",
      options: ["Deep vein thrombosis", "Pulmonary embolism", "Aneurysm", "Varicose vein"],
      answer: "Deep vein thrombosis",
    },
    {
      question: "Which of the following is a chronic skin condition characterized by red, itchy, and scaly patches?",
      options: ["Psoriasis", "Eczema", "Rosacea", "Dermatitis"],
      answer: "Psoriasis",
    },
    {
      question: "What is the medical term for the surgical removal of the gallbladder?",
      options: ["Cholecystectomy", "Appendectomy", "Hysterectomy", "Thyroidectomy"],
      answer: "Cholecystectomy",
    },
    {
      question: "Which of the following is a viral infection that affects the respiratory system, causing coughing and wheezing?",
      options: ["Respiratory syncytial virus (RSV)", "Human papillomavirus (HPV)", "Varicella-zoster virus (VZV)", "Cytomegalovirus (CMV)"],
      answer: "Respiratory syncytial virus (RSV)",
    },
    {
      question: "What is the medical term for the loss of muscle mass due to aging or inactivity?",
      options: ["Sarcopenia", "Osteopenia", "Myalgia", "Atrophy"],
      answer: "Sarcopenia",
    },
    {
      question: "Which of the following is an autoimmune disease that attacks the myelin sheath of nerves?",
      options: ["Multiple sclerosis", "Amyotrophic lateral sclerosis", "Guillain-Barré syndrome", "Parkinson's disease"],
      answer: "Multiple sclerosis",
    },
    {
      question: "What is the medical term for an abnormally fast heart rate?",
      options: ["Tachycardia", "Bradycardia", "Arrhythmia", "Atrial fibrillation"],
      answer: "Tachycardia",
    },
    {
      question: "Which of the following is a bacterial infection that affects the stomach and intestines, causing diarrhea and vomiting?",
      options: ["Salmonella", "E. coli", "Campylobacter", "Clostridium difficile"],
      answer: "Salmonella",
    },
    {
      question: "What is the medical term for a sudden, involuntary muscle contraction or spasm?",
      options: ["Tetanus", "Dystonia", "Myoclonus", "Spasm"],
      answer: "Spasm",
    },
    {
      question: "Which gland regulates metabolism in the body?",
      options: ["Thyroid gland", "Adrenal gland", "Pituitary gland", "Pancreas"],
      answer: "Thyroid gland",
    },
    {
      question: "What is the medical term for the protrusion of an organ or tissue through an abnormal opening?",
      options: ["Hernia", "Ulcer", "Polyp", "Fistula"],
      answer: "Hernia",
    },
    {
      question: "Which of the following is a viral infection that primarily affects the liver?",
      options: ["Hepatitis A", "Hepatitis B", "Hepatitis C", "Hepatitis D"],
      answer: "Hepatitis A",
    },
    {
      question: "What is the medical term for the condition characterized by an insufficient amount of red blood cells or hemoglobin in the blood?",
      options: ["Anemia", "Leukopenia", "Thrombocytopenia", "Neutropenia"],
      answer: "Anemia",
    },
    {
      question: "Which of the following is a disorder that causes episodes of breathing cessation during sleep?",
      options: ["Sleep apnea", "Insomnia", "Narcolepsy", "Restless legs syndrome"],
      answer: "Sleep apnea",
    },
    {
      question: "What is the medical term for the sudden, involuntary contraction of a muscle group?",
      options: ["Spasm", "Cramp", "Tetany", "Fasciculation"],
      answer: "Spasm",
    },
    {
      question: "Which of the following is a degenerative joint disease that commonly affects the elderly?",
      options: ["Osteoarthritis", "Rheumatoid arthritis", "Gout", "Ankylosing spondylitis"],
      answer: "Osteoarthritis",
    },
    {
      question: "What is the medical term for a swelling or enlargement of the thyroid gland?",
      options: ["Goiter", "Thyroiditis", "Thyroidoma", "Thyroid nodule"],
      answer: "Goiter",
    },
    {
      question: "Which of the following is a chronic autoimmune disease that affects the joints, causing inflammation and pain?",
      options: ["Rheumatoid arthritis", "Osteoarthritis", "Gout", "Fibromyalgia"],
      answer: "Rheumatoid arthritis",
    },
    {
      question: "What is the medical term for an abnormally low body temperature?",
      options: ["Hypothermia", "Hypothermia", "Hyperthermia", "Hypotension"],
      answer: "Hypothermia",
    },
    {
      question: "Which of the following is a condition characterized by excessive accumulation of fluid in body tissues?",
      options: ["Edema", "Ascites", "Hydrocele", "Lymphedema"],
      answer: "Edema",
    },
  ];

  try {
    await QuestionModel.insertMany(newQuestions);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    mongoose.connection.close();
  }
};

insertData();
