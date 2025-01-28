class Corte {
    constructor(id, barbeariaId, barbeiroId, nomeCliente, sobrenomeCliente, telefoneCliente, servicoId, dataCorte) {
        this.id = id || null; // O ID pode ser nulo, pois é gerado automaticamente pelo banco
        this.barbeariaId = barbeariaId;
        this.barbeiroId = barbeiroId;
        this.nomeCliente = nomeCliente;
        this.sobrenomeCliente = sobrenomeCliente;
        this.telefoneCliente = telefoneCliente;
        this.servicoId = servicoId || null; // Pode ser null devido ao ON DELETE SET NULL
        this.dataCorte = dataCorte || new Date(); // Define a data para o momento atual se não for fornecida
    }

    // Método para converter a instância para um objeto compatível com o banco
    toDatabaseObject() {
        return {
            barbearia_id: this.barbeariaId,
            barbeiro_id: this.barbeiroId,
            nome_cliente: this.nomeCliente,
            sobrenome_cliente: this.sobrenomeCliente,
            telefone_cliente: this.telefoneCliente,
            servico_id: this.servicoId,
            data_corte: this.dataCorte
        };
    }

    // Método estático para criar um objeto Corte a partir de um banco de dados
    static fromDatabaseObject(dbObject) {
        return new Corte(
            dbObject.id,
            dbObject.barbearia_id,
            dbObject.barbeiro_id,
            dbObject.nome_cliente,
            dbObject.sobrenome_cliente,
            dbObject.telefone_cliente,
            dbObject.servico_id,
            new Date(dbObject.data_corte)
        );
    }
}

export default Corte;
