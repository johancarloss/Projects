const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
  {
    question: "Qual a principal responsabilidade de um desenvolvedor de software?",
    choice1: 'Gerenciamento de servidores de rede', 
    choice2: 'Desenvolvimento de programas e aplicativos', 
    choice3: 'Manutenção de hardware de computadores', 
    choice4: 'Suporte técnico ao cliente',
    answer: 2, 
  },
  {
    question: "Qual o objetivo de um especialista em segurança da informação?",
    choice1: 'Desenvolvimento de algoritmos de inteligência artificial', 
    choice2: 'Manutenção de redes de computadores', 
    choice3: 'Proteção de sistemas, redes e dados contra ameaças cibernéticas', 
    choice4: 'Criar e gerenciar bancos de dados',
    answer: 3, 
  },
  {
    question: "Que habilidades um especialista em segurança cibernética precisa ter?",
    choice1: 'Conhecimento de redes e sistemas', 
    choice2: 'Experiência em programação', 
    choice3: 'Habilidade em análise de dados', 
    choice4: 'Todas as opções acima',
    answer: 4, 
  },
  {
    question: "Qual é o principal objetivo de um engenheiro de dados?",
    choice1: 'Construção e manutenção de pipelines de dados', 
    choice2: 'Desenvolvimento de interfaces de usuário', 
    choice3: 'Gerenciamento de servidores de rede', 
    choice4: 'Construir modelos preditivos com machine learning',
    answer: 1, 
  },
  {
    question: "Qual a principal responsabilidade de um engenheiro de inteligência artificial?",
    choice1: 'Desenvolver algoritmos e modelos de IA', 
    choice2: 'Criar e gerenciar bancos de dados', 
    choice3: 'Implementar medidas de segurança cibernética', 
    choice4: 'Desenvolver interfaces e aplicações web',
    answer: 1, 
  },
  {
    question: "Qual linguagem de programação é frequentemente utilizada para implementar algoritmos de aprendizado de máquina?",
    choice1: 'Java', 
    choice2: 'C++', 
    choice3: 'Python', 
    choice4: 'HTML',
    answer: 3, 
  },
  {
    question: "Qual linguagem de marcação e programação é usualmente mais utilizada para estruturar o conteúdo de páginas da web, definindo sua hierarquia e elementos visuais?",
    choice1: 'Python e C++', 
    choice2: 'Java e Kotlin', 
    choice3: 'JavaScript, HTML e CSS', 
    choice4: 'Portugol',
    answer: 3, 
  },
  {
    question: "Qual o principal objetivo da engenharia de IA?",
    choice1: 'Criar máquinas inteligentes que superem a inteligência humana', 
    choice2: 'Automatizar tarefas repetitivas e aumentar a produtividade', 
    choice3: 'Resolver problemas complexos que não podem ser solucionados por humanos', 
    choice4: 'Todas as alternativas acima',
    answer: 4, 
  },
  {
    question: "O que é uma VPN, frequentemente usada em segurança da informação?",
    choice1: 'Uma linguagem de programação', 
    choice2: 'Um protocolo de rede que cria uma conexão segura sobre uma rede pública', 
    choice3: 'Um sistema operacional', 
    choice4: 'Um método de compressão de dados',
    answer: 2, 
  },
  {
    question: "Qual é a principal diferença entre um analista de dados e um engenheiro de dados?",
    choice1: 'Não há diferença entre eles', 
    choice2: 'Ambos são responsáveis pela mesma tarefa', 
    choice3: 'Um trabalha com desenvolvimento de software, o outro com redes de computadores', 
    choice4: 'Um trabalha com análise estatística, o outro com infraestrutura de dados',
    answer: 4, 
  },
  {
    question: "Qual a área de atuação mais comum para um desenvolvedor de software?",
    choice1: 'Empresas de tecnologia', 
    choice2: 'Bancos e instituições financeiras', 
    choice3: 'Órgãos governamentais', 
    choice4: 'Indústrias de diversos setores (saúde, finanças, manufatura e varejo)',
    answer: 1, 
  },
  {
    question: "Quais ferramentas um Engenheiro de Dados utiliza frequentemente?",
    choice1: 'Jupyter Notebook, Anaconda, RStudio - usadas para análise de dados e desenvolvimento em ciência de dados', 
    choice2: 'Visual Studio Code, Eclipse, IntelliJ IDEA - utilizadas para desenvolvimento de software', 
    choice3: 'Burp Suite, OWASP ZAP, Nessus, Nmap - usadas em testes de segurança de aplicativos e redes', 
    choice4: 'Hadoop, Spark, Hive, Pig - usadas para processamento de grandes volumes de dados em sistemas distribuídos',
    answer: 1, 
  },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 12

startGame = ( ) => {
  questionCounter = 0
  score = 0
  availableQuestions = [...questions]
  getNewQuestion()
}

getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score)

    return window.location.assign('/end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionsIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice => {
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionsIndex, 1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return

    acceptingAnswers = false
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset['number']

    let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
    
    if(classToApply === 'correct') {
      incrementScore(SCORE_POINTS)
    }

    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply)
      getNewQuestion()

    }, 1000)
  })
})

incrementScore = num => {
  score +=num
  scoreText.innerText = score
}

startGame()
