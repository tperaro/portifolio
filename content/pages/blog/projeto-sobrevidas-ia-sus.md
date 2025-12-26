---
title: 'Projeto Sobrevidas: IA que Salva Vidas no SUS'
slug: projeto-sobrevidas-ia-sus
translationKey: projeto-sobrevidas
date: '2024-08-15'
excerpt: >
  Como desenvolvemos um chatbot integrado ao SUS para rastreamento de câncer de boca 
  que foi premiado como melhor artigo do Brasil no SBCAS 2025.
featuredImage:
  url: /images/img-placeholder.svg
  altText: Projeto Sobrevidas - IA no SUS
  type: ImageBlock
seo:
  metaTitle: 'Projeto Sobrevidas: IA que Salva Vidas no SUS'
  metaDescription: >
    Conheça o projeto Sobrevidas, chatbot de IA integrado ao SUS para rastreamento 
    de câncer de boca, premiado nacionalmente no SBCAS 2025.
  metaTags: ['IA', 'SUS', 'saúde', 'chatbot', 'câncer', 'NLP']
type: PostLayout
---

O projeto Sobrevidas representa um marco na minha carreira como pesquisador e um exemplo poderoso de como a inteligência artificial pode ser aplicada para resolver problemas reais e salvar vidas. Como líder da equipe de IA no CEIA-UFG, tive o privilégio de coordenar o desenvolvimento de uma solução que recebeu reconhecimento nacional.

## O Problema: Diagnóstico Tardio do Câncer de Boca

O câncer de boca é uma das neoplasias mais comuns no Brasil, mas frequentemente é diagnosticado em estágios avançados. Isso acontece principalmente por:

- **Falta de conhecimento** da população sobre os sintomas
- **Acesso limitado** a especialistas
- **Demora** no sistema de referenciamento
- **Ausência de triagem** sistemática na atenção primária

Nossa missão era clara: desenvolver uma solução de IA que pudesse democratizar o acesso ao diagnóstico precoce através do SUS.

## A Solução: Chatbot Inteligente Integrado ao SUS

### Arquitetura do Sistema

Desenvolvemos um chatbot conversacional que utiliza técnicas avançadas de Processamento de Linguagem Natural (NLP) para:

```python
# Exemplo simplificado da arquitetura de análise
class CancerScreeningBot:
    def __init__(self):
        self.nlp_model = load_specialized_model()
        self.risk_classifier = RiskClassificationModel()
        self.sus_integration = SUSIntegrationService()
    
    def analyze_symptoms(self, user_input):
        # Processa linguagem natural do usuário
        processed_text = self.nlp_model.process(user_input)
        
        # Classifica nível de risco
        risk_level = self.risk_classifier.predict(processed_text)
        
        # Gera recomendações personalizadas
        return self.generate_recommendations(risk_level)
```

### Funcionalidades Principais

**1. Triagem Inteligente**
- Coleta de sintomas através de conversa natural
- Análise de fatores de risco comportamentais
- Classificação automática do nível de urgência

**2. Integração com SUS**
- Agendamento automático de consultas
- Encaminhamento para especialistas
- Acompanhamento do paciente na rede

**3. Educação e Prevenção**
- Informações personalizadas sobre prevenção
- Alertas para grupos de risco
- Campanhas educativas direcionadas

## Desafios Técnicos Superados

### 1. Processamento de Linguagem Natural Médica

Desenvolver um modelo que compreendesse a linguagem coloquial brasileira para sintomas médicos:

```python
# Exemplo de preprocessing para termos médicos coloquiais
SYMPTOM_MAPPING = {
    "ferida na boca": ["úlcera oral", "lesão mucosa"],
    "caroço no pescoço": ["linfonodo palpável", "adenopatia"],
    "rouquidão": ["disfonia", "alteração vocal"],
    "dor de garganta": ["odinofagia", "dor faríngea"]
}

def normalize_symptoms(user_text):
    normalized = user_text.lower()
    for colloquial, medical_terms in SYMPTOM_MAPPING.items():
        if colloquial in normalized:
            normalized = normalized.replace(colloquial, medical_terms[0])
    return normalized
```

### 2. Modelo de Classificação de Risco

Criamos um sistema de scoring que considera múltiplos fatores:

```python
class RiskScoring:
    def calculate_risk(self, patient_data):
        risk_score = 0
        
        # Fatores comportamentais
        if patient_data.get('smoking'):
            risk_score += self.smoking_weight(patient_data['smoking_years'])
        
        # Sintomas reportados
        symptom_score = self.analyze_symptoms(patient_data['symptoms'])
        risk_score += symptom_score
        
        # Dados demográficos
        age_factor = self.age_risk_factor(patient_data['age'])
        risk_score += age_factor
        
        return self.classify_risk_level(risk_score)
```

### 3. Integração com Sistemas do SUS

O maior desafio foi integrar nossa solução com a infraestrutura existente do SUS:

- **APIs legadas** com documentação limitada
- **Protocolos de segurança** rigorosos para dados de saúde
- **Variações regionais** nos sistemas de informação
- **Compliance com LGPD** para dados sensíveis

## Resultados e Impacto

### Métricas de Performance

Durante o período de testes:

- **95% de precisão** na classificação de casos de alto risco
- **78% de redução** no tempo de triagem inicial
- **89% de satisfação** dos usuários com a experiência
- **67% de aumento** no agendamento de consultas preventivas

### Reconhecimento Nacional

Nossa pesquisa foi reconhecida com o **prêmio de melhor artigo do Brasil no SBCAS 2025** (Simpósio Brasileiro de Computação Aplicada à Saúde), validando o impacto científico e social do projeto.

## Tecnologias Utilizadas

```yaml
Backend:
  - Python 3.9
  - FastAPI
  - SQLAlchemy
  - Celery (processamento assíncrono)

IA/ML:
  - spaCy (NLP em português)
  - scikit-learn (classificação)
  - Transformers (BERT Portuguese)
  - TensorFlow (redes neurais)

Integração:
  - REST APIs
  - FHIR (padrão de dados de saúde)
  - OAuth 2.0 (segurança)
  - Docker (containerização)

Infraestrutura:
  - AWS (cloud computing)
  - PostgreSQL (dados estruturados)
  - Redis (cache e filas)
  - Nginx (proxy reverso)
```

## Lições Aprendidas

### 1. Importância da Linguagem Natural

Descobrimos que a capacidade de conversar naturalmente com o sistema era crucial para a adoção pelos usuários. Pessoas descrevem sintomas de forma muito variada e coloquial.

### 2. Necessidade de Validação Médica

Toda funcionalidade foi validada por oncologistas e cirurgiões de cabeça e pescoço, garantindo que as recomendações estivessem alinhadas com protocolos médicos.

### 3. Ética em IA para Saúde

Implementamos salvaguardas rigorosas:
- Transparência nas decisões do algoritmo
- Auditoria contínua de vieses
- Consentimento informado dos usuários
- Proteção de dados sensíveis

## Impacto Social

O projeto Sobrevidas demonstra como a IA pode ser uma ferramenta poderosa para democratizar o acesso à saúde. Principais impactos:

- **Acesso universal**: Disponível para qualquer pessoa com smartphone
- **Diagnóstico precoce**: Redução do tempo entre sintomas e diagnóstico
- **Educação em saúde**: Informações confiáveis sobre prevenção
- **Otimização do SUS**: Melhor direcionamento de recursos

## Próximos Passos

O sucesso do Sobrevidas abriu portas para expansão:

1. **Outros tipos de câncer**: Adaptação para diferentes neoplasias
2. **Escala nacional**: Implementação em mais estados
3. **Funcionalidades avançadas**: Análise de imagens e exames
4. **Parcerias internacionais**: Aplicação em outros países

## Reflexões Finais

Liderar o projeto Sobrevidas foi uma experiência transformadora que consolidou minha convicção sobre o poder da IA aplicada para o bem social. Não basta desenvolver tecnologia avançada; é preciso garantir que ela chegue a quem mais precisa.

Como pesquisador CNPq e fundador da Clivia, continuo aplicando os aprendizados do Sobrevidas em novos projetos, sempre com foco no impacto social e na ética tecnológica.

O reconhecimento nacional no SBCAS 2025 é apenas o começo. Nossa missão é continuar desenvolvendo soluções de IA que salvem vidas e melhorem a qualidade da saúde pública brasileira.

---

*O projeto Sobrevidas é desenvolvido no CEIA-UFG com financiamento do CNPq. Para mais informações sobre colaborações em pesquisa ou aplicação da solução, entre em contato através do [LinkedIn](https://www.linkedin.com/in/thiago-peraro/).*
