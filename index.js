const sentences = [
    {
        text: "El _______ es quien recibe la protección del seguro, incluso cuando no sea quien firma ni paga nada.",
        correct: "Asegurado",
        distractors: ["Tomador", "Beneficiario", "Solicitante"],
        full: "El <strong>Asegurado</strong> es quien recibe la protección del seguro."
    },
    {
        text: "El conjunto de cláusulas, límites y condiciones que formalizan el contrato se recopilan en la _______.",
        correct: "Póliza",
        distractors: ["Prima", "Acta", "Certificado"],
        full: "El conjunto de condiciones se recopilan en la <strong>Póliza</strong>."
    },
    {
        text: "La persona que aparece como responsable económico ante la aseguradora es el _______.",
        correct: "Tomador",
        distractors: ["Asegurado", "Agente", "Contratante"],
        full: "El responsable económico es el <strong>Tomador</strong>."
    },
    {
        text: "Sin la _______ el contrato carece de efecto, pues es el aporte periódico que lo mantiene vigente.",
        correct: "Prima",
        distractors: ["Indemnización", "Fianza", "Cuota"],
        full: "Sin la <strong>Prima</strong> el contrato carece de efecto."
    },
    {
        text: "Antes de que ocurra un daño real, ese hecho posible solo se considera un _______.",
        correct: "Riesgo",
        distractors: ["Siniestro", "Daño", "Amenaza"],
        full: "El hecho posible se considera un <strong>Riesgo</strong>."
    },
    {
        text: "Una vez que el hecho incierto finalmente se materializa, deja de ser riesgo y se convierte en un _______.",
        correct: "Siniestro",
        distractors: ["Riesgo", "Incidente", "Percance"],
        full: "Se convierte en un <strong>Siniestro</strong> cuando se materializa."
    },
    {
        text: "La compensación económica otorgada por la aseguradora tras validar un siniestro se denomina _______.",
        correct: "Indemnización",
        distractors: ["Prima", "Bonificación", "Liquidación"],
        full: "La compensación se denomina <strong>Indemnización</strong>."
    },
    {
        text: "Los seguros vinculados directamente a la vida, salud o invalidez forman parte de los seguros de _______.",
        correct: "Personas",
        distractors: ["Individuos", "Particulares", "Ciudadanos"],
        full: "Forman parte de los seguros de <strong>Personas</strong>."
    },
    {
        text: "El seguro de auto y el de hogar no protegen personas sino objetos físicos, por lo que pertenecen a los seguros de _______.",
        correct: "Bienes",
        distractors: ["Activos", "Propiedad", "Objetos"],
        full: "Pertenecen a los seguros de <strong>Bienes</strong> o Patrimoniales."
    },
    {
        text: "La responsabilidad civil general cubre daños que el asegurado cause a individuos que no forman parte del contrato, es decir, a _______.",
        correct: "Terceros",
        distractors: ["Sus bienes", "Empleados", "Ajenos"],
        full: "Cubre daños causados a <strong>Terceros</strong>."
    },
    {
        text: "La protección de maquinaria y equipo, al estar ligada a actividades productivas, se ubica dentro de los seguros _______.",
        correct: "Empresariales",
        distractors: ["Industriales", "Patrimoniales", "Comerciales"],
        full: "Se ubica dentro de los seguros <strong>Empresariales</strong>."
    },
    {
        text: "Los seguros que respaldan operaciones económicas, créditos o garantías se clasifican como seguros _______.",
        correct: "Financieros",
        distractors: ["Monetarios", "Bancarios", "Económicos"],
        full: "Se clasifican como seguros <strong>Financieros</strong>."
    },
    {
        text: "En caso de incendio, quien asume el pago periódico es el _______ y quien responde económicamente al siniestro es la _______.",
        correct: "Tomador / Aseguradora",
        distractors: ["Asegurado / Tomador", "Aseguradora / Tomador", "Cliente / Compañía"],
        full: "Paga el <strong>Tomador</strong> y responde la <strong>Aseguradora</strong>."
    },
    {
        text: "Un evento hipotético recibe un nombre distinto al que se usa cuando ya ocurrió: primero es un _______ y después un _______.",
        correct: "Riesgo / Siniestro",
        distractors: ["Siniestro / Riesgo", "Peligro / Accidente", "Amenaza / Hecho"],
        full: "Primero es un <strong>Riesgo</strong> y después un <strong>Siniestro</strong>."
    },
    {
        text: "La institución que acepta asumir un riesgo a cambio del pago de una prima es la _______.",
        correct: "Aseguradora",
        distractors: ["Financiera", "Agencia", "Mutualidad"],
        full: "La institución es la <strong>Aseguradora</strong>."
    },
    {
        text: "El seguro de crédito pertenece a la categoría de seguros _______; el de gastos médicos, en cambio, corresponde a los de _______.",
        correct: "Financieros / Personas",
        distractors: ["Empresariales / Salud", "Bienes / Vida", "Bancarios / Humanos"],
        full: "Crédito es <strong>Financiero</strong> y gastos médicos de <strong>Personas</strong>."
    }
];

let currentIndex = 0;
let isAnswering = true;

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackText = document.getElementById('feedback-text');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const levelIndicator = document.getElementById('level-indicator');

function startGame() {
    startScreen.classList.remove('active');
    gameScreen.classList.add('active');
    
    // CAMBIO AQUI: Mezclamos TAMBIÉN el orden de las preguntas al inicio
    shuffleArray(sentences);
    
    currentIndex = 0;
    loadSentence();
}

// Algoritmo Fisher-Yates para mezclar arrays
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadSentence() {
    isAnswering = true;
    const item = sentences[currentIndex];

    levelIndicator.innerText = `NIVEL ${currentIndex + 1} / ${sentences.length}`;
    progressBar.style.width = `${(currentIndex / sentences.length) * 100}%`;

    questionText.style.animation = 'none';
    questionText.offsetHeight;
    questionText.style.animation = null;
    questionText.innerText = item.text;
    questionText.classList.add('animate__fadeIn');

    optionsContainer.innerHTML = '';
    feedbackText.style.display = 'none';
    nextBtn.style.display = 'none';

    // Preparar opciones
    let currentOptions = [
        { text: item.correct, isCorrect: true },
        ...item.distractors.map(d => ({ text: d, isCorrect: false }))
    ];

    // Mezclar las opciones (A, B, C, D)
    currentOptions = shuffleArray(currentOptions);

    const letters = ['A', 'B', 'C', 'D'];

    currentOptions.forEach((opt, index) => {
        const btn = document.createElement('div');
        btn.className = 'option-card animate__animated animate__fadeInUp';
        btn.style.animationDelay = `${index * 0.1}s`;

        btn.innerHTML = `
            <div class="option-letter">${letters[index]}</div>
            <div class="option-text">${opt.text}</div>
        `;

        btn.onclick = () => handleAnswer(opt.isCorrect, btn, currentOptions);
        optionsContainer.appendChild(btn);
    });
}

function handleAnswer(isCorrect, btnElement, currentOptionsObj) {
    if (!isAnswering) return;
    isAnswering = false;

    const item = sentences[currentIndex];
    const allButtons = optionsContainer.querySelectorAll('.option-card');

    if (isCorrect) {
        btnElement.classList.add('correct');
        btnElement.classList.add('animate__pulse');
    } else {
        btnElement.classList.add('incorrect');
        btnElement.classList.add('animate__headShake');

        allButtons.forEach(b => {
            if (b.innerText.includes(item.correct)) {
                b.classList.add('correct');
            }
        });
    }

    allButtons.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });

    feedbackText.innerHTML = "💡 " + item.full;
    feedbackText.style.display = 'block';

    nextBtn.style.display = 'block';

    if (currentIndex === sentences.length - 1) {
        nextBtn.innerText = "Ver Resultados";
        progressBar.style.width = '100%';
    } else {
        nextBtn.innerText = "Siguiente ➜";
    }
}

function nextQuestion() {
    if (currentIndex < sentences.length - 1) {
        currentIndex++;
        loadSentence();
    } else {
        finishGame();
    }
}

function finishGame() {
    gameScreen.classList.remove('active');
    endScreen.classList.add('active');

    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}