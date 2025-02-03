import supabase from '../supabase'; // Cliente do Supabase
import { getCortes } from './ControllerCorte';
import { format } from 'date-fns';

const Login = async (email, id, password) => {

    const { data: resposta, error } = await supabase
        .from('barbeiros')
        .select('*')
        .eq('barbearia_id', id)
        .eq('email', email)
        .eq('senha', password)
        .single();
    if (error || resposta == null) {
        console.error('Erro ao fazer login:', error.message);
        return null;
    }

    return resposta;
};

const SaveDados = (email, senha) => {
    localStorage.setItem('email', email);
    localStorage.setItem('senha', senha);
};

const restoreDados = () => {
    const email = localStorage.getItem('email');
    const senha = localStorage.getItem('senha');

    return { email, senha }
};

const getHoras = async (dia, id) => {
    const { data: horas, error } = await supabase
        .from('hora_dias')
        .select('hora')
        .eq('barbeiro_id', id)
        .eq('dia_semana', dia);

    if (error) {
        console.error('Erro ao obter horários:', error.message);
        return [];
    }

    return horas.map(h => h.hora); // Retornar apenas os horários
};

// 3. Buscar exceções (folgas, ajustes)
const getExcecoes = async (dataCorte, id) => {
    const formattedDate = format(dataCorte, 'yyyy-MM-dd');

    const { data: excecoes, error } = await supabase
        .from('excecoes_disponibilidade')
        .select('hora_inicio, hora_fim')
        .eq('barbeiro_id', id)
        .eq('data', formattedDate);

    if (error) {
        console.error('Erro ao obter exceções:', error.message);
        return [];
    }

    return excecoes.map(e => ({ inicio: e.hora_inicio, fim: e.hora_fim })); // Formato mais organizado
};

// 4. Função para calcular horários livres
const getHorariosLivres = async (dataCorte, dia, id_barbeiro) => {
    const horasTrabalho = await getHoras(dia, id_barbeiro);
    const cortes = await getCortes(dataCorte, id_barbeiro);
    const excecoes = await getExcecoes(dataCorte, id_barbeiro);

    // console.log("Horas de trabalho:", horasTrabalho);
    // console.log("Horários ocupados (cortes):", cortes);
    // console.log("Exceções:", excecoes);

    // Remover horários que já foram agendados
    let horariosLivres = horasTrabalho.filter(hora => !cortes.includes(hora));

    // Remover horários bloqueados pelas exceções
    horariosLivres = horariosLivres.filter(hora => {
        return !excecoes.some(exc => hora >= exc.inicio && hora <= exc.fim);
    });

    // Ordena os horários do menor para o maior
    horariosLivres.sort((a, b) => {
        const [aHours, aMinutes] = a.split(':').map(Number);
        const [bHours, bMinutes] = b.split(':').map(Number);

        // Converte as horas e minutos para o total de minutos
        const aTotalMinutes = aHours * 60 + aMinutes;
        const bTotalMinutes = bHours * 60 + bMinutes;

        return aTotalMinutes - bTotalMinutes;
    });

    return horariosLivres;
};

const getProfessional = async (id) => {
    const { data: barbeiros, error } = await supabase
      .from('barbeiros')
      .select('*')
      .eq('barbearia_id', id);
  
    if (error) {
      console.error('Erro ao obter barbeiros:', error.message);
      return []; // Retornar um array vazio em caso de erro
    }
  
    // Retornar todos os barbeiros encontrados
    return barbeiros || []; // Garante que sempre será retornado um array
  };

// Exportando a função
export { Login, SaveDados, restoreDados, getHoras, getExcecoes, getHorariosLivres, getProfessional };
