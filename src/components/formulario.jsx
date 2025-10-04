



import React from 'react';
import { useForm, ValidationError } from '@formspree/react'; // 1. Importe o hook
import './formulario.css';

export default function FormularioContato() {
  // 2. Use o hook, passando o ID do seu formulário
  // Você pode encontrar o ID na URL do endpoint: https://formspree.io/f/{SEU_ID_AQUI}
  const [state, handleSubmit] = useForm("xzzgljav"); 

  // 3. Se o formulário foi enviado com sucesso, mostre uma mensagem de agradecimento
  if (state.succeeded) {
      return (
          <div className="form-container">
            <div className="form-success">
              <h3>Obrigado pelo contato!</h3>
              <p>Sua mensagem foi enviada com sucesso. Retornaremos em breve.</p>
            </div>
          </div>
      );
  }

  // 4. Se não foi enviado, mostre o formulário
  return (
    <section className="form-container">
      <div className="form-header">
        <h1>Entre em Contato</h1>
      </div>

      {/* Usamos a função handleSubmit do hook no evento onSubmit */}
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            className="form-input" 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            className="form-input" 
            required 
          />
          {/* O ValidationError mostra erros específicos do campo */}
          <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
            className="form-error"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensagem</label>
          <textarea 
            id="message" 
            name="message" 
            rows="6" 
            className="form-input" 
            required
          ></textarea>
        </div>

        {/* Mostra erros gerais do envio, se houver */}
        {state.errors && <p className="form-error">Ocorreu um erro ao enviar. Tente novamente.</p>}

        {/* O botão fica desabilitado enquanto o envio está em progresso */}
        <button type="submit" className="form-button" disabled={state.submitting}>
          {state.submitting ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </form>
    </section>
  );
}