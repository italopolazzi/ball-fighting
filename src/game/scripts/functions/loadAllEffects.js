import Cure from '@/game/scripts/Effects/EffectCancelable/Cure.js'

import Virus from '@/game/scripts/Effects/EffectInfectious/Virus.js'

import Death from '@/game/scripts/Effects/EffectInstant/Death.js'
import LessLifes from '@/game/scripts/Effects/EffectInstant/LessLifes.js'
import MoreLifes from '@/game/scripts/Effects/EffectInstant/MoreLifes.js'

import Immunity from '@/game/scripts/Effects/EffectCounter/Immunity.js'
import Revival from '@/game/scripts/Effects/EffectCounter/Revival.js'

import Bolt from '@/game/scripts/Effects/EffectTimeout/Bolt.js'
import Ice from '@/game/scripts/Effects/EffectTimeout/Ice.js'
import Invisible from '@/game/scripts/Effects/EffectTimeout/Invisible.js'
import Turtle from '@/game/scripts/Effects/EffectTimeout/Turtle.js'

import Curse from '@/game/scripts/Effects/EffectTransferable/Curse.js'
import Benediction from '@/game/scripts/Effects/EffectTransferable/Benediction.js'

const loadAllEffects = () => {
    return [
        Cure,
        Virus,
        Death,
        LessLifes,
        MoreLifes,
        Immunity,
        Revival,
        Bolt,
        Ice,
        Invisible,
        Turtle,
        Curse,
        Benediction
    ]
}

export default loadAllEffects