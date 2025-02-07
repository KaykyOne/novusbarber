import supabase from '../supabase'; // Cliente do Supabase configurado
import { format } from 'date-fns';
// 1. Buscar horários de trabalho do barbeiro para o dia da semana
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

const getCortes = async (dataCorte, id) => {
  const formattedDate = format(dataCorte, 'yyyy-MM-dd');
  console.log(formattedDate);
  const { data: cortes, error } = await supabase
    .from('cortes')
    .select('data_corte') // Busca a data completa
    .eq('barbeiro_id', id)
    .filter('data_corte', 'gte', `${formattedDate} 00:00:00`)
    .filter('data_corte', 'lte', `${formattedDate} 23:59:59`);

  if (error) {
    console.error('Erro ao obter cortes:', error.message);
    return [];
  }

  // console.log('Cortes encontrados:', cortes);

  // Ajustar a extração da hora do campo 'data_corte'
  return cortes.map(c => {
    console.log('Processando corte:', c); // Verificar cada item antes do split
    if (c.data_corte) {
      const partes = c.data_corte.split('T'); // Divide em [data, hora]
      return partes.length > 1 ? partes[1] : null;
    }
    return null;
  }).filter(hora => hora !== null); // Remove valores null
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

const getHorarios = async(id, dia) => {
  const {data: horarios, error} = await supabase
    .from('hora_dias')
    .select('*')
    .eq('barbeiro_id', id)
    .eq('dia_semana', dia);
  
  if(error){
    console.error('Erro ao buscar horários', error.message);
    return;
  }

  console.log(horarios); // Exibe os horários agrupados por dia
  return horarios;
}

const insertHorario = async (id, dia, hora) => {
  // Tenta inserir no banco de dados
  console.log(dia);
  const { data, error } = await supabase
    .from('hora_dias')
    .insert([
      {
        hora: hora,
        barbeiro_id: id,
        dia_semana: dia,
      }
    ])
    .select();

  if (error) {
    console.error('Erro ao inserir horário:', error.message);
    return null; // Retorna null em caso de erro
  }

  // Retorna os dados inseridos
  return data;
};


const deleteHorario = async (id) => {
  // Tenta excluir o corte
  const { data, error, count } = await supabase
      .from('hora_dias')
      .delete()
      .eq('id', id)
      .select(); // Adicionando select para forçar o retorno dos dados excluídos

  // Verificar se houve erro
  if (error) {
      console.error('Erro ao excluir corte:', error.message);
      return null; // Retorna null em caso de erro
  }

  console.log('Dados excluídos:', data); // Log para ver se os dados foram excluídos

  // Verificar se algum corte foi excluído
  if (data && data.length > 0) {
      console.log('Corte excluído com sucesso');
  } else {
      console.log('Nenhum corte encontrado para excluir');
  }

  // Retorna uma confirmação de que o corte foi excluído
  return data && data.length > 0;
};




// Exportando funções
export { getHoras, getCortes, getExcecoes, getHorariosLivres, getHorarios, deleteHorario, insertHorario };
