import supabase from '../supabase'; // Cliente do Supabase

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

// Exportando a função
export { Login, SaveDados, restoreDados };
