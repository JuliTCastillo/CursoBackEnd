export default class GenericRepository{
    constructor(dao, model){
        this.dao = dao;
        this.model = model;
    }
    getAll = param => this.dao.get(param, this.model);
    save = doc => this.dao.save(doc, this.model);
    update = param => this.dao.update(param, this.model)
    delete = param => this.dao.delete(param, this.model)
}