const CFG = require("../configs/config.json")

const admin = "1113951433365127318"
const modo = "1113453048925265970"
const support = "1113950111253413929"
const whitelisted = "1113952117435146370"
const nonwhitelisted = "1113453224133939210"
const gouvernment = "1135671416419778590"

authorized_inner = [admin, modo, support],

module.exports = {
    authorized: [admin, modo, support],
    authorized_gouvernment: [admin, modo, support, gouvernment],
    admin: admin,
    modo: modo,
    support: support,
    whitelisted: whitelisted,
    nonwhitelisted: nonwhitelisted,
    autho: (it) =>{
        flag = false
        authorized_inner.forEach((r)=>{
            if(it.member._roles.includes(r) && !flag){
                flag =  true
                return
            }
        })
        return flag
    },
    authoMember: (member) =>{
        flag = false
        authorized_inner.forEach((r)=>{
            if(member._roles.includes(r) && !flag){
                flag =  true
                return
            }
        })
        return flag
    }
}