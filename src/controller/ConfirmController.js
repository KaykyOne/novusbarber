import supabase from '../supabase'; // Cliente do Supabase
import Corte from '../class/Corte'; // Importa a classe Corte

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

// Exportando a função
export { insertCorte };
