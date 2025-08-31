// src/App.jsx
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import Cropper from "react-easy-crop";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { fabric } from "fabric";
import { motion, AnimatePresence } from "framer-motion";
import { Home as HomeIcon, Grid as GridIcon, User as UserIcon, ArrowLeft } from "lucide-react";

/* Theme constants (for readability) */
const BG_GRAD = "min-h-screen bg-gradient-to-b from-dsrt1 via-dsrt2 to-dsrt3 text-white";

/* ---------------- Auth Context ---------------- */
const AuthContext = createContext(null);
function useAuth(){ return useContext(AuthContext); }

function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  useEffect(() => {
    const raw = localStorage.getItem("dsrt_user_v2");
    if (raw) setUser(JSON.parse(raw));
  }, []);
  const login = (email) => { const u = { email }; setUser(u); localStorage.setItem("dsrt_user_v2", JSON.stringify(u)); };
  const register = (email) => { const u = { email }; setUser(u); localStorage.setItem("dsrt_user_v2", JSON.stringify(u)); };
  const logout = () => { setUser(null); localStorage.removeItem("dsrt_user_v2"); };
  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>;
}

/* ------------- Protected Route -------------- */
function ProtectedRoute({ children }){
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

/* ------------- Small UI components ------------ */
function NeonButton({ children, className="", ...rest }){
  return <button {...rest} className={`rounded-2xl px-5 py-3 font-semibold neon-shadow bg-gradient-to-tr from-indigo-500 to-fuchsia-500 ${className}`}>{children}</button>;
}
function GlassCard({ children, className="" }){
  return <div className={`rounded-2xl p-4 glass ${className}`}>{children}</div>;
}
function NavBar(){
  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[min(520px,94%)] z-40">
      <div className="rounded-full px-2 py-1 bg-black/30 backdrop-blur border border-white/6 flex justify-around">
        <Link to="/home" className="flex flex-col items-center text-xs gap-1 px-4 py-2"><HomeIcon size={18} /><span>Home</span></Link>
        <Link to="/workspace" className="flex flex-col items-center text-xs gap-1 px-4 py-2"><GridIcon size={18} /><span>Workspace</span></Link>
        <Link to="/profile" className="flex flex-col items-center text-xs gap-1 px-4 py-2"><UserIcon size={18} /><span>Profil</span></Link>
      </div>
    </nav>
  );
}

/* ------------- Splash & Landing ------------- */
function Splash(){
  const nav = useNavigate();
  useEffect(() => { const t = setTimeout(()=>nav("/landing"), 900); return () => clearTimeout(t); }, [nav]);
  return (
    <div className={`${BG_GRAD} grid place-items-center`}>
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .5 }} className="text-center">
        <div className="text-6xl font-extrabold tracking-tight">DSRT</div>
        <div className="mt-2 opacity-80">Digital Smart Revise Technology</div>
        <div className="mt-3 text-sm opacity-70">Edit Foto • Edit Video • Buat Logo</div>
      </motion.div>
    </div>
  );
}

function Landing(){
  const [open, setOpen] = useState(false);
  return (
    <div className={`${BG_GRAD} pb-32`}>
      <div className="max-w-md mx-auto px-6 pt-28 text-center">
        <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y:0, opacity:1 }} transition={{ duration:.45 }}>
          <div className="text-6xl font-extrabold">DSRT</div>
          <div className="mt-2 opacity-80">Digital Smart Revise Technology</div>
          <p className="mt-6 text-lg opacity-90">Aplikasi kreatif all-in-one untuk editing foto, video & desain logo.</p>
          <div className="mt-10">
            <NeonButton onClick={() => setOpen(true)} className="w-full">Masuk</NeonButton>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-3 gap-3">
          <GlassCard className="aspect-[9/16] flex items-center justify-center">📷</GlassCard>
          <GlassCard className="aspect-[9/16] flex items-center justify-center">🎞️</GlassCard>
          <GlassCard className="aspect-[9/16] flex items-center justify-center">🎨</GlassCard>
        </div>
      </div>

      <AnimatePresence>{open && <LoginModal onClose={() => setOpen(false)} />}</AnimatePresence>
    </div>
  );
}

/* ------------- Auth UI ------------- */
function LoginModal({ onClose }){
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  function submit(e){ e?.preventDefault(); if(!email) return alert("Email kosong"); login(email); onClose(); nav("/home"); }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <motion.div initial={{ y:20, opacity:0 }} animate={{ y:0, opacity:1 }} exit={{ y:12, opacity:0 }} className="relative mx-4 w-full max-w-sm rounded-3xl bg-[#0e0e14] border border-white/6 p-6">
        <h3 className="text-xl font-semibold">Masuk ke DSRT</h3>
        <form onSubmit={submit} className="mt-4 grid gap-3">
          <input className="rounded-xl p-3 bg-white/5 outline-none" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input type="password" className="rounded-xl p-3 bg-white/5 outline-none" placeholder="Password" />
          <button className="rounded-2xl p-3 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 font-semibold">Masuk</button>
        </form>
        <div className="mt-3 text-center"><Link to="/register" onClick={onClose} className="text-sm opacity-80">Belum punya akun? Daftar</Link></div>
      </motion.div>
    </div>
  );
}

function LoginPage(){
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  function submit(e){ e?.preventDefault(); if(!email) return alert("Masukkan email"); login(email); nav("/home"); }
  return (
    <div className={`${BG_GRAD} p-4`}>
      <div className="max-w-md mx-auto pt-16">
        <div className="mb-6"><Link to="/landing" className="text-sm opacity-70">← Kembali</Link></div>
        <GlassCard>
          <h2 className="text-xl font-semibold">Masuk</h2>
          <form onSubmit={submit} className="mt-4 grid gap-3">
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="rounded-xl p-3 bg-white/5" />
            <input type="password" placeholder="Password" className="rounded-xl p-3 bg-white/5" />
            <button className="rounded-2xl p-3 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 font-semibold">Masuk</button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}

function RegisterPage(){
  const { register } = useAuth();
  const [email, setEmail] = useState("");
  const nav = useNavigate();
  function submit(e){ e?.preventDefault(); if(!email) return alert("Masukkan email"); register(email); nav("/home"); }
  return (
    <div className={`${BG_GRAD} p-4`}>
      <div className="max-w-md mx-auto pt-16">
        <GlassCard>
          <h2 className="text-xl font-semibold">Daftar</h2>
          <form onSubmit={submit} className="mt-4 grid gap-3">
            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" className="rounded-xl p-3 bg-white/5" />
            <input type="password" placeholder="Password" className="rounded-xl p-3 bg-white/5" />
            <button className="rounded-2xl p-3 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 font-semibold">Buat Akun</button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}

/* ------------- Home / Workspace / Profile ------------- */
function Home(){
  const { user } = useAuth();
  return (
    <div className={`${BG_GRAD} pb-28`}>
      <div className="max-w-md mx-auto px-6 pt-10">
        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}>
          <h2 className="text-2xl font-semibold">Hai, <span className="opacity-90">{user?.email || "User"}</span> 👋</h2>
          <p className="mt-1 text-sm opacity-70">Mulai proyek kreatifmu.</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link to="/edit-foto"><GlassCard className="p-4 flex flex-col items-start gap-3"><div className="text-2xl">📷</div><div className="font-medium">Edit Foto</div><div className="text-sm opacity-70">Crop, filter, teks</div></GlassCard></Link>
            <Link to="/edit-video"><GlassCard className="p-4 flex flex-col items-start gap-3"><div className="text-2xl">🎞️</div><div className="font-medium">Edit Video</div><div className="text-sm opacity-70">Trim, merge</div></GlassCard></Link>
            <Link to="/edit-logo"><GlassCard className="p-4 flex flex-col items-start gap-3"><div className="text-2xl">🎨</div><div className="font-medium">Buat Logo</div><div className="text-sm opacity-70">Teks, shapes</div></GlassCard></Link>
            <Link to="/workspace"><GlassCard className="p-4 flex flex-col items-start gap-3"><div className="text-2xl">🗂</div><div className="font-medium">Workspace</div><div className="text-sm opacity-70">Proyek & templates</div></GlassCard></Link>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold mb-3">Riwayat Proyek</h3>
            <div className="grid gap-3">
              {[1,2,3].map(i => <div key={i} className="rounded-2xl h-20 bg-white/5 border border-white/8" />)}
            </div>
          </div>
        </motion.div>
      </div>
      <NavBar />
    </div>
  );
}

function Workspace(){
  const [tab, setTab] = useState("Foto");
  return (
    <div className={`${BG_GRAD} pb-28`}>
      <div className="max-w-md mx-auto px-6 pt-10">
        <div className="flex items-center gap-3">
          <Link to="/home" className="text-sm opacity-70">← Kembali</Link>
          <h2 className="text-lg font-semibold">Workspace Saya</h2>
        </div>
        <div className="mt-4 flex gap-2">
          {["Foto","Video","Logo"].map(t => <button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 rounded-full ${tab===t ? 'bg-gradient-to-tr from-indigo-500 to-fuchsia-500' : 'bg-white/5'}`}>{t}</button>)}
        </div>
        <div className="mt-6">
          {tab==='Foto' && <GlassCard><EditFotoSimple/></GlassCard>}
          {tab==='Video' && <GlassCard><EditVideoCard/></GlassCard>}
          {tab==='Logo' && <GlassCard><EditLogoCard/></GlassCard>}
        </div>
      </div>
      <NavBar />
    </div>
  );
}

function Profile(){
  const { user, logout } = useAuth();
  return (
    <div className={`${BG_GRAD} pb-28`}>
      <div className="max-w-md mx-auto px-6 pt-10">
        <div className="flex items-center gap-3">
          <Link to="/home" className="text-sm opacity-70">← Kembali</Link>
          <h2 className="text-lg font-semibold">Profil</h2>
        </div>

        <div className="mt-6">
          <GlassCard>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/8" />
              <div>
                <div className="font-semibold">{user?.email}</div>
                <div className="text-sm opacity-80">Akun Gratis</div>
              </div>
            </div>

            <div className="mt-4">
              <button onClick={()=>alert('Upgrade akan hadir')} className="w-full rounded-2xl p-3 bg-gradient-to-tr from-indigo-500 to-fuchsia-500">Upgrade ke Premium</button>
              <button onClick={logout} className="w-full mt-3 rounded-2xl p-3 bg-red-600">Logout</button>
            </div>
          </GlassCard>
        </div>
      </div>
      <NavBar />
    </div>
  );
}

/* ---------------- Editors implementations ---------------- */

/* Edit Foto simple using react-easy-crop */
async function getCroppedImageSimple(imgSrc, zoom=1, rotation=0){
  const createImage = src => new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.crossOrigin = "anonymous";
    img.src = src;
  });
  const img = await createImage(imgSrc);
  const canvas = document.createElement("canvas");
  const size = Math.min(1200, Math.max(img.width, img.height));
  canvas.width = size; canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.save();
  ctx.translate(size/2, size/2);
  ctx.rotate((rotation*Math.PI)/180);
  ctx.scale(zoom, zoom);
  ctx.drawImage(img, -img.width/2, -img.height/2);
  ctx.restore();
  return canvas.toDataURL("image/png");
}

function EditFotoSimple(){
  const [fileUrl, setFileUrl] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [out, setOut] = useState(null);
  const inputRef = useRef();

  function onFile(e){
    const f = e.target.files?.[0];
    if (!f) return;
    setFileUrl(URL.createObjectURL(f));
    setOut(null);
  }
  async function apply(){
    if (!fileUrl) return;
    const d = await getCroppedImageSimple(fileUrl, zoom, rotation);
    setOut(d);
  }
  return (
    <div>
      <div className="mb-3"><input ref={inputRef} type="file" accept="image/*" onChange={onFile} /></div>
      <div className="rounded-xl overflow-hidden h-72 bg-black/20 border border-white/6">
        {fileUrl ? (
          <div style={{ position: 'relative', height: '100%' }}>
            <Cropper image={fileUrl} crop={{x:0,y:0}} zoom={zoom} rotation={rotation} aspect={3/4} onCropChange={()=>{}} onZoomChange={setZoom} onRotationChange={setRotation} />
          </div>
        ) : <div className="h-full grid place-items-center opacity-70">Pilih gambar untuk mulai</div>}
      </div>

      <div className="flex gap-2 mt-3">
        <button onClick={()=>setRotation(r=>r+90)} className="flex-1 p-3 rounded bg-indigo-600">Rotate</button>
        <button onClick={()=>setZoom(z=>Math.min(3, z+0.2))} className="flex-1 p-3 rounded bg-green-600">Zoom +</button>
        <button onClick={()=>setZoom(z=>Math.max(1, z-0.2))} className="flex-1 p-3 rounded bg-gray-600">Zoom -</button>
      </div>

      <div className="mt-3 flex gap-2">
        <button onClick={apply} className="flex-1 p-3 rounded bg-gradient-to-tr from-indigo-500 to-fuchsia-500">Apply & Export</button>
        <button onClick={()=>{ setFileUrl(null); setOut(null); inputRef.current.value=''; }} className="p-3 rounded bg-red-600">Reset</button>
      </div>

      {out && <div className="mt-3"><img src={out} alt="result" className="w-full rounded"/><a href={out} download="dsrt-photo.png" className="block mt-2 py-2 text-center rounded bg-indigo-600">Download</a></div>}
    </div>
  );
}

/* Edit Video (lazy-load ffmpeg) */
function EditVideoCard(){
  const [ffmpeg, setFfmpeg] = useState(null);
  const [ready, setReady] = useState(false);
  const [file, setFile] = useState(null);
  const [start, setStart] = useState("0");
  const [end, setEnd] = useState("5");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(()=> {
    let mounted = true;
    (async ()=> {
      const ff = createFFmpeg({ log: false });
      await ff.load();
      if (mounted){ setFfmpeg(ff); setReady(true); }
    })();
    return ()=> { mounted=false; };
  }, []);

  async function onFile(e){
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f); setResult(null);
  }

  async function trim(){
    if (!file || !ffmpeg) return alert("Pilih file & tunggu ffmpeg siap");
    setProcessing(true);
    try{
      ffmpeg.FS("writeFile", "in.mp4", await fetchFile(file));
      await ffmpeg.run("-i","in.mp4","-ss",start,"-to",end,"-c:v","libx264","-c:a","aac","out.mp4");
      const data = ffmpeg.FS("readFile","out.mp4");
      const url = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));
      setResult(url);
    }catch(e){
      console.error(e);
      alert("Gagal mengolah video di browser.");
    }finally{ setProcessing(false); }
  }

  return (
    <div>
      <div className="mb-3"><input type="file" accept="video/*" onChange={onFile} /></div>
      <div className="rounded-xl overflow-hidden h-48 bg-black/20 border border-white/6 mb-3 flex items-center justify-center">
        {file ? <video src={URL.createObjectURL(file)} controls className="w-full h-full object-contain" /> : <div className="opacity-70">Pilih video</div>}
      </div>

      <label className="block text-sm opacity-80">Start (sec)</label>
      <input value={start} onChange={e=>setStart(e.target.value)} className="w-full p-2 rounded bg-white/5 mb-2" />
      <label className="block text-sm opacity-80">End (sec)</label>
      <input value={end} onChange={e=>setEnd(e.target.value)} className="w-full p-2 rounded bg-white/5 mb-3" />

      <button onClick={trim} disabled={!ready || processing} className="w-full p-3 rounded bg-gradient-to-tr from-indigo-500 to-fuchsia-500">
        {processing ? "Processing..." : (ready ? "Trim Video" : "Loading ffmpeg...")}
      </button>

      {result && <div className="mt-3"><video src={result} controls className="w-full rounded"/><a href={result} download="dsrt-video.mp4" className="block mt-2 py-2 text-center rounded bg-green-600">Download</a></div>}
    </div>
  );
}

/* Edit Logo (fabric) */
function EditLogoCard(){
  const canvasRef = useRef(null);
  const [canvasObj, setCanvasObj] = useState(null);
  const [text, setText] = useState("DSRT");
  const [color, setColor] = useState("#ffffff");

  useEffect(()=> {
    const c = new fabric.Canvas("logo-canvas", { backgroundColor: "transparent", width: 480, height: 320 });
    const txt = new fabric.Text(text, { left: 140, top: 120, fontSize: 36, fill: color, fontFamily: "Helvetica" });
    c.add(txt);
    setCanvasObj(c);
    return ()=> c.dispose();
  }, []);

  useEffect(()=> {
    if (!canvasObj) return;
    const objs = canvasObj.getObjects("text");
    if (objs.length) { objs[0].set({ text, fill: color }); canvasObj.renderAll(); }
  }, [text, color, canvasObj]);

  function addShape(){
    if (!canvasObj) return;
    const rect = new fabric.Rect({ left:40, top:40, width:80, height:80, rx:12, ry:12, fill: color });
    canvasObj.add(rect);
    canvasObj.setActiveObject(rect);
    canvasObj.renderAll();
  }
  function exportPng(){
    if (!canvasObj) return;
    const dataUrl = canvasObj.toDataURL({ format: "png", multiplier: 2, quality: 1, enableRetinaScaling: true, backgroundColor: null });
    const a = document.createElement("a"); a.href = dataUrl; a.download = "dsrt-logo.png"; a.click();
  }

  return (
    <div>
      <input value={text} onChange={(e)=>setText(e.target.value)} className="w-full p-2 rounded bg-white/5 mb-2" />
      <div className="flex gap-2 items-center mb-3">
        <input type="color" value={color} onChange={(e)=>setColor(e.target.value)} />
        <button onClick={addShape} className="px-3 py-2 rounded bg-indigo-600">Tambah Shape</button>
        <button onClick={exportPng} className="px-3 py-2 rounded bg-green-600">Export PNG</button>
      </div>

      <div className="rounded-xl overflow-hidden border border-white/6">
        <canvas id="logo-canvas" />
      </div>
      <div className="mt-3 text-sm opacity-70">Tip: pilih objek untuk pindah/resize/rotate.</div>
    </div>
  );
}

/* Route wrappers for individual pages */
function EditFotoPage(){ return (<div className={`${BG_GRAD} pb-28`}><div className="max-w-md mx-auto px-6 pt-8"><div className="flex items-center gap-3"><Link to="/home" className="text-sm opacity-70">← Kembali</Link><h2 className="text-lg font-semibold">Edit Foto</h2></div><div className="mt-6"><GlassCard><EditFotoSimple/></GlassCard></div></div><NavBar/></div>); }
function EditVideoPage(){ return (<div className={`${BG_GRAD} pb-28`}><div className="max-w-md mx-auto px-6 pt-8"><div className="flex items-center gap-3"><Link to="/home" className="text-sm opacity-70">← Kembali</Link><h2 className="text-lg font-semibold">Edit Video</h2></div><div className="mt-6"><GlassCard><EditVideoCard/></GlassCard></div></div><NavBar/></div>); }
function EditLogoPage(){ return (<div className={`${BG_GRAD} pb-28`}><div className="max-w-md mx-auto px-6 pt-8"><div className="flex items-center gap-3"><Link to="/home" className="text-sm opacity-70">← Kembali</Link><h2 className="text-lg font-semibold">Buat Logo</h2></div><div className="mt-6"><GlassCard><EditLogoCard/></GlassCard></div></div><NavBar/></div>); }

/* App routes */
function AppRoutes(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash/>} />
        <Route path="/landing" element={<Landing/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/workspace" element={<ProtectedRoute><Workspace/></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path="/edit-foto" element={<ProtectedRoute><EditFotoPage/></ProtectedRoute>} />
        <Route path="/edit-video" element={<ProtectedRoute><EditVideoPage/></ProtectedRoute>} />
        <Route path="/edit-logo" element={<ProtectedRoute><EditLogoPage/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

/* Root */
export default function App(){
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

/* If used as single entry (for manual testing without separate main.jsx), uncomment below:
const root = document.getElementById('root');
createRoot(root).render(<AuthProvider><AppRoutes/></AuthProvider>);
*/
