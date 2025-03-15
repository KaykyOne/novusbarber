class Excecao {
    constructor(id, barbeiroId, data, horaInicio, horaFim, tipo, descricao) {
        this.id = id || null; // O ID pode ser nulo, pois é gerado automaticamente pelo banco
        this.barbeiroId = barbeiroId;
        this.data = data || new Date(); // Define a data para o momento atual se não for fornecida
        this.horaInicio = horaInicio || null;
        this.horaFim = horaFim || null;
        this.tipo = tipo;
        this.descricao = descricao || "";
    }

    // Método para converter a instância para um objeto compatível com o banco
    toDatabaseObject() {
        return {
            barbeiro_id: this.barbeiroId,
            data: this.data,
            hora_inicio: this.horaInicio,
            hora_fim: this.horaFim,
            tipo: this.tipo,
            descricao: this.descricao
        };
    }

    // Método estático para criar um objeto Excecao a partir de um banco de dados
    static fromDatabaseObject(dbObject) {
        return new Excecao(
            dbObject.id,
            dbObject.barbeiro_id,
            new Date(dbObject.data),
            dbObject.hora_inicio,
            dbObject.hora_fim,
            dbObject.tipo,
            dbObject.descricao
        );
    }
}

export default Excecao;