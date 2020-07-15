import Cure from '/GameCore/scripts/Effects/EffectCancelable/Cure.js'

import Virus from '/GameCore/scripts/Effects/EffectInfectious/Virus.js'

import Death from '/GameCore/scripts/Effects/EffectInstant/Death.js'
import LessLifes from '/GameCore/scripts/Effects/EffectInstant/LessLifes.js'
import MoreLifes from '/GameCore/scripts/Effects/EffectInstant/MoreLifes.js'

import Immunity from '/GameCore/scripts/Effects/EffectCounter/Immunity.js'
import Revival from '/GameCore/scripts/Effects/EffectCounter/Revival.js'

import Bolt from '/GameCore/scripts/Effects/EffectTimeout/Bolt.js'
import Ice from '/GameCore/scripts/Effects/EffectTimeout/Ice.js'
import Invisible from '/GameCore/scripts/Effects/EffectTimeout/Invisible.js'
import Turtle from '/GameCore/scripts/Effects/EffectTimeout/Turtle.js'

import Curse from '/GameCore/scripts/Effects/EffectTransferable/Curse.js'
import Benediction from '/GameCore/scripts/Effects/EffectTransferable/Benediction.js'

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
        // Invisible,
        Turtle,
        Curse,
        Benediction
    ]
}

export default loadAllEffects