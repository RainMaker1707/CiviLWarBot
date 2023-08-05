

module.exports = {
    getOpt: (it, ops) => {
        let arg
        it.options._hoistedOptions.forEach((opt)=>{
            switch(opt.name){
                case ops: arg = opt.value; break;
            }
        })
        return arg
    }
}