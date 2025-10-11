# Exceções de Segurança Conhecidas

**Data**: 2025-10-11  
**Feature**: 001-adicionar-animações-interativas

## Vulnerabilidades Aceitas em Dev Dependencies

### 1. lodash.template (via aceternity-ui)

**CVE**: GHSA-35jh-r3h4-6jhm (Command Injection)  
**Severidade**: High  
**Pacote**: `lodash.template@4.5.0`  
**Origem**: `aceternity-ui@0.2.2` (CLI tool)

**Justificativa de Aceitação**:
- Aceternity UI é uma ferramenta CLI usada apenas em desenvolvimento para scaffold de componentes
- O pacote `lodash.template` **não é incluído no bundle de produção** do Next.js
- A vulnerabilidade só seria explorável se um atacante tivesse acesso ao ambiente de desenvolvimento
- Não há versão corrigida disponível pelos mantenedores

**Mitigação**:
- Uso restrito ao ambiente de desenvolvimento local
- Não executar comandos `aceternity-ui` com input não confiável
- Considerar remover o pacote após extrair os componentes necessários
- Monitorar releases futuros para versão corrigida

**Risco Residual**: Muito baixo (apenas build-time, não runtime)

---

### 2. lodash.pick & lodash.set (via @stackbit/cms-git)

**CVE**: GHSA-p6mc-m468-83gw (Prototype Pollution)  
**Severidade**: High  
**Pacotes**: 
- `lodash.pick@4.4.0`
- `lodash.set@4.3.2`

**Origem**: `@stackbit/cms-git@1.0.35` → `@netlify/content-engine@1.9.1`

**Justificativa de Aceitação**:
- Stackbit CMS é usado apenas em ambiente de desenvolvimento/preview
- Os pacotes lodash são dependências transitivas do content engine
- Não há versão corrigida disponível pelos mantenedores upstream (Netlify)
- A vulnerabilidade de prototype pollution requer condições específicas de exploração

**Mitigação**:
- Stackbit preview executado apenas em ambiente controlado
- Não processar input de usuários não autenticados no CMS
- Monitorar updates de `@stackbit/cms-git` e `@netlify/content-engine`
- Considerar alternativas ao Stackbit se vulnerabilidade for corrigida upstream

**Risco Residual**: Baixo (somente dev/preview, autenticação requerida)

---

## Ações de Monitoramento

- [ ] Verificar `npm audit` semanalmente
- [ ] Monitorar changelog de `aceternity-ui` para versão corrigida
- [ ] Monitorar updates de `@stackbit/cms-git` 
- [ ] Revisar esta decisão se CVE score aumentar para Critical

---

## Alternativas Consideradas

### Para Aceternity UI:
1. **Magic UI** - Similar, mas sem audit completo realizado
2. **Framer Motion direto** - Mais trabalho manual, sem componentes prontos
3. **GSAP React** - Licença comercial necessária

**Decisão**: Manter Aceternity UI pelo custo-benefício

### Para Stackbit:
1. **Remover CMS Git** - Perda de funcionalidade de edição visual
2. **Decap CMS** - Alternativa open-source, requer migração
3. **Usar apenas Git direto** - Sem interface visual

**Decisão**: Manter Stackbit, monitorar updates

---

## Aprovação

**Desenvolvedor**: GitHub Copilot (automated assessment)  
**Data**: 2025-10-11  
**Revisão**: Necessária em 90 dias ou quando houver update disponível
