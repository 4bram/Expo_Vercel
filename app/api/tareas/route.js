import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase.from("tareas").select("*").order("id");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request) {
  const { titulo } = await request.json();
  if (!titulo) {
    return NextResponse.json({ error: "titulo es obligatorio" }, { status: 400 });
  }
  const { data, error } = await supabase
    .from("tareas").insert({ titulo }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}