// import { Outlet, Link } from "react-router-dom";

// function Sidebar() {
//   return (
//     <aside className="h-screen sticky top-0 border-r bg-white">
      // <div className="p-4 text-lg font-semibold">Land Plan</div>
      // <nav className="p-2 space-y-1">
      //   <Link className="block rounded px-3 py-2 hover:bg-slate-100" to="/">Dashboard</Link>
      //   <Link className="block rounded px-3 py-2 hover:bg-slate-100" to="/plots">Plots</Link>
      // </nav>
//     </aside>
//   );
// }

// export default function App() {
//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="grid grid-cols-[240px_1fr]">
//         <Sidebar />
//         <div>
//           <header className="border-b bg-white">
//             <div className="mx-auto w-full max-w-[1200px] px-4 py-3">
//               <h1 className="text-xl font-semibold">Dashboard</h1>
//             </div>
//           </header>

//           <main className="py-6">
//             <div className="mx-auto w-full max-w-[1200px] px-4">
//               <Outlet />
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen">
      <div className="p-4 text-lg font-semibold">Land Plan</div>
      <nav className="p-2 space-y-1">
        <Link className="block rounded px-3 py-2 hover:bg-slate-100" to="/">Dashboard</Link>
        <Link className="block rounded px-3 py-2 hover:bg-slate-100" to="/plots">Plots</Link>
      </nav>
      <main className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      <footer className="text-center p-4 text-sm text-gray-500">
        &copy; 2025 Land Plan
      </footer>
    </div>
  );
}