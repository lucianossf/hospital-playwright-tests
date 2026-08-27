# Hospital Playwright Tests

[![Hospital Playwright Tests](https://github.com/lucianossf/hospital-playwright-tests/actions/workflows/playwright.yml/badge.svg)](https://github.com/lucianossf/hospital-playwright-tests/actions/workflows/playwright.yml)

Automação E2E independente em Playwright e TypeScript para o [OpenEMR](https://www.openemr.io/), solução open source de prontuário eletrônico e gestão de práticas médicas. A suíte utiliza a [demo oficial com dados de exemplo](https://www.open-emr.org/wiki/index.php/8.3.0_Demo), reinicializada diariamente.

> O OpenEMR cobre prontuário, pacientes, agenda, faturamento e gestão clínica, mas não substitui todos os módulos de um ERP hospitalar corporativo.

## Resultado validado

- Execução local em Chromium: **4 testes aprovados**.
- Validação TypeScript: **sem erros**.
- Data da última validação: **27/08/2026**.
- Estratégia: consultas não destrutivas, `workers: 1` e isolamento por contexto.

## Tecnologias e versões

| Ferramenta | Versão utilizada |
| --- | --- |
| Node.js | 24.15.0 |
| npm | 11.12.1 |
| Playwright Test | 1.62.1 |
| TypeScript | 7.0.2 |
| dotenv | 17.4.2 |
| @types/node | 26.4.0 |
| Chrome for Testing | 151.0.7922.34 |
| GitHub Actions | `ubuntu-latest` + Node.js 24 |

As versões npm estão fixadas no `package-lock.json`. O campo `engines` exige Node.js 24.

## Estrutura

```text
hospital-playwright-tests/
├── .github/workflows/playwright.yml
├── fixtures/testFixtures.ts
├── pages/
│   ├── DashboardPage.ts
│   ├── LoginPage.ts
│   └── PatientFinderPage.ts
├── tests/
│   ├── auth/login.spec.ts
│   ├── calendar/calendar.spec.ts
│   └── patients/patient-search.spec.ts
├── utils/
│   ├── constants.ts
│   └── testData.ts
├── .env.example
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

Os Page Objects encapsulam locators e ações por tela. O `PatientFinderPage` trata explicitamente o iframe de busca de pacientes, enquanto a fixture autenticada prepara um contexto novo para cada teste.

## Instalação

```bash
git clone https://github.com/lucianossf/hospital-playwright-tests.git
cd hospital-playwright-tests
npm ci
npx playwright install chromium
```

Crie o arquivo local de ambiente no PowerShell:

```powershell
Copy-Item .env.example .env
```

No Linux ou macOS:

```bash
cp .env.example .env
```

## Variáveis de ambiente

| Variável | Finalidade | Valor público da demo |
| --- | --- | --- |
| `HOSPITAL_BASE_URL` | URL do OpenEMR | `https://two.openemr.io/a/openemr` |
| `HOSPITAL_USERNAME` | Usuário administrador | `admin` |
| `HOSPITAL_PASSWORD` | Senha da demo | `pass` |
| `HOSPITAL_PATIENT_SEARCH` | Termo de pesquisa | `Phil` |
| `HOSPITAL_PATIENT_NAME` | Paciente esperado | `Belford, Phil` |

Os valores são dados fictícios e credenciais públicas da demo. Dados médicos reais, tokens e credenciais privadas devem usar secrets, mascaramento de logs, acesso mínimo e políticas adequadas de retenção.

## Execução

```bash
npm test                 # suíte completa
npm run test:chromium    # Chromium
npm run test:headed      # navegador visível
npm run test:ui          # Playwright UI
npm run test:debug       # modo debug
npm run typecheck        # validação TypeScript
npm run test:report      # relatório HTML
```

Em falhas, a configuração retém trace, screenshot e vídeo para diagnóstico.

## Cenários automatizados

| ID | Cenário | Resultado esperado |
| --- | --- | --- |
| TC-101 | Login válido no OpenEMR | Módulos clínicos disponíveis |
| TC-102 | Credenciais hospitalares inválidas | Login rejeitado |
| TC-103 | Busca demográfica de paciente | Paciente fictício e colunas exibidos |
| TC-104 | Abertura da agenda | Visões diária, semanal e mensal disponíveis |

## Integração contínua

O workflow `.github/workflows/playwright.yml` executa em pull requests para `main` e manualmente por `workflow_dispatch`. A pipeline instala dependências com `npm ci`, instala Chromium, valida o TypeScript, executa os testes e publica o relatório HTML como artefato por sete dias.

## Riscos e próximos cenários

A demo é pública, compartilhada e reinicializada diariamente. Por isso, a suíte não cria pacientes, consultas, prescrições, cobranças ou registros clínicos. Em ambiente isolado, evolua a cobertura para conflito de agenda, datas passadas, limites de horário, autorização por perfil, paciente duplicado, validações obrigatórias, auditoria, cancelamento e consistência entre prontuário, cobrança e relatórios.

## Licença

Distribuído sob a licença MIT. Consulte `LICENSE`.
