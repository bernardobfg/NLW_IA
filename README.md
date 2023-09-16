# 🚀 NLW_IA

![image](https://github.com/bernardobfg/NLW_IA/assets/64651224/709ef59b-28b0-46f4-92b9-d33ed8f51d8c)
## Sobre projeto
- Criado durante o último nlw de 2023, o projeto visa ser um facilitador na vida de um criador de conteúdo. Realizando o upload de um vídeo a ferramenta é capaz de gerar a trascrição dele e ainda sugerir um título ou uma descrição criativa
## Tecnologias
<div align="center"><img src="https://skillicons.dev/icons?i=ts,react,tailwind,nodejs,vite,prisma" alt="tecnologias" /></div>

## Documentação API

### Prompts cadastrados
```
GET /prompts
```
---
### Upload Vídeo
```
POST /videos
```
Arquivo deve ser enviado usando o FormData
| Campo    | Tipo       | Descrição                                                          |
| -------- | ---------  | ------------------------------------------------------------------ |
| file     | `file`     | Arquivo a ser enviado (Aceita apenas MP3 )                         |
---

### Gerar Transcrição do Vídeo anteriormente adicionado
```
POST /videos/:videoId/transcription 
```
---

### Gerar completion do vídeo para determinado prompt
```
POST /ai/complete
```
| Campo    | Tipo       | Descrição                                                          |
| -------- | ---------  | ------------------------------------------------------------------ |
| videoId    | `string`   | Id do vídeo                            |
| prompt | `string` | Comando que será passado para inteligência artificial utilizando a transcrição do vídeo |
| temperature | `number` | Criatividade esperada da IA: min={0}; max={1} |
---


## Utilização

### Clonar o projeto
```
git clone git@github.com:bernardobfg/NLW-IA.git
```

#### Back-end
###### Entrar na pasta (partindo da raiz)
```
cd api
```
###### Instalar dependências
```
pnpm i
```
###### Adicionar no arquivo .env as seguintes variáveis 
```
DATABASE_URL="<caminho onde ficará seu banco>"

OPENAI_KEY="<Chave da sua api do OPENAI>"
```
###### Gerar o banco
```
pnpm prisma migrate dev
```

###### Executar o projeto
```
pnpm run dev
```

---
#### Front-end (web)
###### Entrar na pasta (partindo da raiz)
```
cd web
```
###### Instalar dependências
```
pnpm i
```
###### Executar o projeto
```
pnpm run dev
```
---
