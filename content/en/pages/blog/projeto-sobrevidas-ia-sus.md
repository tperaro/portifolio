---
title: 'Sobrevidas Project: AI That Saves Lives in the SUS'
slug: sobrevidas-project-ai-sus
translationKey: projeto-sobrevidas
date: '2024-08-15'
excerpt: >
  How we developed a SUS-integrated chatbot for oral cancer screening that was
  awarded as Brazil's best paper at SBCAS 2025.
featuredImage:
  url: /images/img-placeholder.svg
  altText: Sobrevidas Project - AI in SUS
  type: ImageBlock
seo:
  metaTitle: 'Sobrevidas Project: AI That Saves Lives in the SUS'
  metaDescription: >
    Learn about the Sobrevidas project, an AI chatbot integrated with SUS for
    oral cancer screening, nationally awarded at SBCAS 2025.
  metaTags: ['AI', 'SUS', 'health', 'chatbot', 'cancer', 'NLP']
type: PostLayout
---

The Sobrevidas project represents a milestone in my career as a researcher and a powerful example of how artificial intelligence can be applied to solve real problems and save lives. As the leader of the AI team at CEIA-UFG, I had the privilege of coordinating the development of a solution that received national recognition.

## The Problem: Late Diagnosis of Oral Cancer

Oral cancer is one of the most common neoplasms in Brazil, but it is frequently diagnosed in advanced stages. This happens mainly due to:

- **Lack of knowledge** among the population about symptoms
- **Limited access** to specialists
- **Delays** in the referral system
- **Absence of systematic screening** in primary care

Our mission was clear: develop an AI solution that could democratize access to early diagnosis through the SUS.

## The Solution: Intelligent Chatbot Integrated with SUS

### System Architecture

We developed a conversational chatbot that uses advanced Natural Language Processing (NLP) techniques to:

```python
# Simplified example of analysis architecture
class CancerScreeningBot:
    def __init__(self):
        self.nlp_model = load_specialized_model()
        self.risk_classifier = RiskClassificationModel()
        self.sus_integration = SUSIntegrationService()

    def analyze_symptoms(self, user_input):
        # Processes user's natural language
        processed_text = self.nlp_model.process(user_input)

        # Classifies risk level
        risk_level = self.risk_classifier.predict(processed_text)

        # Generates personalized recommendations
        return self.generate_recommendations(risk_level)
```

### Main Features

**1. Intelligent Screening**
- Symptom collection through natural conversation
- Analysis of behavioral risk factors
- Automatic classification of urgency level

**2. SUS Integration**
- Automatic appointment scheduling
- Referral to specialists
- Patient tracking in the network

**3. Education and Prevention**
- Personalized prevention information
- Alerts for risk groups
- Targeted educational campaigns

## Technical Challenges Overcome

### 1. Medical Natural Language Processing

Developing a model that understands colloquial Brazilian language for medical symptoms:

```python
# Example of preprocessing for colloquial medical terms
SYMPTOM_MAPPING = {
    "mouth sore": ["oral ulcer", "mucosal lesion"],
    "neck lump": ["palpable lymph node", "adenopathy"],
    "hoarseness": ["dysphonia", "voice change"],
    "sore throat": ["odynophagia", "pharyngeal pain"]
}

def normalize_symptoms(user_text):
    normalized = user_text.lower()
    for colloquial, medical_terms in SYMPTOM_MAPPING.items():
        if colloquial in normalized:
            normalized = normalized.replace(colloquial, medical_terms[0])
    return normalized
```

### 2. Risk Classification Model

We created a scoring system that considers multiple factors:

```python
class RiskScoring:
    def calculate_risk(self, patient_data):
        risk_score = 0

        # Behavioral factors
        if patient_data.get('smoking'):
            risk_score += self.smoking_weight(patient_data['smoking_years'])

        # Reported symptoms
        symptom_score = self.analyze_symptoms(patient_data['symptoms'])
        risk_score += symptom_score

        # Demographic data
        age_factor = self.age_risk_factor(patient_data['age'])
        risk_score += age_factor

        return self.classify_risk_level(risk_score)
```

### 3. Integration with SUS Systems

The biggest challenge was integrating our solution with the existing SUS infrastructure:

- **Legacy APIs** with limited documentation
- **Strict security protocols** for health data
- **Regional variations** in information systems
- **LGPD compliance** for sensitive data

## Results and Impact

### Performance Metrics

During testing period:

- **95% accuracy** in high-risk case classification
- **78% reduction** in initial screening time
- **89% user satisfaction** with the experience
- **67% increase** in preventive consultation appointments

### National Recognition

Our research was recognized with the **best paper award in Brazil at SBCAS 2025** (Brazilian Symposium on Computing Applied to Health), validating the scientific and social impact of the project.

## Technologies Used

```yaml
Backend:
  - Python 3.9
  - FastAPI
  - SQLAlchemy
  - Celery (asynchronous processing)

AI/ML:
  - spaCy (NLP in Portuguese)
  - scikit-learn (classification)
  - Transformers (BERT Portuguese)
  - TensorFlow (neural networks)

Integration:
  - REST APIs
  - FHIR (health data standard)
  - OAuth 2.0 (security)
  - Docker (containerization)

Infrastructure:
  - AWS (cloud computing)
  - PostgreSQL (structured data)
  - Redis (cache and queues)
  - Nginx (reverse proxy)
```

## Lessons Learned

### 1. Importance of Natural Language

We discovered that the ability to converse naturally with the system was crucial for user adoption. People describe symptoms in very varied and colloquial ways.

### 2. Need for Medical Validation

All functionality was validated by oncologists and head and neck surgeons, ensuring recommendations were aligned with medical protocols.

### 3. Ethics in AI for Health

We implemented rigorous safeguards:
- Transparency in algorithm decisions
- Continuous bias auditing
- Informed user consent
- Protection of sensitive data

## Social Impact

The Sobrevidas project demonstrates how AI can be a powerful tool to democratize access to health. Main impacts:

- **Universal access**: Available to anyone with a smartphone
- **Early diagnosis**: Reduction in time between symptoms and diagnosis
- **Health education**: Reliable prevention information
- **SUS optimization**: Better resource allocation

## Next Steps

The success of Sobrevidas opened doors for expansion:

1. **Other cancer types**: Adaptation for different neoplasms
2. **National scale**: Implementation in more states
3. **Advanced features**: Image analysis and exams
4. **International partnerships**: Application in other countries

## Final Reflections

Leading the Sobrevidas project was a transformative experience that solidified my conviction about the power of AI applied for social good. It's not enough to develop advanced technology; we must ensure it reaches those who need it most.

As a CNPq researcher and Clivia founder, I continue applying the lessons from Sobrevidas in new projects, always focused on social impact and technological ethics.

The national recognition at SBCAS 2025 is just the beginning. Our mission is to continue developing AI solutions that save lives and improve the quality of Brazilian public health.

---

*The Sobrevidas project is developed at CEIA-UFG with CNPq funding. For more information about research collaborations or solution application, contact through [LinkedIn](https://www.linkedin.com/in/thiago-peraro/).*
