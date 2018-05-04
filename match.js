window.match = (function() {

    function _match(val) {
        var list = []
        list.push(val)
        list.__proto__ = _match.prototype
        return list
    }

    _match.prototype.case = function(conditions) {
        this.case = []
        this.ans = []
        Array.from(conditions).forEach((el) => {
            this.case.push(el)
            this.ans.push(el === this[0])
        })
        if(this.ans.filter((el) => el === true).length === 0) {
            this.ans.push(true)
        }
        return this
    }

    _match.prototype.do = function(line, callback) {
        if(!callback) {
            var callback = (el) =>  el()
        }
        Array.from(this.ans).map((ans,i) => {
            if(ans === true && line[i]) {
                callback(line[i])
            }
        })
        return this
    }

    var init = function(val) {
        return new _match(val)
    }

    return init
}())