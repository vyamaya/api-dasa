const crypto = require('crypto')
const axios = require('axios')
const Lab = require('../models/labSchema')
const { isValidObjectId } = require('mongoose')

const generate = () => {
    return crypto.randomBytes(15).toString('hex')
}

const request = (url, method, data) => {
    return axios({ url, method, data})
}

test ('should get labs', async () => {
    const lab = await new Lab({nome: generate(), endereco: generate(),status: "ativo"})
    lab.save(lab)
    const response = await request('http://localhost:3000/laboratorios', 'get')
    expect(response.status).toBe(200)
    const labs = response.data
    expect(labs).toHaveLength(1)
    await Lab.deleteOne({_id: lab})
})

test ('should save labs', async () => {
    const data = { nome: generate(), endereco: generate(), status: "ativo"}
    const response = await request('http://localhost:3000/laboratorios', 'post', data)
    expect(response.status).toBe(201) 
    const lab = response.data
    expect(lab.nome).toBe(data.nome)
    expect(lab.endereco).toBe(data.endereco)
    expect(lab.status).toBe(data.status)
    await Lab.deleteOne({_id: lab})    
})

test ('should update labs', async () => {
    const lab = await new Lab({nome: generate(), endereco: generate(),status: "ativo",})
    lab.save(lab)
    lab.nome = generate()
    lab.endereco = generate()
    const response = await request('http://localhost:3000/laboratorios', 'put', lab)
    expect(response.status).toBe(200)
    const updateLab = await lab
    expect(updateLab.nome).toBe(lab.nome)
    expect(updateLab.endereco).toBe(lab.endereco)
    await Lab.deleteOne({_id: lab})    
})
