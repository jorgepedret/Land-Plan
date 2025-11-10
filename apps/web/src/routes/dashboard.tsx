import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

type Task = { id:number; title:string; status:"todo"|"doing"|"done"; dueDate:string; bedId:number };

export default function Dashboard(){
  const { data: today } = useQuery({
    queryKey:["tasks","today"],
    queryFn:()=>api<Task[]>("/api/tasks?range=today")
  });
  const { data: week } = useQuery({
    queryKey:["tasks","week"],
    queryFn:()=>api<Task[]>("/api/tasks?range=week")
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <section>
        <h2 className="text-xl font-semibold">Today’s tasks</h2>
        <ul className="list-disc pl-6">
          {(today ?? []).map(t => <li key={t.id}>{t.title}</li>)}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">This week</h2>
        <ul className="list-disc pl-6">
          {(week ?? []).map(t => <li key={t.id}>{t.title}</li>)}
        </ul>
      </section>
    </div>
  );
}