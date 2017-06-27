const { Command } = require('discord-akairo');
const Logger = require('../../util/Logger');

class RPNCommand extends Command {
    constructor() {
        super('rpn', {
            aliases: ['rpn'],
            category: 'eval',
            args: [
                {
                    id: 'text',
                    match: 'content'
                }
            ]
        });
    }

    exec(message, { text }) {
        if (!text) {
            Logger.error('No text provided to evaluate.');
            return message.delete();
        }

        const ops = text.match(/[\d.]+|\S+/g);
        if (!ops) return message.edit(`\`${text} = NaN\``);

        const stack = [];

        for (const char of ops) {
            if (isNaN(char)) {
                if (!RPNCommand.OPERATORS[char] && !RPNCommand.CONSTANTS[char]) continue;

                if (RPNCommand.CONSTANTS[char]) {
                    stack.unshift(RPNCommand.CONSTANTS[char]);
                    continue;
                }

                const operator = RPNCommand.OPERATORS[char];
                const values = stack.splice(0, operator.length);

                if (values.some(v => v == null)) return message.edit(`\`${text} = NaN\``);

                const res = operator(...values.reverse());
                stack.unshift(res);
                continue;
            }

            stack.unshift(parseFloat(char));
        }

        if (stack.length !== 1) return message.edit(`\`${text} = NaN\``);
        return message.edit(`\`${text} = ${stack[0]}\``);
    }
}

RPNCommand.OPERATORS = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    x: (a, b) => a * b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '%': (a, b) => a % b,
    '&': (a, b) => a & b,
    '|': (a, b) => a | b,
    '^': (a, b) => a ^ b,
    '>>': (a, b) => a >> b,
    '<<': (a, b) => a << b,
    '>>>': (a, b) => a >>> b,
    '//': (a, b) => Math.floor(a / b),
    '**': (a, b) => Math.pow(a, b),
    pow: (a, b) => Math.pow(a, b),
    rt: (a, b) => Math.pow(a, 1 / b),
    root: (a, b) => Math.pow(a, 1 / b),
    '~': a => ~a,
    '√': a => Math.sqrt(a),
    '!': a => {
        if (a < 0 || Math.floor(a) !== a) return NaN;
        let temp = 1;
        for (let i = 2; i <= a; i++) temp *= i;
        return temp;
    },
    sqrt: a => Math.sqrt(a),
    logn: a => Math.log(a),
    logb: a => Math.log2(a),
    logc: a => Math.log10(a),
    ln: a => Math.log(a),
    lb: a => Math.log2(a),
    lc: a => Math.log10(a),
    sin: a => Math.sin(a),
    cos: a => Math.cos(a),
    tan: a => Math.tan(a),
    abs: a => Math.abs(a),
    floor: a => Math.floor(a),
    round: a => Math.round(a),
    ceil: a => Math.ceil(a),
    quadp: (a, b, c) => (-b + Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a),
    quadn: (a, b, c) => (-b - Math.sqrt(Math.pow(b, 2) - (4 * a * c))) / (2 * a)
};

RPNCommand.CONSTANTS = {
    pi: Math.PI,
    π: Math.PI,
    tau: Math.PI * 2,
    τ: Math.PI * 2,
    e: Math.E,
    G: 6.67408 * Math.pow(10, -11),
    c: 299792458,
    weed: 420,
    gr: (1 + Math.sqrt(5)) / 2,
    φ: (1 + Math.sqrt(5)) / 2
};

module.exports = RPNCommand;
