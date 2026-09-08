import { useState, useEffect } from 'react';

// Lista de opções para o jogo
const ANIMAIS_DISPONIVEIS = [
  { id: 'cavalo', icone: '🐴', nome: 'cavalo' },
  { id: 'cachorro', icone: '🐶', nome: 'cachorro' },
  { id: 'gato', icone: '🐱', nome: 'gato' },
  { id: 'ovelha', icone: '🐑', nome: 'ovelha' },
  { id: 'vaca', icone: '🐮', nome: 'vaca' },
  { id: 'elefante', icone: '🐘', nome: 'elefante' }
];

export default function JogoRastreio() {
  const [animais, setAnimais] = useState(ANIMAIS_DISPONIVEIS);
  const [alvo, setAlvo] = useState(ANIMAIS_DISPONIVEIS[0]);
  const [tempoInicio, setTempoInicio] = useState(0);
  const [feedback, setFeedback] = useState<'neutro' | 'acerto' | 'erro'>('neutro');
  const [mensagemTempo, setMensagemTempo] = useState('');

  // Inicializa a rodada
  const iniciarRodada = () => {
    // Embaralha os animais (lógica básica de randomização)
    const animaisEmbaralhados = [...ANIMAIS_DISPONIVEIS].sort(() => Math.random() - 0.5);
    setAnimais(animaisEmbaralhados);
    
    // Escolhe um alvo aleatório
    const alvoAleatorio = animaisEmbaralhados[Math.floor(Math.random() * animaisEmbaralhados.length)];
    setAlvo(alvoAleatorio);
    
    setFeedback('neutro');
    setMensagemTempo('');
    
    // Inicia o cronômetro com alta precisão
    setTempoInicio(performance.now());
  };

  // Roda uma vez quando o componente é montado
  useEffect(() => {
    iniciarRodada();
  }, []);

  const lidarComClique = (animalClicado: string) => {
    if (feedback === 'acerto') return; // Bloqueia cliques extras após acertar

    if (animalClicado === alvo.id) {
      const tempoFinal = performance.now();
      const tempoReacao = Math.round(tempoFinal - tempoInicio);
      
      setFeedback('acerto');
      setMensagemTempo(`Você acertou em ${tempoReacao}ms!`);
      
      // Aqui, futuramente, faremos o POST para a sua API Hono salvar no Supabase
      console.log(`Salvar no banco: Paciente acertou o ${alvo.nome} em ${tempoReacao}ms`);

      // Reinicia após 2 segundos
      setTimeout(iniciarRodada, 2000);
    } else {
      setFeedback('erro');
      // Volta para neutro após um erro rápido
      setTimeout(() => setFeedback('neutro'), 800);
    }
  };

  return (
    <div style={estilos.container}>
      <h2 style={estilos.titulo}>Identifique o {alvo.nome}</h2>
      
      <div style={estilos.grid}>
        {animais.map((animal) => (
          <button
            key={animal.id}
            onClick={() => lidarComClique(animal.id)}
            style={{
              ...estilos.cartao,
              ...(feedback === 'erro' ? estilos.cartaoErro : {}),
            }}
          >
            <span style={estilos.icone}>{animal.icone}</span>
          </button>
        ))}
      </div>

      <div style={{ height: '40px', marginTop: '20px' }}>
        {feedback === 'acerto' && <p style={estilos.textoAcerto}>{mensagemTempo} 🎉</p>}
        {feedback === 'erro' && <p style={estilos.textoErro}>Ops, tente novamente!</p>}
      </div>
    </div>
  );
}

// Estilos inline básicos para prototipação rápida sem precisar configurar CSS extra agora
const estilos = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '40px',
    fontFamily: 'sans-serif',
    backgroundColor: '#e0f2fe',
    minHeight: '100vh',
  },
  titulo: {
    fontSize: '2rem',
    color: '#0369a1',
    marginBottom: '30px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    maxWidth: '600px',
  },
  cartao: {
    backgroundColor: '#ffffff',
    border: '4px solid transparent',
    borderRadius: '16px',
    padding: '20px',
    fontSize: '4rem',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartaoErro: {
    borderColor: '#ef4444',
    animation: 'shake 0.5s',
  },
  icone: {
    userSelect: 'none' as const,
  },
  textoAcerto: {
    color: '#16a34a',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  textoErro: {
    color: '#dc2626',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  }
};