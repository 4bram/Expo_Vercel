import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PUT(request, { params }) {
  const { id } = await params;
  const { titulo, completada } = await request.json();
  const { data, error } = await supabase
    .from("tareas").update({ titulo, completada }).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const { error } = await supabase.from("tareas").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return new Response(null, { status: 204 });
}