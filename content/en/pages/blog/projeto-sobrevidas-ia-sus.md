---
title: 'Sobrevidas Project: AI That Saves Lives in the SUS'
slug: sobrevidas-project-ai-sus
translationKey: projeto-sobrevidas
date: '2024-08-15'
excerpt: >
  How we developed a SUS-integrated chatbot for oral cancer screening that was
  awarded as Brazil's best paper at SBCAS 2025.
featuredImage:
  url: /images/sobrevidas.webp
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

The Sobrevidas project represents a milestone in my career as a researcher and a powerful example of how artificial intelligence can be applied to solve real problems and save lives. As the leader of the project's AI team — an undergraduate research project at UFG, where I am completing my Computer Science degree — I had the privilege of coordinating the development of a solution that received national recognition.

## The Problem: Late Diagnosis of Oral Cancer

Oral cancer is one of the most common neoplasms in Brazil, but it is frequently diagnosed in advanced stages. This happens mainly due to:

- **Lack of knowledge** among the population about symptoms
- **Limited access** to specialists
- **Delays** in the referral system
- **Absence of systematic screening** in primary care

Our mission was clear: develop an AI solution that could democratize access to early diagnosis through the SUS.

## The Solution: Intelligent Chatbot Integrated with SUS

### System Architecture

We developed a conversational chatbot that uses advanced Natural Language Processing (NLP) techniques. Each conversation runs through three chained layers:

1. **Interpretation** — the language model reads the patient's account in colloquial Portuguese and extracts the symptoms being described.
2. **Risk classification** — the extracted symptoms, together with behavioral and demographic factors, feed the model that assigns an urgency level.
3. **Referral** — the urgency level determines the recommendation and, when warranted, triggers the integration with the public health network.

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

The hardest part was teaching the model how Brazilians actually describe a symptom. Nobody shows up saying "I present an ulcer on my oral mucosa" — they say "I've got a sore in my mouth that won't heal". We had to map that colloquial vocabulary onto clinical terminology:

| How the patient says it | Clinical term |
| --- | --- |
| sore in the mouth | oral ulcer, mucosal lesion |
| lump in the neck | palpable lymph node, adenopathy |
| hoarseness | dysphonia |
| sore throat | odynophagia |

This mapping is not a fixed table: regional wording varies a lot across Brazilian states, and much of the research work went into widening that coverage without producing false positives.

### 2. Risk Classification Model

We created a scoring system that combines three groups of factors, each with its own weight:

- **Behavioral** — smoking and drinking, weighted by length of exposure rather than a plain yes or no. Twenty years of cigarettes does not carry the same weight as two.
- **Reported symptoms** — every symptom extracted from the conversation contributes a weight, and certain combinations raise the risk more than the sum of their parts.
- **Demographic** — age bracket and other epidemiological markers for oral cancer.

The total lands in a band that defines the course of action: preventive guidance, follow-up, or priority referral. Calibrating those weights was the most delicate work — in cancer screening a false negative costs far more than a false positive, and the model has to err on the safe side.

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

**Backend** — Python 3.9, FastAPI, SQLAlchemy and Celery for asynchronous processing.

**AI/ML** — spaCy for Portuguese NLP, Transformers (BERT Portuguese) and scikit-learn for classification, TensorFlow for the neural networks.

**Integration** — REST APIs over the FHIR health data standard, OAuth 2.0 and Docker.

**Infrastructure** — AWS, PostgreSQL for structured data, Redis for cache and queues, Nginx as reverse proxy.

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

*The Sobrevidas project is developed at UFG as an undergraduate research project with a CNPq scholarship. For more information about research collaborations or solution application, contact through [LinkedIn](https://www.linkedin.com/in/thiago-peraro/).*
