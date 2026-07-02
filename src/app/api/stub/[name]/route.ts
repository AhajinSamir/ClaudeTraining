import { NextRequest, NextResponse } from "next/server"
import { readFileSync } from "fs"
import { join } from "path"

const VALID_STUBS = new Set([
  "account",
  "addons",
  "billing",
  "tickets",
  "activity",
  "usage-history",
  "usage",
])

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params

  if (!VALID_STUBS.has(name)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const filePath = join(process.cwd(), "stubs", `${name}.json`)
  const data: unknown = JSON.parse(readFileSync(filePath, "utf-8"))

  return NextResponse.json(data)
}
