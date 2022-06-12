import { ICommand } from 'wokcommands'

export default {
    category: "Utility",
    description: "Replies with pong.",

    slash: 'both',
    callback: ({}) => {
        return 'Pong'
    }
} as ICommand