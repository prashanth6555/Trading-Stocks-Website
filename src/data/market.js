const MARKS = ["#e4c48a", "#9ec1ff", "#7ddec4", "#ffb4a2", "#d7c4ff", "#f2d48a", "#f4efe4", "#8fd0ff"]

export const SECTORS = [
  "Technology",
  "Consumer",
  "Communication",
  "Financials",
  "Healthcare",
  "Energy",
  "Industrials",
]

export const TRENDING = ["NVDA", "AAPL", "TSLA", "META", "AMD", "AMZN", "LLY", "MSFT"]

export const STOCKS = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    sector: "Technology",
    exchange: "NASDAQ",
    price: 228.42,
    change: 0.54,
    cap: "$3.48T",
    pe: 34.1,
    volume: "48.2M",
    dividend: 0.44,
    high52: 260.1,
    low52: 164.08,
    about:
      "Apple designs the iPhone, the Mac, and a services layer that now carries a large share of profit. Traders treat it as the steady mega-cap until a product cycle or a buyback print changes the bid.",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    sector: "Technology",
    exchange: "NASDAQ",
    price: 418.76,
    change: 0.31,
    cap: "$3.11T",
    pe: 35.4,
    volume: "22.4M",
    dividend: 0.74,
    high52: 468.35,
    low52: 344.79,
    about:
      "Microsoft sells cloud, software, and the tools companies already run on. The name usually moves with Azure demand and how much of the tape wants large-cap software.",
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    sector: "Technology",
    exchange: "NASDAQ",
    price: 142.18,
    change: 3.42,
    cap: "$3.48T",
    pe: 52.8,
    volume: "212.6M",
    dividend: null,
    high52: 153.13,
    low52: 86.62,
    about:
      "NVIDIA builds the chips behind the current AI buildout. It is the loudest name on this desk: wide ranges, heavy volume, and a chart that rarely sits still.",
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    sector: "Consumer",
    exchange: "NASDAQ",
    price: 197.35,
    change: 0.88,
    cap: "$2.07T",
    pe: 38.2,
    volume: "41.5M",
    dividend: null,
    high52: 242.52,
    low52: 151.61,
    about:
      "Amazon pairs a huge store with a cloud business that sets the tone for the stock. Sessions often follow retail commentary early and AWS margins later.",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    sector: "Communication",
    exchange: "NASDAQ",
    price: 176.54,
    change: -0.72,
    cap: "$2.16T",
    pe: 22.4,
    volume: "28.1M",
    dividend: 0.31,
    high52: 207.05,
    low52: 140.53,
    about:
      "Alphabet runs search, YouTube, and a cloud arm still catching the leaders. The stock tends to gap on ad-spend notes and then grind with the rest of big tech.",
  },
  {
    symbol: "META",
    name: "Meta Platforms",
    sector: "Communication",
    exchange: "NASDAQ",
    price: 582.11,
    change: 1.94,
    cap: "$1.47T",
    pe: 26.8,
    volume: "16.4M",
    dividend: 0.33,
    high52: 638.4,
    low52: 414.5,
    about:
      "Meta makes its money on ads across Facebook, Instagram, and WhatsApp. Efficiency stories and spending on new bets are what usually bend the daily range.",
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    sector: "Consumer",
    exchange: "NASDAQ",
    price: 248.9,
    change: -1.84,
    cap: "$798B",
    pe: 68.5,
    volume: "96.2M",
    dividend: null,
    high52: 488.54,
    low52: 182,
    about:
      "Tesla builds electric cars and storage, and the stock trades like a referendum on both. Delivery chatter and margin notes move it faster than most of the board.",
  },
  {
    symbol: "AVGO",
    name: "Broadcom Inc.",
    sector: "Technology",
    exchange: "NASDAQ",
    price: 184.22,
    change: 1.62,
    cap: "$862B",
    pe: 36.4,
    volume: "21.8M",
    dividend: 1.12,
    high52: 251.88,
    low52: 128.5,
    about:
      "Broadcom sells custom chips and infrastructure software to the largest buyers in tech. It often rides the same AI bid as NVIDIA, with a slower, heavier tape.",
  },
  {
    symbol: "AMD",
    name: "Advanced Micro Devices",
    sector: "Technology",
    exchange: "NASDAQ",
    price: 156.74,
    change: 2.86,
    cap: "$254B",
    pe: 112.4,
    volume: "58.7M",
    dividend: null,
    high52: 227.3,
    low52: 76.48,
    about:
      "AMD competes in processors and accelerators. The shares are a high-beta way to lean into the same demand that lifts the rest of the chip complex.",
  },
  {
    symbol: "NFLX",
    name: "Netflix Inc.",
    sector: "Communication",
    exchange: "NASDAQ",
    price: 728.15,
    change: -1.15,
    cap: "$311B",
    pe: 42.6,
    volume: "4.8M",
    dividend: null,
    high52: 788.9,
    low52: 542.1,
    about:
      "Netflix sells streaming subscriptions worldwide. Price hikes, paid sharing, and a thin content slate are the usual reasons the chart leaves a long wick.",
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase",
    sector: "Financials",
    exchange: "NYSE",
    price: 224.15,
    change: -0.46,
    cap: "$632B",
    pe: 12.1,
    volume: "9.6M",
    dividend: 2.18,
    high52: 255.24,
    low52: 178.6,
    about:
      "JPMorgan is the largest U.S. bank by assets and a stand-in for the whole financial tape. Rates, credit costs, and trading revenue do most of the work.",
  },
  {
    symbol: "V",
    name: "Visa Inc.",
    sector: "Financials",
    exchange: "NYSE",
    price: 312.48,
    change: -0.18,
    cap: "$608B",
    pe: 29.4,
    volume: "6.2M",
    dividend: 0.76,
    high52: 340.12,
    low52: 252.7,
    about:
      "Visa takes a toll on card payments rather than lending the money. Consumer spending and cross-border travel are the two prints traders circle.",
  },
  {
    symbol: "LLY",
    name: "Eli Lilly",
    sector: "Healthcare",
    exchange: "NYSE",
    price: 812.6,
    change: 1.41,
    cap: "$772B",
    pe: 78.5,
    volume: "3.4M",
    dividend: 0.62,
    high52: 972.53,
    low52: 677.09,
    about:
      "Eli Lilly is being priced for its diabetes and obesity franchise. Supply updates and trial headlines move it more than a typical healthcare name.",
  },
  {
    symbol: "UNH",
    name: "UnitedHealth",
    sector: "Healthcare",
    exchange: "NYSE",
    price: 542.3,
    change: -1.32,
    cap: "$498B",
    pe: 20.8,
    volume: "4.1M",
    dividend: 1.48,
    high52: 630.73,
    low52: 437,
    about:
      "UnitedHealth combines insurance with a care-delivery arm. Medical-cost ratios and policy headlines are what usually knock it off a quiet trend.",
  },
  {
    symbol: "COST",
    name: "Costco Wholesale",
    sector: "Consumer",
    exchange: "NASDAQ",
    price: 916.4,
    change: 0.22,
    cap: "$406B",
    pe: 54.2,
    volume: "1.9M",
    dividend: 0.48,
    high52: 994.86,
    low52: 780.15,
    about:
      "Costco runs membership warehouses with unusually steady traffic. The stock is a quality compounder that still gaps when monthly sales miss a high bar.",
  },
  {
    symbol: "XOM",
    name: "Exxon Mobil",
    sector: "Energy",
    exchange: "NYSE",
    price: 118.22,
    change: 0.73,
    cap: "$516B",
    pe: 14.2,
    volume: "15.7M",
    dividend: 3.36,
    high52: 126.34,
    low52: 97.8,
    about:
      "Exxon Mobil produces oil and gas at a scale that tracks the commodity. The dividend and the crude tape do more for the day than any single headline.",
  },
  {
    symbol: "BA",
    name: "Boeing Co.",
    sector: "Industrials",
    exchange: "NYSE",
    price: 154.88,
    change: -2.26,
    cap: "$116B",
    pe: null,
    volume: "8.4M",
    dividend: null,
    high52: 194.5,
    low52: 128.88,
    about:
      "Boeing builds commercial jets and defense hardware. Delivery delays and quality notes still dominate the chart, so the range stays wider than the sector.",
  },
  {
    symbol: "DIS",
    name: "Walt Disney",
    sector: "Communication",
    exchange: "NYSE",
    price: 98.46,
    change: -0.64,
    cap: "$178B",
    pe: 36.9,
    volume: "11.2M",
    dividend: 0.9,
    high52: 123.74,
    low52: 80.1,
    about:
      "Disney mixes parks, studios, and streaming. Parks traffic has been the steadier bid, while streaming profit is what the tape argues about.",
  },
  {
    symbol: "CRM",
    name: "Salesforce",
    sector: "Technology",
    exchange: "NYSE",
    price: 312.05,
    change: 1.08,
    cap: "$298B",
    pe: 44.7,
    volume: "7.5M",
    dividend: 0.53,
    high52: 369,
    low52: 226.48,
    about:
      "Salesforce sells the system of record for customer teams. Remaining performance obligation and margin guidance are the numbers that reset the trend.",
  },
  {
    symbol: "INTC",
    name: "Intel Corp.",
    sector: "Technology",
    exchange: "NASDAQ",
    price: 24.18,
    change: -2.94,
    cap: "$104B",
    pe: null,
    volume: "62.1M",
    dividend: null,
    high52: 37.16,
    low52: 18.51,
    about:
      "Intel is spending through a foundry rebuild while the PC and server cycles do the near-term work. It is the deep laggard of this board when chips rally without it.",
  },
]

export const INDICES = [
  { symbol: "SPX", name: "S&P 500", price: 5824.32, change: 0.62, kind: "index" },
  { symbol: "NDX", name: "Nasdaq 100", price: 20418.12, change: 0.91, kind: "index" },
  { symbol: "DJI", name: "Dow Jones", price: 42840.55, change: -0.18, kind: "index" },
  { symbol: "RUT", name: "Russell 2000", price: 2214.7, change: 0.34, kind: "index" },
  { symbol: "NIFTY", name: "Nifty 50", price: 24180.45, change: 0.47, kind: "index" },
  { symbol: "SENSEX", name: "Sensex", price: 79640.2, change: 0.41, kind: "index" },
  { symbol: "GOLD", name: "Gold", price: 2674.8, change: 0.22, kind: "index" },
  { symbol: "BTC", name: "Bitcoin", price: 87420, change: -1.15, kind: "index" },
]

export const NOTES = [
  {
    tag: "Semiconductors",
    title: "NVIDIA leads the tape as traders lean back into the AI complex.",
    time: "12m ago",
    symbol: "NVDA",
  },
  {
    tag: "Mega cap",
    title: "Apple holds a narrow gain while the desk waits on services margins.",
    time: "28m ago",
    symbol: "AAPL",
  },
  {
    tag: "Consumer",
    title: "Tesla slips for a second session as delivery chatter cools the bid.",
    time: "41m ago",
    symbol: "TSLA",
  },
  {
    tag: "Healthcare",
    title: "Eli Lilly stays with the leaders and extends a quiet run.",
    time: "1h ago",
    symbol: "LLY",
  },
  {
    tag: "Energy",
    title: "Exxon firms with crude while the broader board stays mixed.",
    time: "2h ago",
    symbol: "XOM",
  },
  {
    tag: "Macro",
    title: "Indexes diverge: Nasdaq outperforms as the Dow drifts under flat.",
    time: "3h ago",
    symbol: null,
  },
]

export const SEED = {
  cash: 18450.25,
  watchlist: ["TSLA", "AMD", "META", "AMZN", "LLY"],
  holdings: {
    AAPL: { qty: 12, avg: 214.2 },
    NVDA: { qty: 6, avg: 128.4 },
    MSFT: { qty: 4, avg: 402.1 },
    JPM: { qty: 10, avg: 228.4 },
  },
  orders: [
    {
      id: "ord-5",
      symbol: "JPM",
      side: "buy",
      qty: 10,
      price: 228.4,
      total: 2284,
      at: "2026-11-11T10:16:00",
    },
    {
      id: "ord-4",
      symbol: "MSFT",
      side: "buy",
      qty: 4,
      price: 402.1,
      total: 1608.4,
      at: "2026-11-08T15:44:00",
    },
    {
      id: "ord-3",
      symbol: "NVDA",
      side: "sell",
      qty: 2,
      price: 140.8,
      total: 281.6,
      at: "2026-11-07T11:24:00",
    },
    {
      id: "ord-2",
      symbol: "NVDA",
      side: "buy",
      qty: 8,
      price: 128.4,
      total: 1027.2,
      at: "2026-11-05T14:02:00",
    },
    {
      id: "ord-1",
      symbol: "AAPL",
      side: "buy",
      qty: 12,
      price: 214.2,
      total: 2570.4,
      at: "2026-11-03T15:10:00",
    },
  ],
}

export function freshBook() {
  return structuredClone(SEED)
}

export function colorFor(symbol) {
  let total = 0
  for (const char of symbol) total += char.charCodeAt(0)
  return MARKS[total % MARKS.length]
}

export function gainersOf(quotes) {
  return [...quotes].filter((quote) => quote.change >= 0).sort((a, b) => b.change - a.change)
}

export function losersOf(quotes) {
  return [...quotes].filter((quote) => quote.change < 0).sort((a, b) => a.change - b.change)
}

function hash(text) {
  let h = 2166136261
  for (let i = 0; i < text.length; i += 1) {
    h ^= text.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed) {
  let a = seed >>> 0
  return function rand() {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), a | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function sparkFor(symbol, endPrice) {
  const rand = mulberry32(hash(`${symbol}:spark`))
  let price = endPrice * 0.96
  const values = []
  for (let i = 0; i < 18; i += 1) {
    price = Math.max(1, price * (1 + (rand() - 0.48) * 0.025))
    values.push(Number(price.toFixed(2)))
  }
  values[values.length - 1] = endPrice
  return values
}

const WEEK = [
  new Date(2026, 10, 6),
  new Date(2026, 10, 9),
  new Date(2026, 10, 10),
  new Date(2026, 10, 11),
  new Date(2026, 10, 12),
]

function axisLabel(range, index, count) {
  if (range === "1D") {
    const minutes = 9 * 60 + 30 + Math.round((index / (count - 1)) * 390)
    const hh = String(Math.floor(minutes / 60)).padStart(2, "0")
    const mm = String(minutes % 60).padStart(2, "0")
    return `${hh}:${mm}`
  }
  if (range === "1W") {
    const hours = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "16:30"]
    const day = Math.min(WEEK.length - 1, Math.floor(index / 8))
    const label = WEEK[day].toLocaleDateString("en-US", { weekday: "short" })
    return `${label} ${hours[index % 8]}`
  }
  const day = new Date(2026, 10, 12)
  day.setDate(day.getDate() - (count - 1 - index))
  return day.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function buildSeries(symbol, range, endPrice) {
  const spec = {
    "1D": { count: 64, vol: 0.0032 },
    "1W": { count: 40, vol: 0.011 },
    "1M": { count: 30, vol: 0.02 },
  }[range]
  const rand = mulberry32(hash(`${symbol}:${range}`))
  let price = endPrice
  const points = []
  for (let index = spec.count - 1; index >= 0; index -= 1) {
    const volume = Math.round(350000 + rand() * 2800000)
    points.push({
      label: axisLabel(range, index, spec.count),
      price: Number(price.toFixed(2)),
      volume,
    })
    if (index !== 0) {
      price = Math.max(1, price + (rand() - 0.5) * spec.vol * endPrice)
    }
  }
  return points.reverse()
}

export function decorate(item) {
  const open = Number((item.price / (1 + item.change / 100)).toFixed(4))
  return {
    ...item,
    anchor: item.price,
    open,
    dir: "flat",
    tick: 0,
    spark: sparkFor(item.symbol, item.price),
  }
}

function tickOne(item) {
  const drift = (Math.random() - 0.48) * 0.0026
  const price = Number(Math.max(0.5, item.price * (1 + drift)).toFixed(2))
  const change = ((price - item.open) / item.open) * 100
  const spark = item.spark.slice()
  spark[spark.length - 1] = price
  return {
    ...item,
    price,
    change,
    spark,
    dir: price > item.price ? "up" : price < item.price ? "down" : "flat",
    tick: item.tick + 1,
  }
}

export function tickSome(list) {
  return list.map((item) => (Math.random() > 0.5 ? item : tickOne(item)))
}
