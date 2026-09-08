import { useState } from 'react'

function App() {
  const [mensagem, setMensagem] = useState<string>('')

  // Função simulando o fim de uma atividade de rastreio
  const salvarTempoDeReacao = async () => {
    try {
      const response = await fetch('/api/sessao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pacienteId: 1, tempoReacao: 450 }) // 450ms
      })
      
      const data = await response.json()
      setMensagem(`Salvo com sucesso: ${data.tempoSalvo}ms`)
    } catch (error) {
      console.error("Erro ao salvar:", error)
      setMensagem("Erro na comunicação com a API")
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'sans-serif' }}>
      <h1>App de Rastreio Visual</h1>
      <p>Testando a comunicação React ➔ Hono</p>
      
      <button 
        onClick={salvarTempoDeReacao}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        Simular Fim da Atividade
      </button>

      {mensagem && <p style={{ marginTop: '20px', color: 'blue' }}>{mensagem}</p>}
    </div>
  )
}

export default App