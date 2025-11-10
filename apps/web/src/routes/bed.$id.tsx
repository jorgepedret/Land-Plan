import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";

type Plant = { id:number; commonName:string; latinName?:string };
type Task = { id:number; title:string; status:"todo"|"doing"|"done" };
type Bed = { id:number; name:string; shade:"full"|"partial"|"none" };

export default function BedDetail(){
  const { id } = useParams();
  const qc = useQueryClient();
  const { data: bed } = useQuery({ queryKey:["bed",id], queryFn:()=>api<Bed>(`/api/beds/${id}`) });
  const { data: plants } = useQuery({ queryKey:["plants",id], queryFn:()=>api<Plant[]>(`/api/beds/${id}/plants`) });
  const { data: tasks } = useQuery({ queryKey:["tasks","bed",id], queryFn:()=>api<Task[]>(`/api/beds/${id}/tasks`) });

  const addTask = useMutation({
    mutationFn: (title:string)=> api<Task>("/api/tasks", { method:"POST", body: JSON.stringify({ title, bedId: Number(id) }) }),
    onSuccess: ()=> qc.invalidateQueries({ queryKey:["tasks","bed",id] })
  });

  if(!bed) return null;
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{bed.name}</h2>
      <section>
        <h3 className="font-semibold">Plants</h3>
        <ul className="list-disc pl-6">{(plants??[]).map(p=><li key={p.id}>{p.commonName} <span className="text-gray-500 italic">{p.latinName}</span></li>)}</ul>
      </section>
      <section>
        <h3 className="font-semibold">Tasks</h3>
        <ul className="list-disc pl-6">{(tasks??[]).map(t=><li key={t.id}>{t.title} — {t.status}</li>)}</ul>
        <button className="mt-2 px-3 py-1 bg-blue-600 text-white rounded" onClick={()=>addTask.mutate("Custom task")}>Add task</button>
      </section>
    </div>
  );
}