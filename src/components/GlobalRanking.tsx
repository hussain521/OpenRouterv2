import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ranking = [
  {
    rank: 1,
    name: "OpenClaw",
    desc: "The AI that actually does things",
    tokens: "422B tokens",
  },
  {
    rank: 2,
    name: "Kilo Code",
    desc: "AI coding agent for VS Code",
    tokens: "159B tokens",
  },
  {
    rank: 3,
    name: "BLACKBOXAI",
    desc: "AI agent for builders",
    tokens: "93.1B tokens",
  },
  {
    rank: 4,
    name: "liteLLM",
    desc: "Open-source library to simplify LLM calls",
    tokens: "80.1B tokens",
  },
  {
    rank: 5,
    name: "Claude Code",
    desc: "The AI for problem solvers",
    tokens: "54.2B tokens",
  },
  {
    rank: 6,
    name: "Descript",
    desc: "AI Video & Podcast Editor",
    tokens: "38.9B tokens",
  },
  {
    rank: 7,
    name: "Janitor AI",
    desc: "Character chat and creation",
    tokens: "30.7B tokens",
  },
  {
    rank: 8,
    name: "Cline",
    desc: "Autonomous coding agent right in your IDE",
    tokens: "26.2B tokens",
  },
  {
    rank: 9,
    name: "ISEKAI ZERO",
    desc: "AI adventures with your favorite characters",
    tokens: "24.8B tokens",
  },
  {
    rank: 10,
    name: "Roo Code",
    desc: "A whole dev team of AI agents",
    tokens: "17.6B tokens",
  },
]

function RankingRow({ item }: { item: typeof ranking[0] }) {
  return (
    <div className="flex items-center justify-between py-4 border-b last:border-none">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-6">
          {item.rank}.
        </span>

        <div className="w-10 h-10 rounded-lg bg-muted"></div>

        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-muted-foreground">
            {item.desc}
          </p>
        </div>
      </div>

      <span className="font-medium">
        {item.tokens}
      </span>
    </div>
  )
}

export function GlobalRanking() {
  const left = ranking.slice(0, 5)
  const right = ranking.slice(5, 10)

  return (
    <Card className="rounded-2xl mt-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">
          Global Ranking
        </CardTitle>

        <select className="border rounded-md px-3 py-1 text-sm">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            {left.map((item) => (
              <RankingRow key={item.rank} item={item} />
            ))}
          </div>

          <div>
            {right.map((item) => (
              <RankingRow key={item.rank} item={item} />
            ))}
          </div>
        </div>

        {/* pagination */}
        <div className="flex justify-center items-center gap-6 mt-8 text-sm">
          <button className="px-3 py-1 border rounded">
            ‹
          </button>

          <span className="text-muted-foreground">
            1–20 of 60
          </span>

          <button className="px-3 py-1 border rounded">
            ›
          </button>
        </div>
      </CardContent>
    </Card>
  )
}