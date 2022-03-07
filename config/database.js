const mysql = require('mysql2')
const { dbPort, dbHost, dbUsername, dbPassword, dbDatabase } = require('.')

const connection = mysql.createConnection({
  port: dbPort,
  host: dbHost,
  user: dbUsername,
  password: dbPassword,
  database: dbDatabase
})

const query = (sql, data) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, data, (err, result) => {
      err
        ? reject(err.sqlMessage)
        : resolve(result)
    })
  })
}

const insert = async (table, data) => {
  try {
    await query(`INSERT INTO ${table} (??) VALUES (?)`, [
      Object.keys(data),
      Object.values(data)
    ])
    return { data }
  } catch (err) {
    return { fail: true, err }
  }
}

const del = async (table, data) => {
  try {
    await query(`DELETE FROM ${table} WHERE id = ${data}`)
    return data
  } catch (err) {
    return err
  }
}

const update = async (table, data, id) => {
  try {
    return await query(`UPDATE ${table} SET ? WHERE id = ${id}`, [data])
  } catch (err) {
    return { fail: true, err }
  }
}

const updateBook = async (data, ownerUsername, id) => {
  try {
    return await query(`UPDATE books SET ? WHERE id = ${id} AND owner_username = "${ownerUsername}"`, [data])
  } catch (err) {
    return { fail: true, err }
  }
}

const delBook = async (ownerUsername, id) => {
  try {
    return await query(`DELETE FROM books WHERE id = ${id} AND owner_username = "${ownerUsername}"`)
  } catch (err) {
    return { fail: true, err }
  }
}

module.exports = { query, insert, del, update, updateBook, delBook }
