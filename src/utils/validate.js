import Schema from 'async-validator'

export const onValidateField = (value, rules) => {
  return new Promise((resolve, reject) => {
    const validator = new Schema(rules);
    validator.validate(value, (error, fields) => {
      if (error) {
        resolve(error)
      } else {
        const errorMsg = Object.keys(fields).map(key => ({
          field: key,
          fieldValue: value[key],
          message: ''
        }))
        resolve(errorMsg)
      }
    })
  })
}

export const getErrorMessage = (errors) => {
  const msgErrorList = {}
  errors.forEach(item => msgErrorList[item.field] = item.message)
  return msgErrorList
}