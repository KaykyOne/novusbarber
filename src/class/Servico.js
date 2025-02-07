class Servico {
    constructor(id, nome, tempoMedio, preco, barbeiroId) {
        this.id = id || null; // ID pode ser nulo, pois é gerado automaticamente pelo banco
        this.nome = nome;
        this.tempoMedio = tempoMedio; // Espera-se que venha no formato 'HH:mm:ss'
        this.preco = preco;
        this.barbeiroId = barbeiroId;
    }

    // Método para converter a instância para um objeto compatível com o banco
    toDatabaseObject() {
        return {
            nome: this.nome,
            tempo_medio: this.tempoMedio,
            preco: this.preco,
            barbeiro_id: this.barbeiroId
        };
    }

    // Método estático para criar um objeto Servico a partir de um banco de dados
    static fromDatabaseObject(dbObject) {
        return new Servico(
            dbObject.id,
            dbObject.nome,
            dbObject.tempo_medio,
            dbObject.preco,
            dbObject.barbeiro_id
        );
    }
}

export default Servico;
