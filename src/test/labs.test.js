const crypto = require('crypto')
const axios = require('axios')
const Lab = require('../models/labSchema')

const generate = () => {
    return crypto.randomBytes(15).toString('hex')
}

const request = (url, method, data) => {
    return axios({ url, method, data})
}

test('should get labs', async () => {
    //given - dado que
    const lab1 = await new Lab({
        nome: generate(),
        endereco: generate(),
        status: "ativo"
    })
    lab1.save(lab1)
    //when - quando acontecer
    const response = await request('http://localhost:3000/laboratorios', 'get')

    const labs = response.data
    //then - então
    expect(labs).toHaveLength(1)
    await Lab.deleteOne({ status: "ativo" })
})

test.only('should save labs', async () => {
    const data = { nome: generate(), endereco: generate(), status: "ativo"}
    const response = await request('http://localhost:3000/laboratorios', 'post', data)
    const lab = response.data
    expect(lab.nome).toBe(data.nome)
    expect(lab.endereco).toBe(data.endereco)
    expect(lab.status).toBe(data.status)
    await Lab.deleteOne({status: "ativo"})    
})