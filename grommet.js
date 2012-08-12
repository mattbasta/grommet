function grom(func, args) {
    this.is_grommet = true;

    // Save the information necessary to call the callback.
    this.func = func;
    this.args = args || [];

    this.callbacks = $.Callbacks("memory unique");
    this.delay_count = 0;

    this.thens = [];

    var t = this;

    this.go = function() {
        if(this.delay_count)
            return;
        
        while(this.thens) {
            var then = this.thens.shift();
            if(typeof then == "function")
                then.apply(this, []);
            else if(typeof then == "object" && then.is_grommet)
                then.go();
            
        }

        this.func.apply(this, this.args);
        this.callbacks.fire();
    };
    this.after = function(g) {
        if(typeof g !== "object" || !g.is_grommet)
            throw new Exception("Cannot chain grommets to functions.");
        t.delay_count++;
        g.callbacks.add(function() {
            t.delay_count--;
            t.go();
        });
        return this;
    };
    this.then = function(f) {
        this.thens.push(f);
        return this;
    };
    this.delay = function(f) {
        t.delay_count++;
        return function() {
            if(f)
                var out = f.apply(this, arguments);
            
            t.delay_count--;
            t.go();
            return out;
        };
    };

    return this;
}