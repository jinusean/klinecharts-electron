import { init, version } from 'klinecharts'

import candles from './candles.json'

const chart = init('chart')

chart?.applyNewData(candles)
chart?.setPriceVolumePrecision(6, 10)


window.addEventListener('resize', () => chart?.resize())

