const crypto = require('crypto')
const axios = require('axios')
const Lab = require('../models/labSchema')

const generate = () => {
    return crypto.randomBytes(15).toString('hex')
}

const request = (url, method, data) => {
    return axios({ url, method, data})
}

test ('should get labs', async () => {
    const lab1 = await new Lab({nome: generate(), endereco: generate(),status: "ativo"})
    lab1.save(lab1)
    const response = await request('http://localhost:3000/laboratorios', 'get')
    const labs = response.data
    expect(labs).toHaveLength(1)
    await Lab.deleteOne({ status: "ativo" })
})

test ('should save labs', async () => {
    const data = { nome: generate(), endereco: generate(), status: "ativo"}
    const response = await request('http://localhost:3000/laboratorios', 'post', data)
    const lab = response.data
    expect(lab.nome).toBe(data.nome)
    expect(lab.endereco).toBe(data.endereco)
    expect(lab.status).toBe(data.status)
    await Lab.deleteOne({status: "ativo"})    
})

test ('should update labs', async () => {
    const lab = await new Lab({nome: generate(), endereco: generate(),status: "ativo"})
    lab.save(lab)
    lab.nome = generate()
    lab.endereco = generate()
    const response = await request('http://localhost:3000/laboratorios/id', 'put', lab)
    const updateLab = await lab
    expect(updateLab.nome).toBe(lab.nome)
    expect(updateLab.endereco).toBe(lab.endereco)
    await Lab.deleteOne({_id: lab})    
})
