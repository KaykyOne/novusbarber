import supabase from '../supabase'; // Cliente do Supabase
import Corte from '../class/Corte'; // Importa a classe Corte
import { format } from 'date-fns';

const deleteCorte = async (id) => {
    // Tenta excluir o corte
    const { data, error, count } = await supabase
        .from('cortes')
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

const insertCorte = async (corte) => {
    // Converte a instância de Corte para um objeto compatível com o banco
    const corteData = corte.toDatabaseObject();

    // Tenta inserir no banco de dados
    const { data, error } = await supabase
        .from('cortes')
        .insert([corteData])
        .select(); // Retorna os dados inseridos

    if (error) {
        console.error('Erro ao inserir corte:', error.message);
        return null; // Retorna null em caso de erro
    }

    // Retorna a instância de Corte preenchida com os dados inseridos
    return data.length > 0 ? Corte.fromDatabaseObject(data[0]) : null;
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

const getServiceForCustomer = async (val, valSearch) => {
    if(valSearch === 'telefone') valSearch = 'telefone_cliente';
  
    try {
      // Obtendo a data atual no formato 'yyyy-MM-dd'
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0]; // 'yyyy-mm-dd'
  
      const { data: servicos, error } = await supabase
        .from('cortes')
        .select('id, nome_cliente, sobrenome_cliente, telefone_cliente, data_corte, servico_id, servicos(nome, preco), barbeiros(nome)')
        .eq(valSearch, val) // Pesquisar por ID ou Telefone
        .gte('data_corte', todayStr); // Filtra pela data maior ou igual a hoje
  
      if (error) {
        console.error('Erro ao obter serviços:', error.message);
        return []; // Retorna um array vazio em caso de erro
      }
  
      return servicos || []; // Retorna os serviços encontrados
    } catch (err) {
      console.error('Erro inesperado:', err.message);
      return [];
    }
  };  


// Exportando a função
export { deleteCorte, insertCorte, getCortes, getServiceForCustomer };
