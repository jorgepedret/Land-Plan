import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
type Bed = { id:number; name:string; shade:"full"|"partial"|"none" };
type Plot = { id:number; name:string; location:string };
export default function PlotDetail(){
  const { id } = useParams();
  const { data: plot } = useQuery({ queryKey:["plot",id], queryFn:()=>api<Plot>(`/api/plots/${id}`) });
  const { data: beds } = useQuery({ queryKey:["beds",id], queryFn:()=>api<Bed[]>(`/api/beds?plotId=${id}`) });
  if(!plot) return null;
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{plot.name}</h2>
      <div className="text-gray-600">{plot.location}</div>
      <h3 className="font-semibold">Beds</h3>
      <ul className="list-disc pl-6">
        {(beds ?? []).map(b => <li key={b.id}><Link className="underline" to={`/beds/${b.id}`}>{b.name}</Link> <span className="text-gray-500">({b.shade})</span></li>)}
      </ul>
    </div>
  );
}