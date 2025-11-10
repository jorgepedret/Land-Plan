import { prisma } from "../src/lib/prisma";

async function run(){
  const grower = await prisma.user.upsert({
    where:{ email:"grower@example.com" },
    update:{},
    create:{ email:"grower@example.com", role:"GROWER" }
  });

  const plot = await prisma.plot.create({
    data:{ name:"North Field", location:"Coordinates XYZ", ownerId: grower.id }
  });

  const bed1 = await prisma.bed.create({ data:{ name:"Bed A", shade:"partial", plotId: plot.id } });
  const bed2 = await prisma.bed.create({ data:{ name:"Bed B", shade:"full", plotId: plot.id } });

  await prisma.plant.createMany({
    data:[
      { commonName:"Kale", latinName:"Brassica oleracea", bedId: bed1.id },
      { commonName:"Carrot", latinName:"Daucus carota", bedId: bed1.id },
      { commonName:"Garlic", latinName:"Allium sativum", bedId: bed2.id },
    ]
  });

  const today = new Date();
  const in3 = new Date(); in3.setDate(today.getDate()+3);

  await prisma.task.createMany({
    data:[
      { title:"Water Bed A", bedId: bed1.id, dueDate: today, status:"TODO" },
      { title:"Weed Bed B", bedId: bed2.id, dueDate: in3, status:"TODO" },
    ]
  });
}
run().then(()=>process.exit(0)).catch(e=>{ console.error(e); process.exit(1); });