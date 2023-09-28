export const validate = (input) => {
    let target = input.target
    if (target.hasAttribute('no-validate')) {
        return
    }
    if (target.getAttribute('type') === 'cpf') {
        if (target.value.length > 0) {

            if (target.value.length === 14) {
                target.classList.add('is-valid')
                return true
            } else {
                target.classList.add('is-invalid')
                if (target.nextSibling.classList.contains('invalid-feedback')) {
                    target.nextSibling.innerText = 'CPF inválido'
                }
            }
        } else {
            target.classList.add('is-invalid')
            if (target.nextSibling.classList.contains('invalid-feedback')) {
                target.nextSibling.innerText = 'Você deve informar um CPF'
            }
        }
    } else if (target.getAttribute('type') === 'email') {
        if (target.value.length > 0) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(target.value)) {
                target.classList.add('is-valid')
                return true
            } else {
                target.classList.add('is-invalid')
                if (target.nextSibling.classList.contains('invalid-feedback')) {
                    target.nextSibling.innerText = 'E-mail inválido'
                }
            }
        } else {
            target.classList.add('is-invalid')
            if (target.nextSibling.classList.contains('invalid-feedback')) {
                target.nextSibling.innerText = 'Você deve informar um e-mail'
            }
        }
    } else if (target.getAttribute('type') === 'password') {

    } else {

        if (target.hasAttribute('required')) {
            if (target.value.length > 0) {
                target.classList.add('is-valid')
                return true
            } else {
                target.classList.add('is-invalid')
                if (target.nextSibling.classList.contains('invalid-feedback')) {
                    target.nextSibling.innerText = 'O campo não pode ser vazio'
                }
            }
        }
    }
    return false
}

export const asPhone = (str) => {
    str = str.toString()
    return str
        .replace(/\D/g, '')
        .replace(/(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})/,
            (fullMatch, country, ddd, dddWithZero, prefixTel, suffixTel) => {
                if (country) return `${country} (${ddd || dddWithZero}) ${prefixTel}-${suffixTel}`
                if (ddd || dddWithZero) return `(${ddd || dddWithZero}) ${prefixTel}-${suffixTel}`
                if (prefixTel && suffixTel) return `${prefixTel}-${suffixTel}`
                return str
            }
        )
}

export default {
    validate,
    asPhone
}